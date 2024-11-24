import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
// 使用Arco-design组件库
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/access";
// 引入markdown组件
import "bytemd/dist/index.css";
// 美化 json 数据
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

// 创建Vue应用实例
const app = createApp(App);

// 使用插件和配置
app.use(ArcoVue);
app.use(VueJsonPretty);
app.use(store);
app.use(router);

// 挂载Vue应用
app.mount("#app");
