/**
 * 回到顶部按钮的功能
 */
define(function() {

    /**
     * 回到顶部
     * @return {[type]} [description]
     */
    var back2top = function() {

        var back2topJQ = $('.back2top');
        back2topJQ.attr('src', require('../../image/back2top.png'));

        $(window).scroll(function(e) {
            //若滚动条离顶部大于100元素
            if ($(window).scrollTop() > 100)
                back2topJQ.fadeIn(300); //以1秒的间隔渐显id=gotop的元素
            else
                back2topJQ.fadeOut(300); //以1秒的间隔渐隐id=gotop的元素
        });

        back2topJQ.click(function(event) {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        });

    };

    return {
        back2top: back2top
    };
});
