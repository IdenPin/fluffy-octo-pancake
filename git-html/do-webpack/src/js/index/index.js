define(['../common/jquery-2.1.4.min.js', './common.js'], function ($, common) {
    require("../../sass/index/index.scss");
    $(function () {

        var cWidth = $(window).width();
        console.info(cWidth);
        var a1 = require('../../img/1.png');
        $('.col-box').eq(0).css({
            'background': 'url(dist/' + a1 + ')',
            'background-repeat': 'no-repeat',
            'background-color': '#fff',
            'background-position': 'center 60px'
        });

        var a2 = require('../../img/2.png');
        $('.col-box').eq(1).css({
            'background': 'url(dist/' + a2 + ')',
            'background-repeat': 'no-repeat',
            'background-color': '#fff',
            'background-position': '70px -5px',
            'padding-top':'180px'
        });

        var a3 = require('../../img/3.png');
        $('.col-box').eq(4).css({
            'background': 'url(dist/' + a3 + ')',
            'background-repeat': 'no-repeat',
            'background-color': '#fff',
            'background-position': '0 5px',
            'padding-top':'180px'
        });
        $('.close').click(function(){
            $(this).parent().hide();
        });
    })
});