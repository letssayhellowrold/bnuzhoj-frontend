<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      ref="formRef"
      style="max-width: 480px; margin: auto"
      auto-label-width
      :rules="rules"
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userName" label="用户名" validate-trigger="blur">
        <a-input v-model="form.userName" placeholder="长度至少为 3 个字符" />
      </a-form-item>
      <a-form-item field="userAccount" label="账号" validate-trigger="blur">
        <a-input v-model="form.userAccount" placeholder="长度至少为 5 个字符" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" validate-trigger="blur">
        <a-input-password
          v-model="form.userPassword"
          placeholder="长度至少为 8 个字符"
        />
      </a-form-item>
      <a-form-item
        field="checkPassword"
        label="确认密码"
        validate-trigger="blur"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请重复你的密码"
        />
      </a-form-item>
      <!--邮箱-->
      <!--      <a-form-item field="email" label="email">-->
      <!--        <a-input-->
      <!--          v-model="form.email"-->
      <!--          placeholder="please enter your email..."-->
      <!--        />-->
      <!--      </a-form-item>-->
      <!--验证码-->
      <!--      <a-form-item field="match" label="match">-->
      <!--        <a-input-->
      <!--          v-model="form.match"-->
      <!--          placeholder="please enter your match..."-->
      <!--        />-->
      <!--      </a-form-item>-->
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-button @click="$refs.formRef.resetFields()">重置</a-button>
        </a-space>
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
import { reactive, ref } from "vue";
import {
  UserControllerService,
  UserRegisterRequest,
} from "../../../generated/user";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const formRef = ref(null); // 创建一个ref引用
/*
表单信息
 */
const form = reactive({
  checkPassword: "",
  userAccount: "",
  userPassword: "",
  userName: "",
} as UserRegisterRequest); // 规范化格式
/*
定义规则
*/
const rules = {
  userName: {
    required: true,
    message: "用户名不能为空",
  },
  userAccount: [
    {
      required: true,
      message: "账号不能为空",
    },
  ],
  userPassword: [
    {
      required: true,
      message: "原密码不能为空",
    },
  ],
  checkPassword: [
    {
      required: true,
      message: "重复密码不能为空",
    },
    {
      validator: (value, cb) => {
        //callback 回调函数：即cb，是一个必须被调用的函数，用于报告验证结果。
        if (value !== form.userPassword) {
          cb("两次密码不相同");
        } else {
          cb(); // 验证成功，不传递任何参数给cb
        }
      },
    },
  ],
};
/*
提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 登陆成功跳转回主页
  if (res.code === 0) {
    await router.push({
      // 修改路由跳回主页
      path: "/user/login",
      replace: true, //   直接替换栈，后退无法返回登录页
    });
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>
