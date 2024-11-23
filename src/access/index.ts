import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

// 全局权限管理

router.beforeEach(async (to, from, next) => {
  // console.log(store.state.user.loginUser);
  let loginUser = store.state.user.loginUser;

  // 如果之前未登录，则自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser; // 登陆后刷新身份
  }
  // 前往的页面需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;

  // 要跳转的页面必须要登陆
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 当前却没有登录
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      // 跳转至登录页面
      next(`/user/login?redirect${to.fullPath}`); // 登录后重定向
      return;
    }
    // 如果已经登录了但是权限不足，那么跳转到无权限
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  // 最后调用next处理合法的跳转
  next();
});
