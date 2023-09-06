/*全局变量  公共方法*/
// var domain = 'https://cmpmatch.digilinx.net.cn/api';//测试
// var cqcurl = 'https://cmpmatch.digilinx.net.cn/';//测试


var domain = 'https://cqc-admin.yeeol.com/api'; //正式
var cqcurl = 'http://cqc.yeeol.com/'; //正式

var thirdurl = 'https://cmpmatch.digilinx.net.cn/cas.php';//test
//var thirdurl = 'https://saishi.yeeol.com/cas.php';

var imgpath = 'https://cmpmatch-files.oss-cn-beijing.aliyuncs.com';
var pageSize = 6;/*分页条数*/
//  全国组委会秘书处    联&nbsp;系&nbsp;人&nbsp;  联系电话  电子邮箱  官网微信  二维码
var footerArr = [
    "全国组委会秘书处",
    "刘炜 林菁",
    "010-85212734",
    "010@qq.com",
    "http://www.baidu.com",
    "中国青年创业就业基金会",
    "Copyright 2020-2030", //底部版权
    "中国青年创业就业基金会版权所有",
    "京ICP备16021889号",
    "建议使用最新版360极速、360、Firefox、搜狗浏览器或IE10以上版本",
]




$(function () {


})




//设置cookie
function setCookie(name, value) {
    if (!name || !value) return;
    var Days = 30;//默认30天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString() + ";path=/";
}

//获取cookie
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]);
    return '';
}

//删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval) document.cookie = name + "=;expires=" + exp.toUTCString() + ";path=/";
}

function getParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return '';
}

// 注:时间戳转时间（ios手机NaN）
function getTime(ns) {
    if (!ns) return '';
    var date = new Date(parseInt(ns) * 1000);
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minu = date.getMinutes();
    var sec = date.getSeconds();
    // return year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
    return year + '-' + mon + '-' + day;
}

/*获取当前时间*/
function getNowTime() {
    var date = new Date();
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minu = date.getMinutes();
    var sec = date.getSeconds();
    // return year+'-'+mon+'-'+day+' '+hours+':'+minu+':'+sec;
    return year + '-' + mon + '-' + day;
}

// 验证中文名称
function isChinaName(name) {
    var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
    return pattern.test(name);
}

// 验证手机号
function isPhoneNo(phone) {
    var pattern = /^1[3456789]\d{9}$/;
    return pattern.test(phone);
}

// 验证身份证
function isCardNo(card) {
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return pattern.test(card);
}

// 验证URL
function isURL(url) {
    var pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    return pattern.test(url);
}

// 验证时间
function isDate(dd) {
    var pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    return pattern.test(dd);
}

function isemail(email) {
    var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!myreg.test(email)) {
        //layer.msg('请输入正确邮箱地址');
        return false;
    } else {
        return true;
    }
}


// 验证座机
function isZuojiNo(phone) {
    var pattern = /^0?1[35]\d{9}$/;
    var pattern1 = /^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$/;
    return (pattern.test(phone) || pattern1.test(phone));
}

//验证护照号码
function checkPassport(code) {
    var pattern = /^((1[45]\d{7})|(G\d{8})|(P\d{7})|(S\d{7,8}))?$/;
    return pattern.test(code);
}

//港澳通行证
function checkGAT(code) {//var re = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
    var pattern = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
    return pattern.test(code);
}

