<!--
 * @Author: 陈三石
 * @Date: 2023-12-11 13:47:26
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-11 15:13:50
 * @Description: 'file content'
-->
<template>
  <el-dialog v-model="props.visible" title="选择滤镜" :width="500" class="photo-filter">
    <div class="preview">
      <img :src="props.photourl" alt="" />
    </div>
    <div class="filters">
      <canvas id="filterCas" width="400" height="800"></canvas>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { fabric } from "fabric";
let canvas;
const props = defineProps({
  visible: Boolean,
  photourl: String
});
const filters = ref([]);
onMounted(() => {
  initCas();
});
watch(
  () => props.photourl,
  newState => {
    initFilters();
  }
);
function initCas() {
  canvas = new fabric.Canvas("filterCas");
}
function initFilters() {
  // fabric.Image.fromURL(props.photourl, img => {
  //   console.log(img);
  //   img.scale(0.5);
  //   img.filters.push(new fabric.Image.filters.Grayscale());
  //   img.applyFilters();
  //   canvas.add(img);
  // });
}
</script>

<style lang="postcss" scoped>
.preview {
  border: 1px solid #eee;
  width: 200px;
  img {
    width: 100%;
  }
}
</style>
