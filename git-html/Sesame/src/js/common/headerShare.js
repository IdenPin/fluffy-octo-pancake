/**
 * header上的
 * 分享按钮
 * @return {[type]} [description]
 */
define(function() {

    var share = function() {
        var shareJQ = $('.nav-share-img');
        shareJQ.attr('src', require('../../image/shareB.png'));

        shareJQ.mouseover(function(event) {
            shareJQ.attr('src', require('../../image/shareA.png'));
        });
        shareJQ.mouseleave(function(event) {
            shareJQ.attr('src', require('../../image/shareB.png'));
        });
    };

    return {
        share: share
    };

});
