<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
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
      <a-layout-footer class="footer">by caizj</a-layout-footer>
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
