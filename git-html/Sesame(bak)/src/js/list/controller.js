/**
 * 列表页的控制器
 *
 * 基本的逻辑
 * 非Ajax的Dom操作
 */


console.log('list controller');

/**
 * 定义模块
 */
define(['../common/Util', './changeGoodHandPic', './changeStarColor'], function(U, ChangeGoodHandPic, ChangeStarColor) {

    /**
     * 载入个人信息功能区
     * @return {[type]} [description]
     */
    var loadProfile = function() {
        U.loadAvatar(); //载入头像

        /**
         * 个人中心功能区
         */
        U.profileFunction();
    };

    /**
     * 载入列表区
     * @return {[type]} [description]
     */
    var loadList = function() {
        if (U.isOnlineMode()) {
            var cateId = location.hash.substr(1);
            _loadListAjax(cateId); //载入列表的Ajax请求
        } else {
            _loadListAjax2Dom(fakeList); //=========================================================================
        }
    };

    /**
     * 载入列表的Ajax请求
     * @param  {String} cateId 分类id
     * @return {[type]}        [description]
     */
    var _loadListAjax = function(cateId) {
        $.ajax({

            url: 'laravel_LTS/public/api/sites/' + cateId,
            type: 'POST',
            // dataType: 'json',
            // data: {
            //     username: name,
            //     password: password,
            // },
            success: function(json) {
                console.log("_loadListAjax ajax success");

                var jsonData = U.checkData(json); //检查json
                _loadListAjax2Dom(jsonData); //ajax回调

            },
            error: function() {
                console.error("_loadListAjax ajax failed");
                U.ajaxFailed();
            }
        });
    };

    /**
     * 载入列表Ajax回调
     * @param  {Object} json 回调数据
     * @return {[type]}      [description]
     */
    var _loadListAjax2Dom = function(json) {
        if (json.status) { //回调成功，载入列表

            //处理网页title
            $('title').html('芝麻开门-' + json.data.title);

            //处理banner
            $('#bannerH1').html(json.data.title);

            // 处理列表区
            /*var htmlArr = [];
            for (var i = 0; i < json.data.list.length; i++) {

                htmlArr.push('' +
                    '<li detail=' + json.data.list[i].web_id + '>' +
                    '   <div class="left">' +
                    '       <div class="logo-wrap">' +
                    '           <span><a href=' + json.data.list[i].web_url + ' target="_blank"><img class="logo" src=' + json.data.list[i].web_logo + '></a></span>' +
                    '       </div>' +
                    '       <div class="good" web-id=' + json.data.list[i].web_id + ' like-num=' + json.data.list[i].web_num_like + ' liked=' + json.data.list[i].liked + '>');
                if (json.data.list[i].liked) { //点过赞
                    htmlArr.push('' +
                        '       <img class="hand" status=1>');
                } else {
                    htmlArr.push('' +
                        '       <img class="hand" status=0>');
                }
                htmlArr.push('' +
                    '       <span class="number">' + json.data.list[i].web_num_like + '</span>' +
                    '       </div>' +
                    '   </div>' +
                    '   <div class="right">');
                if (json.data.list[i].selected) { //收藏过
                    htmlArr.push('' +
                        '   <img class="star" status=1 web-id=' + json.data.list[i].web_id + '>');
                } else {
                    htmlArr.push('' +
                        '   <img class="star" status=0 web-id=' + json.data.list[i].web_id + '>');
                }
                htmlArr.push('' +
                    '   </div>' +
                    '   <div class="mid">' +
                    '       <div class="title"><a href=' + json.data.list[i].web_url + ' target="_blank">' + json.data.list[i].web_name + '</a></div>');
                if (json.data.list[i].web_free) {
                    htmlArr.push('' +
                        '   <span class="pay free">免费</span>');
                } else {
                    htmlArr.push('' +
                        '   <span class="pay charge">收费</span>');
                }

                htmlArr.push('' +
                    '       <p>' + json.data.list[i].web_intro + '</p>' +
                    '   </div>' +
                    '</li>');
            }
            var htmlStr = htmlArr.join('');
            $('#list').html(htmlStr);*/

            //使用模板引擎
            var source = $("#list-area-template").html();
            var template = Handlebars.compile(source);
            var html = template(json.data);
            $('#list').append(html);

            _solveLikedAndSelected(); //处理赞和收藏
            _clickItem(); //点击条目事件监听
            _clickLike(); //点赞监听
            _clickCollect(); //收藏监听
        } else {
            U.errorCode(json);
        }
    };

    /**
     * 点赞
     * @return {[type]} [description]
     */
    var _clickLike = function() {
        $('#list .good').unbind('click'); //取消点击监听
        $('#list .good').click(function(event) {
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
        $('#list .star').unbind('click');
        $('#list .star').click(function(event) {
            event.preventDefault(); //阻止默认事件
            event.stopPropagation(); //阻止事件冒泡
            // alert('收藏功能完善中！');
            // console.log($(this).attr('web-id'), $(this).attr('status'));
            U.clickSelect($(this).attr('web-id'), $(this).attr('status'));
        });
    };

    /**
     * 点击item后的跳转到详情事件
     * 监听li的点击
     * @return {[type]} [description]
     */
    var _clickItem = function() {

        //阻止冒泡
        //阻止a标签冒泡
        $('#list a').click(function(event) {
            event.stopPropagation();
        });

        $('#list li').unbind('click');
        $('#list li').click(function(e) {
            e.preventDefault();
            window.open('comment.html#' + $(this).attr('detail')); //跳转到详情页
        });
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


    var fakeList = {
        status: true,
        data: {
            title: '摇滚盛宴', //当前列表页标题
            list: [{
                web_id: 1,
                web_name: '谢天笑牛逼',
                web_logo: 'http://ent.cntv.cn/20100722/images/1279781438641_1279781438641_r.jpg',
                web_intro: '土摇不爱谢天笑，注定一生没妞操。屌丝不哼陈奕迅，撸管都不会有劲。屌丝不往南方开，纸巾用完算活该。谁若不爱周杰伦，微信摇完没有人。现场不看杨臣刚，注定媳妇左手当。农金不听凤凰传，听尽神曲也枉然。少年不听小虎队，老来望逼空流泪。甜歌不听扬钰莹，床上小妞不呻吟。姑娘不知大小乔，干爹白操不给包。雷鬼不听龙神道，上床带套也会掉。帅富不听贾比宝，女神今晚不给草。屌丝不听李逼逼，注定天打又雷劈。乐经来了不痛经，二手玫瑰最省心。民歌不谈彭丽媛，没有资格当党员。英伦不听大绿洲，出门一准被人抽。文艺不聊邵小毛，女文青呀没的搞。民谣不去听贤良，老来活该站街旁。英伦不听山羊皮 迟早变成臭傻逼。草莓不看苏打绿，神器约炮永没戏。电音不听石头哥，娶到老婆是假波。',
                web_url: 'http://www.lagou.com/',
                web_free: false, //免费
                web_num_like: 888, //点赞数
                liked: 1, //是否点过赞
                selected: 0, //是否收藏过
            }, {
                web_id: 2,
                web_name: '涅槃乐队',
                web_logo: 'http://sh.sinaimg.cn/2009/1217/2009121721431.jpg',
                web_intro: '拉钩是找工作的好网站',
                web_url: 'http://www.lagou.com/',
                web_free: true, //免费
                web_num_like: 9, //点赞数
                liked: 0, //是否点过赞
                selected: 1, //是否收藏过
            }, {
                web_id: 3,
                web_name: '雷鬼之父鲍勃马力',
                web_logo: 'http://7xavvn.com2.z0.glb.qiniucdn.com/01/1360185853520_kxw65a.jpg',
                web_intro: '拉钩是找工作的好网站',
                web_url: 'http://www.lagou.com/',
                web_free: true, //免费
                web_num_like: 818, //点赞数
                liked: 0, //是否点过赞
                selected: 0, //是否收藏过
            }, {
                web_id: 888,
                web_name: '雷鬼之父鲍勃马力',
                web_logo: 'http://7xavvn.com2.z0.glb.qiniucdn.com/01/1360185853520_kxw65a.jpg',
                web_intro: '拉钩是找工作的好网站',
                web_url: 'http://www.lagou.com/',
                web_free: true, //免费
                web_num_like: 999, //点赞数
                liked: 0, //是否点过赞
                selected: 0, //是否收藏过
            }, {
                web_id: 456,
                web_name: '雷鬼之父鲍勃马力',
                web_logo: 'http://7xavvn.com2.z0.glb.qiniucdn.com/01/1360185853520_kxw65a.jpg',
                web_intro: '拉钩是找工作的好网站',
                web_url: 'http://www.lagou.com/',
                web_free: true, //免费
                web_num_like: 818, //点赞数
                liked: 0, //是否点过赞
                selected: 0, //是否收藏过
            }, {
                web_id: 444,
                web_name: '雷鬼之父鲍勃马力',
                web_logo: 'http://7xavvn.com2.z0.glb.qiniucdn.com/01/1360185853520_kxw65a.jpg',
                web_intro: '拉钩是找工作的好网站',
                web_url: 'http://www.lagou.com/',
                web_free: true, //免费
                web_num_like: 818, //点赞数
                liked: 0, //是否点过赞
                selected: 0, //是否收藏过
            }, {
                web_id: 9999,
                web_name: '雷鬼之父鲍勃马力',
                web_logo: 'http://7xavvn.com2.z0.glb.qiniucdn.com/01/1360185853520_kxw65a.jpg',
                web_intro: '拉钩是找工作的好网站',
                web_url: 'http://www.lagou.com/',
                web_free: true, //免费
                web_num_like: 818, //点赞数
                liked: 0, //是否点过赞
                selected: 0, //是否收藏过
            }]
        }
    };

    return {
        loadProfile: loadProfile, //载入个人信息功能区
        loadList: loadList //载入列表区
    };
});
