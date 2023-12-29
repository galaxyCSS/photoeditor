<!--
 * @Author: galaxy_css leic2088@163.com
 * @Date: 2023-12-08 20:28:29
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-28 13:57:35
 * @FilePath: /photoeditor/src/components/canvas/CanvasBG.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="canvas-bg">
    <el-divider content-position="left">使用背景图</el-divider>
    <div class="upload">
      <el-upload :limit="1" :auto-upload="false" :on-change="onChange" :on-remove="onRemove">
        <el-button type="primary">点击上传图片</el-button>
      </el-upload>
    </div>
    <div class="preview" v-if="photoUrl">
      <img :src="photoUrl" alt="" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, markRaw } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
import { fabric } from "fabric";
import emptyBG from "../../assets/imgs/empty.png";
const casStore = useCanvasStore();
const photoUrl = ref();

function onChange(file) {
  if (file.status === "ready") {
    let url = URL.createObjectURL(file.raw);
    photoUrl.value = url;
    importPhoto(url);
  }
}
function onRemove() {
  const { canvas, container, containerObj } = casStore;
  photoUrl.value = "";
  containerObj.set("fill", "#fff");
  canvas.requestRenderAll();
  casStore.BGUrl = emptyBG;
}
function importPhoto(url) {
  const { canvas, container, containerObj } = casStore;
  fabric.Image.fromURL(url, img => {
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      scaleX: (container.w * container.scale) / img.width,
      scaleY: (container.h * container.scale) / img.height,
      top: (canvas.getHeight() - container.h * container.scale) / 2,
      left: (canvas.getWidth() - container.w * container.scale) / 2
    });
    containerObj.set("fill", "transparent");
    canvas.requestRenderAll();
    casStore.BGUrl = url;
  });
}
</script>

<style lang="postcss" scoped>
.upload {
  margin-bottom: 20px;
}
.preview {
  border: 1px solid #666;
  text-align: center;
  padding: 10px;
  img {
    width: 100%;
  }
}
</style>
