/**
 * 导航栏菜单选中 及跳转
 * @param flag
 * @param flag1
 */
function clickmenu(flag, flag1) {
    console.log(flag)
    $('#main').hide();
    $("#news").hide();
    $("#newsinfo").hide();
    $("#person").hide();
    $("#login").hide();
    $("#zhengshus").hide();


    if (flag === 1) {
        $('#main').show();
        if (flag1 === 1)
            $("html,body").animate({scrollTop: '0px'}, 300);
        getZhengsuLists();
        if (flag1 === 2) {
            var gtop = $('#matchjj').offset().top;
            $("html,body").animate({scrollTop: (gtop - 50) + 'px'}, 300);

        }
        if (flag1 === 3) {
            var gtop = $('#download').offset().top;
            $("html,body").animate({scrollTop: (gtop - 50) + 'px'}, 300);
        }
        if (flag1 === 4) {
            var gtop = $('#block1').offset().top;
            $("html,body").animate({scrollTop: (gtop - 50) + 'px'}, 300);
        }
        if (flag1 === 5) {
            var gtop = $('#block2').offset().top;
            $("html,body").animate({scrollTop: (gtop - 50) + 'px'}, 300);
        }
        if (flag1 === 6) {
            var gtop = $('#block3').offset().top;
            $("html,body").animate({scrollTop: (gtop - 50) + 'px'}, 300);
        }
        if (flag1 === 7) {
            var gtop = $('#block4').offset().top;
            $("html,body").animate({scrollTop: (gtop - 50) + 'px'}, 300);
        }

    } else if (flag === 2) {
        $('#news').show();
        getNews()
    } else if (flag === 3) {

    } else if (flag === 4) {

    } else if (flag === 8){

        if (!getCookie('token')) {
            location.href = './login.html?forward=index.html&rand=' + new Date().getTime();
        } else {
           $('#zhengshus').show();
            getZhengsuLists();
        }

    } else {
        if (!getCookie('token')) {
            location.href = './login.html?forward=index.html&rand=' + new Date().getTime();
        } else {
            $('#person').show();
            getbmList();
        }
    }
}

var paramobj = parseUrl(location.search);
if (paramobj['flag']) clickmenu(paramobj['flag']);


var data = {
    // search:'',
    // offset:1,
    // limit:3
    "user_id": 110
};
$('#newslist').html('');
url_get('/content/newsList', data, function (res) {

    var rows = res.data;
    var str = '';
    if (rows.length > 3) rows = rows.slice(0, 3);

    // for (i = 0; i < rows.length; i++) {
    //     str += '<div class="newsCard" onclick="clicknews(' + rows[i].id + ')">' +
    //         ' <div class="new-imgBox">' +
    //         '    <img src="' + imgpath + rows[i].image + '" alt="">' +
    //         '</div>' +
    //         '<div class="new-msgBox">' +
    //         '<h3>' + rows[i].title + '</h3>' +
    //         '<p>' + rows[i].description + '</p>' +
    //         '<div>' +
    //         '   <span>' + rows[i].source + '</span>' +
    //         '   <span style="display: none">' + rows[i].create_time + '</span>' +
    //         '</div>' +
    //         '</div>' +
    //         '</div>';

    // }
    // $('#newslist').html(str);


})

$('#file_list').html('');
var menu_id = '';
url_post('/data/datagrouplist', '', function (res) {
    if (res.data.length > 0) {
        if (res.data[0]['sub_group'].length > 0) {
            menu_id = res.data[0]['sub_group'][0].id;
        } else {
            menu_id = res.data[0].id;
        }
        getData();
    }
})


function getData(page = 1) {
    url_post('/data/getDataList', {
        id: menu_id,
        sort: 'id',
        order: 'DESC',
        offset: 1,
        limit: 10
    }, function (res) {
        $('#file_list').html('');
        var list = res.data.rows;
        for (var i in list) {
            $('#file_list').append('<div class="file-list-item">\n' +
                '<span>' + list[i]['name'] + '</span>\n' +
                '\t\t\t\t\t\t\t\t\t<span onclick="huidiao(' + list[i]['id'] + ')">下载附件</span>\n' +
                '\t\t\t\t\t\t\t\t</div>')
        }

    })
}


