<script setup lang="ts"></script>

<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space
          ><img src="../assets/BNUZH-ACM-Logo.jpg" alt="logo" class="logo" />
          <div>bnuzh oj</div>
        </a-space>
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
#userLayout {
  text-align: center;
}
#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header {
  margin-top: 16px;
  //margin-bottom: 16px;
}
#userLayout .content {
  margin-bottom: 10px;
  padding: 20px;
}
#userLayout .footer {
  //background: #efefef;
  padding: 1rem;
  position: sticky;
  /* 粘性保证在底部 */
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
