/**
 * header上的三条杠
 * menu
 * 分类菜单
 *
 * 主要是鼠标移上去换图标
 * 用require的方式压缩图片
 */
define(function() {

    /**
     * 分类
     * @return {[type]} [description]
     */
    var cate = function() {

        var threeJQ = $('.nav-share-three');
        threeJQ.attr('src', require('../../image/cateB.png'));

        $('.nav-three').mouseover(function(event) {
            threeJQ.attr('src', require('../../image/cateA.png'));
        });
        $('.nav-three').mouseleave(function(event) {
            threeJQ.attr('src', require('../../image/cateB.png'));
        });


    };

    return {
        cate: cate
    };
});
