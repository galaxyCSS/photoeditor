<!--
 * @Author: 陈三石
 * @Date: 2023-12-07 15:44:50
 * @LastEditors: galaxy_css leic2088@163.com
 * @LastEditTime: 2023-12-07 21:02:00
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
        <span class="label">边框颜色</span>
        <el-color-picker :model-value="state.stroke" @change="strokeChange" />
        <div :style="{ background: state.stroke }" class="color-bar"></div>
      </div>
      <div class="item stroke-width">
        <span class="label">边框粗细</span>
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
      <div class="item">
        <span class="label">设置圆角</span>
        <div class="slider-bar"><el-slider size="small" :model-value="state.rxry" :max="20" @input="radiusChange" /></div>
      </div>
      <div class="item">
        <span class="label">旋转角度</span>
        <div class="slider-bar"><el-slider size="small" :model-value="state.angle" :max="360" @input="angleChange" /></div>
      </div>
      <div class="item">
        <span class="label">设置缩放</span>
        <div class="slider-bar">
          <el-slider size="small" :model-value="state.scale" :min="0.1" :max="5" @input="scaleChange" />
        </div>
      </div>
    </div>
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
const strokeWidths = [1, 2, 4, 8];
const state = reactive({
  fill: "",
  stroke: "",
  strokeWidth: 1,
  rxry: 1,
  angle: 1,
  scale: 1
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
  state.rxry = selected.rx || 1;
  state.angle = selected.angle || 1;
  state.scale = selected.scaleX;
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

function radiusChange(radius) {
  state.rxry = radius;
  let selected = casStore.selectedObj[0];
  selected.set("rx", radius);
  selected.set("ry", radius);
  canvas.requestRenderAll();
}
function angleChange(angle) {
  const { canvas } = casStore;
  state.angle = angle;
  let selected = casStore.selectedObj[0];
  selected.set("angle", angle);
  canvas.requestRenderAll();
}
function scaleChange(scale) {
  const { canvas } = casStore;
  state.scale = scale;
  let selected = casStore.selectedObj[0];
  selected.set("scaleX", scale);
  selected.set("scaleY", scale);
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
