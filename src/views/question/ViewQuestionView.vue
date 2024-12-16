<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs v-model:activeKey="activeTab">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制/ms">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制/KB">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制/KB">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="discussion" title="讨论区">
            <div v-if="posts.length > 0">
              <div v-for="post in posts" :key="post.id" style="margin: 2vh 1vw">
                <a-comment
                  :author="post.user.userName"
                  :datetime="moment(post.updateTime).format('YYYY-MM-DD')"
                  :align="'left'"
                >
                  <!-- 使用 avatar 插槽 -->
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <!-- 使用 author 插槽 -->
                  <template #author>
                    <!-- 这里可以自定义作者的显示方式 -->
                    <strong>{{ post.user.userName }}</strong>
                  </template>
                  <!-- 使用 datetime 插槽 -->
                  <template #datetime>
                    <!-- 这里可以自定义时间描述的显示方式 -->
                    <time>{{
                      moment(post.updateTime).format("YYYY-MM-DD")
                    }}</time>
                  </template>
                  <!-- 使用 content 插槽 -->
                  <template #content>
                    <MdViewer :value="post.content" />
                  </template>
                  <!-- 使用 actions 插槽 -->
                  <template #actions>
                    <span
                      class="action"
                      key="heart"
                      @click="() => onLikeChange(post)"
                    >
                      <span v-if="post.like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ post.thumbNum + post.like }}
                    </span>
                    <span
                      class="action"
                      key="post.star"
                      @click="() => onStarChange(post)"
                    >
                      <span v-if="post.star">
                        <IconStarFill :style="{ color: '#ffb400' }" />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ post.favourNum + post.star }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> 回复
                    </span>
                  </template>
                </a-comment>
              </div>
              <a-pagination
                v-model:current="postQueryRequest.current"
                :total="total"
                :page-size="postQueryRequest.pageSize"
                @change="fetchPosts"
              />
            </div>
            <div v-else>暂无评论</div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <template v-if="activeTab === 'question'">
          <a-form :model="form" layout="inline">
            <a-form-item
              field="language"
              label="编程语言"
              style="min-width: 240px"
            >
              <a-select
                v-model="form.language"
                :style="{ width: '320px' }"
                placeholder="选择编程语言"
              >
                <a-option>java</a-option>
                <a-option>cpp</a-option>
                <a-option>go</a-option>
                <a-option>html</a-option>
                <a-option>python</a-option>
              </a-select>
            </a-form-item>
          </a-form>
          <CodeEditor
            :value="form.code as string"
            :language="form.language"
            :handle-change="changeCode"
          />
          <a-divider />
          <a-button type="primary" style="min-width: 200px" @click="doSubmit">
            提交代码
          </a-button>
        </template>
        <template v-if="activeTab === 'discussion'">
          <a-col :md="24" class="post-editor">
            <a-card title="发表帖子">
              <a-form model="postForm" layout="inline">
                <a-form-item field="tags" label="标签" style="min-width: 240px">
                  <a-input-tag
                    v-model="postForm.tags"
                    mode="tags"
                    placeholder="输入标签"
                    allow-clear
                    style="width: 100%"
                  />
                </a-form-item>
              </a-form>
              <MdEditor
                :value="newPostContent"
                :handle-change="onPostContentChange"
              />
              <a-divider />
              <a-button type="primary" @click="submitPost">提交</a-button>
            </a-card>
          </a-col>
        </template>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref, withDefaults } from "vue";
