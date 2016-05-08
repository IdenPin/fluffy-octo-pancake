
/**
 * 个人中心模块
 */
define(['../common/Util'], function (U) {

    var _profileJson; //个人信息

    /**
     * 载入个人功能信息区
     * @return {[type]} [description]
     */
    var loadProfile = function () {
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
     * 获取个人信息方法
     * @return {[type]} [description]
     */
    var getPersonalInfo = function () {
        if (U.isLogin()) { //已登录
            if (!U.isOnlineMode()) { //线上模式
                _getPersonalInfoAjax();
            } else {
                _getPersonalInfoAjax2Dom(fakeGetPersonalInfo); //-----------------------------------
            }
        } else {
            alert('尚未登录，请前往登录页。');
            location.href = 'login.html';
            // var c = confirm('尚未登录，是否前往登录页？');
            // if (c) {
            //     location.href = 'login.html';
            // }
        }
    };

    /**
     * 获取个人信息 Ajax 请求
     * @return {[type]} [description]
     */
    var _getPersonalInfoAjax = function () {
        $.ajax({
            // laravel_LTS/public/api/user/{user_id}
            url: 'laravel_LTS/public/api/user/' + JSON.parse(sessionStorage.loginSuccess).data.user_id,
            type: 'GET',
            // dataType: 'json',
            // data: {
            //     user_id: userId,
            //     web_id: webId
            // },
            success: function (json) {
                console.log("_getPersonalInfoAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _getPersonalInfoAjax2Dom(jsonData); //ajax回调
            },
            error: function () {
                console.error("_getPersonalInfoAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 取得用户信息的回调函数
     * @param  {Object} json 回调json对象
     * @return {[type]}      [description]
     */
    var _getPersonalInfoAjax2Dom = function (json) {
        if (json.status) {
            _profileJson = json.data;
            $('#personal-name').html(json.data.user_nickname);
            //头像
            if (_judgeEmpty(json.data.user_avatar)) {
                $('#personal-avatar').attr('src', require('../../image/avatar.jpg'));
                // SetAvatar.setUserAvatar();
            } else {
                $('#personal-avatar').attr('src', json.data.user_avatar);
                // SetAvatar.setUserAvatar(json.data.user_avatar);
            }
            //昵称
            if (_judgeEmpty(json.data.user_nickname)) {
                $('#nick-name').html('无');
            } else {
                $('#nick-name').html(json.data.user_nickname);
            }
            //简介
            if (_judgeEmpty(json.data.user_intro)) {
                $('#info').html('无');
            } else {
                $('#info').html(json.data.user_intro);
            }
            //联系方式
            if (_judgeEmpty(json.data.user_mobile)) {
                $('#number').html('无');
            } else {
                $('#number').html(json.data.user_mobile);
            }
            //公司
            if (_judgeEmpty(json.data.user_org)) {
                $('#org').html('无');
            } else {
                $('#org').html(json.data.user_org);
            }
            //领域
            if (_judgeEmpty(json.data.user_focus_area)) {
                $('#area').html('无');
            } else {
                $('#area').html(json.data.user_focus_area);
            }
            //职务
            if (_judgeEmpty(json.data.user_position)) {
                $('#position').html('无');
            } else {
                $('#position').html(json.data.user_position);
            }

            //左上角齿轮
            $('.gear').attr('src', require('../../image/gear.png'));
            _clickGear(); //点击齿轮事件
        } else {
            U.errorCode(json);
        }
    };

    /**
     * 判断是否为空
     * @param  {[type]} s [description]
     * @return {[type]}   [description]
     */
    var _judgeEmpty = function (s) {
        if (s === '' || s === undefined || s === 0) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 点击齿轮事件
     * @return {[type]} [description]
     */
    var _clickGear = function () {
        $('.gear').unbind('click');
        $('.gear').click(function (event) {
            event.preventDefault();
            // console.log('gear');
            // $('.show-profile').fadeOut(400);

            _showOriginProfile(); //显示旧的信息
            $('.show-profile').hide();
            $('.edit-profile').fadeIn(300);

        });
    };

    /**
     * 将旧的信息显示到编辑页面
     * @return {[type]} [description]
     */
    var _showOriginProfile = function () {
        console.log(_profileJson);

        $('#editAvatar').css('background-image', 'url(' + _profileJson.user_avatar + ')');
        $('#editNickname').val(_profileJson.user_nickname);
        $('#editIntro').val(_profileJson.user_intro);
        $('#editMobile').val(_profileJson.user_mobile);
        $('#editOrg').val(_profileJson.user_org);
        $('#editPos').val(_profileJson.user_position);
        $('#editFocus').val(_profileJson.user_focus_area);
    };

    /**
     * 编辑个人信息功能
     * @return {[type]} [description]
     */
    var editProfile = function () {
        _clickCancelEdit(); //点击取消编辑
        _clickSaveProfile(); //点击保存编辑
    };

    /**
     * 取消编辑
     * @return {[type]} [description]
     */
    var _clickCancelEdit = function () {
        $('#cancelEditProfile').unbind('click');
        $('#cancelEditProfile').click(function (event) {
            event.preventDefault();
            $('.edit-profile').hide();
            $('.show-profile').fadeIn(300);
        });
    };

    /**
     * 保存编辑修改
     * @return {[type]} [description]
     */
    var _clickSaveProfile = function () {
        $('#editProfileSubmit').submit(function (event) {
            event.preventDefault();
            var formData = new FormData(this);
            if (U.isOnlineMode()) { //线上模式
                $.ajax({
                    //laravel_LTS/public/api/user/{user_id}
                    url: 'laravel_LTS/public/api/user/' + JSON.parse(sessionStorage.loginSuccess).data.user_id,
                    type: 'POST',
                    data: formData,
                    mimeType: "multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (json) {
                        console.log("_clickSaveProfile ajax success");

                        var jsonData = U.checkData(json); //检查json
                        _clickSaveProfile2Dom(jsonData); //ajax回调
                    },
                    error: function () {
                        console.error("_clickSaveProfile ajax failed");
                        U.ajaxFailed();
                    }
                });
            } else {
                _clickSaveProfile2Dom({ //==================================================
                    status: true
                });
            }
        });
    };

    /**
     * 修改个人信息的 Ajax 回调
     * @param  {Object} json [description]
     * @return {[type]}      [description]
     */
    var _clickSaveProfile2Dom = function (json) {
        if (json.status) {


            //从新请求
            $.ajax({
                // laravel_LTS/public/api/user/{user_id}
                url: 'laravel_LTS/public/api/user/' + JSON.parse(sessionStorage.loginSuccess).data.user_id,
                type: 'GET',
                // dataType: 'json',
                // data: {
                //     user_id: userId,
                //     web_id: webId
                // },
                success: function (json) {
                    console.log("_getPersonalInfoAjax ajax success");
                    var jsonData = U.checkData(json); //检查json
                    // _getPersonalInfoAjax2Dom(jsonData); //ajax回调
                    var loginSuccess = JSON.parse(sessionStorage.loginSuccess);
                    loginSuccess.data.user_avatar = jsonData.data.user_avatar;
                    //携带信息
                    sessionStorage.loginSuccess = JSON.stringify(loginSuccess);
                    alert('修改成功！');
                    location.reload();
                },
                error: function () {
                    console.error("_getPersonalInfoAjax ajax failed");
                    U.ajaxFailed();
                }
            });


        } else {
            U.errorCode(json);
        }
    };

    /**
     * 上传预览
     * @return {[type]} [description]
     */
    var uploadPreivew = function () {
        $('.uploadImage').uploadPreview({
            width: '145px',
            height: '145px',
            backgroundSize: 'cover',
            fontSize: '16px',
            borderRadius: '145px',
            border: '2px solid #dedede',
            // lang: 'en', //language
        });
    };
    /*
     * 图像截取弹层
     * */
    $('#editAvatar').click(function () {
        $('.mask').show();
        $('#subImgModal').css({
            'display': 'block',
            'opacity': 1
        });
        var options = {
            thumbBox: '.thumbBox',
            spinner: '.spinner',
            //读取默认图片
            //imgSrc: ''
            //imgSrc: _profileJson.user_avatar
        };
        var cropper = $('.imageBox').cropbox(options);
        $('#upload-file').on('change', function () {
            var reader = new FileReader();
            reader.onload = function (e) {
                options.imgSrc = e.target.result;
                cropper = $('.imageBox').cropbox(options);
                //getImg();
            };
            reader.readAsDataURL(this.files[0]);
            this.files = [];
            //getImg();
        });
        function getImg() {
            var img = cropper.getDataURL();
            //$('.cropped').html('');

            $('#thumbnail').attr('src', img).show();
        }

        $(".imageBox").on("mouseup", function () {
            getImg();
        });
        $('#btnZoomIn').on('click', function () {
            cropper.zoomIn();
        });
        $('#btnZoomOut').on('click', function () {
            cropper.zoomOut();
        });
        $('#confirmBtn').click(function () {
            $('.close').click();
            $('#editAvatar').css('background-image', 'url(' + cropper.getDataURL() + ')');
        })
    });
    //关闭弹层
    $('.close').click(function () {
        $(this).parent().hide();
        $('.mask').hide();
    });


    //fake data
    //==========================================================================

    var fakeGetPersonalInfo = {
        status: true,
        data: {
            user_avatar: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
            user_focus_area: '航空航天',
            user_intro: '红旗下的蛋',
            user_mobile: 12345678901,
            user_nickname: '川辙',
            user_org: 'Demo++',
            user_position: 'FE',
        }
    };

    return {
        uploadPreivew: uploadPreivew, //图片上传预览
        loadProfile: loadProfile, //载入个人功能信息区
        getPersonalInfo: getPersonalInfo, //得到个人信息
        editProfile: editProfile, //编辑个人信息
    };
});