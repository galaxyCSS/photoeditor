<template>
  <div class="editor-tab">
    <div class="item" @click="setEditor('shape')">
      <el-tooltip class="box-item" effect="dark" content="添加形状" placement="right">
        <svg-icon iconname="jichuyuansu"></svg-icon>
      </el-tooltip>
    </div>
    <div class="item" @click="setEditor('text')">
      <el-tooltip class="box-item" effect="dark" content="添加文字" placement="right">
        <svg-icon iconname="wenzi"></svg-icon>
      </el-tooltip>
    </div>
    <div class="item" @click="setEditor('draw')">
      <el-tooltip class="box-item" effect="dark" content="画笔工具" placement="right">
        <svg-icon iconname="shiwu-huabi"></svg-icon>
      </el-tooltip>
    </div>
    <div class="item" @click="setEditor('photo')">
      <el-tooltip class="box-item" effect="dark" content="添加图片" placement="right">
        <svg-icon iconname="tupian_huaban"></svg-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
function setEditor(type) {
  const { editType } = casStore;
  editType = type;
}
</script>

<style lang="postcss" scoped>
.editor-tab {
  width: 100%;
  .item {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
