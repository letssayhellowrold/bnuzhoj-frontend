<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import math from "@bytemd/plugin-math";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";
import "katex/dist/katex.css";
import "bytemd/dist/index.css";
// 引入插件
const plugins = [
  gfm(),
  highlight(),
  math(),
  // Add more plugins here
];

/**
 * 父组件操作子组件
 *
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: () => {
    // console.log(v);
  },
});
</script>
