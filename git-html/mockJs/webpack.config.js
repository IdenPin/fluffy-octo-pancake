// webpack.config.js
var path = require("path");

module.exports = {
    entry: { // 入口
        app:'./src/app.js',
        //data: './src/mockData.js'
    },
    output: {
        path: path.join(__dirname, 'dist'), //打包输出的路径
        publicPath: "./dist/", //html引用路径，在这里是本地地址。
        filename: '[name].js' //打包后的名字
    },
    // 新添加的module属性
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.(jpg|png|svg)$/,
            loader: "url?limit=8192"
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }]
    },
    resolve: {
        alias: {
            jquery: "./src/js/libs/jquery-2.1.4.min.js"
        }
    },
};

// http://stackoverflow.com/a/23374129/5346472
// about jquery and webpack
// http://react-china.org/t/webpack-jquery-bootstrap/1669/11
// http://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack
