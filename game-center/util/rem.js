
/**
 * ajax的工具方法，同步请求，请求完之后会把请求结果返回
 * @date 2015-6-25
 * @param url 请求的连接，必须的参数
 * @param para 发送的数据，必选的参数
 * @param dataType 返回结果类型，选填参数，默认为json
 * @param async 请求等待方式，选填参数，默认为同步
 * @returns
 */
/*	ajaxFunction("/stPlatPage/getVersionNameList.do","","JSON",true,function(result){ });*/
function defaultAjaxHandler(data) {
}
function defalutAjaxErrorhandler(data){
}
function ajaxFunction(url,para,dataType,async,successHandler,errorHandler,totalObj){
    if(dataType==null){
        dataType="json";
    }
    if(async==null){
        async=false;
    }
    if(successHandler==null){
        successHandler=defaultAjaxHandler;
    }
    if(errorHandler==null){
        errorHandler=defalutAjaxErrorhandler;
    }
    var result;
    $.ajax({
        type: "post",
        dataType: dataType,
        url: url,
        async: async,
        data: para,
        success: function(response){
            if(response!=401){
                successHandler(response);
            }
        },
        complete:function(response){
            !totalObj ? "" : $(totalObj).removeProp("disabled")
            if(response.responseText==401){
                window.top.location.href="/page/login.html";
            }
        },
        error:errorHandler
    });
    return result;
}
var top_ = function () {
    var top_ = $(window).scrollTop();
    var  H_  = ($(window).height()-$(".modal").height())/2;
    $(".modal").css({"top":top_+H_+"px"});
};
$(window).resize(function (){ //调整屏幕大小时
    top_();
});
$(window).scroll(function (){ //上下滚动屏幕时
    top_();
});
function refreshRem(){
    var dewS=720,
        _W=document.documentElement.clientWidth;
    _W = _W>720?720:_W;
    var ratio=_W/dewS;
    document.documentElement.style.fontSize =ratio*100+'px';
};
refreshRem();
window.addEventListener('resize',refreshRem,false);
/** 禁用滚动 **/function stopScroll() {
    $(document.body).css("overflow","hidden");//禁用滚动条
    document.ontouchmove=function(){ return false;}
};
/** 启用滚动 **/function StartScroll() {
    $(document.body).css("overflow","scroll");//启用滚动条
    document.ontouchmove=function(){ return true;}
};
/** 禁用点击 **/function stopTap() {
    document.ontouchstart=function(){ return false;};//禁用点击
};
/** 启用点击 **/function StartTap() {
    document.ontouchstart=function(){ return true;};//启用点击
};
//时间转化格式
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}
function format(time) {
    var t=new Date(time);
    var year=t.getFullYear()+'年';
    var month=t.getMonth()+1+'月';
    var day=t.getDate()+'日';
    return [year,month,day].join('');
}




