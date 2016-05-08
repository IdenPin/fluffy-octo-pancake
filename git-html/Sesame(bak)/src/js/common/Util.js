/**
 * 公共工具
 * @param  {[type]} ) {};         [description]
 * @return {[type]}   [description]
 */
define(['./footerPic','./headerShare', './headerCate', './setAvatar', './modal', './fileInputPreview', '../list/changeGoodHandPic', '../list/changeStarColor'], function(FooterPic,HeaderShare, HeaderCate, SetAvatar, Modal, FileInputPreview, ChangeGoodHandPic, ChangeStarColor) {

    // console.log('Util module');

    /**
     * 是否是上线环境
     * @return {Boolean}
     */
    var isOnlineMode = function() {
        // console.log('isOnlineMode');
        return true; //上线环境
        // return false; //测试环境
    };

    /**
     * 检查数据
     * @param {String/JSON} res 传入的字符串或JSON
     * @return {JSON} 返回的JSON
     */
    var checkData = function(res) {
        var resJson = typeof res == 'string' ? JSON.parse(res) : res;
        if (!resJson.status) {
            console.log('服务端报错');
            console.log('error code ' + resJson.errorCode);
        }
        return resJson;
    };

    /**
     * 错误码提示
     * @param  {[type]} json [description]
     * @return {[type]}      [description]
     */
    var errorCode = function(json) {
        switch (json.errorCode) {
            case 1000:
                alert('未知错误！');
                break;
            case 1001:
                alert('参数不全！');
                break;
            case 1002:

                sessionStorage.clear(); //清除本地存储的信息
                alert('尚未登录！');
                location.href = 'login.html';

                break;
            case 1003:
                alert('模块不存在！');
                break;
            case 1004:
                alert('没有权限！');
                break;
            case 1005:
                alert('json解析错误！');
                break;
            case 1006:
                alert('无此接口！');
                break;
            case 1007:
                alert('文件操作失败！');
                break;
            case 1008:
                alert('上传文件为空！');
                break;
            case 1010:
                alert('数据库错误！');
                break;
            case 1011:
                alert('密码错误！');
                break;
            case 1012:
                alert('用户不存在！');
                break;
            case 1030:
                alert('用户名已存在！');
                break;
            case 1031:
                alert('短信发送失败！');
                break;
            case 1032:
                alert('手机号已存在！');
                break;
            case 1033:
                alert('Email已存在！');
                break;
            case 1033:
                alert('验证码错误！');
                break;
            case 1041:
                alert('提货码错误！');
                break;
            case 1051:
                alert('商品不存在！');
                break;
            case 1052:
                alert('图片不存在！');
                break;
            case 1053:
                alert('类别不存在！');
                break;
            case 1054:
                alert('推广不存在！');
                break;
            case 1054:
                alert('微信下单失败！');
                break;
            default:
                alert('出了点小错啊！');
                break;
        }
    };

    var ajaxFailed = function() {
        alert('网络请求失败……');
    };


    /**
     * 得到文件名
     * @param  {[type]} o [description]
     * @return {[type]}   [description]
     */
    var getFileName = function(o) {
        var pos = o.lastIndexOf("\\");
        return o.substring(pos + 1);
    };


    /**
     * 判断是否登录成功
     * @return {Boolean} [description]
     */
    var isLogin = function() {
        // console.log('login fun');
        // console.log(sessionStorage.loginSuccess);
        if (sessionStorage.loginSuccess === undefined || sessionStorage.loginSuccess === '' || JSON.parse(sessionStorage.loginSuccess).status === false) {
            return false;
        } else {
            return true;
        }
    };

    /**
     * 载入右上角头像
     * @return {[type]} [description]
     */
    var loadAvatar = function() {
        if (isLogin()) { //登录成功
            var avatar = JSON.parse(sessionStorage.loginSuccess).data.user_avatar;
            if (avatar === '' || avatar === undefined) {
                SetAvatar.setUserAvatar(); //展示默认头像
            } else {
                SetAvatar.setUserAvatar(avatar); //展示登录后的头像
            }
        } else { //未登录
            SetAvatar.setUserAvatar(); //展示默认头像
        }

        //设置大logo
        $('#sesameLogo').attr('src', require('../../image/logo.png'));

        FooterPic.loadPics();//加载footer上的图片
    };

    /**
     * 个人中心功能区
     *
     * 目前包括：个人中心，个人收藏，分享网站，退出登录
     *
     * @param {Object} Object json对象
     * @return {[type]} [description]
     */
    var profileFunction = function(Object) {

        HeaderCate.cate(); //面包图，汉堡图，分类图
        HeaderShare.share(); //分享按钮


        //面包下拉框内容
        if (isOnlineMode()) {
            _headerCate(); //header上的分类导航
        } else {
            _headerCate2Dom(fakeCate);
        }

        //个人中心
        $('#profileLi').unbind('click');
        $('#profileLi').click(function(event) {
            event.preventDefault();
            if (isLogin()) { //已登录
                location.href = 'profile.html';
            } else { //未登录
                var c = confirm('尚未登录，是否前往登录页？');
                if (c) {
                    location.href = 'login.html';
                }
            }
        });

        //个人收藏
        $('#collectionsLi').unbind('click');
        $('#collectionsLi').click(function(event) {
            event.preventDefault();
            if (isLogin()) { //已登录
                location.href = 'collections.html';
            } else { //未登录
                var c = confirm('尚未登录，是否前往登录页？');
                if (c) {
                    location.href = 'login.html';
                }
            }
        });

        //个人贡献
        $('#contributionLi').unbind('click');
        $('#contributionLi').click(function(event) {
            event.preventDefault();
            if (isLogin()) { //已登录
                location.href = 'contributions.html';
            } else { //未登录
                var c = confirm('尚未登录，是否前往登录页？');
                if (c) {
                    location.href = 'login.html';
                }
            }
        });

        //分享网站点击事件监听
        $('#shareSiteLi').unbind('click');
        $('#shareSiteLi').click(function(event) {
            event.preventDefault();

            if (isLogin()) { //已登录

                //展示模态框
                Modal.show('#shareSiteModal');
                //设置分类下拉框的内容
                // GetCate.setSelectInner();
                _setSelectInner();
                //加载图片上传预览功能
                FileInputPreview.imgPreview($('#imgInput'), $('#previewArea'));

                _addSiteAjax(); //添加站点的Ajax请求

            } else { //未登录
                var c = confirm('尚未登录，是否前往登录页？');
                if (c) {
                    location.href = 'login.html';
                }
            }
        });



        //未登录时，头像下来框
        if (!isLogin()) {
            $('#logoutLi>a').html('前往登录');
            $('#logoutLi').unbind('click');
            $('#logoutLi').click(function(event) {
                event.preventDefault();
                location.href = 'login.html';
            });
        } else {
            //登出
            $('#logoutLi').unbind('click');
            $('#logoutLi').click(function(event) {
                event.preventDefault();
                // if (isLogin()) { //已登录
                var b = confirm('确认退出登录？');
                if (b) {
                    if (isOnlineMode()) {
                        _logoutAjax(); //登出
                    } else {
                        _logoutAjax2Dom(fakelogout); //=============================
                    }
                }

                // } else { //未登录
                //     var c = confirm('尚未登录，是否前往登录页？');
                //     if (c) {
                //         location.href = 'login.html';
                //     }
                // }
            });
        }
    };

    /**
     * header上的分类导航
     * @return {[type]} [description]
     */
    var _headerCate = function() {

        $.ajax({
            url: 'laravel_LTS/public/api',
            type: 'POST',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_headerCate ajax success");

                var jsonData = checkData(json); //检查json
                _headerCate2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_headerCate ajax failed");
                ajaxFailed();
            }
        });
    };
    /**
     * Ajax回调
     * @return {[type]} [description]
     */
    var _headerCate2Dom = function(json) {
        if (json.status) {

            //使用模板引擎
            var source = $("#cate-template").html();
            var template = Handlebars.compile(source);
            var html = template(json);
            $('#nav-cate-list').append(html);

            $('#nav-cate-list>a').click(function(event) {
                event.preventDefault();

                var urlString = location.href;
                var url = urlString.split("#")[0];

                location.href = $(this).attr('href');

                //如果是列表页，reload
                if (url.indexOf('list.html') !== -1) {
                    location.reload();
                }
            });




        } else {
            errorCode(json);
        }
    };

    var fakelogout = {
        status: true
    };

    /**
     * 登出
     * @return {[type]} [description]
     */
    var _logoutAjax = function() {
        $.ajax({

            url: 'laravel_LTS/public/api/auth/logout',
            type: 'GET',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_logoutAjax ajax success");

                var jsonData = checkData(json); //检查json
                _logoutAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_logoutAjax ajax failed");
                ajaxFailed();
            }
        });
    };

    /**
     * 登出的回调函数
     * @param  {Object} json 回调数据
     * @return {[type]}      [description]
     */
    var _logoutAjax2Dom = function(json) {
        if (json.status) { //登出成功
            sessionStorage.clear();
            location.reload();
        } else {
            errorCode(json);
        }
    };

    //设置下拉列表的内容
    /**
     * [function description]
     * @param  {Number} num 默认选值(可选)
     * @return {[type]}     [description]
     */
    var _setSelectInner = function(num) {
        if (isOnlineMode()) {
            _getCateAjax(num); //获取分类的Ajax
        } else {
            _getCateAjax2Dom(fakeCard, num); //==test=========================
        }
    };

    /**
     * 获取分类的Ajax
     * @return {[type]} [description]
     */
    var _getCateAjax = function(num) {
        $.ajax({

            url: 'laravel_LTS/public/api',
            type: 'POST',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_getCateAjax ajax success");

                var jsonData = checkData(json); //检查json
                _getCateAjax2Dom(jsonData, num); //ajax回调

            },
            error: function() {
                console.error("_getCateAjax ajax failed");
                ajaxFailed();
            }
        });
    };

    /**
     * 获取分类后的回调
     * 主要把内容添加到select中
     * @param  {Object} json 回调数据
     * @return {[type]}      [description]
     */
    var _getCateAjax2Dom = function(json, num) {
        if (json.status) { //载入json成功，操作dom
            var htmlArr = [];
            htmlArr.push('<option selected value="-1">请选择</option>');
            for (var i = 0; i < json.data.length; i++) {
                htmlArr.push('' +
                    '<option value=' + json.data[i].cate_id + '>' + json.data[i].cate_name + '</option>');
            }
            var htmlStr = htmlArr.join('');
            $('#webCate').html(htmlStr);

            // console.log('11111111111111111111111111111111');
            // console.log(num);
            if (num !== undefined) { //给了默认值
                // console.log(num);
                $('#webCate').val(num);
            }

        } else {
            errorCode(json);
        }
    };

    /**
     * 分享网站
     * @return {[type]} [description]
     */
    // var _shareSite = function() {
    //     _addSiteAjax(); //添加站点的Ajax请求
    // };

    /**
     * 添加站点的Ajax
     */
    var _addSiteAjax = function() {

        $("#shareSiteModalForm").submit(function(e) {
            e.preventDefault(); //Prevent Default action.
            // e.unbind();
            // console.log('shareSiteModalForm');

            var name = $('#webName').val().trim(); //网站名称

            var free = $('input[name=web_free]:checked').val(); //是否免费

            var cateId = $('#webCate').val(); //分类

            var url = $('#webUrl').val().trim(); //url

            var intro = $('#webIntro').val().trim(); //简介

            var logo = $('#imgInput').val(); //图片

            // console.log(name, free, cateId, url, intro, logo);
            // console.log(typeof Boolean(free), Boolean(free));
            // console.log( free==true);

            if (name === '') {
                alert('请输入网站名称！');
            } else if (free === undefined) {
                alert('请选择是否免费！');
            } else if (cateId === '-1') {
                alert('请选择分类！');
            } else if (url === '') {
                alert('请输入网站链接！');
                // }else if(intro===''){
                //     alert('请输入网站描述！');
            } else if (logo === '') {
                alert('请上传网站logo！');
            } else {
                if (isOnlineMode()) {
                    // console.log('ajax');
                    var formObj = $(this);
                    var formURL = formObj.attr("action");
                    var formData = new FormData(this);
                    console.log(formData);
                    $.ajax({
                        url: formURL,
                        type: 'POST',
                        data: formData,
                        mimeType: "multipart/form-data",
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function(json) {
                            console.log("_addSiteAjax ajax success");

                            var jsonData = checkData(json); //检查json
                            _addSiteAjax2Dom(jsonData); //ajax回调
                        },
                        error: function() {
                            console.error("_addSiteAjax ajax failed");
                            ajaxFailed();
                        }
                    });
                } else {
                    // console.log('benditest');
                    _addSiteAjax2Dom(fakeAdd); //==========================================
                }
            }



        });
    };

    /**
     * 添加站点的Ajax请求
     * @param {Object} json 回调数据
     */
    var _addSiteAjax2Dom = function(json) {
        if (json.status) {
            alert('添加成功！');
            Modal.hide('#shareSiteModal'); //关闭模态框
            location.reload(); //刷新页面
        } else {
            errorCode(json);
        }
    };

    /**
     * 点赞
     * @param  {Number} webId
     * @param  {Number} num   点赞数
     * @param  {Boolean} liked 是否点过赞
     * @return {[type]}       [description]
     */
    var clickLike = function(webId, num, liked) {
        // console.log(webId, num, liked);
        // console.log(typeof liked);
        //判断用户是否登录
        if (isLogin()) {
            var userId = JSON.parse(sessionStorage.loginSuccess).data.user_id;
            if (isOnlineMode()) { //线上模式
                _clickLikeAjax(webId, userId, num, liked); //点赞的 Ajax 请求
            } else { //本地测试
                _clickLikeAjax2Dom(fakeClickLike, webId, num, liked); //---------------------------test-
            }
        } else {
            var c = confirm('尚未登录，无法点赞，是否前往登录页？');
            if (c) {
                location.href = 'login.html';
            }
        }
    };

    /**
     * 点赞的 Ajax 请求
     * @param  {Number} webId  站点ID
     * @param  {Number} userId 用户ID
     * @return {[type]}        [description]
     */
    var _clickLikeAjax = function(webId, userId, num, liked) {

        $.ajax({
            url: 'laravel_LTS/public/api/like',
            type: 'POST',
            dataType: 'json',
            data: {
                user_id: userId,
                web_id: webId
            },
            success: function(json) {
                console.log("_clickLikeAjax ajax success");

                var jsonData = checkData(json); //检查json
                _clickLikeAjax2Dom(jsonData, webId, num, liked); //ajax回调
            },
            error: function() {
                console.error("_clickLikeAjax ajax failed");
                ajaxFailed();
            }
        });
    };

    /**
     * 点赞成功的 Ajax 回调
     * @param  {[type]} json [description]
     * @return {[type]}      [description]
     */
    var _clickLikeAjax2Dom = function(json, webId, num, liked) {
        if (json.status) { //点赞成功的回调
            if (liked == 1) { //判断是否已点过赞
                num--;
                $('.good[web-id=' + webId + ']').html('' +
                    '<img class="hand" status=0>' +
                    // ' <span class="number">' + num + '人觉得好</span>');//改版完成后使用这一行
                    ' <span class="number">' + num + '</span>'); //改版完成后后注释掉
                $('.good[web-id=' + webId + ']').attr({
                    'like-num': num,
                    'liked': 0,
                });
            } else {
                num++;
                $('.good[web-id=' + webId + ']').html('' +
                    '<img class="hand" status=1>' +
                    // ' <span class="number">' + num + '人觉得好</span>');//同上
                    ' <span class="number">' + num + '</span>'); //改版后注释掉
                $('.good[web-id=' + webId + ']').attr({
                    'like-num': num,
                    'liked': 1,
                });
            }
            ChangeGoodHandPic.beforeClickGood($('.hand[status=0]'));
            ChangeGoodHandPic.afterClickGood($('.hand[status=1]'));
        } else {
            errorCode(json);
        }
    };

    /**
     * 点收藏
     * @param  {Number} webId
     * @param  {Number} oldStatus 旧状态
     * @return {[type]}           [description]
     */
    var clickSelect = function(webId, oldStatus) {
        if (isLogin()) { //登录
            var userId = JSON.parse(sessionStorage.loginSuccess).data.user_id;
            if (isOnlineMode()) { //线上模式
                _clickSelectAjax(webId, userId, oldStatus); //点赞的 Ajax 请求
            } else { //本地测试
                _clickSelectAjax2Dom(fakeClickStar, webId, oldStatus); //---------------------------test-
            }
        } else {
            var c = confirm('尚未登录，无法收藏，是否前往登录页？');
            if (c) {
                location.href = 'login.html';
            }
        }
    };

    /**
     * 收藏的 Ajax 方法
     * @param  {Number} webId     [description]
     * @param  {Number} userId    [description]
     * @param  {Numebr} oldStatus 0表示未收藏过，1表示收藏过
     */
    var _clickSelectAjax = function(webId, userId, oldStatus) {

        $.ajax({
            // laravel_LTS/public/api/web/{web_id}/user/{user_id}
            url: 'laravel_LTS/public/api/web/' + webId + '/user/' + userId,
            type: 'PUT',
            // dataType: 'json',
            // data: {
            //     user_id: userId,
            //     web_id: webId
            // },
            success: function(json) {
                console.log("_clickSelectAjax ajax success");

                var jsonData = checkData(json); //检查json
                _clickSelectAjax2Dom(jsonData, webId, oldStatus); //ajax回调
            },
            error: function() {
                console.error("_clickSelectAjax ajax failed");
                ajaxFailed();
            }
        });
    };

    /**
     * 收藏 Ajax 的回调方法
     * @param  {Object} json      回调数据
     * @param  {Number} webId     [description]
     * @param  {Number} oldStatus [description]
     */
    var _clickSelectAjax2Dom = function(json, webId, oldStatus) {
        if (json.status) {
            if (oldStatus == 1) { //点过收藏
                $('.star[web-id=' + webId + ']').attr('status', 0);
            } else {
                $('.star[web-id=' + webId + ']').attr('status', 1);
            }
            ChangeStarColor.beforeClickStar($('.star[status=0]'));
            ChangeStarColor.afterClickStar($('.star[status=1]'));
        } else {
            errorCode(json);
        }
    };


    //========fake data=======
    //
    var fakeClickStar = {
        status: true
    };

    var fakeClickLike = {
        status: true
    };

    var fakeAdd = {
        status: true
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

    var fakeCate = {
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
        checkData: checkData,
        errorCode: errorCode,
        ajaxFailed: ajaxFailed,
        getFileName: getFileName,
        isLogin: isLogin, //判断是否登录成功
        loadAvatar: loadAvatar, //载入右上角头像
        profileFunction: profileFunction, //个人中心功能区
        isOnlineMode: isOnlineMode, //上线环境
        clickLike: clickLike, //点赞
        clickSelect: clickSelect, //点收藏
        setSelectInner: _setSelectInner //设置下拉列表内容
    };
});
