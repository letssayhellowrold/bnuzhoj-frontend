<script setup lang="ts">
import { onMounted } from "vue";
import GlobalHeader from "@/components/GlobalHeader.vue";

// 定义一个函数来创建并插入脚本
const loadScript = () => {
  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src =
    "http://localhost:8080/api/application/embed?protocol=http&host=localhost:8080&token=2e23870d14a7f1ba";
  document.head.appendChild(script);
};

// 使用onMounted钩子在组件挂载后调用loadScript函数
onMounted(loadScript);
</script>

<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
        <!-- 动态页面路由 -->
      </a-layout-content>

      <a-layout-footer class="footer">by Zejun Cai</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
/* 使用scoped会将style中的内容局限在当前文件对应的类上 */
#basicLayout .header {
  margin-bottom: 10px;
  box-shadow: #eee 1px 1px 5px;
}
#basicLayout .content {
  /* 渐变色背景 */
  background: linear-gradient(to left, #fdfdfd, #fff);
  margin-bottom: 10px;
  padding: 20px;
}
#basicLayout .footer {
  background: #efefef;
  padding: 1rem;
  position: sticky;
  /* 粘性保证在底部 */
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
