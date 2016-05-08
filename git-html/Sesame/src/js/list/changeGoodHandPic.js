/**
 * 用于修改点赞的手形图片
 *
 */


define(function() {

    /**
     * 点赞之前
     * @return {[type]} [description]
     */
    var beforeClickGood = function(element) {
        // console.log('beforeClickGood');
        // console.log(element);
        element.attr('src', require('../../image/beforeClickGood.png'));
    };

    /**
     * 点赞之后
     * @return {[type]} [description]
     */
    var afterClickGood = function(element) {
        element.attr('src', require('../../image/afterClickGood.png'));
        element.next('span').css('color', '#F39A78');
    };

    return {
        beforeClickGood: beforeClickGood,
        afterClickGood: afterClickGood
    };

});
