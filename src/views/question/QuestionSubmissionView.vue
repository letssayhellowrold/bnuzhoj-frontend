<template>
  <div id="questionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="title" label="标题" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入题目名称" />
      </a-form-item>
      <a-form-item field="tags" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <!-- 自定义渲染方式 -->
      <template #questionId="{ record }">
        {{ record.questionId }}
      </template>
      <template #userId="{ record }">
        {{ record.userId }}
      </template>
      <template #judgeInfo="{ record }">
        <div
          v-for="(info, index) in record.judgeInfo"
          :key="index"
          :style="{ backgroundColor: getInfoBackground(info.message) }"
        >
          <p>Message: {{ info.message || "无" }}</p>
          <p>Memory: {{ info.memory || "无" }}</p>
          <p>Time: {{ info.time || "无" }}</p>
        </div>
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record.questionId)">
            去做这道题
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitVO,
} from "../../../generated/question";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
// 日期处理库
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitVO>({
  tags: [],
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams.value
  );
  // console.log(res);
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "题号",
    slotName: "questionId",
  },
  {
    title: "提交用户",
    slotName: "userId",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param questionId
 */
const toQuestionPage = (questionId: string) => {
  router.push({
    path: `/view/question/${questionId}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

const getInfoBackground = (message) => {
  if (!message) return "#ffffff"; // 默认背景颜色，例如白色
  switch (message) {
    case "Accepted":
      return "#d4edda"; // 绿色，表示通过
    case "Wrong Answer":
      return "#f8d7da"; // 红色，表示错误答案
    case "Time Limit Exceeded":
      return "#ffc107"; // 橙色，表示超时
    case "Memory Limit Exceeded":
      return "#17a2b8"; // 蓝色，表示内存超限
    default:
      return "#e2e3e5"; // 灰色，用于其他情况或未知状态
  }
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
