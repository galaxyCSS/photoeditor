<!--
 * @Author: 陈三石
 * @Date: 2023-12-07 15:44:50
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-08 14:56:28
 * @Description: 'file content'
-->
<template>
  <div class="shape-control">
    <el-divider content-position="left">外观</el-divider>
    <div class="list">
      <div class="item fill-color">
        <span class="label">填充颜色</span>
        <el-color-picker :model-value="state.fill" show-alpha @change="fillChange" />
        <div :style="{ background: state.fill }" class="color-bar"></div>
      </div>
      <div class="item stroke-color">
        <span class="label">轮廓颜色</span>
        <el-color-picker :model-value="state.stroke" @change="strokeChange" />
        <div :style="{ background: state.stroke }" class="color-bar"></div>
      </div>
      <div class="item stroke-width">
        <span class="label">轮廓粗细</span>
        <el-dropdown trigger="click" class="border-menu">
          <div class="menu-label">
            <div :class="['border show', `border_${state.strokeWidth}`]"></div>
            <el-icon>
              <arrow-down />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="border-menu-list">
              <el-dropdown-item v-for="item in strokeWidths" :key="item">
                <div :class="['border', `border_${item}`]" @click="changeStrokeWidth(item)"></div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-divider content-position="left">字体风格</el-divider>
    <div class="style">
      <div class="item" @click="changeStyle('fontWeight')">
        <svg-icon iconname="jiacu"></svg-icon>
      </div>
      <div class="item" @click="changeStyle('fontStyle')">
        <svg-icon iconname="italic"></svg-icon>
      </div>
      <div class="item" @click="changeStyle('linethrough')">
        <svg-icon iconname="a-xiahuaxian3x"></svg-icon>
      </div>
      <div class="item" @click="changeStyle('underline')">
        <svg-icon iconname="fontstrikethrough"></svg-icon>
      </div>
    </div>
    <el-divider content-position="left">操作</el-divider>
    <div class="options">
      <div class="item" @click="deleteShape">
        <svg-icon iconname="shanchu"></svg-icon>
      </div>
      <div class="item" @click="copyShape">
        <svg-icon iconname="fuzhi"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
import { ArrowDown } from "@element-plus/icons-vue";
import SvgIcon from "@/components/SvgIcon.vue";
const casStore = useCanvasStore();
const strokeWidths = [1, 2, 3, 4];
const state = reactive({
  fill: "",
  stroke: "",
  strokeWidth: 1
});
watch(
  () => casStore.selectedObj,
  newState => {
    initStyle(newState[0]);
  }
);
onMounted(() => {
  initStyle(casStore.selectedObj[0]);
});
function initStyle(selectObj) {
  let selected = selectObj;
  state.fill = selected.fill;
  state.stroke = selected.stroke;
  state.strokeWidth = selected.strokeWidth;
}
function changeStyle(styleType) {
  const { canvas } = casStore;
  let style;
  let selected = casStore.selectedObj[0];
  state[styleType] = !state[styleType];

  if (styleType === "fontWeight") {
    style = state[styleType] ? "bold" : "normal";
  } else if (styleType === "fontStyle") {
    style = state[styleType] ? "italic" : "normal";
  } else {
    style = state[styleType] ? true : false;
  }
  selected.set(styleType, style);
  canvas.requestRenderAll();
}
function fillChange(fill) {
  const { canvas } = casStore;
  let selected = casStore.selectedObj[0];
  state.fill = fill;
  selected.set("fill", fill);
  canvas.requestRenderAll();
}
function strokeChange(stroke) {
  const { canvas } = casStore;
  let selected = casStore.selectedObj[0];
  state.stroke = stroke;
  selected.set("stroke", stroke);
  canvas.requestRenderAll();
}

function changeStrokeWidth(strokeWidth) {
  const { canvas } = casStore;
  state.strokeWidth = strokeWidth;
  let selected = casStore.selectedObj[0];
  selected.set("strokeWidth", strokeWidth);
  canvas.requestRenderAll();
}

function deleteShape() {
  const { canvas } = casStore;
  let selected = casStore.selectedObj[0];
  canvas.remove(selected);
}
function copyShape() {
  const { canvas } = casStore;
  canvas.getActiveObject().clone(function (cloned) {
    paste(cloned);
  });
}

function paste(_clipboard) {
  const { canvas } = casStore;
  _clipboard.clone(function (clonedObj) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true
    });
    if (clonedObj.type === "activeSelection") {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function (obj) {
        canvas.add(obj);
      });
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
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
      .border-menu .menu-label {
        display: flex;
        align-items: center;
        border: 1px solid #eee;
        padding: 5px;
        border-radius: 5px;
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
.border {
  width: 30px;
  padding: 2px 0;
  border-bottom: 1px solid #666;
}
.border.show {
  padding: 0;
  margin-right: 5px;
}

.border.border_1 {
  border-bottom: 1px solid #666;
}
.border.border_2 {
  border-bottom: 2px solid #666;
}
.border.border_4 {
  border-bottom: 4px solid #666;
}
.border.border_8 {
  border-bottom: 8px solid #666;
}
</style>
