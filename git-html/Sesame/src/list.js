/**
 * 列表页
 *
 * 包含各种信息，组成一个列表
 */
console.log('list');

// css
require('./css/list/main.scss');


// 引入controller.js
require(['./js/list/controller'], function(Controller) {
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


        Controller.loadProfile(); //载入个人功能区

        Controller.loadList(); //载入列表区
    });

});
