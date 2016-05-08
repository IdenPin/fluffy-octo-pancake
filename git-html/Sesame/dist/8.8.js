webpackJsonp([8],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 公共工具
	 * @param  {[type]} ) {};         [description]
	 * @return {[type]}   [description]
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_RESULT__ = function (SetAvatar, Modal, FileInputPreview, ChangeGoodHandPic, ChangeStarColor) {

	    // console.log('Util module');

	    /**
	     * 是否是上线环境
	     * @return {Boolean}
	     */
	    var isOnlineMode = function () {
	        // console.log('isOnlineMode');
	        // return true; //上线环境
	        return false; //测试环境
	    };

	    /**
	     * 检查数据
	     * @param {String/JSON} res 传入的字符串或JSON
	     * @return {JSON} 返回的JSON
	     */
	    var checkData = function (res) {
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
	    var errorCode = function (json) {
	        switch (json.errorCode) {
	            case 1000:
	                alert('未知错误！');
	                break;
	            case 1001:
	                alert('参数不全！');
	                break;
	            case 1002:
	                alert('尚未登录！');
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

	    var ajaxFailed = function () {
	        alert('网络请求失败……');
	    };

	    /**
	     * 得到文件名
	     * @param  {[type]} o [description]
	     * @return {[type]}   [description]
	     */
	    var getFileName = function (o) {
	        var pos = o.lastIndexOf("\\");
	        return o.substring(pos + 1);
	    };

	    /**
	     * 判断是否登录成功
	     * @return {Boolean} [description]
	     */
	    var isLogin = function () {
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
	    var loadAvatar = function () {
	        if (isLogin()) {
	            //登录成功
	            var avatar = JSON.parse(sessionStorage.loginSuccess).data.user_avatar;
	            if (avatar === '' || avatar === undefined) {
	                SetAvatar.setUserAvatar(); //展示默认头像
	            } else {
	                    SetAvatar.setUserAvatar(avatar); //展示登录后的头像
	                }
	        } else {
	                //未登录
	                SetAvatar.setUserAvatar(); //展示默认头像
	            }
	    };

	    /**
	     * 个人中心功能区
	     *
	     * 目前包括：个人中心，个人收藏，分享网站，退出登录
	     *
	     * @param {Object} Object json对象
	     * @return {[type]} [description]
	     */
	    var profileFunction = function (Object) {

	        // loadAvatar
	        // 暂时不用放到这里

	        //个人中心
	        $('#profileLi').unbind('click');
	        $('#profileLi').click(function (event) {
	            event.preventDefault();
	            if (isLogin()) {
	                //已登录
	                location.href = 'profile.html';
	            } else {
	                //未登录
	                var c = confirm('尚未登录，是否前往登录页？');
	                if (c) {
	                    location.href = 'login.html';
	                }
	            }
	        });

	        //个人收藏
	        $('#collectionsLi').unbind('click');
	        $('#collectionsLi').click(function (event) {
	            event.preventDefault();
	            if (isLogin()) {
	                //已登录
	                location.href = 'collections.html';
	            } else {
	                //未登录
	                var c = confirm('尚未登录，是否前往登录页？');
	                if (c) {
	                    location.href = 'login.html';
	                }
	            }
	        });

	        //分享网站点击事件监听
	        $('#shareSiteLi').unbind('click');
	        $('#shareSiteLi').click(function (event) {
	            event.preventDefault();

	            if (isLogin()) {
	                //已登录

	                //展示模态框
	                Modal.show('#shareSiteModal');
	                //设置分类下拉框的内容
	                // GetCate.setSelectInner();
	                _setSelectInner();
	                //加载图片上传预览功能
	                FileInputPreview.imgPreview($('#imgInput'), $('#previewArea'));

	                _addSiteAjax(); //添加站点的Ajax请求
	            } else {
	                    //未登录
	                    var c = confirm('尚未登录，是否前往登录页？');
	                    if (c) {
	                        location.href = 'login.html';
	                    }
	                }
	        });

	        //登出
	        $('#logoutLi').unbind('click');
	        $('#logoutLi').click(function (event) {
	            event.preventDefault();
	            if (isLogin()) {
	                //已登录
	                var b = confirm('确认退出登录？');
	                if (b) {
	                    if (isOnlineMode()) {
	                        _logoutAjax(); //登出
	                    } else {
	                            _logoutAjax2Dom(fakelogout); //=============================
	                        }
	                }
	            } else {
	                    //未登录
	                    var c = confirm('尚未登录，是否前往登录页？');
	                    if (c) {
	                        location.href = 'login.html';
	                    }
	                }
	        });
	    };

	    var fakelogout = {
	        status: true
	    };

	    /**
	     * 登出
	     * @return {[type]} [description]
	     */
	    var _logoutAjax = function () {
	        $.ajax({

	            url: 'laravel_LTS/public/api/auth/logout',
	            type: 'GET',
	            // dataType: 'json',
	            // data: {
	            //     username: name,
	            //     password: password,
	            // },
	            success: function (json) {
	                console.log("_logoutAjax ajax success");

	                var jsonData = checkData(json); //检查json
	                _logoutAjax2Dom(jsonData); //ajax回调
	            },
	            error: function () {
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
	    var _logoutAjax2Dom = function (json) {
	        if (json.status) {
	            //登出成功
	            sessionStorage.clear();
	            location.reload();
	        } else {
	            errorCode(json);
	        }
	    };

	    //设置下拉列表的内容
	    var _setSelectInner = function () {
	        if (isOnlineMode()) {
	            _getCateAjax(); //获取分类的Ajax
	        } else {
	                _getCateAjax2Dom(fakeCard); //==test=========================
	            }
	    };

	    /**
	     * 获取分类的Ajax
	     * @return {[type]} [description]
	     */
	    var _getCateAjax = function () {
	        $.ajax({

	            url: 'laravel_LTS/public/api',
	            type: 'POST',
	            // dataType: 'json',
	            // data: {
	            //     username: name,
	            //     password: password,
	            // },
	            success: function (json) {
	                console.log("_getCateAjax ajax success");

	                var jsonData = checkData(json); //检查json
	                _getCateAjax2Dom(jsonData); //ajax回调
	            },
	            error: function () {
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
	    var _getCateAjax2Dom = function (json) {
	        if (json.status) {
	            //载入json成功，操作dom
	            var htmlArr = [];
	            htmlArr.push('<option selected value="-1">请选择</option>');
	            for (var i = 0; i < json.data.length; i++) {
	                htmlArr.push('' + '<option value=' + json.data[i].cate_id + '>' + json.data[i].cate_name + '</option>');
	            }
	            var htmlStr = htmlArr.join('');
	            $('#webCate').html(htmlStr);
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
	    var _addSiteAjax = function () {

	        $("#shareSiteModalForm").submit(function (e) {
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
	                        $.ajax({
	                            url: formURL,
	                            type: 'POST',
	                            data: formData,
	                            mimeType: "multipart/form-data",
	                            contentType: false,
	                            cache: false,
	                            processData: false,
	                            success: function (json) {
	                                console.log("_addSiteAjax ajax success");

	                                var jsonData = checkData(json); //检查json
	                                _addSiteAjax2Dom(jsonData); //ajax回调
	                            },
	                            error: function () {
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
	    var _addSiteAjax2Dom = function (json) {
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
	    var clickLike = function (webId, num, liked) {
	        // console.log(webId, num, liked);
	        // console.log(typeof liked);
	        //判断用户是否登录
	        if (isLogin()) {
	            var userId = JSON.parse(sessionStorage.loginSuccess).data.user_id;
	            if (isOnlineMode()) {
	                //线上模式
	                _clickLikeAjax(webId, userId, num, liked); //点赞的 Ajax 请求
	            } else {
	                    //本地测试
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
	    var _clickLikeAjax = function (webId, userId, num, liked) {

	        $.ajax({
	            url: 'laravel_LTS/public/api/like',
	            type: 'POST',
	            dataType: 'json',
	            data: {
	                user_id: userId,
	                web_id: webId
	            },
	            success: function (json) {
	                console.log("_clickLikeAjax ajax success");

	                var jsonData = checkData(json); //检查json
	                _clickLikeAjax2Dom(jsonData, webId, num, liked); //ajax回调
	            },
	            error: function () {
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
	    var _clickLikeAjax2Dom = function (json, webId, num, liked) {
	        if (json.status) {
	            //点赞成功的回调
	            if (liked == 1) {
	                //判断是否已点过赞
	                num--;
	                $('.good[web-id=' + webId + ']').html('' + '<img class="hand" status=0>' + ' <span class="number">' + num + '</span>');
	                $('.good[web-id=' + webId + ']').attr({
	                    'like-num': num,
	                    'liked': 0
	                });
	            } else {
	                num++;
	                $('.good[web-id=' + webId + ']').html('' + '<img class="hand" status=1>' + ' <span class="number">' + num + '</span>');
	                $('.good[web-id=' + webId + ']').attr({
	                    'like-num': num,
	                    'liked': 1
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
	    var clickSelect = function (webId, oldStatus) {
	        if (isLogin()) {
	            //登录
	            var userId = JSON.parse(sessionStorage.loginSuccess).data.user_id;
	            if (isOnlineMode()) {
	                //线上模式
	                _clickSelectAjax(webId, userId, oldStatus); //点赞的 Ajax 请求
	            } else {
	                    //本地测试
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
	    var _clickSelectAjax = function (webId, userId, oldStatus) {

	        $.ajax({
	            // laravel_LTS/public/api/web/{web_id}/user/{user_id}
	            url: 'laravel_LTS/public/api/web/' + webId + '/user/' + userId,
	            type: 'PUT',
	            // dataType: 'json',
	            // data: {
	            //     user_id: userId,
	            //     web_id: webId
	            // },
	            success: function (json) {
	                console.log("_clickSelectAjax ajax success");

	                var jsonData = checkData(json); //检查json
	                _clickSelectAjax2Dom(jsonData, webId, oldStatus); //ajax回调
	            },
	            error: function () {
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
	    var _clickSelectAjax2Dom = function (json, webId, oldStatus) {
	        if (json.status) {
	            if (oldStatus == 1) {
	                //点过收藏
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
	        clickSelect: clickSelect //点收藏
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 设置右上角默认的头像
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	    var setUserAvatar = function (url) {
	        if (url === undefined) {
	            //默认头像
	            $('.avatar').attr('src', __webpack_require__(11)); //使用webpack压缩图片
	        } else {
	                //用户头像
	                $('.avatar').attr('src', url);
	            }
	    };

	    return {
	        setUserAvatar: setUserAvatar
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "0c07991c716838017541889c01ebeaac.jpg"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 模态框功能
	 */

	/**
	 * 定义模块
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	    /**
	     * 展示模态框
	     * @param  {String} modalID 模态框id
	     * @return {[type]}         [description]
	     */
	    var show = function (modalID) {
	        // var top = $('body').height() / 2;
	        var top = 760 / 2;
	        $('.modal-mask').fadeIn(400);
	        $(modalID).show().animate({
	            opacity: 1,
	            top: top
	        }, 700, function () {
	            //点击×隐藏
	            $(modalID + ' .close').click(function (event) {
	                event.preventDefault();
	                hide(modalID); //隐藏
	            });
	        });
	    };

	    /**
	     * 隐藏模态框
	     * @param  {String} modalID 模态框id
	     * @return {[type]}         [description]
	     */
	    var hide = function (modalID) {
	        $('.modal-mask').fadeOut(400);
	        $(modalID).fadeOut(400).css({
	            opacity: 0,
	            top: '-100%'
	        });
	    };

	    return {
	        show: show, //弹出模态框
	        hide: hide //隐藏模态框
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 上传图片预览功能
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	    /**
	     * 读取图片
	     * @param  {Object} input       jQuery对象
	     * @param  {Object} previewArea jQuery对象
	     * @return {[type]}             [description]
	     */
	    var _readURL = function (input, previewArea) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                // previewArea.attr('src', e.target.result);
	                previewArea.css('background-image', 'url(' + e.target.result + ')');
	            };

	            reader.readAsDataURL(input.files[0]);

	            $(input).next('span').hide(); //将默认文字隐藏
	        }
	    };

	    /**
	     * 图片上传前预览
	     * @return {[type]} [description]
	     */
	    var imgPreview = function (input, previewArea) {
	        input.change(function () {
	            _readURL(this, previewArea);
	        });
	    };

	    return {
	        imgPreview: imgPreview // 图片预览
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	// <input type='file' id="imgInp" />
	// <img id="blah" src="#" alt="your image" />

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 用于修改点赞的手形图片
	 *
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	    /**
	     * 点赞之前
	     * @return {[type]} [description]
	     */
	    var beforeClickGood = function (element) {
	        // console.log('beforeClickGood');
	        // console.log(element);
	        element.attr('src', __webpack_require__(15));
	    };

	    /**
	     * 点赞之后
	     * @return {[type]} [description]
	     */
	    var afterClickGood = function (element) {
	        element.attr('src', __webpack_require__(16));
	        element.next('span').css('color', '#F39A78');
	    };

	    return {
	        beforeClickGood: beforeClickGood,
	        afterClickGood: afterClickGood
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMjkwYTU1Mi0xZGI0LWE4NGMtYmE4Mi0xZjVmNTcwMTI5NTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzI1QzUxRTg4ODQwMTFFNTkzMTNFOUEyMTA4RTI3NjYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzI1QzUxRTc4ODQwMTFFNTkzMTNFOUEyMTA4RTI3NjYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDI5ZTAwMzktZmMwMy1lOTRlLWIzZjQtM2VkZjZiYzY2MTVlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmIyOTBhNTUyLTFkYjQtYTg0Yy1iYTgyLTFmNWY1NzAxMjk1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq8ggjcAAADsSURBVHjaYvz//z8DLQDjoDA4PT09Ckg1A3HCzJkzD+NTy0SCoX5AaikQKwFxCSH1TEQa6gqkNiIJnaHYYKChnkBqF5rwCYrCGGioF5Daiib8Exi+HGQbDDQUFJZ3sUh9A+LFUN8yIolfB1rYB+OwIBm0E0gJQLkg77PhcAwXSDkOOUyDgcANiQ3y6isSk+5XXJH3Bon9F4hZKckgTFTMbBy0MvgqrQxupYXB74FJbRUxBv9FSzGEQA++yBNBYgsC8ScSDJ6BLoDsqklAzAtzMdBrn4GZJgvINsVjIMhn64Bq3w3Ogn5QGAwQYAC9pkvBkI8oRQAAAABJRU5ErkJggg=="

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMjkwYTU1Mi0xZGI0LWE4NGMtYmE4Mi0xZjVmNTcwMTI5NTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTRENDY5MDI4ODQwMTFFNTgzODU4M0U0N0ZFMUI3NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTRENDY5MDE4ODQwMTFFNTgzODU4M0U0N0ZFMUI3NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDI5ZTAwMzktZmMwMy1lOTRlLWIzZjQtM2VkZjZiYzY2MTVlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmIyOTBhNTUyLTFkYjQtYTg0Yy1iYTgyLTFmNWY1NzAxMjk1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po/av3EAAADuSURBVHjaYvz//z8DLQATA40ACymKv8yujAJSzUCcwJPafpgqLgYa6geklgKxEhCXUCUogIa6AqmNSEJnKDYYaKgnkNqFJnyCkD5GfKkCaKgXkNqKJvwTGL4cZBsMNBQUlnexSH0D4sVQ3zIiiV8HWtiHkSqABu0EUgJQLsj7bDgcwwXE6Tjk+rAlNzckNsirr0hMul9xRd4bJPZfIGYdLDmPg1YGX6WVwa20MPg9MKmtIsbgvyQWUD34Ik8EiS0IxJ9IMHgGvmJzEhDzwlwM9NpnYKbJArJN8RgI8tk6oNp3JJUVg7IGoZnBAAEGANQNQXloNXxeAAAAAElFTkSuQmCC"

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 用于修改收藏五角星的图片
	 *
	 *
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {

	    /**
	     * 点收藏之前
	     * @return {[type]} [description]
	     */
	    var beforeClickStar = function (element) {
	        element.attr('src', __webpack_require__(18));
	    };

	    /**
	     * 点收藏之后
	     * @return {[type]} [description]
	     */
	    var afterClickStar = function (element) {
	        element.attr('src', __webpack_require__(19));
	    };

	    return {
	        beforeClickStar: beforeClickStar,
	        afterClickStar: afterClickStar
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMjkwYTU1Mi0xZGI0LWE4NGMtYmE4Mi0xZjVmNTcwMTI5NTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzEwREU4RDE4ODQwMTFFNUJGQjI4MzA3RUJFREFFODAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzEwREU4RDA4ODQwMTFFNUJGQjI4MzA3RUJFREFFODAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjI5MGE1NTItMWRiNC1hODRjLWJhODItMWY1ZjU3MDEyOTU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmIyOTBhNTUyLTFkYjQtYTg0Yy1iYTgyLTFmNWY1NzAxMjk1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhGc6EMAAAJ5SURBVHja7JhPSBVBHIDfk2cHk7AC888je1gqmWGiSWiJhxTqaKFQIEpC3TQIunRRuhjh1Siw0A4eEhS6KF5E0qKQOliRYUp60EPiHwgPvr6hCSLWbfa9mfdmwR98zLK7M/vt7OzMbzcYjUYDfoqUgM/Cd8KheBuYm1/8d1c59EMadMCQW/3jkaOJFXaIcTggt1/AIfhh65Bo/0v2Tzy0dQynwn2H/S0QtlG4U45bp+i1Tfgg3HU5fhlKbBLuVjjngS3Ch+GGwnn1UGqDsJdZoDepwiwaeRTNHqpUwsWkCCN7gmI4hqrP4Uys1w2qZGvIiTn2HJyGQlleiPPpvoV38EkyyTK96VkYuX0UxTInEI/wJEQgy3BeI5bvL/BZ3syU2OYm1ncVRrZWPrJsS5KzNbHcI/1stzE8YpGsiAx46vbSpfstgb9noWPf/166AYprlsi+YvxWuc7DnHCdYtQC2Y9QozwP09NvKCqSJLsMRXTehpeVrhoWkiC7JeZ/J1lXYSpsy0fyM8HC57n295hyCSouyJ5OVDRwzZm4kh8aEOt9HewYlr3JtYa0ZGs0NEbRZVB2gGs80p1evjYoPGEiHz5mUDhiQjhsUDjXhLDJfDjsN+FTrKwhbcI0FpRfIaYiUzUPT/HQYJ7heThTp7Dp7zkRR1ROCulsTIbIA16CSF4uyY9YbZ2i2sM5Cud8hduQL5ZZuCPHfSvM6JraVIXdJvZv0AYF0APbDp84ZdAE713aOatTeMVh3yzckj36RCE5Ggz8/hnYCNMOx5d0/vnZTyH+DYj/FnNCkGTlsTwW60t2Rd6w+G31Aa7S5qoWYZs/8/eEdccvAQYAHnKRuMKQt3kAAAAASUVORK5CYII="

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMjkwYTU1Mi0xZGI0LWE4NGMtYmE4Mi0xZjVmNTcwMTI5NTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTQ2NjlCMEM4ODQwMTFFNTlGNTVGRUE5QTkzOUI0QjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTQ2NjlCMEI4ODQwMTFFNTlGNTVGRUE5QTkzOUI0QjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDI5ZTAwMzktZmMwMy1lOTRlLWIzZjQtM2VkZjZiYzY2MTVlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmIyOTBhNTUyLTFkYjQtYTg0Yy1iYTgyLTFmNWY1NzAxMjk1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpHN1HYAAAJ9SURBVHjaYvz//z/DUAJMDEMMDDkHs1Bswtl0dBETIF4MxFxAXAjE6/DqN55JZwdjgr1AzAdlrwViISB+P1iTRAGSY2Ggd7CmYVYgbsUingjEMoPRwU3QdIsNzBhsDhYE4go88t5ArDuYHNxFhJruweJgYSBOIUKdOxAbDAYHk1IKzBhYB59NlweS8SToMAdi14Fx8Nl0VSC5kQydS4HYkFxrGYlqrZ1NB5WxlkCsB8TqUNqOwtg9AzIZiG9A8RFgNf2FdAefTWcDktrQNgEoCrWAWBGIJWjcrgFV37eB+CbUM8fBbOOZn3A7+Gy6IzTKJAdJ4+wDuLo3nrkQVxreNIgcCwICQLwAX6bjGWoN+NpB6Mb5hDLdEiAZPUgcewyYfq3xl8PGM2OA5K5B4NjrQGxPfDl8Nv0UkDQdIMc+A2INYOB9JqWmswHihwPg2K/g8h+LY/E72HjmL2iU/KCzg22Bdj8hry1hPPMhNKTpBYKBdp6nrPFjPBNU37sB8T8aOzYDaNc66rTWjGfuBpLNNHTsEqAdRA1QkNK8PElDBx+iRXtYgYYOVqSFg2Vo6GBpWjiYlu1hmaHmYB1gzcpCPQefTWeE9kJoBcSIbYczkWCgPI3LYTFqOpjW/TkQECdGEQs1DYMCUDtgKxCDGi9e0E4s1QKF2BCWIkLNXSAuAmJlcDXLwFAKTfdJQHyeWkUbsQ7GV7A/AOJUIFYD4n4g/oWli2MExBFAfBGPOWbUdPArLGLXgDgTGqJziGgcrWSADAaGA/EJLPJPqelgUFcbNF/xDohBPZE0YGNFG4hnkNGKW8UAGUUKBeJ90AGUg8R2gBlHJxZHHYwKAAIMANJ8hhmi7EG7AAAAAElFTkSuQmCC"

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 登录页的控制器
	 *
	 * 基本的逻辑
	 * 非Ajax的Dom操作
	 */

	//引入加密模块
	var sha1 = __webpack_require__(29);

	/**
	 * 定义模块
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (U, SetAvatar) {

	    var registerEmail = false; //验证邮箱
	    var registerPassword = false; //验证密码

	    /**
	     * 处理顶部要在载入的内容
	     * @return {[type]} [description]
	     */
	    var loadProfile = function () {
	        /**
	         * 载入右上角头像
	         */
	        U.loadAvatar();

	        // console.log(sha1('123456'));
	    };

	    /**
	     * 已经登录
	     * 让用户直接访问首页
	     * @return {[type]} [description]
	     */
	    var alreadyLogin = function () {

	        if (U.isLogin()) {
	            alert('您已登录，请直接访问首页！');
	            location.href = 'index.html';
	        }
	    };

	    /**
	     * 控制 tab 切换
	     * @return {[type]} [description]
	     */
	    var tab = function () {
	        $('[tab-name]').unbind('click');
	        $('[tab-name]').click(function (event) {
	            event.preventDefault();
	            _removeTabActive(); //移除其他 active 样式
	            $(this).addClass('active'); //给 this 添加 active 样式
	            _hideTabContent(); //隐藏 tab 内容区
	            $('[tab-content=' + $(this).attr('tab-name') + ']').fadeIn(300); //显示 tab 内容
	        });
	    };

	    /**
	     * 隐藏 tab 内容区
	     */
	    var _hideTabContent = function () {
	        $('[tab-content]').hide();
	        $('[tab-content] input').val(''); //清空 input 内容
	        $('.tip').hide(); //提示文字清除
	    };

	    /**
	     * 移除 tab 上的 active 样式
	     */
	    var _removeTabActive = function () {
	        $('div[tab-name]').removeClass('active');
	    };

	    /**
	     * 校验邮箱是否被使用过
	     * @return {[type]} [description]
	     */
	    var verifyEmailUsed = function () {
	        $('#register-email').off('focusout');
	        $('#register-email').focusout(function (event) {
	            event.preventDefault();
	            if ($(this).val().trim() !== '') {
	                //输入内容不为空时才验证
	                if (U.isOnlineMode()) {
	                    _verifyEmailUsedAjax($(this).val().trim()); //验证邮箱是否注册过 Ajax 方法
	                } else {
	                        _verifyEmailUsedAjax2Dom(fakeVerifyEmail); //-----------------------------------test
	                    }
	            }
	        });
	    };

	    /**
	     * 验证邮箱是否被注册过的 Ajax 方法
	     * @param  {String} email 邮箱
	     */
	    var _verifyEmailUsedAjax = function (email) {
	        $.ajax({
	            //  laravel_LTS/public/api/auth/register/email/{email}
	            url: 'laravel_LTS/public/api/auth/register/email/' + email,
	            type: 'GET',
	            // dataType: 'json',
	            // data: {
	            // },
	            success: function (json) {
	                console.log("_verifyEmailUsedAjax ajax success");

	                var jsonData = U.checkData(json); //检查json
	                _verifyEmailUsedAjax2Dom(jsonData); //ajax回调
	            },
	            error: function () {
	                console.error("_verifyEmailUsedAjax ajax failed");
	                U.ajaxFailed();
	            }
	        });
	    };

	    /**
	     * 验证邮箱是否被注册过的 Ajax 回调方法
	     * @param  {Object} json 回调数据 json 对象
	     */
	    var _verifyEmailUsedAjax2Dom = function (json) {
	        if (json.status) {
	            if (json.data.used) {
	                $('.tip-email').fadeIn(300);
	                registerEmail = false;
	            } else {
	                $('.tip-email').hide();
	                registerEmail = true;
	            }
	        } else {
	            U.errorCode(json);
	        }
	    };

	    /**
	     * 校验密码长度
	     * @return {[type]} [description]
	     */
	    var verifyPasswordLength = function () {
	        $('#register-password').off('focusout');
	        $('#register-password').focusout(function (event) {
	            event.preventDefault();
	            if ($(this).val().trim().length < 6) {
	                $('.tip-password').fadeIn(300);
	                registerPassword = false;
	            } else {
	                $('.tip-password').hide();
	                registerPassword = true;
	            }
	        });
	    };

	    /**
	     * 注册功能的实现
	     * @return {[type]} [description]
	     */
	    var register = function () {
	        $('#registerForm').submit(function (event) {
	            event.preventDefault();
	            if (registerEmail && registerPassword) {
	                if (U.isOnlineMode()) {
	                    _registerAjax($('#register-email').val().trim(), $('#register-password').val().trim()); //注册的 Ajax
	                } else {
	                        _registerAjax2Dom(fakeRegister); //=================================test--
	                    }
	            }
	        });
	    };

	    /**
	     * 注册的 Ajax
	     * @param  {String} email    邮箱
	     * @param  {String} password 密码
	     */
	    var _registerAjax = function (email, password) {
	        $.ajax({
	            //   laravel_LTS/public/api/auth/register
	            url: 'laravel_LTS/public/api/auth/register',
	            type: 'POST',
	            dataType: 'json',
	            data: {
	                user_email: email,
	                user_pass: sha1(password)
	            },
	            success: function (json) {
	                console.log("_registerAjax ajax success");

	                var jsonData = U.checkData(json); //检查json
	                _registerAjax2Dom(jsonData); //ajax回调
	            },
	            error: function () {
	                console.error("_registerAjax ajax failed");
	                U.ajaxFailed();
	            }
	        });
	    };

	    /**
	     * 注册 Ajax 回调
	     * @param  {Object} json 回调数据
	     * @return {[type]}      [description]
	     */
	    var _registerAjax2Dom = function (json) {
	        if (json.status) {
	            alert('注册成功！请登录！');
	            location.reload();
	        } else {
	            U.errorCode(json);
	        }
	    };

	    /**
	     * 点击登录按钮
	     * @return {[type]} [description]
	     */
	    var login = function () {
	        $('#loginForm').submit(function (event) {
	            event.preventDefault();

	            var name = $('#loginName').val().trim();
	            var password = $('#loginPassword').val().trim();

	            if (name === '') {
	                alert('请输入账号！');
	            } else if (password === '') {
	                alert('请输入密码！');
	            } else {
	                if (U.isOnlineMode()) {
	                    _loginAjax(name, password); //Ajax登录
	                } else {
	                        _loginAjax2Dom(fakeLogin); //============test=====test====test=====
	                    }
	            }
	        });
	    };

	    /**
	     * 登录的Ajax请求
	     * @param  {String} name     用户名
	     * @param  {String} password 密码
	     * @return {[type]}          [description]
	     */
	    var _loginAjax = function (name, password) {
	        $.ajax({

	            url: 'laravel_LTS/public/api/auth/login',
	            type: 'POST',
	            dataType: 'json',
	            data: {
	                username: name,
	                password: sha1(password)
	            },
	            success: function (json) {
	                console.log("_loginAjax ajax success");

	                var jsonData = U.checkData(json); //检查json
	                _loginAjax2Dom(jsonData); //ajax回调
	            },
	            error: function () {
	                console.error("_loginAjax ajax failed");
	                U.ajaxFailed();
	            }
	        });
	    };

	    /**
	     * 登录Ajax后的Dom操作，回调函数
	     * @param  {Object} json 回调数据
	     * @return {[type]}      [description]
	     */
	    var _loginAjax2Dom = function (json) {
	        if (json.status) {
	            //登录成功
	            //携带信息
	            sessionStorage.loginSuccess = JSON.stringify(json);
	            //跳转到主页
	            location.href = "index.html";
	        } else {
	            //登录失败
	            U.errorCode(json);
	        }
	    };

	    var fakeRegister = {
	        status: true
	    };

	    var fakeVerifyEmail = {
	        status: true,
	        data: {
	            used: false
	        }
	    };

	    var fakeLogin = {
	        status: true,
	        data: {
	            user_id: 521,
	            user_name: '川辙',
	            // user_avatar: '',
	            user_avatar: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg'
	        }
	    };

	    return {
	        login: login, //登录功能
	        alreadyLogin: alreadyLogin, //已经登录，直接跳转到首页
	        loadProfile: loadProfile, //载入右上角个人信息功能
	        tab: tab, //控制 tab 页切换
	        verifyEmailUsed: verifyEmailUsed, //校验邮箱是否已注册
	        verifyPasswordLength: verifyPasswordLength, //校验密码长度
	        register: register //注册
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {(function () {
	  var crypt = __webpack_require__(34),
	      utf8 = __webpack_require__(35).utf8,
	      bin = __webpack_require__(35).bin,

	  // The core
	  sha1 = function (message) {
	    // Convert to byte array
	    if (message.constructor == String) message = utf8.stringToBytes(message);else if (typeof Buffer !== 'undefined' && typeof Buffer.isBuffer == 'function' && Buffer.isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message)) message = message.toString();

	    // otherwise assume byte array

	    var m = crypt.bytesToWords(message),
	        l = message.length * 8,
	        w = [],
	        H0 = 1732584193,
	        H1 = -271733879,
	        H2 = -1732584194,
	        H3 = 271733878,
	        H4 = -1009589776;

	    // Padding
	    m[l >> 5] |= 0x80 << 24 - l % 32;
	    m[(l + 64 >>> 9 << 4) + 15] = l;

	    for (var i = 0; i < m.length; i += 16) {
	      var a = H0,
	          b = H1,
	          c = H2,
	          d = H3,
	          e = H4;

	      for (var j = 0; j < 80; j++) {

	        if (j < 16) w[j] = m[i + j];else {
	          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
	          w[j] = n << 1 | n >>> 31;
	        }

	        var t = (H0 << 5 | H0 >>> 27) + H4 + (w[j] >>> 0) + (j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 : j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 : j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 : (H1 ^ H2 ^ H3) - 899497514);

	        H4 = H3;
	        H3 = H2;
	        H2 = H1 << 30 | H1 >>> 2;
	        H1 = H0;
	        H0 = t;
	      }

	      H0 += a;
	      H1 += b;
	      H2 += c;
	      H3 += d;
	      H4 += e;
	    }

	    return [H0, H1, H2, H3, H4];
	  },

	  // Public API
	  api = function (message, options) {
	    var digestbytes = crypt.wordsToBytes(sha1(message));
	    return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt.bytesToHex(digestbytes);
	  };

	  api._blocksize = 16;
	  api._digestsize = 20;

	  module.exports = api;
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30).Buffer))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(31);
	var ieee754 = __webpack_require__(32);
	var isArray = __webpack_require__(33);

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;
	Buffer.poolSize = 8192; // not used by this implementation

	var rootParent = {};

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

	function typedArraySupport() {
	  function Bar() {}
	  try {
	    var arr = new Uint8Array(1);
	    arr.foo = function () {
	      return 42;
	    };
	    arr.constructor = Bar;
	    return arr.foo() === 42 && // typed array instances can be augmented
	    arr.constructor === Bar && // constructor can be set
	    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
	  } catch (e) {
	    return false;
	  }
	}

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer(arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1]);
	    return new Buffer(arg);
	  }

	  this.length = 0;
	  this.parent = undefined;

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg);
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8');
	  }

	  // Unusual.
	  return fromObject(this, arg);
	}

	function fromNumber(that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0;
	    }
	  }
	  return that;
	}

	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8';

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0;
	  that = allocate(that, length);

	  that.write(string, encoding);
	  return that;
	}

	function fromObject(that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object);

	  if (isArray(object)) return fromArray(that, object);

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string');
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object);
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object);
	    }
	  }

	  if (object.length) return fromArrayLike(that, object);

	  return fromJsonObject(that, object);
	}

	function fromBuffer(that, buffer) {
	  var length = checked(buffer.length) | 0;
	  that = allocate(that, length);
	  buffer.copy(that, 0, 0, length);
	  return that;
	}

	function fromArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	function fromArrayBuffer(that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength;
	    that = Buffer._augment(new Uint8Array(array));
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array));
	  }
	  return that;
	}

	function fromArrayLike(that, array) {
	  var length = checked(array.length) | 0;
	  that = allocate(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject(that, object) {
	  var array;
	  var length = 0;

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data;
	    length = checked(array.length) | 0;
	  }
	  that = allocate(that, length);

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	}

	function allocate(that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length));
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length;
	    that._isBuffer = true;
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1;
	  if (fromPool) that.parent = rootParent;

	  return that;
	}

	function checked(length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }
	  return length | 0;
	}

	function SlowBuffer(subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding);

	  var buf = new Buffer(subject, encoding);
	  delete buf.parent;
	  return buf;
	}

	Buffer.isBuffer = function isBuffer(b) {
	  return !!(b != null && b._isBuffer);
	};

	Buffer.compare = function compare(a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }

	  if (a === b) return 0;

	  var x = a.length;
	  var y = b.length;

	  var i = 0;
	  var len = Math.min(x, y);
	  while (i < len) {
	    if (a[i] !== b[i]) break;

	    ++i;
	  }

	  if (i !== len) {
	    x = a[i];
	    y = b[i];
	  }

	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};

	Buffer.concat = function concat(list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.');

	  if (list.length === 0) {
	    return new Buffer(0);
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length;
	    }
	  }

	  var buf = new Buffer(length);
	  var pos = 0;
	  for (i = 0; i < list.length; i++) {
	    var item = list[i];
	    item.copy(buf, pos);
	    pos += item.length;
	  }
	  return buf;
	};

	function byteLength(string, encoding) {
	  if (typeof string !== 'string') string = '' + string;

	  var len = string.length;
	  if (len === 0) return 0;

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len;
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length;
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;
	      case 'hex':
	        return len >>> 1;
	      case 'base64':
	        return base64ToBytes(string).length;
	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined;
	Buffer.prototype.parent = undefined;

	function slowToString(encoding, start, end) {
	  var loweredCase = false;

	  start = start | 0;
	  end = end === undefined || end === Infinity ? this.length : end | 0;

	  if (!encoding) encoding = 'utf8';
	  if (start < 0) start = 0;
	  if (end > this.length) end = this.length;
	  if (end <= start) return '';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);

	      case 'ascii':
	        return asciiSlice(this, start, end);

	      case 'binary':
	        return binarySlice(this, start, end);

	      case 'base64':
	        return base64Slice(this, start, end);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};

	Buffer.prototype.equals = function equals(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};

	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};

	Buffer.prototype.compare = function compare(b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return 0;
	  return Buffer.compare(this, b);
	};

	Buffer.prototype.indexOf = function indexOf(val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;else if (byteOffset < -0x80000000) byteOffset = -0x80000000;
	  byteOffset >>= 0;

	  if (this.length === 0) return -1;
	  if (byteOffset >= this.length) return -1;

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0);

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1; // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset);
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset);
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset);
	    }
	    return arrayIndexOf(this, [val], byteOffset);
	  }

	  function arrayIndexOf(arr, val, byteOffset) {
	    var foundIndex = -1;
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex;
	      } else {
	        foundIndex = -1;
	      }
	    }
	    return -1;
	  }

	  throw new TypeError('val must be string, number or Buffer');
	};

	// `get` is deprecated
	Buffer.prototype.get = function get(offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.');
	  return this.readUInt8(offset);
	};

	// `set` is deprecated
	Buffer.prototype.set = function set(v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.');
	  return this.writeUInt8(v, offset);
	};

	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string');

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) throw new Error('Invalid hex string');
	    buf[offset + i] = parsed;
	  }
	  return i;
	}

	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}

	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}

	function binaryWrite(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}

	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}

	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}

	Buffer.prototype.write = function write(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	      encoding = offset;
	      length = this.length;
	      offset = 0;
	      // Buffer#write(string, offset[, length][, encoding])
	    } else if (isFinite(offset)) {
	        offset = offset | 0;
	        if (isFinite(length)) {
	          length = length | 0;
	          if (encoding === undefined) encoding = 'utf8';
	        } else {
	          encoding = length;
	          length = undefined;
	        }
	        // legacy write(string, encoding, offset, length) - remove in v0.13
	      } else {
	          var swap = encoding;
	          encoding = offset;
	          offset = length | 0;
	          length = swap;
	        }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds');
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);

	      case 'ascii':
	        return asciiWrite(this, string, offset, length);

	      case 'binary':
	        return binaryWrite(this, string, offset, length);

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};

	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf);
	  } else {
	    return base64.fromByteArray(buf.slice(start, end));
	  }
	}

	function utf8Slice(buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break;
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res);
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray(codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
	  }
	  return res;
	}

	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret;
	}

	function binarySlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}

	function hexSlice(buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}

	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}

	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~ ~start;
	  end = end === undefined ? len : ~ ~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end));
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this;

	  return newBuf;
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}

	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val;
	};

	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};

	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val;
	};

	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};

	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};

	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};

	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};

	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4);
	};

	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4);
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8);
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8);
	};

	function checkInt(buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0);

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = value < 0 ? 1 : 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength;
	};

	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value & 0xff;
	  return offset + 1;
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};

	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('index out of range');
	  if (offset < 0) throw new RangeError('index out of range');
	}

	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};

	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0;

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds');

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart);
	  }

	  return len;
	};

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill(value, start, end) {
	  if (!value) value = 0;
	  if (!start) start = 0;
	  if (!end) end = this.length;

	  if (end < start) throw new RangeError('end < start');

	  // Fill 0 bytes; we're done
	  if (end === start) return;
	  if (this.length === 0) return;

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds');
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds');

	  var i;
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value;
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString());
	    var len = bytes.length;
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len];
	    }
	  }

	  return this;
	};

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer() {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return new Buffer(this).buffer;
	    } else {
	      var buf = new Uint8Array(this.length);
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i];
	      }
	      return buf.buffer;
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser');
	  }
	};

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype;

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment(arr) {
	  arr.constructor = Buffer;
	  arr._isBuffer = true;

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set;

	  // deprecated
	  arr.get = BP.get;
	  arr.set = BP.set;

	  arr.write = BP.write;
	  arr.toString = BP.toString;
	  arr.toLocaleString = BP.toString;
	  arr.toJSON = BP.toJSON;
	  arr.equals = BP.equals;
	  arr.compare = BP.compare;
	  arr.indexOf = BP.indexOf;
	  arr.copy = BP.copy;
	  arr.slice = BP.slice;
	  arr.readUIntLE = BP.readUIntLE;
	  arr.readUIntBE = BP.readUIntBE;
	  arr.readUInt8 = BP.readUInt8;
	  arr.readUInt16LE = BP.readUInt16LE;
	  arr.readUInt16BE = BP.readUInt16BE;
	  arr.readUInt32LE = BP.readUInt32LE;
	  arr.readUInt32BE = BP.readUInt32BE;
	  arr.readIntLE = BP.readIntLE;
	  arr.readIntBE = BP.readIntBE;
	  arr.readInt8 = BP.readInt8;
	  arr.readInt16LE = BP.readInt16LE;
	  arr.readInt16BE = BP.readInt16BE;
	  arr.readInt32LE = BP.readInt32LE;
	  arr.readInt32BE = BP.readInt32BE;
	  arr.readFloatLE = BP.readFloatLE;
	  arr.readFloatBE = BP.readFloatBE;
	  arr.readDoubleLE = BP.readDoubleLE;
	  arr.readDoubleBE = BP.readDoubleBE;
	  arr.writeUInt8 = BP.writeUInt8;
	  arr.writeUIntLE = BP.writeUIntLE;
	  arr.writeUIntBE = BP.writeUIntBE;
	  arr.writeUInt16LE = BP.writeUInt16LE;
	  arr.writeUInt16BE = BP.writeUInt16BE;
	  arr.writeUInt32LE = BP.writeUInt32LE;
	  arr.writeUInt32BE = BP.writeUInt32BE;
	  arr.writeIntLE = BP.writeIntLE;
	  arr.writeIntBE = BP.writeIntBE;
	  arr.writeInt8 = BP.writeInt8;
	  arr.writeInt16LE = BP.writeInt16LE;
	  arr.writeInt16BE = BP.writeInt16BE;
	  arr.writeInt32LE = BP.writeInt32LE;
	  arr.writeInt32BE = BP.writeInt32BE;
	  arr.writeFloatLE = BP.writeFloatLE;
	  arr.writeFloatBE = BP.writeFloatBE;
	  arr.writeDoubleLE = BP.writeDoubleLE;
	  arr.writeDoubleBE = BP.writeDoubleBE;
	  arr.fill = BP.fill;
	  arr.inspect = BP.inspect;
	  arr.toArrayBuffer = BP.toArrayBuffer;

	  return arr;
	};

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return '';
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}

	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}

	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}

	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue;
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue;
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }

	  return bytes;
	}

	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}

	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break;

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray;
	}

	function base64ToBytes(str) {
	  return base64.toByteArray(base64clean(str));
	}

	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30).Buffer, (function() { return this; }())))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

		var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

		var PLUS = '+'.charCodeAt(0);
		var SLASH = '/'.charCodeAt(0);
		var NUMBER = '0'.charCodeAt(0);
		var LOWER = 'a'.charCodeAt(0);
		var UPPER = 'A'.charCodeAt(0);
		var PLUS_URL_SAFE = '-'.charCodeAt(0);
		var SLASH_URL_SAFE = '_'.charCodeAt(0);

		function decode(elt) {
			var code = elt.charCodeAt(0);
			if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
			if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
			if (code < NUMBER) return -1; //no match
			if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
			if (code < UPPER + 26) return code - UPPER;
			if (code < LOWER + 26) return code - LOWER + 26;
		}

		function b64ToByteArray(b64) {
			var i, j, l, tmp, placeHolders, arr;

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4');
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length;
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders);

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length;

			var L = 0;

			function push(v) {
				arr[L++] = v;
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
				push((tmp & 0xFF0000) >> 16);
				push((tmp & 0xFF00) >> 8);
				push(tmp & 0xFF);
			}

			if (placeHolders === 2) {
				tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
				push(tmp & 0xFF);
			} else if (placeHolders === 1) {
				tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
				push(tmp >> 8 & 0xFF);
				push(tmp & 0xFF);
			}

			return arr;
		}

		function uint8ToBase64(uint8) {
			var i,
			    extraBytes = uint8.length % 3,
			    // if we have 1 byte left, pad 2 bytes
			output = "",
			    temp,
			    length;

			function encode(num) {
				return lookup.charAt(num);
			}

			function tripletToBase64(num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
				output += tripletToBase64(temp);
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1];
					output += encode(temp >> 2);
					output += encode(temp << 4 & 0x3F);
					output += '==';
					break;
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
					output += encode(temp >> 10);
					output += encode(temp >> 4 & 0x3F);
					output += encode(temp << 2 & 0x3F);
					output += '=';
					break;
			}

			return output;
		}

		exports.toByteArray = b64ToByteArray;
		exports.fromByteArray = uint8ToBase64;
	})( false ? this.base64js = {} : exports);