/*文件大小转换*/
function sizeTostr(size) {
    var data = "";
    if (size < 0.1 * 1024) { //如果小于0.1KB转化成B
        data = size.toFixed(2) + "B";
    } else if (size < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
        data = (size / 1024).toFixed(2) + "KB";
    } else if (size < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        data = (size / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB
        data = (size / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    var sizestr = data + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}


/*获取评委的类型: 评委类型:
1 -> 创业导师
2 -> 投资人
3 -> 专家学者
0 -> 未选择*/
function getUserType(v) {
    switch (v) {
        case 0:
            return '未选择';
            break;
        case 1:
            return '创业导师';
            break;
        case 2:
            return '投资人';
            break;
        case 3:
            return '专家学者';
            break;
        default:
            return '';
            break;
    }
}


/*流量统计 	类型 1热门赛事 2赛事咨询 3培训课程 4评委专家 5项目库 6首页 7资料下载*/
function setbrowse(type = '') {
    url_post('/Setting/setbrowse', {type: type}, function (res) {
    })
}


function url_get(url, params, success, fail) {

    $.ajax({
        type: "get",
        url: domain + url,
        data: params,
        // xhrFields: {
        //     withCredentials: true
        // },
        dataType: 'json',
        success: function (data) {
            // 0代表失败 1代表成功
            if (data.code == 1) {
                success(data);
            } else {
                console.log(data.msg);
                // alert(data.msg);

            }
           if(url == '/Judges/delFollow' || url == '/Judges/userFollow'){
               alert(data.msg);
            }

			if( data.code==0 ){
				if( fail ) fail(data);
			}

            // if (data.error == '301') {
            //     setCookie('mycookie', "");
            //     window.parent.location.href = "/home/login.html";
            // }
            // if (data.error == '501') {
            //     alert('您没有权限进行此操作');
            //     return;
            // }
        },
        error: function (error) {
            console.log('网络出错:' + url);
			if( fail ) fail(error);
        }
    });
}

function url_post(url, params, success, fail) {
    $.ajax({
        type: "post",
        url: domain + url,
        data: params,
        // xhrFields: {
        //     withCredentials: true
        // },
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                success(data);
            } else {
                console.log(data.msg);
                // alert(data.msg);

                var allowUrl = [ //需要弹窗的接口
                    '/Judges/delFollow',
                    '/Judges/userFollow',
                    '/member/login',
                    '/judges/pushJudValues',
					'/member/register'
                ];
                console.log(allowUrl.indexOf(url))
                if(allowUrl.indexOf(url) != -1){
                   //alert(data.msg);
                }

				if( fail ) fail(data.msg);

            }

            // if (data.error == '301') {
            //     setCookie('mycookie', "");
            //     window.parent.location.href = "/home/login.html";
            // }
            // if (data.error == '501') {
            //
            //     alert('您没有权限进行此操作');
            //     return;
            // }
            // success(data);
        },
        error: function (error) {
            console.log('网络出错:' + url);
			if( fail ) fail(error);
        }
    });
}
function url_post3(url, params, success) {
    $.ajax({
        type: "post",
        url: domain + url,
        data: params,
        // xhrFields: {
        //     withCredentials: true
        // },
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                success(data);
            } else {
                // console.log(data.msg);
                // alert(data.msg);
            }
            // if (data.error == '301') {
            //     setCookie('mycookie', "");
            //     window.parent.location.href = "/home/login.html";
            // }
            // if (data.error == '501') {
            //
            //     alert('您没有权限进行此操作');
            //     return;
            // }
            // success(data);
        },
        error: function (error) {
            console.log('网络出错:' + url);
        }
    });
}
/**
 ** 分页函数
 ** 参数：page=页数,totalPage=总页数
 ** 返回值：html字符串
 **/
function LoadPage(page, totalPage, pagesize = 10, getdata) {
    var htmlPage = '<div class="layui-box layui-laypage layui-laypage-default" id="layui-laypage-1">';
    //上一页
    if (page == 1) {
        htmlPage += '<a class="pagea">上一页</a>';
    } else {
        htmlPage += '<a class="pagea" onclick="onPage(' + (parseInt(page) - 1) + ')">上一页</a>';
    }
    //首页
    if (page > 5) {
        htmlPage += '<a onclick="onPage(1)">1</a>';
    }
    //页数
    var start = page > 4 ? page - 4 : 1;
    var end = (totalPage - start) > 4 ? start + 4 : totalPage;
    for (var i = start; i <= end; i++) {
        if (i == page) {
            htmlPage += '<a class="active" onclick="onPage(' + i + ')" data-page="' + i + '">' + i + '</a>';
        } else {
            htmlPage += '<a onclick="onPage(' + i + ')" data-page="' + i + '">' + i + '</a>';
        }
    }
    //下一页
    if (page == totalPage) {
        htmlPage += '<a class="pagea">下一页</a>';
    } else {
        htmlPage += '<a class="pagea" onclick="onPage(' + (parseInt(page) + 1) + ')">下一页</a>'
    }

    htmlPage += '\t<div class="fl pgb">\n' +
        '\t\t\t\t\t\t\t\t\t<span class="marl10 fl">到</span>\n' +
        '\t\t\t\t\t\t\t\t\t<input class="fl" type="text" name="" id="page_num" value="">\n' +
        '\t\t\t\t\t\t\t\t\t<span class="fl">页</span>\n' +
        '\t\t\t\t\t\t\t\t\t<a class="pagea1" onclick="onPage($(\'#page_num\').val())">确定</a>\n' +
        '\t\t\t\t\t\t\t\t</div>';

    return htmlPage;
}


