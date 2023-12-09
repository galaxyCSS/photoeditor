<!--
 * @Author: 陈三石
 * @Date: 2023-12-08 16:26:44
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-09 10:30:37
 * @Description: 'file content'
-->
<template>
  <div class="draw-editor">
    <div class="list">
      <div class="item" @click="initDraw('PencilBrush')">
        <svg-icon iconname="shiwu-huabi" class="icon"></svg-icon>
        <span>普通画笔</span>
      </div>
      <div class="item" @click="initDraw('CircleBrush')">
        <svg-icon iconname="shiwu-huabi" class="icon"></svg-icon>
        <span>圈圈画笔</span>
      </div>
      <div class="item" @click="initDraw('SprayBrush')">
        <svg-icon iconname="shiwu-huabi" class="icon"></svg-icon>
        <span>雪花画笔</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { markRaw } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
function initDraw(type) {
  const { canvas } = casStore;
  casStore.isDraw = true;
  let pencilBrush = new fabric[type](canvas);
  pencilBrush.color = "#FFC0CB";
  pencilBrush.width = 10;
  canvas.freeDrawingBrush = pencilBrush;
  casStore.pencilBrush = markRaw(pencilBrush);
}
</script>

<style lang="postcss" scoped>
.draw-editor {
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      border: 1px solid #eee;
      cursor: pointer;
      width: 100px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        color: #1890ff;
      }
      .icon {
        font-size: 30px;
      }
    }
  }
}
</style>
