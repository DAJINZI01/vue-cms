const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 这个配置文件，其实就是一个 js 文件，通过 Node 中的某块操作，向外暴露了一个配置对象
module.exports = {
    mode: "development",
    // 在配置文件中，指定入口和出口
    entry: path.join(__dirname, './src/main.js'),
    output: {
        // 输出文件相关配置
        path: path.join(__dirname, './dist'), // 打包好的文件存放的位置
        filename: "bundle.js" // 指定 输出的文件名称
    },
    plugins: [
        // 插件，负责将html加载到内存中
        new htmlWebpackPlugin({
            // 指定模板页面的路径，根据这个生成指定的内存页面
            template: path.join(__dirname, "./src/index.html"),
            // 指定生成页面的名称
            filename: "index.html"
        }),
        new VueLoaderPlugin()
    ],
    module: {
        // 这个节点用来配置所有的第三方模块加载器
        rules: [
            // 所有第三方模块的匹配规则
            {test: /.*?\.css$/, use: ["style-loader", "css-loader"]}, // 匹配css样式文件的规则
            {test: /.*?\.less$/, use: ["style-loader", "css-loader", "less-loader"]}, // 匹配less样式文件的规则
            {test: /.*?\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]}, // 匹配scss样式文件的规则
            {test: /.*?\.(jpg|jpeg|png|bmp|gif)$/, loader: "url-loader", options: {esModule: false, limit: 20642, name: "[hash:8]-[name].[ext]"}}, // 匹配图片url地址 limit 限制图片的大小
            {test: /.*?\.(ttf|eot|svg|woff|woff2)$/, loader: "url-loader", options: {esModule: false}},
            // 通过exclude将node_modules 目录排除掉
            // 1. 如果不排除 node_modules 则，webpack 会把其中所有的第三方文件都打包编译，这样会非常消耗资源，非常慢
            // 2. 哪怕转换完成，项目也无法运行
            {test: /.*?\.js$/, use: "babel-loader", exclude: /node_modules/},
            {test: /.*?\.vue/, use: "vue-loader"}
        ]
    },
};