import { useStore } from "vuex"; // 引入useStore钩子
import {
  QuestionControllerService,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated/question";
import {
  PostAddRequest,
  PostControllerService,
  PostFavourCheckRequest,
  PostFavourControllerService,
  PostQueryRequest,
  PostThumbCheckRequest,
  PostThumbControllerService,
} from "../../../generated/post";

import moment from "moment";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import MdEditor from "@/components/MdEditor.vue";

import {
  IconHeart,
  IconHeartFill,
  IconMessage,
  IconStar,
  IconStarFill,
} from "@arco-design/web-vue/es/icon";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<QuestionVO>();
const posts = ref([]);
const activeTab = ref("question"); // 默认激活的标签页
const store = useStore();
const total = ref(0);

const loginUser = computed(() => store.state.user.loginUser);
// console.log(loginUser.value);
const initializePostLikesAndStars = async (postsData) => {
  // 使用 Promise.all 来并行处理所有帖子的请求
  return await Promise.all(
    postsData.map(async (post) => {
      // 构造请求对象
      const favourCheckRequest: PostFavourCheckRequest = {
        postId: post.id,
        userId: loginUser.value.id,
      };
      const thumbCheckRequest: PostThumbCheckRequest = {
        postId: post.id,
        userId: loginUser.value.id,
      };
      // console.log(favourCheckRequest, thumbCheckRequest);
      // 调用服务并等待结果
      const star = await PostFavourControllerService.checkHasFavouredUsingPost(
        favourCheckRequest
      );
      const like = await PostThumbControllerService.checkHasThumbedUsingPost(
        thumbCheckRequest
      );
      // console.log(like, star);
      // 返回包含点赞和收藏状态的帖子对象
      return {
        ...post,
        like: like.data,
        star: star.data,
      };
    })
  );
};

const postQueryRequest = ref<PostQueryRequest>({
  content: "", // 帖子内容关键词
  current: 1, // 当前页码
  favourUserId: undefined, // 收藏用户ID（如果需要）
  id: undefined, // 帖子ID（如果需要特定ID）
  notId: undefined, // 排除的帖子ID
  orTags: [], // 帖子标签（或条件）
  pageSize: 10, // 每页显示的帖子数量
  searchText: "", // 搜索内容关键词
  sortField: "", // 排序字段（如：创建时间、更新时间等）
  sortOrder: "", // 排序顺序（如：升序、降序）
  tags: [], // 帖子标签（与条件）
  userId: undefined, // 用户ID（如果需要特定用户的帖子）
});

interface PostForm {
  tags: string[];
}

const postForm = ref<PostForm>({
  tags: [],
});

const showPostEditor = ref(false);
const newPostContent = ref("");

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as unknown
  );
  if (res.code === 0) {
    question.value = res.data;
    postQueryRequest.value.questionId = question.value.id;
    await fetchPosts();
  } else {
    message.error("加载失败，" + res.message);
  }
};

const fetchPosts = async () => {
  postQueryRequest.value.current = 1; // 重置为第一页
  const res = await PostControllerService.listPostVoByPageUsingPost(
    postQueryRequest.value
  );
  if (res.code === 0) {
    posts.value = await initializePostLikesAndStars(res.data.records);
    total.value = res.data.total;
  } else {
    message.error("加载帖子失败，" + res.message);
  }
};
const onPostContentChange = (value: string) => {
  newPostContent.value = value;
};
const submitPost = async () => {
  const postAddRequest: PostAddRequest = {
    questionId: question.value?.id,
    content: newPostContent.value,
    tags: postForm.value.tags, // 使用用户选择的标签
  };
  // console.log(postAddRequest);
  try {
    const res = await PostControllerService.addPostUsingPost(postAddRequest);
    // console.log(res);
    if (res.code === 0) {
      message.success("发表成功");
      showPostEditor.value = false;
      newPostContent.value = "";
      await fetchPosts();
    } else {
      message.error("发表失败，" + res.message);
    }
  } catch (error) {
    message.error("发表失败：" + error);
  }
};

const form = ref<QuestionSubmitAddRequest>({
  language: "cpp",
  code: "",
});

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败," + res.message);
  }
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const changeCode = (value: string) => {
  form.value.code = value;
};

const onStarChange = async (post) => {
  if (post.star === false) {
    try {
      const res = await PostFavourControllerService.doPostFavourUsingPost({
        postId: post.id, // 帖子的ID
      });
      if (res.code === 0) {
        // 处理成功逻辑，比如更新点赞数
        post.star = true;
      } else {
        // 处理失败逻辑，比如恢复点赞状态
        post.star = false;
        message.error("收藏失败，" + res.message);
      }
    } catch (error) {
      // 处理异常
      post.star = false;
      message.error("收藏失败：" + error);
    }
  }
};
const onLikeChange = async (post) => {
  if (post.like === false) {
    try {
      const res = await PostThumbControllerService.doThumbUsingPost({
        postId: post.id, // 帖子的ID
      });
      // console.log(res);
      if (res.code === 0) {
        // 处理成功逻辑
        post.like = true;
      } else {
        // 处理失败逻辑
        post.like = false;
        message.error("点赞失败，" + res.message);
      }
    } catch (error) {
      // 处理异常
      post.like = false;
      message.error("点赞异常：" + error);
    }
  }
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
