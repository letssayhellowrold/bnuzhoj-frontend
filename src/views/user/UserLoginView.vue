<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: auto"
      auto-label-width
      label-align="left"
      :model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style>
/*去除ie edge的密码框默认的快速清除钮（X图标）以及密码文字显示钮*/
input[type="password"]::-ms-reveal {
  display: none;
}
input[type="password"]::-ms-clear {
  display: none;
}
</style>

<script setup lang="ts">
import { reactive } from "vue";
import {
  UserControllerService,
  UserLoginRequest,
} from "../../../generated/user";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
/*
表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest); // 规范化格式

const rules = {
  userAccount: [
    {
      required: true,
      message: "账号不能为空",
    },
  ],
  userPassword: [
    {
      required: true,
      message: "密码不能为空",
    },
  ],
};
/*
提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登陆成功跳转回主页
  if (res.code === 0) {
    // 在登录后再次请求，更新前端的用户状态
    await store.dispatch("user/getLoginUser");
    await router.push({
      // 修改路由跳回主页
      path: "/",
      replace: true, //   直接替换栈，后退无法返回登录页
    });
  } else {
    message.error("登陆失败，" + res.message);
  }
};
</script>
