<!--
 * @Author: 陈三石
 * @Date: 2023-12-06 14:33:03
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-15 09:45:21
 * @Description: 'file content'
-->
<template>
  <div class="canvas-size">
    <el-divider content-position="left">尺寸</el-divider>
    <div class="list">
      <div
        :class="['item', currSize === index ? 'active' : undefined]"
        v-for="(item, index) in sizes"
        @click="changeSize(item, index)"
      >
        <div class="layout">
          <div class="box" :style="{ width: item.w * zoom + 'px', height: item.h * zoom + 'px' }"></div>
        </div>
        <div class="label">
          <span>{{ `${item.w}*${item.h}` }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
let zoom = 0.03;
const sizes = [
  { w: 900, h: 1200, scale: 0.6 },
  { w: 1200, h: 900, scale: 0.8 },
  { w: 1080, h: 1920, scale: 0.4 },
  { w: 1280, h: 860, scale: 0.8 },
  { w: 860, h: 1280, scale: 0.6 }
];
const currSize = ref(0);
function changeSize(item, index) {
  const { canvas, containerObj } = casStore;
  currSize.value = index;
  canvas.remove(containerObj);
  let rect = new fabric.Rect({
    fill: containerObj.fill,
    width: item.w * item.scale,
    height: item.h * item.scale
  });
  rect.selectable = false;
  canvas.add(rect);
  rect.center();
  casStore.containerObj = markRaw(rect);
  casStore.container = item;
  console.log(casStore.BGUrl);
  if (casStore.BGUrl) {
    importUrl(casStore.BGUrl);
  }
}
function importUrl(url) {
  const { canvas, container, containerObj } = casStore;
  fabric.Image.fromURL(url, img => {
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX: (container.w * container.scale) / img.width,
      scaleY: (container.h * container.scale) / img.height,
      top: (canvas.getHeight() - container.h * container.scale) / 2,
      left: (canvas.getWidth() - container.w * container.scale) / 2
    });
    containerObj.set("fill", "transparent");
    canvas.requestRenderAll();
  });
}
</script>

<style lang="postcss" scoped>
.canvas-size {
  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 22%;
      text-align: center;

      cursor: pointer;
      margin-bottom: 10px;
      position: relative;
      .layout {
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eee;
        margin-bottom: 5px;
        border-radius: 4px;
      }
      &.active {
        .layout {
          border-color: #1890ff;
          .box {
            background: #1890ff;
          }
        }
        .label {
          color: #1890ff;
        }
      }
      .box {
        background: #eee;
      }
      .label {
        font-size: 12px;
      }
    }
  }
}
</style>