/**
 ** 分页函数
 ** 参数：page=页数,totalPage=总页数
 ** 返回值：html字符串
 *
 *
 // $("#page").html(LoadPage(data.page, data.total_page, data.pagesize));
 // if(parseInt(data.page) > 1){
//     $('#page .layui-laypage-prev').removeClass('layui-disabled')
// }
 **/
function LoadPage_bak(page, totalPage, pagesize = 10) {
    var htmlPage = '<div class="layui-box layui-laypage layui-laypage-default" id="layui-laypage-1">';
    //上一页
    if (page == 1) {
        htmlPage += '<a href="javascript:;" class="layui-laypage-prev layui-disabled" data-page="0">上一页</a>';
    } else {
        htmlPage += '<a href="javascript:;" class="layui-laypage-prev layui-disabled" data-page="' + page + '" onclick="onPage(' + (parseInt(page) - 1) + ')">上一页</a>';
    }
    //首页
    if (page > 5) {
        htmlPage += '<a href="javascript:void(0);" onclick="onPage(1)">1</a>';
    }
    //页数
    var start = page > 4 ? page - 4 : 1;
    var end = (totalPage - start) > 8 ? start + 8 : totalPage;
    for (var i = start; i <= end; i++) {
        if (i == page) {
            htmlPage += '<span class="layui-laypage-curr"><em class="layui-laypage-em"></em><em>' + i + '</em></span>';
        } else {
            htmlPage += '<a href="javascript:;" onclick="onPage(' + i + ')" data-page="' + i + '">' + i + '</a>';
        }
    }
    //下一页
    if (page == totalPage) {
        htmlPage += '<a href="javascript:;" class="layui-laypage-next layui-disabled" >下一页</a>';
    } else {
        htmlPage += '<a href="javascript:;" onclick="onPage(' + (parseInt(page) + 1) + ')" class="layui-laypage-next" >下一页</a>'
    }


    // htmlPage += '<span class="layui-laypage-limits"><select lay-ignore="" onchange="setpagesize(this)">';
    // for (let index = 1; index <= 5; index++) {
    //     let nums = index * 10;
    //     if (pagesize == nums) {
    //         htmlPage += '<option value="'+nums+'" selected>'+nums+' 条/页</option>';
    //     } else {
    //         htmlPage += '<option value="'+nums+'">'+nums+' 条/页</option>';
    //     }
    //
    // }
    //
    // htmlPage += '</select></span></div>';

    return htmlPage;
}


function encryp_phone(phone){

    var tel=phone;
    if(phone.length == 11){
		tel = phone.substr(0, 3) + '****' + phone.substr(7);
	}

	return tel;

}

function date2str(x, y) {
  var z = { y: x.getFullYear(), M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds() };
  return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) { return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2)) });
}

function parseUrl( surl ) {

   var obj = {};
   var ipos = surl.indexOf("?");
   if ( ipos!= -1) {
	  var str = surl.substr(ipos+1);
	  strs = str.split("&");
	  var str1 = '';
	  for(var i = 0; i < strs.length; i ++) {
		 str1 = strs[i].split("=")[0];
		 if( str1.toLowerCase() == 'fd' ) str1 = 'fd';
		 obj[str1]=unescape(strs[i].split("=")[1]);
	  }
   }
   if( obj['EN'] ) obj['EN'] = obj['EN'].substr(0,obj['EN'].length-2);
   //obj['EN'] = 'KA56NV10TI';//TEST
	return obj;
}
