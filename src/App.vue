<template>
  <div class="layout">
    <div class="header">1</div>
    <div class="content">
      <div :class="['slide', 'left-slide', leftSlideVis ? 'close' : undefined]">
        <div class="options-bar"></div>
        <div class="toggle" @click="changeLeftToggle">
          <svg-icon :iconname="leftSlideVis ? 'sanjiaoright' : 'sanjiaoleft'"></svg-icon>
        </div>
      </div>
      <div class="canvas-box">4</div>
      <div :class="['slide', 'right-slide', rightSlideVis ? 'close' : undefined]">
        <div class="toggle" @click="changeRightToggle">
          <svg-icon :iconname="rightSlideVis ? 'sanjiaoleft' : 'sanjiaoright'"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
const leftSlideVis = ref(false);
const rightSlideVis = ref(false);

function changeLeftToggle() {
  leftSlideVis.value = !leftSlideVis.value;
}
function changeRightToggle() {
  rightSlideVis.value = !rightSlideVis.value;
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
    }
  }
}
</style>
