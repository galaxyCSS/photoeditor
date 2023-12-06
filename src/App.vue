<template>
  <div class="layout">
    <div class="header">
      <div class="options">
        <div class="options-left"></div>
        <div class="options-right">
          <div class="save">
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div :class="['slide', 'left-slide', leftSlideVis ? 'close' : undefined]">
        <div class="options-bar"></div>
        <div class="toggle" @click="changeLeftToggle">
          <svg-icon :iconname="leftSlideVis ? 'sanjiaoright' : 'sanjiaoleft'"></svg-icon>
        </div>
      </div>
      <div class="canvas-box">
        <canvas id="cas" width="1200" height="800"></canvas>
      </div>
      <div :class="['slide', 'right-slide', rightSlideVis ? 'close' : undefined]">
        <div class="config-box">
          <canvas-size></canvas-size>
          <canvas-color></canvas-color>
        </div>
        <div class="toggle" @click="changeRightToggle">
          <svg-icon :iconname="rightSlideVis ? 'sanjiaoleft' : 'sanjiaoright'"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useCanvasStore } from "@/store/modules/canvas";
import { fabric } from "fabric";
import CanvasSize from "@/components/CanvasSize.vue";
import CanvasColor from "@/components/CanvasColor.vue";
const casStore = useCanvasStore();
const leftSlideVis = ref(false);
const rightSlideVis = ref(false);
onMounted(() => {
  init();
});
function changeLeftToggle() {
  leftSlideVis.value = !leftSlideVis.value;
}
function changeRightToggle() {
  rightSlideVis.value = !rightSlideVis.value;
}
function init() {
  const { container } = casStore;
  const canvas = new fabric.Canvas("cas");
  const rect = new fabric.Rect({
    fill: container.fill,
    width: container.w * container.scale,
    height: container.h * container.scale
  });
  canvas.add(rect);
  rect.center();
  rect.selectable = false;
  casStore.canvas = canvas;
  casStore.containerObj = rect;
}

function save() {
  const { container, canvas } = casStore;
  let photoUrl = canvas.toDataURL({
    format: "jpeg",
    quality: 1,
    width: container.w * container.scale,
    height: container.h * container.scale,
    top: (800 - container.h * container.scale) / 2,
    left: (1200 - container.w * container.scale) / 2,
    multiplier: 1 / container.scale
  });
  let a = document.createElement("a");
  let event = new MouseEvent("click");
  a.download = "photo";
  document.body.append(a);
  a.href = photoUrl;
  a.dispatchEvent(event);
}
</script>

<style scoped>
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
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: center;
    .slide {
      width: 300px;
      height: 100%;
      position: relative;
      transition: width 0.3s;
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
      }
      &.left-slide {
        box-shadow: -1px 9px 5px #999;
        &.close {
          width: 50px;
        }
        .options-bar {
          position: absolute;
          width: 50px;
          height: 100%;
          border-right: 1px solid #eee;
        }
        .toggle {
          right: -15px;
        }
      }
      &.right-slide {
        box-shadow: 1px 5px 5px #999;
        .config-box {
          padding: 15px;
        }
        &.close {
          width: 0px;
        }
        .toggle {
          left: -15px;
        }
      }
    }
    .canvas-box {
      flex: 1;
      background: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
