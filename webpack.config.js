const path = require('path');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const publish_path = path.resolve(__dirname, 'dist/');

let config = {
    entry: {
        app: path.join(__dirname, 'app.js')
    },
    context: path.resolve(__dirname, "static"),
    output: {
        filename: 'app.js',
        path: publish_path, //告诉webpack将文件生成到这个路径下
        publicPath: ASSET_PATH, //告诉webpack-dev-server静态资源的存放路径
        pathinfo: true
    },
    module: {
        rules: []
    },
    plugins: [
        new copyWebpackPlugin([{ 
            from: path.resolve(__dirname, "static"),
            to: path.resolve(publish_path)
        }])
    ],
    resolve: {
        alias: {
        }
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        host: "0.0.0.0",
        port: 8082,
        publicPath: '/',
        proxy: require(path.resolve(__dirname, 'localsproxy/index.js')),
        allowedHosts: ['easfrontend.local.com'], //允许访问devServer的域名白名单(注意：disableHostCheck这个属性必须设置为false),需要配电脑配hosts
        open: true, //打开默认浏览器
        openPage: 'index.html', //指定自动打开的页面
        disableHostCheck: true, //设置server绕过host检查(默认情况下只有与host属性一致才会通过,这导致用自己的ip都无法访问)
        useLocalIp: true, //打开浏览器去时使用本机Ip(注意：disableHostCheck属性必须设置为true)
    }
}

module.exports = config;