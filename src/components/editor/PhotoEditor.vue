<!--
 * @Author: 陈三石
 * @Date: 2023-12-11 13:34:49
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-11 13:57:18
 * @Description: 'file content'
-->
<template>
  <div class="photo-editor">
    <el-divider content-position="left">从本地上传</el-divider>
    <div>
      <el-upload :limit="1" :auto-upload="false" :on-change="onChange" :on-remove="onRemove">
        <el-button type="primary">点击上传图片</el-button>
      </el-upload>
    </div>
    <el-divider content-position="left">从图库选取</el-divider>
    <photo-filter :visible="filterVis" :photourl="photoUrl"></photo-filter>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PhotoFilter from "./PhotoFilter.vue";
const photoUrl = ref("");
const filterVis = ref(false);
function onChange(file) {
  if (file.status === "ready") {
    let url = URL.createObjectURL(file.raw);
    photoUrl.value = url;
    filterVis.value = true;
  }
}
function onRemove() {
  photoUrl.value = "";
}
</script>

<style></style>
