/**
 * 用于修改收藏五角星的图片
 *
 *
 */


define(function() {

    /**
     * 点收藏之前
     * @return {[type]} [description]
     */
    var beforeClickStar = function(element) {
        element.attr('src', require('../../image/beforeClickStar.png'));
    };

    /**
     * 点收藏之后
     * @return {[type]} [description]
     */
    var afterClickStar = function(element) {
        element.attr('src', require('../../image/afterClickStar.png'));
    };

    return {
        beforeClickStar: beforeClickStar,
        afterClickStar: afterClickStar
    };

});