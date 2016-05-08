/**
 * 登录页的控制器
 *
 * 基本的逻辑
 * 非Ajax的Dom操作
 */

//引入加密模块
var sha1 = require('sha1');

/**
 * 定义模块
 */
define(['../common/Util', '../common/setAvatar'], function(U, SetAvatar) {

    var registerEmail = false; //验证邮箱
    var registerPassword = false; //验证密码

    /**
     * 处理顶部要在载入的内容
     * @return {[type]} [description]
     */
    var loadProfile = function() {
        /**
         * 载入右上角头像
         */
        U.loadAvatar();

        //载入banner
        _loadBanner();

        $('.top-nav-profile>ul').hide(); //无用功能都给我滚
        $('.nav-three').hide();
        $('.nav-share').hide();
    };

    /**
     * load Banner background image
     * @return {[type]} [description]
     */
    var _loadBanner = function() {
        // console.log('banner');
        // $('.banner').css('background', require("../../image/loginBanner.png");
        // $('.banner').css('background', 'url(require("../../image/loginBanner.png"))');
        // $('.banner').css('background','red');
        var img = require("../../image/loginBanner.jpg");
        $('.banner').css('background', 'url(' + img + ')');
    };

    /**
     * 已经登录
     * 让用户直接访问首页
     * @return {[type]} [description]
     */
    var alreadyLogin = function() {

        if (U.isLogin()) {
            alert('您已登录，请直接访问首页！');
            location.href = 'index.html';
        }
    };

    /**
     * 控制 tab 切换
     * @return {[type]} [description]
     */
    var tab = function() {
        $('[tab-name]').unbind('click');
        $('[tab-name]').click(function(event) {
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
    var _hideTabContent = function() {
        $('[tab-content]').hide();
        $('[tab-content] input').val(''); //清空 input 内容
        $('.tip').hide(); //提示文字清除
    };

    /**
     * 移除 tab 上的 active 样式
     */
    var _removeTabActive = function() {
        $('div[tab-name]').removeClass('active');
    };

    /**
     * 校验邮箱是否被使用过
     * @return {[type]} [description]
     */
    var verifyEmailUsed = function() {
        $('#register-email').off('focusout');
        $('#register-email').focusout(function(event) {
            event.preventDefault();
            if ($(this).val().trim() !== '') { //输入内容不为空时才验证
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
    var _verifyEmailUsedAjax = function(email) {
        $.ajax({
            //  laravel_LTS/public/api/auth/register/email/{email}
            url: 'laravel_LTS/public/api/auth/register/email/' + email,
            type: 'GET',
            // dataType: 'json',
            // data: {
            // },
            success: function(json) {
                console.log("_verifyEmailUsedAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _verifyEmailUsedAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_verifyEmailUsedAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 验证邮箱是否被注册过的 Ajax 回调方法
     * @param  {Object} json 回调数据 json 对象
     */
    var _verifyEmailUsedAjax2Dom = function(json) {
        if (json.status) {
            if (json.data.used) {
                $('#tip-email').html('* 对不起，邮箱已经注册');
                $('#tip-email').fadeIn(300);
                registerEmail = false;
            } else {
                $('#tip-email').hide();
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
    var verifyPasswordLength = function() {
        $('#register-password').off('focusout');
        $('#register-password').focusout(function(event) {
            event.preventDefault();
            if ($(this).val().trim().length < 6) {
                $('#tip-password').html('* 密码长度不少于6位！');
                $('#tip-password').fadeIn(300);
                registerPassword = false;
            } else {
                $('#tip-password').hide();
                registerPassword = true;
            }
        });
    };

    /**
     * 注册功能的实现
     * @return {[type]} [description]
     */
    var register = function() {
        $('#registerForm').submit(function(event) {
            event.preventDefault();
            console.log('aaaaaaaaaaaaa');

            var nickname = $('#register-nickname').val().trim();
            var email = $('#register-email').val().trim();
            var password = $('#register-password').val().trim();
            var password2 = $('#register-password2').val().trim();
            if (nickname === '') {
                $('#tip-nick').html('* 请填写昵称！');
                $('#tip-nick').fadeIn(200);
            } else if (email === '') {
                $('#tip-email').html('* 请输入邮箱！');
                $('#tip-email').fadeIn(200);
            } else if (password === '') {
                $('#tip-password').html('* 请输入密码！');
                $('#tip-password').fadeIn(200);
            } else if (password2 === '') {
                $('#tip-password2').html('* 请再次输入密码！');
                $('#tip-password2').fadeIn(200);
            } else if (password !== password2) {
                $('#tip-password2').html('* 两次输入密码不一致！');
                $('#tip-password2').fadeIn(200);
            } else
            if (registerEmail && registerPassword) {
                if (U.isOnlineMode()) {
                    _registerAjax($('#register-email').val().trim(), $('#register-password').val().trim(), nickname); //注册的 Ajax
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
    var _registerAjax = function(email, password, nickname) {
        $.ajax({
            //   laravel_LTS/public/api/auth/register
            url: 'laravel_LTS/public/api/auth/register',
            type: 'POST',
            dataType: 'json',
            data: {
                user_email: email,
                user_pass: sha1(password),
                user_nickname: nickname,
            },
            success: function(json) {
                console.log("_registerAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _registerAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
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
    var _registerAjax2Dom = function(json) {
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
    var login = function() {
        $('#loginForm').submit(function(event) {
            event.preventDefault();

            var name = $('#loginName').val().trim();
            var password = $('#loginPassword').val().trim();

            if (name === '') {
                $('#tip-email-login').html('* 请输入账号！');
                $('#tip-email-login').fadeIn(200);
            } else if (password === '') {
                $('#tip-password-login').html('* 请输入密码！');
                $('#tip-password-login').fadeIn(200);
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
    var _loginAjax = function(name, password) {
        $.ajax({

            url: 'laravel_LTS/public/api/auth/login',
            type: 'POST',
            dataType: 'json',
            data: {
                username: name,
                password: sha1(password)
            },
            success: function(json) {
                console.log("_loginAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _loginAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
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
    var _loginAjax2Dom = function(json) {
        if (json.status) { //登录成功
            //携带信息
            sessionStorage.loginSuccess = JSON.stringify(json);
            //跳转到主页
            location.href = "index.html";
        } else { //登录失败
            if (json.errorCode === 1011) {
                $('#tip-password-login').html('* 对不起，密码输入错误');
                $('#tip-password-login').fadeIn(200);
            } else {
                U.errorCode(json);
            }
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

    var fakeLogin2 = {
        status: false,
        errorCode: 1011
    };

    var fakeLogin = {
        status: true,
        data: {
            user_id: 521,
            user_name: '川辙',
            // user_avatar: '',
            user_avatar: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
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
});
