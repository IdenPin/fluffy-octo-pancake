/**
 * 个人收藏模块
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

        /**
         * 个人中心功能区
         */
        U.profileFunction();
    };

    /**
     * 载入个人收藏
     * @return {[type]} [description]
     */
    var loadCollections = function() {
        console.log('loadCollections');
        if (U.isLogin()) {
            if (U.isOnlineMode()) {
                _loadCollectionsAjax();
            } else {
                _loadCollectionsAjax2Dom(fakeCollections2);
            }
        } else {
            alert('您尚未登录，请前往登录页！');
            location.href = 'login.html';
        }
    };

    var _loadCollectionsAjax = function() {
        $.ajax({
            // laravel_LTS/public/api/favorite/user/{user_id}
            url: 'laravel_LTS/public/api/favorite/user/' + JSON.parse(sessionStorage.loginSuccess).data.user_id,
            // url:'getCollections',
            type: 'GET',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_loadCollectionsAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _loadCollectionsAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_loadCollectionsAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 载入个人收藏的回调信息
     * @param  {Object} json 回调参数
     * @return {[type]}      [description]
     */
    var _loadCollectionsAjax2Dom = function(json) {
        if (json.status) {

            if (json.data.length === 0) {
                $('#collections-wrap').html('尚未收藏过任何内容');
            } else {
                // 处理列表区
                /*var htmlArr = [];
                for (var i = 0; i < json.data.length; i++) {
                    // <div class="item">
                    //     <a target="_blank" href="comment.html#1">拉勾网</a>
                    // </div>
                    htmlArr.push('' +
                        '<div class="item"  >' +
                        '    <a href="comment.html#' + json.data[i].web_id + '">' + json.data[i].web_name + '</a>' +
                        '</div>');
                }
                var htmlStr = htmlArr.join('');
                $('#collections-wrap').html(htmlStr);*/

                //使用模板引擎
                var source = $("#collections-area-template").html();
                // console.log(source);
                var template = Handlebars.compile(source);
                // console.log(template);
                var html = template(json);
                // console.log(html);
                $('#collections-wrap').append(html);
            }
        } else {
            U.errorCode(json);
        }
    };

    //==============================================
    //fake data
    var fakeCollections = {
        status:true,
        data:[]
    };
    var fakeCollections2 = {
        status: true,
        data: [{
            web_name: 'HyG',
            web_id: 1
        }, {
            web_name: 'HyG2',
            web_id: 2
        }, {
            web_name: 'HyG3',
            web_id: 3
        }, {
            web_name: 'HyG4',
            web_id: 4
        }]
    };

    return {
        loadProfile: loadProfile,
        loadCollections: loadCollections, //载入个人收藏
    };
});
