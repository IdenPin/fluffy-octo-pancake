# 芝麻开门
## 目录结构

```
Sesame
│  .gitignore
│  collections.html //收藏页
│  comment.html //评论页
│  file.html //测试文件上传页
│  index.html //首页
│  list.html //列表页
│  login.html //登录注册页
│  package.json
│  profile.html //个人信息页
│  README.md
│  webpack.config.js
│  
├─dist //编译后输出目录
│      
│      
├─laravel_LTS //php框架
│          
│              
└─src //源代码
    │  collections.js //各个入口
    │  comment.js
    │  index.js
    │  list.js
    │  login.js
    │  profile.js
    │  
    ├─css //css 全部使用 sass 编写
    │  ├─collections
    │  │      main.scss //入口
    │  │      _collections.scss //不同区域模块
    │  │      
    │  ├─comment
    │  │      main.scss
    │  │      _commentBox.scss
    │  │      _commentDetail.scss
    │  │      _webArea.scss
    │  │      
    │  ├─common //公共
    │  │      _header.scss //头部
    │  │      _modal.scss //模态框
    │  │      _reset.scss //设置默认样式
    │  │      _rightQrCode.scss //右侧二维码
    │  │      _variables.scss //各种变量
    │  │      
    │  ├─index
    │  │      main.scss
    │  │      _banner.scss
    │  │      _body.scss
    │  │      _card-area.scss
    │  │      
    │  ├─list
    │  │      main.scss
    │  │      _banner.scss
    │  │      _list.scss
    │  │      
    │  ├─login
    │  │      main.scss
    │  │      _banner.scss
    │  │      _content.scss
    │  │      _tab-area.scss
    │  │      
    │  └─profile
    │          main.scss
    │          _banner.scss
    │          _profile.scss
    │          
    ├─image //图
    │      
    └─js //js文件
        ├─collections
        │      controller.js //控制器
        │      
        ├─comment
        │      controller.js
        │      
        ├─common //公共
        │      fileInputPreview.js //照片上传前预览
        │      modal.js //模态框
        │      setAvatar.js //设置默认头像
        │      shareSite.js //分享，此模块没有使用，写入了Util模块中
        │      Util.js //工具类
        │      
        ├─index
        │      controller.js
        │      
        ├─list
        │      changeGoodHandPic.js //设置点赞手的颜色
        │      changeStarColor.js //设置点搜藏的星星
        │      controller.js
        │      
        ├─login
        │      controller.js
        │      
        └─profile
                controller.js
```

## 说明

1. 本项目完全使用了 `webpack` 去自动构建。其配置见 `webpack.config.js`。

2. **注意**，克隆本项目后，记得相关安装 npm 包，具体操作为：

    进入项目目录，在 terminal 或 cmd 中执行（需要 node 环境）：

    ```
    npm install
    ```

    会自动安装 `package.json` 下的所有依赖包。

    此时环境配置完成，执行：

    ```
    webpack -w
    ```

    即可自动编译，构建。

3. 目录结构看懂后，具体代码细节请查看代码的注释，基本每个部分都写了详细的注释。

4. 对于 `css` 代码的修改，直接在 `src/css` 下进行修改即可，不要乱改已有的 `id`, `class`的名称和自定义的属性名称，除非了解前因后果。

## 关于 `webpack`
不熟悉 `webpack` 的小伙伴，可以参考以下资料：
* [Webpack，101入门体验](http://www.html-js.com/article/3009)
* [Webpack 入门指迷](http://segmentfault.com/a/1190000002551952)

或者自行 Google 相关资料。
