/**
 * Controller 模块
 * 操作基本的Dom
 */

// handlebars
// require('handlebars');
//  var Handlebars=require('handlebars/runtime');
// console.dir(Handlebars);
// console.log(Handlebars.compile);
/**
 * 定义模块
 */
define(['../common/Util'], function(U) {

    /**
     * 载入个人功能信息区
     * @return {[type]} [description]
     */
    var loadProfile = function() {
        /**
         * 载入右上角头像
         */
        U.loadAvatar();
        // 此处可能有模块冲突，将载入头像直接写入profile中心里
        // 此处待定，可能是正常的

        /**
         * 个人中心功能区
         */
        U.profileFunction();
        _loadBanner();
    };

    /**
     * load Banner background image
     * @return {[type]} [description]
     */
    var _loadBanner = function() {
        var img = require("../../image/indexBanner.jpg");
        $('.banner').css('background', 'url(' + img + ')');
    };

    /**
     * 载入卡片区内容
     * @return {[type]} [description]
     */
    var loadCard = function() {
        if (U.isOnlineMode()) {
            _loadCardAjax(); //载入卡片区域的Ajax请求
        } else {
            _loadCardAjax2Dom(fakeCard); //===================================
        }

    };

    /**
     * 载入卡片区域的Ajax请求
     * @return {[type]} [description]
     */
    var _loadCardAjax = function() {
        $.ajax({

            url: 'laravel_LTS/public/api',
            type: 'POST',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_loadCardAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _loadCardAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_loadCardAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 载入卡片的Ajax回调函数
     * @param  {Object} json 回调数据
     * @return {[type]}      [description]
     */
    var _loadCardAjax2Dom = function(json) {
        if (json.status) { //载入json成功，操作dom

            //传统的使用js拼接html字符串的方式
            /*var htmlArr = [];
            for (var i = 0; i < json.data.length; i++) {
                htmlArr.push('' +
                    '<div class="card" cate-id=' + json.data[i].cate_id + '>' +
                    '   <div class="pic">' +
                    '       <div class="back pic" style="background-image:url(' + json.data[i].cate_url + ')"></div>' +
                    '   </div>' +
                    '   <div class="mask pic"></div>' +
                    '   <div class="title">' + json.data[i].cate_name + '</div>' +
                    '</div>');
            }
            var htmlStr = htmlArr.join('');
            $('#cardWrap').html(htmlStr);*/

            //使用模板引擎
            var source = $("#card-area-template").html();
            // console.log(source);
            var template = Handlebars.compile(source);
            // console.log(template);
            var html = template(json);
            // console.log(html);
            $('#cardWrap').append(html);

            _clickCard(); //添加对卡片的点击事件监听

        } else {
            U.errorCode(json);
        }
    };

    /**
     * 点击卡片监听事件
     * @return {[type]} [description]
     */
    var _clickCard = function() {
        $('.card').unbind('click'); //先移除监听
        $('.card').click(function(event) { //点击事件
            event.preventDefault();

            //将分类id存入sessionStorage
            //这种做法不好，用户在刷新页面的时候会跳到当前sessionStorage存储的id中去
            // sessionStorage.cateId = $(this).attr('cate-id');
            // 好的解决方式是放到hash中
            window.open('list.html#' + $(this).attr('cate-id'));
        });
    };



    var fakeCard = {
        status: true,
        data: [{
            cate_id: 1,
            cate_name: '设计',
            cate_url: 'http://www.th7.cn/d/file/p/2014/11/07/0c7f9884392f522f11f410718d0e8045.png'
        }, {
            cate_id: 2,
            cate_name: '招聘',
            cate_url: 'http://yuncode.net/upload/image/201301/30/20130130213506_90303.jpg'
        }, {
            cate_id: 3,
            cate_name: '玩',
            cate_url: 'http://yuncode.net/upload/image/201301/30/20130130213506_90303.jpg'
        }, {
            cate_id: 4,
            cate_name: '做饭',
            cate_url: 'http://yuncode.net/upload/image/201301/30/20130130213506_90303.jpg'
        }, {
            cate_id: 5,
            cate_name: '手工',
            cate_url: 'http://yuncode.net/upload/image/201301/30/20130130213506_90303.jpg'
        }, {
            cate_id: 6,
            cate_name: '睡觉',
            cate_url: 'http://yuncode.net/upload/image/201301/30/20130130213506_90303.jpg'
        }]
    };

    return {
        loadProfile: loadProfile, //载入个人功能信息区
        loadCard: loadCard, //载入卡片区域
    };
});