function getImg(name) {
    if (name) {
        if (name.indexOf('pdf') > -1) {
            return "img/zlxzico1_03.png";
        } else if (name.indexOf('word') > -1) {
            return "img/zlxzico2_03.png";
        } else if (name.indexOf('excel') > -1) {
            return "img/zlxzico3_03.png";
        } else if (name.indexOf('mp3') > -1) {
            return "img/zlxzico4_03.png";
        } else if (name.indexOf('mp4') > -1) {
            return "img/zlxzico5_03.png";
        } else {
            return "img/zlxzico2_03.png";
        }
    }


}

/*调用下载*/
function huidiao(id) {
    url_get('/data/downloadFile', {id: id}, function (res) {
    })
    return false;
}

function onPage(page) {
    //var cname = $('.sszx_title.active').attr('cname');
    // if(cname == 'news'){
    getNews(page);
    //}else{
    //    getNotices(page);
    //}
}

/**
 * 获取新闻资讯列表
 * @param page
 */
function getNews(page = 1) {
    // search 	是 	string 	关键字检索
    // sort 	是 	string 	排序字段 默认主键
    // order 	否 	string 	排序 默认DESC 降序
    // offset 	否 	string 	页码
    // limit 	否 	string 	每页数量
    var data = {
        // search:$('#search').val(),
        // offset:page,
        // limit:pageSize
        "user_id": 110
    };
    url_get('/content/newsList', data, function (res) {
        $('#news_list').html('');
        var list = res.data;
        for (var i in list) {
            $('#news_list').append('<div class="lists-item clear" onclick="clicknews(' + list[i]['id'] + ')" >\n' +
                '<div class="item-left ">' +
                '<img src="' + imgpath + list[i]['image'] + '" alt=""/>' +
                '\t\t\t\t\t\t\t</div>\n' +
                '<div class="item-right ">\n' +
                '\t\t\t\t\t\t\t\t<h3>' + list[i]['title'] + '</h3>\n' +
                '\t\t\t\t\t\t\t\t<p>' + list[i]['description'] + '</p>\n' +
                '<div ><span>' + list[i]['source'] + '</span>\n' +
                '<span style="display: none">发布：' + list[i]['create_time_format'] + '</span>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t</div>');
        }

        $("#page").html(LoadPage(page, Math.ceil(res.data['total'] / pageSize), pageSize));
        $('#page .pgb').hide();
    })
}

/**
 * 查看新增资讯详情
 * @param id
 */
