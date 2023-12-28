<!--
 * @Author: 陈三石
 * @Date: 2023-12-08 13:46:21
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-28 10:47:38
 * @Description: 'file content'
-->
<template>
  <div class="text-editor">
    <div class="list">
      <div class="item" @click="createText">
        <svg-icon iconname="wenzi"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useCanvasStore } from "@/store/modules/canvas";
import util from "@/utils/util";
import { markRaw } from "vue";
const casStore = useCanvasStore();
function createText() {
  const { canvas } = casStore;
  let text = new fabric.Textbox("我是文字", {
    fill: util.getRandomColor(),
    originX: "center",
    originY: "center"
  });
  text.type = "text";
  canvas.add(text);
  casStore.layerStack.push(markRaw(text));
  text.center();
}
</script>

<style lang="postcss" scoped>
.text-editor {
  padding: 15px;
  .list {
    display: flex;
    .item {
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
