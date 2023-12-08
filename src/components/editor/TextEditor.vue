<!--
 * @Author: 陈三石
 * @Date: 2023-12-08 13:46:21
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-08 14:45:14
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
const casStore = useCanvasStore();
function createText() {
  const { canvas } = casStore;
  let text = new fabric.Textbox("我是文字", {
    fill: "#333",
    originX: "center",
    originY: "center"
    // fontWeight: "bold",
    // fontStyle: "italic",
    // linethrough: true,
    // underline: true
  });
  text.type = "text";
  canvas.add(text);
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
