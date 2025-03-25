<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";
import "bytemd/dist/index.css";
import math from "@bytemd/plugin-math";
import "highlight.js/styles/default.css";
import "github-markdown-css/github-markdown-light.css"; // github 效果的代码高亮
import "katex/dist/katex.css";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}

const plugins = [
  gfm(),
  highlight(),
  math(),
  // Add more plugins here
];

/**
 * 给组件指定初始值
 */
withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>
