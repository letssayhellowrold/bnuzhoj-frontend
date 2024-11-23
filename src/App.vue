<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <!--  默认视图 -->
      <router-view />
    </template>
    <template v-else> <BasicLayout /></template>
  </div>
</template>

<script setup lang="ts">
import BasicLayout from "./layouts/BasicLayout.vue";

import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
// 全局项目入口，书写全局单次调用的代码
const doInit = () => {
  console.log("welcome bnuzh-oj");
};
// onMounted生命周期钩子，在组件挂载后立即被调用，适用于初始化逻辑
onMounted(() => {
  doInit();
});

const debounce = (callback, delay) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 20);
    super(callback);
  }
};
</script>

<style>
#app {
  user-select: none;
}
</style>
