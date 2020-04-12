// 0. 导入 vue 模块
import Vue from "vue"
// 导入bootstrap 样式
import "bootstrap/dist/css/bootstrap.min.css"
// 1. 导入路由
import router from "./router"
// 2. 使用 mini-ui 组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);
// 3. 引入 mui 样式
import "./lib/mui/dist/css/mui.min.css"


import app from "./app.vue"
let vm = new Vue({
    el: "#app",
    render: c => c(app),
    router: router
});
