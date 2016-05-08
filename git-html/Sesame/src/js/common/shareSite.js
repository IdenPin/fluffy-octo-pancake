/**
 * 监听分享按钮
 *
 * 这个模块没有被使用，因为会出现
 * A引用B，B引用A的问题，所以就把部分代码写到A里了，即Util中
 *
 */
define(['./modal', './Util' /*,'../libs/ajaxfileupload'*/ ], function(Modal, U) {
    //不知道为什么这里引入jquery插件一直都有问题，所以我放到html中的<script>中了
    //后来没有使用这个插件

    /**
     * 分享网站
     * @return {[type]} [description]
     */
    var shareSite = function() {
        $('#shareSiteBtn').unbind('click'); //清除点击事件监听，避免重复监听
        $('#shareSiteBtn').click(function(event) {
            event.preventDefault();

            var name = $('#webName').val().trim(); //网站名称

            var free = $('input[name=free]:checked').val(); //是否免费

            var cateId = $('#webCate').val(); //分类

            var url = $('#webUrl').val().trim(); //url

            var intro = $('#webIntro').val().trim(); //简介

            var logo = $('#imgInput').val(); //图片

            console.log(name, free, cateId, url, intro, logo);
            console.log(typeof Boolean(free), Boolean(free));
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
                if (U.isOnlineMode()) {
                    console.log('ajax');
                    _addSiteAjax(name, Boolean(free), cateId, url, intro); //添加站点的Ajax
                } else {
                    console.log('benditest');
                    _addSiteAjax2Dom(fakeAdd);
                }
            }
        });
    };

    /**
     * 添加站点的Ajax
     * @param {String} name   网站名称
     * @param {String} free   是否免费
     * @param {Number} cateId 分类
     * @param {String} url    url
     * @param {[type]} logo   [description]
     * @param {String} intro  简介
     */
    var _addSiteAjax = function(name, free, cateId, url, intro) {

        $.ajaxFileUpload({
            url: 'laravel_LTS/public/api/sites', //用于文件上传的服务器端请求地址
            secureuri: false, //一般设置为false
            fileElementId: 'imgInput', //文件上传空间的id属性  <input type="file" id="file" name="file" />
            dataType: 'json', //返回值类型 一般设置为json
            type: 'POST',
            data: {
                cate_id: cateId,
                web_free: free,
                web_intro: intro,
                web_name: name,
                web_url: url
            },
            success: function(json) {
                console.log("_addSiteAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _addSiteAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_addSiteAjax ajax failed");
                U.ajaxFailed();
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
            U.errorCode(json);
        }
    };

    var fakeAdd = {
        status: true
    };

    return {
        shareSite: shareSite //分享网站
    };

});
