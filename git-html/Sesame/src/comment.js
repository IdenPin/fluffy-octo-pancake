//评论页
//类似知乎
//包含评论和回复

console.log('评论页');

// css
require('./css/comment/main.scss');

// 引入controller.js
require(['./js/comment/controller', './js/common/back2top'], function(Controller, Back2Top) {
    $(document).ready(function() {
        //插入头部
        var header = require('html!./html/common/header.html');
        $('body').prepend(header);

        //底部
        var footer = require('html!./html/common/footer.html');
        $('body').append(footer);

        //模态框
        var modal = require('html!./html/common/modal.html');
        $('body').append(modal);

        //回到顶部
        var back2top = require('html!./html/common/back2top.html');
        $('body').append(back2top);

        Controller.loadProfile(); //载入个人功能信息区

        Controller.loadWebInfo(); //载入主信息

        Controller.loadComment(); //载入评论信息

        Controller.firstComment(); //大评论

        Back2Top.back2top(); //回到顶部
    });

});
