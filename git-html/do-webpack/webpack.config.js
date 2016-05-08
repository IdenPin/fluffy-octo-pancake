var path = require('path');

var htmlWebpackPlugin = require('html-webpack-plugin');
var APP_PATH = path.resolve(__dirname, './src/js/index/index.js');
var BUILD_PATH = path.resolve(__dirname, './dist');
var config = {
    entry: {
        index: APP_PATH,
        //content:'./src/js/content/content.js'
    },
    output: {
        path: BUILD_PATH,
        //publicPath: './dist/',
        filename: '[name].js'
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
            test: /\.(gif|jpg|png)\??.*$/,
            loader: 'url-loader?limit=5000&name=[path][hash:8].[name].[ext]'
            //50000   大于50k
        }, {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader'
            //loader: 'url-loader?limit=50000&name=[path][name].[ext]?[hash:8]'
            //50000   大于50k
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }]
    }
    //plugins: [
    //    new htmlWebpackPlugin({
    //        title: '这是个页面标题.'
    //    })
    //]
};
module.exports = config;