/***/ },
/* 32 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !!val && '[object Array]' == str.call(val);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	(function () {
	  var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	      crypt = {
	    // Bit-wise rotation left
	    rotl: function (n, b) {
	      return n << b | n >>> 32 - b;
	    },

	    // Bit-wise rotation right
	    rotr: function (n, b) {
	      return n << 32 - b | n >>> b;
	    },

	    // Swap big-endian to little-endian and vice versa
	    endian: function (n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }

	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++) n[i] = crypt.endian(n[i]);
	      return n;
	    },

	    // Generate an array of any length of random bytes
	    randomBytes: function (n) {
	      for (var bytes = []; n > 0; n--) bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },

	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function (bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << 24 - b % 32;
	      return words;
	    },

	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function (words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8) bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a hex string
	    bytesToHex: function (bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },

	    // Convert a hex string to a byte array
	    hexToBytes: function (hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },

	    // Convert a byte array to a base-64 string
	    bytesToBase64: function (bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
	        for (var j = 0; j < 4; j++) if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
	      }
	      return base64.join('');
	    },

	    // Convert a base-64 string to a byte array
	    base64ToBytes: function (base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
	      }
	      return bytes;
	    }
	  };

	  module.exports = crypt;
	})();

/***/ },
/* 35 */
/***/ function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function (str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },

	    // Convert a byte array to a string
	    bytesToString: function (bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },

	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function (str) {
	      for (var bytes = [], i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },

	    // Convert a byte array to a string
	    bytesToString: function (bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};

	module.exports = charenc;

/***/ }
]);