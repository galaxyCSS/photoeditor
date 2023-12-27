<!--
 * @Author: 陈三石
 * @Date: 2023-12-06 10:49:12
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-27 09:28:44
 * @Description: 'file content'
-->
<template>
  <div class="layout">
    <div class="header">
      <div class="options">
        <div class="options-left">
          <div class="draw-mod">
            <span class="label">绘画模式</span>
            <el-switch v-model="casStore.isDraw" />
          </div>
          <div class="recover">
            <span :class="['item', casStore.layerStack.length === 0 ? 'disabled' : undefined]"
              ><svg-icon iconname="shangyibu" @click="prevLayer"></svg-icon
            ></span>
            <span :class="['item', casStore.layerRemoveStack.length === 0 ? 'disabled' : undefined]"
              ><svg-icon iconname="xiayibu" @click="nextLayer"></svg-icon
            ></span>
          </div>
        </div>
        <div class="options-right">
          <div class="save">
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div :class="['slide', 'left-slide', leftSlideVis ? 'close' : undefined]">
        <div class="options-bar">
          <editor-tab></editor-tab>
        </div>
        <!-- <div class="toggle" @click="changeLeftToggle">
          <svg-icon :iconname="leftSlideVis ? 'sanjiaoright' : 'sanjiaoleft'"></svg-icon>
        </div> -->
        <div class="editor-box">
          <shape-editor v-if="casStore.editType === 'shape'"></shape-editor>
          <text-editor v-if="casStore.editType === 'text'"></text-editor>
          <draw-editor v-if="casStore.editType === 'draw'"></draw-editor>
          <photo-editor v-if="casStore.editType === 'photo'"></photo-editor>
        </div>
      </div>
      <div class="canvas-box" ref="canvasBoxRef">
        <canvas id="cas" ref="casRef"></canvas>
        <canvas-size-control></canvas-size-control>
      </div>
      <div :class="['slide', 'right-slide', rightSlideVis ? 'close' : undefined]">
        <div class="object-control" v-if="controlType || casStore.isDraw">
          <shape-control v-if="controlType === 'shape'"></shape-control>
          <text-control v-if="controlType === 'text'"></text-control>
          <draw-control v-if="casStore.isDraw || controlType === 'path' || controlType === 'group'"></draw-control>
          <photo-control v-if="controlType === 'photo'"></photo-control>
        </div>
        <div class="config-box" v-else>
          <canvas-size></canvas-size>
          <canvas-color></canvas-color>
          <canvas-bg></canvas-bg>
        </div>
        <!-- <div class="toggle" @click="changeRightToggle">
          <svg-icon :iconname="rightSlideVis ? 'sanjiaoleft' : 'sanjiaoright'"></svg-icon>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, markRaw, watch, computed } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useCanvasStore } from "@/store/modules/canvas";
import { fabric } from "fabric";
import CanvasSize from "@/components/canvas/CanvasSize.vue";
import CanvasColor from "@/components/canvas/CanvasColor.vue";
import CanvasBg from "@/components/canvas/CanvasBG.vue";
import CanvasSizeControl from "@/components/canvas/CanvasSizeControl.vue";

import ShapeEditor from "@/components/editor/ShapeEditor.vue";
import TextEditor from "@/components/editor/TextEditor.vue";
import DrawEditor from "@/components/editor/DrawEditor.vue";
import PhotoEditor from "@/components/editor/PhotoEditor.vue";

import EditorTab from "@/components/layout/EditorTab.vue";

import ShapeControl from "@/components/objectControl/ShapeControl.vue";
import TextControl from "@/components/objectControl/TextControl.vue";
import DrawControl from "@/components/objectControl/DrawControl.vue";
import PhotoControl from "@/components/objectControl/PhotoControl.vue";

const casStore = useCanvasStore();
const leftSlideVis = ref(false);
const rightSlideVis = ref(false);
const canvasBoxRef = ref();
const casRef = ref();
const rulerSize = 30;

