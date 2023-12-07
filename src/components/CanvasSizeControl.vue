<!--
 * @Author: 陈三石
 * @Date: 2023-12-07 09:35:02
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-07 10:24:25
 * @Description: 'file content'
-->
<template>
  <div class="size-control">
    <div class="item" @click="e => sizeChange(true, e)">
      <svg-icon iconname="fangda"></svg-icon>
    </div>
    <div class="item" @click="e => sizeChange(false, e)">
      <svg-icon iconname="suoxiao"></svg-icon>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
const step = 0.3;
const maxZoom = 3;
const minZoom = 0.3;
function sizeChange(isPlus, e) {
  const { canvas } = casStore;
  let zoom = canvas.zoom;
  if (isPlus) {
    zoom += step;
    zoom = zoom >= maxZoom ? maxZoom : zoom;
  } else {
    zoom -= step;
    zoom = zoom <= minZoom ? minZoom : zoom;
  }
  canvas.zoomToPoint(
    {
      x: 600,
      y: 400
    },
    zoom
  );
  canvas.zoom = zoom;
}
</script>

<style lang="postcss" scoped>
.size-control {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: #fff;
  display: flex;
  border-radius: 3px;
  border: 1px solid #eee;
  .item {
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
