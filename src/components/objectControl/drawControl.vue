<!--
 * @Author: 陈三石
 * @Date: 2023-12-07 15:44:50
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-09 11:13:38
 * @Description: 'file content'
-->
<template>
  <div class="shape-control">
    <div v-if="casStore.isDraw">
      <el-divider content-position="left">画笔设置</el-divider>
      <div class="list">
        <div class="item fill-color">
          <span class="label">画笔颜色</span>
          <el-color-picker :model-value="state.color" show-alpha @change="fillChange" />
          <div :style="{ background: state.color }" class="color-bar"></div>
        </div>
        <div class="item">
          <span class="label">画笔粗细</span>
          <div class="slider-bar">
            <el-slider size="small" :model-value="state.width" :min="1" :max="20" @input="widthChange" />
          </div>
        </div>
      </div>
      <el-divider content-position="left">画笔阴影</el-divider>
      <div class="list shadow">
        <div class="item">
          <span class="label">阴影颜色</span>
          <el-color-picker :model-value="state.shadow" show-alpha @change="shadowColorChange" />
          <div :style="{ background: state.shadow }" class="color-bar"></div>
        </div>
        <div class="item">
          <span class="label">模糊距离</span>
          <div class="slider-bar">
            <el-slider size="small" :model-value="state.blur" :max="50" @input="val => shadowChange(val, 'blur')" />
          </div>
        </div>
        <div class="item">
          <span class="label">X轴偏移</span>
          <div class="slider-bar">
            <el-slider size="small" :model-value="state.offsetX" :max="50" @input="val => shadowChange(val, 'offsetX')" />
          </div>
        </div>
        <div class="item">
          <span class="label">Y轴偏移</span>
          <div class="slider-bar">
            <el-slider size="small" :model-value="state.offsetY" :max="50" @input="val => shadowChange(val, 'offsetY')" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <el-divider content-position="left">操作</el-divider>
      <div class="options">
        <div class="item" @click="deleteShape">
          <svg-icon iconname="shanchu"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
import SvgIcon from "@/components/SvgIcon.vue";

const casStore = useCanvasStore();

const state = reactive({
  shadow: "",
  blur: 0,
  offsetX: 0,
  offsetY: 0,
  color: "",
  width: 1
});
watch(
  () => casStore.pencilBrush,
  newState => {
    initStyle(newState);
  }
);

onMounted(() => {
  if (casStore.pencilBrush) {
    initStyle(casStore.pencilBrush);
  }
});
function initStyle(pencilBrush) {
  state.color = pencilBrush.color;
  state.width = pencilBrush.width;
  state.shadow = pencilBrush.shadow?.color;
  state.offsetX = pencilBrush.shadow?.offsetX;
  state.blur = pencilBrush.shadow?.blur;
  state.offsetY = pencilBrush.shadow?.offsetY;
}

function shadowColorChange(color) {
  const { pencilBrush } = casStore;
  state.shadow = color;
  let shadow = pencilBrush.shadow;
  pencilBrush.shadow = new fabric.Shadow({
    ...shadow,
    color
  });
}
function shadowChange(val, type) {
  const { pencilBrush } = casStore;
  state[type] = val;
  let shadow = pencilBrush.shadow;
  pencilBrush.shadow = new fabric.Shadow({
    ...shadow,
    [type]: val
  });
}
function fillChange(color) {
  const { pencilBrush } = casStore;
  state.color = color;
  pencilBrush.color = color;
}
function widthChange(width) {
  const { pencilBrush } = casStore;
  state.width = width;
  pencilBrush.width = width;
}
function deleteShape() {
  const { canvas } = casStore;
  let selected = casStore.selectedObj[0];
  canvas.remove(selected);
}
</script>

<style lang="postcss" scoped>
.shape-control {
  .list {
    margin-bottom: 20px;
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .label {
        font-size: 14px;
        margin-right: 10px;
        display: inline-block;
      }
      .color-bar {
        flex: 1;
        height: 25px;
        margin-left: 20px;
        border: 1px solid #eee;
      }
      .slider-bar {
        flex: 1;
      }
    }
  }
  .style {
    display: flex;
    border: 1px solid #eee;
    padding: 5px 10px;
    justify-content: space-between;
    .item {
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .options {
    display: flex;
    border: 1px solid #eee;
    padding: 5px;
    .item {
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
