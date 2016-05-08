/**
 * 我的贡献
 */
define(['../common/fileInputPreview', '../common/modal', '../common/Util'], function(FileInputPreview, Modal, U) {

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

        $('#shareSiteLi').hide();//隐藏分享网站功能

        if (!U.isLogin()) {
            alert('尚未登录，请前往登录页！');
            location.href = 'login.html';
        }
    };

    /**
     * 载入分享的条目
     * @return {[type]} [description]
     */
    var loadItems = function() {
        if (U.isOnlineMode()) {
            _loadItemsAjax(); //载入条目的Ajax请求
        } else {
            _loadItemsAjax2Dom(fakeItems2); //=============================================
        }
    };

    /**
     * 载入条目的Ajax请求
     * @return {[type]} [description]
     */
    var _loadItemsAjax = function() {
        $.ajax({
            // laravel_LTS/public/api/user/{user_id}/web
            url: 'laravel_LTS/public/api/user/' + JSON.parse(sessionStorage.loginSuccess).data.user_id + '/web',
            // url:'getContributions',
            type: 'GET',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_loadItemsAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _loadItemsAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_loadItemsAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 载入条目Ajax事件
     * @return {[type]} [description]
     */
    var _loadItemsAjax2Dom = function(json) {
        if (json.status) {
            if (json.data.length === 0) {
                $('#contributions-wrap').html('尚未贡献过站点信息');
            } else {

                // 处理列表区
                /*var htmlArr = [];
                for (var i = 0; i < json.data.length; i++) {
                    // <div class="item">
                    //     <a href="javascript:;">拉勾网</a>
                    // </div>
                    htmlArr.push('' +
                        '<div class="item"  >' +
                        '    <a web-id=' + json.data[i].web_id + ' cate-id=' + json.data[i].cate_id + ' web-free=' + json.data[i].web_free + ' web-intro="' + json.data[i].web_intro + '" web-logo=' + json.data[i].web_logo + ' web-url=' + json.data[i].web_url + ' href="javascript:;">' + json.data[i].web_name + '</a>' +
                        '</div>');
                }
                var htmlStr = htmlArr.join('');
                $('#contributions-wrap').html(htmlStr);*/

                //使用模板引擎
                var source = $("#contributions-area-template").html();
                // console.log(source);
                var template = Handlebars.compile(source);
                // console.log(template);
                var html = template(json);
                // console.log(html);
                $('#contributions-wrap').append(html);

                _clickItem2Edit();
            }

        } else {
            U.errorCode(json);
        }
    };

    /**
     * 点击条目事件
     * @return {[type]} [description]
     */
    var _clickItem2Edit = function() {
        console.log('clickItem2Edit');
        $('.item>a').unbind('click');
        $('.item>a').click(function(event) {

            U.setSelectInner($(this).attr('cate-id')); //设置下拉列表内容

            // console.log($(this).attr('cate-id'));

            $('#shareSiteModalForm').attr('web-id', $(this).attr('web-id'));

            $('#webName').val($(this).html());

            // console.log(freeVal);
            // var freeVal = $(this).attr('web-free');
            // $('input[name="web_free"][value=' + freeVal + ']').prop('checked',true);

            $('input[name="web_free"]').val([$(this).attr('web-free')]);





            $('#webUrl').val($(this).attr('web-url'));
            $('#webIntro').val($(this).attr('web-intro'));

            console.log($('#previewArea'));
            console.log($(this).attr('web-logo'));

            FileInputPreview.imgPreview($('#imgInput'), $('#previewArea'));

            $('#previewArea').css('background-image', 'url(' + $(this).attr('web-logo') + ')');

            Modal.show('#shareSiteModal');
        });
        _saveEdit();
    };

    //修改后的保存
    var _saveEdit = function() {
        // editSite
        $('#shareSiteModalForm').submit(function(event) {
            event.preventDefault();
            var formData = new FormData(this);
            console.log($(this).attr('web-id'));
            var webId = $(this).attr('web-id');
            console.log(webId);
            if (U.isOnlineMode()) {
                $.ajax({
                    // laravel_LTS/public/api/web/{web_id}
                    url: 'laravel_LTS/public/api/web/' + webId,
                    type: 'POST',
                    data: formData,
                    mimeType: "multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function(json) {
                        console.log("_saveEdit ajax success");

                        var jsonData = U.checkData(json); //检查json
                        _saveEdit2Dom(jsonData); //ajax回调
                    },
                    error: function() {
                        console.error("_saveEdit ajax failed");
                        U.ajaxFailed();
                    }
                });
            } else {
                _saveEdit2Dom({
                    status: true
                }); //==============================================
            }
        });
    };

    /**
     * 保存编辑的回调
     * @return {[type]} [description]
     */
    var _saveEdit2Dom = function(json) {
        if (json.status) {
            alert('修改成功！');
            Modal.hide('#shareSiteModal'); //关闭模态框
            location.reload();
        } else {
            U.errorCode(json);
        }
    };

    //===fakeData===========================================================

    var fakeItems = {
        status:true,
        data:[]
    };

    var fakeItems2 = {
        status: true,
        data: [{
            web_id: 1,
            cate_id: 1,
            web_free: 0,
            web_intro: '简介简介简介简介简介简介',
            web_logo: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
            web_name: 'HyG',
            web_url: 'http://gaohaoyang.github.io/'
        }, {
            web_id: 2,
            cate_id: 2,
            web_free: 1,
            web_intro: 'JavaScript高级程序设计',
            web_logo: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
            web_name: 'HyG2',
            web_url: 'http://gaohaoyang.github.io/'
        }, {
            web_id: 3,
            cate_id: 1,
            web_free: 1,
            web_intro: 'JavaScript权威指南',
            web_logo: 'http://blog.outsourcing-partners.com/wp-content/uploads/2012/11/javascript.jpg',
            web_name: 'HyG3',
            web_url: 'http://gaohaoyang.github.io/'
        }, {
            web_id: 4,
            cate_id: 4,
            web_free: 0,
            web_intro: '图解HTTP',
            web_logo: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
            web_name: 'HyG4',
            web_url: 'http://gaohaoyang.github.io/'
        }, {
            web_id: 5,
            cate_id: 3,
            web_free: 1,
            web_intro: 'bbbbbbbbbbbbbbb',
            web_logo: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
            web_name: 'HyG5',
            web_url: 'http://gaohaoyang.github.io/'
        }, {
            web_id: 6,
            cate_id: 2,
            web_free: 1,
            web_intro: '',
            web_logo: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
            web_name: 'HyG6',
            web_url: 'http://gaohaoyang.github.io/'
        }]
    };

    return {
        loadItems: loadItems, //载入条目
        loadProfile: loadProfile, //载入个人信息
        // clickItem2Edit: _clickItem2Edit, //点击条目去修改
    };
});
