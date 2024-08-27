<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <!-- 监听点击事件 -->
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/BNUZH-ACM-Logo.jpg" alt="logo" />
            <div class="title">BNUZHOJ</div>
          </div>
        </a-menu-item>
        <!-- 使用了v-for就不能用v-if，v-for的优先级高于v-if，会导致先遍历再判断的不必要消耗 -->
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          <!-- key是这个div的一个属性，用于被高亮 -->
          {{ item.name }}</a-menu-item
        >
      </a-menu>
    </a-col>
    <a-col flex="100px"
      ><!-- 固定宽度 -->
      <div>{{ store.state.user?.loginUser.userName ?? "未登录" }}</div>
      <!-- 使用可选操作符避免出现对null取值 -->
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter(); //路由组件
// 获取全局状态信息
const store = useStore(); //是应用程序的所有组件共享的状态仓库

// 使用filter过滤出要显示的路由
const visibleRoutes = computed(() => {
  // 使用计算方法使得在发生用户状态变化时可以再次计算来更新导航栏中的展示
  return routes.filter((item) => {
    if (item.meta?.hidenInMenu) {
      return false;
    }
    return checkAccess(
      store.state.user?.loginUser,
      item?.meta?.access as string
    );
  });
});

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "管理",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  // 传入路由跳转路径并通过push设置路径进行跳转
  router.push({ path: key });
};

// 同步路由信息使相应菜单部分高亮
const selectedKeys = ref(["/"]); //默认高亮主页

// 对每一次router进行的跳转,都在跳转后做一次检测,让当前的高亮变为前往的页面
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]; //to就是一个路由，他的path是一个属性
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.logo {
  width: 64px;
}
.title {
  color: #444;
  margin-left: 16px;
}
</style>
