<!--
 * @Author: 陈三石
 * @Date: 2023-12-06 17:45:38
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-07 15:27:55
 * @Description: 'file content'
-->
<template>
  <el-divider content-position="left">背景色</el-divider>
  <div class="color-picker">
    <el-color-picker :model-value="color" show-alpha @change="colorChange" />
    <div :style="{ background: color }" class="color-bar"></div>
  </div>
  <div class="advise-color">
    <span class="label">推荐配色</span>
    <div class="item" v-for="item in colors" :style="{ background: item }" @click="colorChange(item)"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
const color = ref("#fff");
const colors = ["#52c41a", "#faad14", "#ff4d4f", "#1677ff"];
function colorChange(val) {
  const { containerObj, canvas } = casStore;
  containerObj.set("fill", val);
  canvas.requestRenderAll();
  color.value = val;
}
</script>

<style lang="postcss" scoped>
.color-picker {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .color-bar {
    flex: 1;
    height: 25px;
    margin-left: 20px;
    border: 1px solid #eee;
  }
}
.advise-color {
  display: flex;
  align-items: center;
  .label {
    margin-right: 10px;
    font-size: 14px;
  }
  .item {
    width: 20px;
    height: 20px;
    border-radius: 3px;
    margin-right: 5px;
    cursor: pointer;
  }
}
</style>
