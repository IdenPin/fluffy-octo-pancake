//收藏页

console.log('个人收藏');

// css
require('./css/collections/main.scss');

// 引入controller.js
require(['./js/collections/controller'], function(Controller) {
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

        Controller.loadCollections(); //载入个人收藏
    });

});
