/**
 * 加载footer中的pic
 */
define(function() {

    var loadPics = function() {

        //wechat
        var wechatLogo = $('#weixinLogo');
        wechatLogo.attr('src', require('../../image/wechat.png'));

        wechatLogo.mouseover(function(event) {
            wechatLogo.attr('src', require('../../image/wechatHover.png'));
        });
        wechatLogo.mouseleave(function(event) {
            wechatLogo.attr('src', require('../../image/wechat.png'));
        });

        var wechatQR = $('#weixinQR');
        wechatQR.attr('src', require('../../image/wechatQR.jpg'));

        //weibo
        var weiboLogo = $('#weiboLogo');
        weiboLogo.attr('src', require('../../image/weibo.png'));

        weiboLogo.mouseover(function(event) {
            weiboLogo.attr('src', require('../../image/weiboHover.png'));
        });
        weiboLogo.mouseleave(function(event) {
            weiboLogo.attr('src', require('../../image/weibo.png'));
        });
        var weiboQR = $('#weiboQR');
        weiboQR.attr('src', require('../../image/weiboQR.jpg'));

    };

    return {
        loadPics: loadPics
    };
});
