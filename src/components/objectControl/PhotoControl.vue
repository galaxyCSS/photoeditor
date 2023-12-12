<!--
 * @Author: 陈三石
 * @Date: 2023-12-12 17:19:17
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-12 18:04:01
 * @Description: 'file content'
-->
<template>
  <div class="photo-control">
    <el-divider content-position="left">添加滤镜</el-divider>
    <canvas id="filterCas" width="240" height="800"></canvas>
  </div>
</template>

<script setup>
let canvas;
import { fabric } from "fabric";
import { onMounted } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
const allFilters = ["BaseFilter", "Blur", "Brightness", "ColorMatrix", "Contrast", "Convolute"];
const casStore = useCanvasStore();
onMounted(() => {
  initCas();
});
function initCas() {
  canvas = new fabric.Canvas("filterCas");
  initFilters();
}
function initFilters() {
  const { addPhotoUrl } = casStore;
  allFilters.forEach(i => {
    fabric.Image.fromURL(addPhotoUrl, img => {
      img.scale(0.5);
      img.filters.push(new fabric.Image.filters[i]());
      img.applyFilters();
      canvas.add(img);
    });
  });
}
</script>

<style></style>
