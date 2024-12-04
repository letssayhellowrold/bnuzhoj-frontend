import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated/user";

// getters 获取对象的系列方法
// const getters = {};

export default {
  namespaced: true,
  //state 状态信息
  state: () => ({
    // 存用户信息
    loginUser: {
      userName: "未登录",
    },
  }),
  // actions 执行异步操作并出发mutations的更改(异步)
  actions: {
    // async getLoginUser({ commit, state }, payload) {
    async getLoginUser({ commit, state }) {
      // 从远程获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        // 使用commit方法提交一个mutation，用于同步地改变状态
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  // mutations 更新变量的方法(同步)
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>; //断言类型为任意值
