/**
 * 入口文件
 *
 * webpack 真是好用
 */
console.log('login');

// css
require('./css/login/main.scss');

// 引入controller.js
require(['./js/login/controller'], function(Controller) {
    $(document).ready(function() {
        //插入头部
        var header = require('html!./html/common/header.html');
        $('body').prepend(header);

        //底部
        var footer = require('html!./html/common/footer.html');
        $('body').append(footer);


        Controller.loadProfile(); //载入右上角个人信息功能区

        Controller.tab(); //控制 tab 页切换

        Controller.login(); //登录功能

        Controller.alreadyLogin(); //已经登录直接跳转到首页

        Controller.verifyEmailUsed(); //校验邮箱是否已注册

        Controller.verifyPasswordLength(); //校验密码长度

        Controller.register(); //注册功能
    });

});
