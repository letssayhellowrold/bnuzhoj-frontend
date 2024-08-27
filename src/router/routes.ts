import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    meta: {
      hidenInMenu: true,
    },
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "首页",
    component: HomeView,
  },
  {
    path: "/about",
    name: "题目列表",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/about",
    name: "隐藏页",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    meta: {
      hidenInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "管理员页面",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AdminView.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NoAuthView.vue"),
  },
];