function clicknews(id) {

    $('#main').hide();
    $('#news').hide();
    $('#newsinfo').show();
    $('#person').hide();
    $('#login').hide();

    /*咨询详情*/
    url_get('/News/newsDetail', {
        token: getCookie('token'),
        id: id
    }, function (res) {

        $('#title').html(res.data['title'])//标题

        var arr = res.data['tags'].split(',');
        for (var i in arr) {
            if (arr[i] == '') continue
            $('#tags').append('<i >' + arr[i] + '</i>')
        }
        $('#source').html(res.data['source'])//来源
        $('#create_time_format').html(res.data['create_time_format'])//发布时间
        $('#show_num').html(res.data['show_num'])//查看人数
        $('.browse').html(res.data['show_num'])//查看人数
        $('#content').html(res.data['content'])//内容
        $('#commentNum').html(res.data['commentNum'])//评论数

        if (res.data['is_dianzan'] == 1) {
            $('#is_dianzan').addClass('active');
        }
        if (res.data['is_shoucang'] == 1) {
            $('#is_shoucang').addClass('active');
        }
        setTimeout(function () {
            hljs.initHighlightingOnLoad();
            $(".content").emoji({
                showTab: true,
                animation: 'fade',
                icons: [{
                    name: "贴吧表情",
                    path: "emoji/img/tieba/",
                    maxNum: 50,
                    file: ".jpg",
                    placeholder: ":{alias}:",
                    alias: {
                        1: "hehe",
                        2: "haha",
                        3: "tushe",
                        4: "a",
                        5: "ku",
                        6: "lu",
                        7: "kaixin",
                        8: "han",
                        9: "lei",
                        10: "heixian",
                        11: "bishi",
                        12: "bugaoxing",
                        13: "zhenbang",
                        14: "qian",
                        15: "yiwen",
                        16: "yinxian",
                        17: "tu",
                        18: "yi",
                        19: "weiqu",
                        20: "huaxin",
                        21: "hu",
                        22: "xiaonian",
                        23: "neng",
                        24: "taikaixin",
                        25: "huaji",
                        26: "mianqiang",
                        27: "kuanghan",
                        28: "guai",
                        29: "shuijiao",
                        30: "jinku",
                        31: "shengqi",
                        32: "jinya",
                        33: "pen",
                        34: "aixin",
                        35: "xinsui",
                        36: "meigui",
                        37: "liwu",
                        38: "caihong",
                        39: "xxyl",
                        40: "taiyang",
                        41: "qianbi",
                        42: "dnegpao",
                        43: "chabei",
                        44: "dangao",
                        45: "yinyue",
                        46: "haha2",
                        47: "shenli",
                        48: "damuzhi",
                        49: "ruo",
                        50: "OK"
                    },
                    title: {
                        1: "呵呵",
                        2: "哈哈",
                        3: "吐舌",
                        4: "啊",
                        5: "酷",
                        6: "怒",
                        7: "开心",
                        8: "汗",
                        9: "泪",
                        10: "黑线",
                        11: "鄙视",
                        12: "不高兴",
                        13: "真棒",
                        14: "钱",
                        15: "疑问",
                        16: "阴脸",
                        17: "吐",
                        18: "咦",
                        19: "委屈",
                        20: "花心",
                        21: "呼~",
                        22: "笑脸",
                        23: "冷",
                        24: "太开心",
                        25: "滑稽",
                        26: "勉强",
                        27: "狂汗",
                        28: "乖",
                        29: "睡觉",
                        30: "惊哭",
                        31: "生气",
                        32: "惊讶",
                        33: "喷",
                        34: "爱心",
                        35: "心碎",
                        36: "玫瑰",
                        37: "礼物",
                        38: "彩虹",
                        39: "星星月亮",
                        40: "太阳",
                        41: "钱币",
                        42: "灯泡",
                        43: "茶杯",
                        44: "蛋糕",
                        45: "音乐",
                        46: "haha",
                        47: "胜利",
                        48: "大拇指",
                        49: "弱",
                        50: "OK"
                    }
                }, {
                    path: "emoji/img/qq/",
                    maxNum: 91,
                    excludeNums: [41, 45, 54],
                    file: ".gif",
                    placeholder: "#qq_{alias}#"
                }]
            });
        }, 2000);

    })

}

/**
 * 获取报名列表信息
 * @param page
 */
function getbmList(page = 1) {

    var name = '',
        status = '';
    url_get('/signup/getMySignUp', {
        token: getCookie('token'),
        page: page,
        size: 100,
        name: name,
        status: status
    }, function (res) {
        $('.trs').remove();
        var list = res.data['list'];
        for (var i in list) {
            $('#bmlist').append(
                '<tr class="trs">' +
                 '<td>' + list[i]['code'] + '</td>' +
                 '<td>' + list[i]['name'] + '</td>\n' +
                 '<td>' + list[i]['group_name'] + '</td>' +
                 '<td>' + getTime(list[i]['create_time']) + '</td>' +
                 '<td><span class="colorindex">' + getStatus(list[i]['status']) + '</span></td>\n' +
                // '<td>'+list[i]['check_description']+'</td>\n' +
                 '<td>' +
                    '<span class="colorindex"  style="cursor: pointer;color: #00A7A5" onclick="showDoc(' + list[i]['project_id'] + ')">' + deleteBm(list[i]) + '</span>\n' +
                    '<a class="colorindex"style="cursor: pointer;color: #00A7A5;margin-left: 15px" href="javascript:;" onclick="clicksign(\'' + cqcurl.substr(0, cqcurl.lastIndexOf('/')) + '/cybs_cjbm' + (list[i]['is_new'] == '1' ? '_new' : '') + '.html?id=' + list[i]['id'] + '&projectid=' + list[i]['project_id'] + '&groupid=' + list[i]['group_id'] + '\')" >' + alterBm(list[i]) + '</a>' +
                 '</td>\n' +
                '</tr>');
        }

    })
}

/***
 * 下载word模板， 此项仅适用于“钟南山项目”使用
 */
