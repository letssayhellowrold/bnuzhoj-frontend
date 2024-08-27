import ACCESS_ENUM from "./accessEnum";

/*
    公用权限校验函数
    1. 当前用户的权限
    2. 访问页面需要的权限
*/
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前用户的权限
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN; // ?? 为备选项，当前为null则有后面的值赋值

  // 当前页面对权限无要求
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) return true;

  // 需要登陆才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 如果未登录则不能访问
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  //需要管理员的权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    //不是管理员就不行
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  // 以上都满足则放行
  return true;
};

export default checkAccess;
