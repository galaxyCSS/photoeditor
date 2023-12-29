<!--
 * @Author: 陈三石
 * @Date: 2023-12-11 13:34:49
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-28 11:05:52
 * @Description: 'file content'
-->
<template>
  <div class="photo-editor">
    <el-divider content-position="left">从本地上传</el-divider>
    <div>
      <el-upload
        ref="upload"
        :limit="1"
        :auto-upload="false"
        :on-change="onChange"
        :on-remove="onRemove"
        :on-exceed="handleExceed"
      >
        <el-button type="primary">点击上传图片</el-button>
      </el-upload>
    </div>
    <el-divider content-position="left">从图库选取</el-divider>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
import { genFileId } from "element-plus";
const casStore = useCanvasStore();
const photoUrl = ref("");
const upload = ref("");
function onChange(file) {
  if (file.status === "ready") {
    const { canvas } = casStore;
    let url = URL.createObjectURL(file.raw);
    fabric.Image.fromURL(url, img => {
      img.scale(0.5);
      canvas.add(img);
      casStore.layerStack.push(markRaw(img));
      img.center();
      img.type = "photo";
    });
    casStore.addPhotoUrl = url;
  }
}
const handleExceed = files => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
function onRemove() {
  photoUrl.value = "";
}
</script>

<style></style>
