/**
 * 设置右上角默认的头像
 */


define(function() {

    var setUserAvatar = function(url) {
        if (url === undefined) { //默认头像
            $('.avatar').attr('src', require('../../image/avatar.jpg')); //使用webpack压缩图片
        } else { //用户头像
            $('.avatar').attr('src', url);
        }
    };

    return {
        setUserAvatar: setUserAvatar
    };
});
