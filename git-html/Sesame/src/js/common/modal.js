/**
 * 模态框功能
 */


/**
 * 定义模块
 */
define(function() {

    /**
     * 展示模态框
     * @param  {String} modalID 模态框id
     * @return {[type]}         [description]
     */
    var show = function(modalID) {
        // var top = $('body').height() / 2;
        var top = 760/2;
        $('.modal-mask').fadeIn(400);
        $(modalID).show().animate({
                opacity: 1,
                top: top
            },
            700, function() {
                //点击×隐藏
                $(modalID + ' .close').click(function(event) {
                    event.preventDefault();
                    hide(modalID); //隐藏
                });
            });
    };

    /**
     * 隐藏模态框
     * @param  {String} modalID 模态框id
     * @return {[type]}         [description]
     */
    var hide = function(modalID) {
        $('.modal-mask').fadeOut(400);
        $(modalID).fadeOut(400).css({
            opacity: 0,
            top: '-100%'
        });
    };

    return {
        show: show, //弹出模态框
        hide: hide //隐藏模态框
    };

});