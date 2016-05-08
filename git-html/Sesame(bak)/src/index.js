/**
 * 主页，登陆后跳转的页面
 *
 * 主要区域包含多个卡片
 */
console.log('index');

// css
require('./css/index/main.scss');


// 引入controller.js
require(['./js/index/controller'], function(Controller) {
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

        Controller.loadProfile(); //载入个人功能信息区

        Controller.loadCard(); //载入卡片区域
    });

});
