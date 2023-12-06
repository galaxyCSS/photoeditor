<template>
  <el-divider content-position="left">背景色</el-divider>
  <div class="color-picker">
    <el-color-picker :model-value="color" show-alpha @change="colorChange" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const color = ref("#fff");
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
function colorChange(val) {
  const { containerObj } = casStore;
  console.log(containerObj);
  containerObj.fill = "red";
  color.value = val;
}
</script>

<style lang="postcss" scoped></style>