function downDoc(list) {
    if(list['is_zns'] === 1){
        return "导出模板";
    }else{
        return '';
    }
}
/**
 * 删除报名信息
 * @param list
 * @returns {string}
 *
 * 3）报名结束前都可以取消报名，报名结束后不可以
 */
function deleteBm(list) {
    // if (list['over'] === 1 || list['status'] === 2) {
    //
    //     return '';
    // } else {
    //     return "取消报名"
    // }
    if(list['end_state'] ===2) {
        return "";
    }else{
        return "取消报名";
    }
}

/**
 * 修改报名信息
 * @param list
 * @returns {string}
 * 1）报名时间内都能点击编辑修改，
 * 2）后台审核通过也能修改，被审核通过的项目若修改了让管理员重新当新项目审
 */
function alterBm(list) {

    // if (list['over'] === 1 || list['status'] === 2) {
    //
    //     return '';
    // } else {
    //     return '编辑';
    // }
    if(list['end_state'] ===2){
        return "";
    }else {
        return "编辑";
    }
}

/**
 * 获取报名状态
 * @param v
 * @returns {string}
 */
function getStatus(v) {
    switch (v) {
        case 0:
            return '未提交';
            break;
        case 1:
            // return '未审核';
            return '已提交';
            break;
        case 2:
            // return '审核通过';
            return '已提交';
            break;
        case 3:
            // return '审核拒绝';
            return '已提交';
            break;
    }
}

/**
 * 取消报名提示确认框
 * @param id
 */
function showDoc(id) {

    layer.confirm('是否取消报名？', {
        btn: ['是', '否'], title: '温馨提示'
    }, function (index, layero) {
        layer.close(index);
        cancelSignUpMatch(id)

    }, function (index) {
        layer.close(index);
    });


}

/**
 * 获取证书列表数据
 */
function getZhengsuLists() {

    var params={
        "token":getCookie('token'),
        "page":1,
        "size":10,
        "match_id":""
    };

    url_get("/certificate/lst",params,function (res) {

        $('#zhengshu_Lists').html('');
        var list = res.data.data;
        console.log("证书列表"+list);
        for (var i in list) {
            console.log("证书:"+i);
            $('#zhengshu_Lists').append(
                '<div class="zhengsu-item">'+
                   '<p class="zs-item-title">'+list[i].match.cert.title + '</p>'+
                   '<p class="zs-item-bt" onclick="downloadPdf(' + list[i].id + ')">下载</p>'+
                '</div>');

        }

        // $("#page").html(LoadPage(page, Math.ceil(res.data['total'] / pageSize), pageSize));
        // $('#page .pgb').hide();

    })
}

/**
 * 下载pdf
 * @param id
 */
function downloadPdf(id) {

    window.open(domain+"/certificate/download_pdf?project_id="+id+"&token="+getCookie("token"),"_blank");
}

/***
 * 下载word模板
 */
function downloadWord(id) {
    window.open(domain+"/signup/download_word?project_id="+id+"&token="+getCookie("token"),"_blank");
}

function cancelSignUpMatch(id) {
    url_post('/signup/cancelSignUpMatch', {
        token: getCookie('token'),
        id: id,
    }, function (res) {
        layer.msg(res['msg'], {
            icon: 1, time: 2000,
            end: function () {
                location.reload()
            }
        });
    })
}

function clickmatch(url) {
    if (!getCookie('token')) {
        location.href = './login.html?rand=' + new Date().getTime();
    } else {
        //window.open(url);
        clicksign(url);
    }

}

/**
 * 退出登录
 */
function exit() {
    console.log('exit');
    location.href = thirdurl + '?p=logout';
    delCookie('token');
    $('#person').hide();
    $("#main").show();
}

/**
 *
 * @param url
 */
function clicksign(url) {
    var obj = {};
    obj['token'] = getCookie('token');
    obj['group'] = getCookie('group');
    obj['nickname'] = getCookie('nickname'); //	用户昵称
    obj['phone'] = getCookie('phone'); //	手机号
    obj['avatar'] = getCookie('avatar');//	头像
    obj['typeName'] = getCookie('typeName');//	角色
    obj['address_prov'] = getCookie('address_prov');//	地区
    obj['realname'] = getCookie('realname'); //	用户名称
    obj['email'] = getCookie('email'); //	邮箱
    url = url + '&json=' + encodeURIComponent(JSON.stringify(obj));
    window.open(url);
}
