//个人中心页

console.log('个人中心');

// css
require('./css/profile/main.scss');

// 引入controller.js
require(['./js/profile/controller'], function(Controller) {

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

        Controller.getPersonalInfo(); //得到个人详情

        Controller.uploadPreivew(); //图片上传预览

        Controller.editProfile(); //编辑个人信息
    });
});
