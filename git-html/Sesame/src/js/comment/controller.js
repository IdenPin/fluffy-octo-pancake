/**
 * 评论页面的控制器
 *
 * 评论页面 类似于 知乎的问题页
 *
 * 包含
 * 主要内容     类似于 问题
 * 一级评论     类似于 回答
 * 评论回复     类似于 回复
 */
/**
 * 定义模块
 */
define(['../common/Util', '../list/changeGoodHandPic', '../list/changeStarColor'], function(U, ChangeGoodHandPic, ChangeStarColor) {

    var _webId = location.hash.substr(1); //获取webId

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
     * 载入主信息
     * 载入除了评论之外的所有信息
     * @return {[type]} [description]
     */
    var loadWebInfo = function() {
        var webId = _webId;
        if (U.isOnlineMode()) {
            if (U.isLogin()) { //判断是否已登录
                _loadWebInfoAjax(webId, JSON.parse(sessionStorage.loginSuccess).data.user_id);
            } else {
                _loadWebInfoAjax(webId, 0);
            }
        } else {
            _loadWebInfoAjax2Dom(fakeWebInfo); //=test=======================
        }
    };

    /**
     * 载入主信息的Ajax请求
     * @return {[type]} [description]
     */
    var _loadWebInfoAjax = function(webId, userId) {

        $.ajax({
            // laravel_LTS/public/api/web/{web_id}/user/{user_id}
            url: 'laravel_LTS/public/api/web/' + webId + '/user/' + userId,
            type: 'GET',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_loadWebInfoAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _loadWebInfoAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_loadWebInfoAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 载入主信息的Ajax回调方法
     * @return {[type]} [description]
     */
    var _loadWebInfoAjax2Dom = function(json) {
        if (json.status) {
            $('#bannerH1').html(json.data.title);
            $('title').html('芝麻开门-' + json.data.web_name + '-详情');

            // 处理web信息内容
            /*var htmlArr = [];
            htmlArr.push('' +
                '   <div class="left">' +
                '       <div class="logo-wrap">' +
                '           <span><a href=' + json.data.web_url + ' target="_blank"><img class="logo" src=' + json.data.web_logo + '></a></span>' +
                '       </div>' +
                '       <div class="good" web-id=' + _webId + ' like-num=' + json.data.web_num_like + ' liked=' + json.data.liked + '>');
            if (json.data.liked) { //点过赞
                htmlArr.push('' +
                    '       <img class="hand" status=1>');
            } else {
                htmlArr.push('' +
                    '       <img class="hand" status=0>');
            }
            htmlArr.push('' +
                '       <span class="number">' + json.data.web_num_like + '</span>' +
                '       </div>' +
                '   </div>' +
                '   <div class="right">');
            if (json.data.selected) { //收藏过
                htmlArr.push('' +
                    '   <img class="star" status=1 web-id=' + _webId + '>');
            } else {
                htmlArr.push('' +
                    '   <img class="star" status=0 web-id=' + _webId + '>');
            }
            htmlArr.push('' +
                '   </div>' +
                '   <div class="mid">' +
                '       <div class="title"><a href=' + json.data.web_url + ' target="_blank">' + json.data.web_name + '</a></div>');
            if (json.data.web_free) {
                htmlArr.push('' +
                    '   <span class="pay free">免费</span>');
            } else {
                htmlArr.push('' +
                    '   <span class="pay charge">收费</span>');
            }

            htmlArr.push('' +
                '       <p>' + json.data.web_intro + '</p>' +
                '   </div>');
            var htmlStr = htmlArr.join('');
            $('#web-info').html(htmlStr);*/

            // var fakeWebInfo = {
            //     status: true,
            //     data: {
            //         title: '人才招聘', //当前列表页标题
            //         web_name: '谢天笑牛逼',
            //         web_logo: 'http://ent.cntv.cn/20100722/images/1279781438641_1279781438641_r.jpg',
            //         web_intro: '土摇不爱谢天笑，注定一生没妞操。屌丝不哼陈奕迅，撸管都不会有劲。屌丝不往南方开，纸巾用完算活该。谁若不爱周杰伦，微信摇完没有人。现场不看杨臣刚，注定媳妇左手当。农金不听凤凰传，听尽神曲也枉然。少年不听小虎队，老来望逼空流泪。甜歌不听扬钰莹，床上小妞不呻吟。姑娘不知大小乔，干爹白操不给包。雷鬼不听龙神道，上床带套也会掉。帅富不听贾比宝，女神今晚不给草。屌丝不听李逼逼，注定天打又雷劈。乐经来了不痛经，二手玫瑰最省心。民歌不谈彭丽媛，没有资格当党员。英伦不听大绿洲，出门一准被人抽。文艺不聊邵小毛，女文青呀没的搞。民谣不去听贤良，老来活该站街旁。英伦不听山羊皮 迟早变成臭傻逼。草莓不看苏打绿，神器约炮永没戏。电音不听石头哥，娶到老婆是假波。',
            //         web_url: 'http://www.lagou.com/',
            //         web_free: true, //免费
            //         web_num_like: 8838, //点赞数
            //         liked: 0, //是否点过赞
            //         selected: 0, //是否收藏过
            //     }
            // };

            //使用模板引擎
            var source = $("#webInfo-area-template").html();
            var template = Handlebars.compile(source);
            json.data._webId = _webId;
            var html = template(json.data);
            $('#web-info').append(html);


            _solveLikedAndSelected(); //处理赞和收藏
            _clickLike(); //点赞监听
            _clickCollect(); //收藏监听
        } else {
            U.errorCode(json);
        }
    };

    /**
     * 处理赞和收藏
     * @return {[type]} [description]
     */
    var _solveLikedAndSelected = function() {
        ChangeGoodHandPic.beforeClickGood($('.hand[status=0]'));
        ChangeGoodHandPic.afterClickGood($('.hand[status=1]'));
        ChangeStarColor.beforeClickStar($('.star[status=0]'));
        ChangeStarColor.afterClickStar($('.star[status=1]'));
    };

    /**
     * 点赞
     * @return {[type]} [description]
     */
    var _clickLike = function() {
        $('#web-info .good').unbind('click'); //取消点击监听
        $('#web-info .good').click(function(event) {
            event.preventDefault(); //阻止默认事件
            event.stopPropagation(); //阻止事件冒泡
            U.clickLike($(this).attr('web-id'), $(this).attr('like-num'), $(this).attr('liked')); //调用点赞方法
        });
    };

    /**
     * 点收藏
     * @return {[type]} [description]
     */
    var _clickCollect = function() {
        $('#web-info .star').unbind('click');
        $('#web-info .star').click(function(event) {
            event.preventDefault(); //阻止默认事件
            event.stopPropagation(); //阻止事件冒泡
            // alert('收藏功能完善中！');
            // console.log($(this).attr('web-id'));
            // console.log($(this).attr('status'));
            U.clickSelect($(this).attr('web-id'), $(this).attr('status'));
        });
    };

    /**
     * 载入评论信息
     * @return {[type]} [description]
     */
    var loadComment = function() {
        var webId = _webId;

        if (U.isOnlineMode()) {
            _loadCommentAjax(webId);
        } else {
            _loadCommentAjax2Dom(fakeComment); //=test===============================
        }
    };

    /**
     * 载入评论的Ajax请求
     * @return {[type]} [description]
     */
    var _loadCommentAjax = function(webId) {
        $.ajax({

            url: 'laravel_LTS/public/api/comments/' + webId,
            type: 'GET',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_loadCommentAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _loadCommentAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_loadCommentAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 载入评论的Ajax回调方法
     * @return {[type]} [description]
     */
    var _loadCommentAjax2Dom = function(json) {
        if (json.status) {
            /*var webId = _webId;
            var htmlArr = [];
            for (var i = 0; i < json.data.length; i++) {

                htmlArr.push(
                    '<div class="card">' +
                    '<div class="comment-person">' +
                    '    <img src=' + json.data[i].user_avatar + '>' +
                    '    <span class="name">' + json.data[i].user_name + '</span>' +
                    '    <span class="info">(' + json.data[i].user_intro + ')</span>' +
                    '    <span class="date">' + json.data[i].com_date + '</span>' +
                    '    <span class="floor">' + json.data[i].floor + 'F</span>' +
                    '</div>' +
                    '<div class="first-comment">' +
                    '    <p>' + json.data[i].com_content + '</p>' +
                    '    <div to-user-id=' + json.data[i].user_id + ' to-user-name=' + json.data[i].user_name + ' web-id=' + webId + ' floor=' + json.data[i].floor + ' class="reply">回复</div>' +
                    '</div>' +
                    '<div class="other-comment">' +
                    '    <ul floor=' + json.data[i].floor + '>');

                for (var j = 0; j < json.data[i].child.length; j++) {
                    htmlArr.push(
                        '    <li>' +
                        '        <p>' + json.data[i].child[j].user_name + '：' +
                        '            <span class="at">@' + json.data[i].child[j].to_user_name + ' </span>' + json.data[i].child[j].com_content + '</p>');

                    //不能评论自己
                    //目前可以评论自己
                    // if (json.data[i].child[j].user_id !== JSON.parse(sessionStorage.loginSuccess).data.user_id) {
                    htmlArr.push(
                        '    <div web-id=' + webId + ' to-user-id=' + json.data[i].child[j].user_id + ' to-user-name=' + json.data[i].child[j].user_name + ' floor=' + json.data[i].floor + ' class="reply">回复</div>' +
                        '</li>');
                    // }
                }

                htmlArr.push(
                    '    </ul>' +
                    '</div>' +
                    '<div class="comment small-comment" floor=' + json.data[i].floor + '>' +
                    '    <textarea name="name" rows="8" cols="40"></textarea>' +
                    '    <div class="comment-btn-area">' +
                    '        <button class="ok" type="button" name="button">确认回复</button>' +
                    '        <button class="cancel" type="button" name="button">取消回复</button>' +
                    '    </div>' +
                    '</div>' +
                    '</div>'
                );
            }
            var htmlStr = htmlArr.join('');
            $('#comment-detail').html(htmlStr);*/

            //使用模板引擎
            var source = $("#comment-detail-area-template").html();
            // console.log(source);
            var template = Handlebars.compile(source);
            // console.log(template);
            //把后台没有传输的webId附到json中
            for (var i = 0; i < json.data.length; i++) {
                json.data[i]._webId = _webId;
                for (var j = 0; j < json.data[i].child.length; j++) {
                    json.data[i].child[j]._webId = _webId;
                    json.data[i].child[j].floor = json.data[i].floor;
                }
            }
            var html = template(json);
            // console.log(html);
            $('#comment-detail').html(html);


            _clickReply(); //监听点击回复按钮
        } else {
            U.errorCode(json);
        }
    };

    /**
     * 点击回复按钮事件
     *
     * 检查登录，显示回复框，监听发布按钮
     * @return {[type]} [description]
     */
    var _clickReply = function() {

        $('.reply').unbind('click');
        $('.reply').click(function(event) {
            event.preventDefault();
            if (U.isLogin()) { //已登录

                var f = $(this).attr('floor');
                var toUserId = $(this).attr('to-user-id');
                var toUserName = $(this).attr('to-user-name');

                //展示评论框
                $('.small-comment[floor=' + f + ']').fadeIn('400'); //评论框展示出来
                //显示回复谁
                // $('.small-comment[floor=' + f + '] textarea').val('回复@' + $(this).attr('to-user-name') + '：');
                $('.small-comment[floor=' + f + '] textarea').attr('placeholder', '回复@' + $(this).attr('to-user-name') + '：');

                //监听取消回复按钮
                $('.small-comment[floor=' + f + '] .cancel').unbind('click');
                $('.small-comment[floor=' + f + '] .cancel').click(function(event) {
                    event.preventDefault();
                    $('.small-comment[floor=' + f + ']').fadeOut('400'); //评论框消失
                });

                //监听确认回复按钮
                $('.small-comment[floor=' + f + '] .ok').unbind('click');
                $('.small-comment[floor=' + f + '] .ok').click(function(event) {
                    event.preventDefault();

                    var userId = JSON.parse(sessionStorage.loginSuccess).data.user_id;
                    var webId = _webId;
                    var content = $('.small-comment[floor=' + f + '] textarea').val();

                    //之前评论是有谁回复谁的。现在取消。
                    /*var start = content.indexOf('：') + 1;
                    if (start === -1) {
                        content = content;
                    } else {
                        content = content.substr(start);
                    }*/
                    console.log(webId, f, userId, toUserId);
                    console.log(content);

                    if (content === '') {
                        alert('不能发表空白回复！请输入内容。');
                    } else {
                        if (U.isOnlineMode()) {
                            _replyCommentAjax(webId, f, userId, toUserId, toUserName, content); //回复评论Ajax请求
                        } else {
                            _replyCommentAjax2Dom(webId, fakeCommentSuccess, f, userId, toUserId, toUserName, content); //回复评论Ajax请求的回调方法========================================
                        }
                    }
                });
            } else {
                var c = confirm('尚未登录，是否前往登录页？');
                if (c) {
                    location.href = 'login.html';
                }
            }
        });
    };

    /**
     * 回复评论Ajax请求
     * @param  {Number} webId    webId
     * @param  {Number} f        楼层
     * @param  {Number} userId   当前用户id
     * @param  {Number} toUserId 被评论用户id
     * @param  {String} content  评论内容
     * @return {[type]}          [description]
     */
    var _replyCommentAjax = function(webId, f, userId, toUserId, toUserName, content) {
        $.ajax({
            // laravel_LTS/public/api/comments/{web_id}
            url: 'laravel_LTS/public/api/comments/' + webId,
            type: 'POST',
            dataType: 'json',
            data: {
                com_content: content,
                floor: f,
                to_user_id: toUserId,
                user_id: userId
            },
            success: function(json) {
                console.log("_replyCommentAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _replyCommentAjax2Dom(webId, jsonData, f, userId, toUserId, toUserName, content); //ajax回调

            },
            error: function() {
                console.error("_replyCommentAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    var _replyCommentAjax2Dom = function(webId, json, f, userId, toUserId, toUserName, content) {
        if (json.status) {
            alert('回复成功！');
            var userName = JSON.parse(sessionStorage.loginSuccess).data.user_name;

            $('.other-comment ul[floor=' + f + ']').append(
                '    <li>' +
                '        <p>' + userName + '：' +
                '            <span class="at">@' + toUserName + ' </span>' + content + '</p>' +
                '        <div web-id=' + webId + ' to-user-id=' + userId + ' to-user-name=' + userName + ' floor=' + f + ' class="reply">回复</div>' + //可以回复自己
                '    </li>');

            _clickReply(); //重新监听回复按钮
            $('.small-comment[floor=' + f + ']').fadeOut('400'); //评论框消失
            $('.small-comment[floor=' + f + '] textarea').val(''); //清空回复框
        } else {
            U.errorCode(json);
        }
    };

    /**
     * 第一次评论
     * 与回复分开
     * 这个操作应该局部刷新页面
     * @return {[type]} [description]
     */
    var firstComment = function() {
        $('#first-comment-btn').unbind('click');
        $('#first-comment-btn').click(function(event) {
            event.preventDefault();
            if (U.isLogin()) { //已登录
                var webId = _webId;
                var userId = JSON.parse(sessionStorage.loginSuccess).data.user_id;
                var content = $('#first-comment-area textarea').val();

                if (content === '') {
                    alert('不能发表空白评论！请输入内容。');
                } else {
                    if (U.isOnlineMode()) {
                        _firstCommentAjax(webId, userId, content);
                    } else {
                        _firstCommentAjax2Dom(fakeCommentSuccess); //==================================
                    }
                }
            } else { //未登录
                var c = confirm('尚未登录，是否前往登录页？');
                if (c) {
                    location.href = 'login.html';
                }
            }
        });
    };

    /**
     * 大评论Ajax请求
     * @param  {Number} webId
     * @param  {Number} userId  当前登录的用户id
     * @param  {String} content 评论内容
     * @return {[type]}         [description]
     */
    var _firstCommentAjax = function(webId, userId, content) {
        $.ajax({
            // laravel_LTS/public/api/comments/{web_id}
            url: 'laravel_LTS/public/api/comments/' + webId,
            type: 'POST',
            dataType: 'json',
            data: {
                com_content: content,
                floor: 0,
                to_user_id: 0,
                user_id: userId
            },
            success: function(json) {
                console.log("_firstCommentAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _firstCommentAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_firstCommentAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 大评论的回调函数
     * @return {[type]} [description]
     */
    var _firstCommentAjax2Dom = function(json) {
        if (json.status) {
            alert('评论成功！');
            $('#first-comment-area textarea').val(''); //内容置空
            loadComment(); //重新载入下面的评论列表
        } else {
            U.errorCode(json);
        }
    };

    var fakeCommentSuccess = {
        status: true
    };


    var fakeComment = {
        status:true,
        data:[]
    };
    var fakeComment2 = {
        status: true,
        data: [{
            floor: 3, //楼层，倒序
            user_id: 6,
            user_avatar: 'http://ent.cntv.cn/20100722/images/1279781438641_1279781438641_r.jpg', //用户头像
            user_name: 'Gaohaoyang', //用户名
            user_intro: '为了诗和远方', //用户简介
            com_id: 3, //评论id
            com_date: '2015/12/22 20:12', //评论时间
            com_content: '土摇不爱谢天笑，注定一生没妞操。屌丝不哼陈奕迅，撸管都不会有劲。屌丝不往南方开，纸巾用完算活该。谁若不爱周杰伦，微信摇完没有人。现场不看杨臣刚，注定媳妇左手当。农金不听凤凰传，听尽神曲也枉然。少年不听小虎队，老来望逼空流泪。甜歌不听扬钰莹，床上小妞不呻吟。姑娘不知大小乔，干爹白操不给包。雷鬼不听龙神道，上床带套也会掉。帅富不听贾比宝，女神今晚不给草。屌丝不听李逼逼，注定天打又雷劈。乐经来了不痛经，二手玫瑰最省心。民歌不谈彭丽媛，没有资格当党员。英伦不听大绿洲，出门一准被人抽。文艺不聊邵小毛，女文青呀没的搞。民谣不去听贤良，老来活该站街旁。英伦不听山羊皮，迟早变成臭傻逼。草莓不看苏打绿，神器约炮永没戏。电音不听石头哥，娶到老婆是假波。', //评论内容
            child: []
        }, {
            floor: 2, //楼层，倒序
            user_id: 6,
            user_avatar: 'http://ent.cntv.cn/20100722/images/1279781438641_1279781438641_r.jpg', //用户头像
            user_name: 'Gaohaoyang', //用户名
            user_intro: '为了诗和远方', //用户简介
            com_id: 2, //评论id
            com_date: '2015/12/22 20:12', //评论时间
            com_content: '土摇不爱谢天笑，注定一生没妞操。屌丝不哼陈奕迅，撸管都不会有劲。屌丝不往南方开，纸巾用完算活该。谁若不爱周杰伦，微信摇完没有人。现场不看杨臣刚，注定媳妇左手当。农金不听凤凰传，听尽神曲也枉然。少年不听小虎队，老来望逼空流泪。甜歌不听扬钰莹，床上小妞不呻吟。姑娘不知大小乔，干爹白操不给包。雷鬼不听龙神道，上床带套也会掉。帅富不听贾比宝，女神今晚不给草。屌丝不听李逼逼，注定天打又雷劈。乐经来了不痛经，二手玫瑰最省心。民歌不谈彭丽媛，没有资格当党员。英伦不听大绿洲，出门一准被人抽。文艺不聊邵小毛，女文青呀没的搞。民谣不去听贤良，老来活该站街旁。英伦不听山羊皮，迟早变成臭傻逼。草莓不看苏打绿，神器约炮永没戏。电音不听石头哥，娶到老婆是假波。', //评论内容
            child: [{
                com_id: 20, //评论id
                user_id: 1, //评论人ID
                user_name: '习近平', //评论人名字
                to_user_id: 2, //被评论人ID
                to_user_name: 'Gaohaoyang', //被评论人名字
                com_content: '真牛逼！说的好，选拔你为下任主席！', //评论内容
                com_date: '2015/12/22 20:12'
            }, {
                com_id: 21, //评论id
                user_id: 1, //评论人ID
                user_name: '习近平', //评论人名字
                to_user_id: 2, //被评论人ID
                to_user_name: 'Gaohaoyang', //被评论人名字
                com_content: '真牛逼！说的好，选拔你为下任主席！', //评论内容
                com_date: '2015/12/22 20:12'
            }, {
                com_id: 22,
                user_id: 2,
                user_name: 'Gaohaoyang',
                to_user_id: 1,
                to_user_name: '习近平',
                com_content: '谢谢习大大夸奖啊！您也不用激动的发两遍吧。',
                com_date: '2015/12/22 22:09'
            }, {
                com_id: 24,
                user_id: 521,
                user_name: '川辙',
                to_user_id: 1,
                to_user_name: '习近平',
                com_content: '你是假的习近平吧？',
                com_date: '2015/12/22 22:09'
            }]
        }, {
            floor: 1, //楼层
            user_id: 6,
            user_avatar: 'http://ent.cntv.cn/20100722/images/1279781438641_1279781438641_r.jpg', //用户头像
            user_name: 'Gaohaoyang0', //用户名
            user_intro: '为了诗和远方', //用户简介
            com_id: 1, //评论id
            com_date: '2015/12/22 20:12', //评论时间
            com_content: '土摇不爱谢天笑，注定一生没妞操。屌丝不哼陈奕迅，撸管都不会有劲。屌丝不往南方开，纸巾用完算活该。谁若不爱周杰伦，微信摇完没有人。现场不看杨臣刚，注定媳妇左手当。农金不听凤凰传，听尽神曲也枉然。少年不听小虎队，老来望逼空流泪。甜歌不听扬钰莹，床上小妞不呻吟。姑娘不知大小乔，干爹白操不给包。雷鬼不听龙神道，上床带套也会掉。帅富不听贾比宝，女神今晚不给草。屌丝不听李逼逼，注定天打又雷劈。乐经来了不痛经，二手玫瑰最省心。民歌不谈彭丽媛，没有资格当党员。英伦不听大绿洲，出门一准被人抽。文艺不聊邵小毛，女文青呀没的搞。民谣不去听贤良，老来活该站街旁。英伦不听山羊皮，迟早变成臭傻逼。草莓不看苏打绿，神器约炮永没戏。电音不听石头哥，娶到老婆是假波。', //评论内容
            child: [{
                com_id: '20', //评论id
                user_id: 1, //评论人ID
                user_name: '习近平', //评论人名字
                to_user_id: 2, //被评论人ID
                to_user_name: 'Gaohaoyang', //被评论人名字
                com_content: '真牛逼！说的好，选拔你为下任主席！', //评论内容
                com_date: '2015/12/22 20:12'
            }, {
                com_id: '20', //评论id
                user_id: 1, //评论人ID
                user_name: '习近平', //评论人名字
                to_user_id: 2, //被评论人ID
                to_user_name: 'Gaohaoyang', //被评论人名字
                com_content: '真牛逼！说的好，选拔你为下任主席！', //评论内容
                com_date: '2015/12/22 20:12'
            }]
        }]
    };

    var fakeWebInfo = {
        status: true,
        data: {
            title: '人才招聘', //当前列表页标题
            web_name: '谢天笑牛逼',
            web_logo: 'http://ent.cntv.cn/20100722/images/1279781438641_1279781438641_r.jpg',
            web_intro: '土摇不爱谢天笑，注定一生没妞操。屌丝不哼陈奕迅，撸管都不会有劲。屌丝不往南方开，纸巾用完算活该。谁若不爱周杰伦，微信摇完没有人。现场不看杨臣刚，注定媳妇左手当。农金不听凤凰传，听尽神曲也枉然。少年不听小虎队，老来望逼空流泪。甜歌不听扬钰莹，床上小妞不呻吟。姑娘不知大小乔，干爹白操不给包。雷鬼不听龙神道，上床带套也会掉。帅富不听贾比宝，女神今晚不给草。屌丝不听李逼逼，注定天打又雷劈。乐经来了不痛经，二手玫瑰最省心。民歌不谈彭丽媛，没有资格当党员。英伦不听大绿洲，出门一准被人抽。文艺不聊邵小毛，女文青呀没的搞。民谣不去听贤良，老来活该站街旁。英伦不听山羊皮 迟早变成臭傻逼。草莓不看苏打绿，神器约炮永没戏。电音不听石头哥，娶到老婆是假波。',
            web_url: 'http://www.lagou.com/',
            web_free: true, //免费
            web_num_like: 8838, //点赞数
            liked: 0, //是否点过赞
            selected: 0, //是否收藏过
        }
    };

    return {
        loadProfile: loadProfile, //载入个人功能信息区
        loadWebInfo: loadWebInfo, //载入主信息
        loadComment: loadComment, //载入评论信息
        firstComment: firstComment //中间的大评论框
    };
});