const controlType = computed(() => {
  if (casStore.selectedObj.length === 0) {
    return "";
  }
  return casStore.selectedObj[0].type;
});
onMounted(() => {
  init();
});
watch(
  () => casStore.isDraw,
  newState => {
    if (newState) {
      casStore.canvas.isDrawingMode = true;
      casStore.editType = "draw";
    } else {
      casStore.canvas.isDrawingMode = false;
      casStore.editType = "";
    }
  }
);
function changeLeftToggle() {
  leftSlideVis.value = !leftSlideVis.value;
}
function changeRightToggle() {
  rightSlideVis.value = !rightSlideVis.value;
}
function init() {
  const canvas = new fabric.Canvas("cas", {
    preserveObjectStacking: true,
    width: canvasBoxRef.value.offsetWidth,
    height: canvasBoxRef.value.offsetHeight
  });
  canvas.zoom = 1;
  casStore.canvas = markRaw(canvas);
  initEvent(canvas);
  initSize(canvas);
  initClipPath(canvas);
}
function initSize(canvas) {
  const { container } = casStore;
  const rect = new fabric.Rect({
    fill: container.fill,
    width: container.w * container.scale,
    height: container.h * container.scale
  });
  canvas.add(rect);
  rect.center();
  rect.selectable = false;
  casStore.containerObj = markRaw(rect);
}
function initRuler() {
  initRulerBG();
  initRulerMark();
}
function initRulerBG() {
  const { canvas } = casStore;
  const ctx = canvas.getContext();
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, rulerSize);
  ctx.fillRect(300, 0, rulerSize, canvas.width);
}
function initRulerMark() {
  const { canvas, containerObj, container } = casStore;
  let left = containerObj.left;
  let width = container.w * container.scale;
  const stepLine = 90;
  const count = width / stepLine;
  const stepText = container.w / count;
  const ctx = canvas.getContext();
  ctx.beginPath();
  ctx.fillStyle = "#333";
  ctx.textBaseline = "top";
  ctx.textAlign = "center";
  // 居中标尺
  for (let i = 0; i <= count; i++) {
    const text = stepText * i + "";
    //ctx.fillText(text, left + i * stepLine, 5);
    ctx.fillRect(left + i * stepLine, 20, 1, 10);
  }
  ctx.restore();
  // // 右侧填补
  // for (let i = 0; i <= 4; i++) {
  //   const text = container.w + stepText + stepText * i + "";
  //   ctx.fillText(text, left + width + stepLine + i * stepLine, 5);
  //   ctx.fillRect(left + width + stepLine + i * stepLine, 20, 1, 10);
  // }
  // // 左侧填补
  // for (let i = 0; i <= 3; i++) {
  //   const text = 0 - stepText - stepText * i + "";
  //   ctx.fillText(text, left - stepLine - i * stepLine, 5);
  //   ctx.fillRect(left - stepLine - i * stepLine, 20, 1, 10);
  // }
}
function initEvent(canvas) {
  canvas.on("mouse:wheel", opt => onMouseWheel(opt, canvas));
  canvas.on("mouse:down", opt => onMouseDown(opt, canvas));
  canvas.on("mouse:move", opt => onMouseMove(opt, canvas));
  canvas.on("mouse:up", opt => onMouseUp(opt, canvas));
  canvas.on("selection:created", opt => onSelectionCreated(opt, canvas));
  canvas.on("selection:cleared", opt => onSelectionCleared(opt, canvas));
  canvas.on("selection:updated", opt => onSelectionUpdated(opt, canvas));
  canvas.on("after:render", opt => {
    //initRuler(canvas);
  });
}
function initClipPath(canvas) {
  const { containerObj, container } = casStore;
  const clipPath = new fabric.Rect({
    fill: container.fill,
    width: containerObj.width,
    height: containerObj.height,
    top: containerObj.top,
    left: containerObj.left
  });
  canvas.clipPath = clipPath;
}
function initBGGrid(canvas) {
  let width = canvas.getWidth();
  let height = canvas.getHeight();
  let rectWidth = 15;
  let fill;
  let rectArr = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (j % rectWidth === 0 && i % rectWidth === 0) {
        if (j % (rectWidth * 2) == 0) {
          if (i % (rectWidth * 2) === 0) {
            fill = "#F1F1F1";
          } else {
            fill = "#DEDCDC";
          }
        } else {
          if (i % (rectWidth * 2) === 0) {
            fill = "#DEDCDC";
          } else {
            fill = "#F1F1F1";
          }
        }
        let rect = new fabric.Rect({
          fill,
          width: rectWidth,
          height: rectWidth,
          top: j,
          left: i
        });
        rectArr.push(rect);
      }
    }
  }
  const group = new fabric.Group(rectArr, {
    top: 0,
    left: 0
  });
  canvas.add(group);
  group.selectable = false;
}
function onSelectionCreated(opt, canvas) {
  opt.selected[0].isSelf = true;
  casStore.selectedObj = markRaw(opt.selected);
}
function onSelectionCleared(opt, canvas) {
  if (opt.deselected) {
    delete opt.deselected[0].isSelf;
    casStore.selectedObj = markRaw([]);
  }

  for (let k in casStore.helpLine) {
    canvas.remove(casStore.helpLine[k]);
  }
}
function onSelectionUpdated(opt, canvas) {
  let origin = casStore.selectedObj;
  delete origin[0].isSelf;
  opt.selected[0].isSelf = true;
  casStore.selectedObj = markRaw(opt.selected);
}

