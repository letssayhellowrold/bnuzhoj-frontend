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
createApp(App)
  .use(ArcoVue)
  .use(VueJsonPretty)
  .use(store)
  .use(router)
  .mount("#app");
