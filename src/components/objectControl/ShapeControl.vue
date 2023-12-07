<!--
 * @Author: 陈三石
 * @Date: 2023-12-07 15:44:50
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-07 16:09:11
 * @Description: 'file content'
-->
<template>
  <div class="shape-control">
    <el-divider content-position="left">外观</el-divider>
    <div class="list">
      <div class="fill-color">
        <span class="label">填充色</span>
        <el-color-picker :model-value="state.fill" show-alpha @change="fillChange" />
        <div :style="{ background: state.fill }" class="color-bar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
const state = reactive({
  fill: ""
});
onMounted(() => {
  let selected = casStore.selectedObj[0];
  state.fill = selected.fill;
});
function fillChange(fill) {
  const { canvas } = casStore;
  let selected = casStore.selectedObj[0];
  state.fill = fill;
  selected.set("fill", fill);
  canvas.requestRenderAll();
}
</script>

<style lang="postcss" scoped>
.shape-control {
  .list {
    .fill-color {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .label {
        font-size: 14px;
        margin-right: 10px;
      }
      .color-bar {
        flex: 1;
        height: 25px;
        margin-left: 20px;
        border: 1px solid #eee;
      }
    }
  }
}
</style>