function onMouseDown(opt, canvas) {
  let evt = opt.e;
  if (evt.altKey === true) {
    canvas.isDragging = true;
    canvas.lastPosX = evt.offsetX;
    canvas.lastPosY = evt.offsetY;
  }
}

function onMouseMove(opt, canvas) {
  if (canvas.isDragging) {
    let evt = opt.e;
    let vpt = canvas.viewportTransform;
    vpt[4] += evt.offsetX - canvas.lastPosX;
    vpt[5] += evt.offsetY - canvas.lastPosY;
    canvas.requestRenderAll();
    canvas.lastPosX = evt.offsetX;
    canvas.lastPosY = evt.offsetY;
  }
}

function onMouseUp(opt, canvas) {
  canvas.setViewportTransform(canvas.viewportTransform);
  canvas.isDragging = false;
}
function onMouseWheel(opt, canvas) {
  let delta = opt.e.deltaY;
  let zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 20) zoom = 20;
  if (zoom < 0.01) zoom = 0.01;
  canvas.zoomToPoint(
    {
      x: canvas.width / 2,
      y: canvas.height / 2
    },
    zoom
  );
  canvas.zoom = zoom;
}
function save() {
  const { container, canvas } = casStore;
  // 恢复缩放
  canvas.setZoom(1);
  // 恢复平移
  let vpt = canvas.viewportTransform;
  vpt[4] = 0;
  vpt[5] = 0;
  canvas.requestRenderAll();
  let photoUrl = canvas.toDataURL({
    format: "jpeg",
    quality: 1,
    width: container.w * container.scale,
    height: container.h * container.scale,
    top: (canvas.getHeight() - container.h * container.scale) / 2,
    left: (canvas.getWidth() - container.w * container.scale) / 2,
    multiplier: 1 / container.scale
  });
  let a = document.createElement("a");
  let event = new MouseEvent("click");
  a.download = "photo";
  document.body.append(a);
  a.href = photoUrl;
  a.dispatchEvent(event);
}

function prevLayer() {
  const { canvas, layerStack, layerRemoveStack } = casStore;
  if (layerStack.length === 0) return;
  let item = layerStack.pop();
  layerRemoveStack.unshift(item);
  canvas.remove(item);
}
function nextLayer() {
  const { canvas, layerStack, layerRemoveStack } = casStore;
  if (layerRemoveStack.length === 0) return;
  let item = layerRemoveStack.shift();
  layerStack.push(item);
  canvas.add(item);
}
</script>

<style scoped lang="postcss">
.layout {
  display: flex;
  flex-direction: column;

  .header {
    height: 64px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    box-shadow: 10px 0px 4px #eee;
    .options {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .options-left {
      display: flex;
      align-items: center;
      .recover {
        margin-right: 20px;
        .item {
          padding: 0 5px;
          cursor: pointer;
          &.disabled {
            color: #999;
            cursor: not-allowed;
          }
        }
      }
      .draw-mod {
        margin-right: 10px;
        .label {
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
    .options-right {
      display: flex;
      align-items: center;
    }
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    --offsetX: 0px;
    --offsetY: 0px;
    --size: 16px;
    --color: #dedcdc;
    background-image: linear-gradient(45deg, var(--color) 25%, transparent 0, transparent 75%, var(--color) 0),
      linear-gradient(45deg, var(--color) 25%, transparent 0, transparent 75%, var(--color) 0);
    background-position: var(--offsetX) var(--offsetY), calc(var(--size) + var(--offsetX)) calc(var(--size) + var(--offsetY));
    background-size: calc(var(--size) * 2) calc(var(--size) * 2);
    position: relative;
    overflow: hidden;
    .slide {
      width: 300px;
      height: 100%;
      position: relative;
      transition: all 0.3s;
      background: #fff;
      position: absolute;
      z-index: 1;
      .toggle {
        position: absolute;
        width: 15px;
        height: 40px;
        cursor: pointer;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        z-index: 1;
      }
      &.left-slide {
        box-shadow: -1px 9px 5px #999;
        display: flex;
        left: 0;
        &.close {
          width: 50px;
          .editor-box {
            display: none;
          }
        }
        .options-bar {
          width: 50px;
          height: 100%;
          border-right: 1px solid #eee;
        }
        .toggle {
          right: -15px;
        }
        .editor-box {
          flex: 1;
          padding: 15px;
        }
      }
      &.right-slide {
        box-shadow: 1px 5px 5px #999;
        right: 0;
        .config-box {
          padding: 15px;
        }
        .object-control {
          padding: 15px;
        }
        .toggle {
          left: -15px;
        }
        &.close {
          right: -300px;
        }
      }
    }
    .canvas-box {
      width: 100%;
      height: calc(100vh - 64px);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      #cas {
      }
    }
  }
}
</style>
