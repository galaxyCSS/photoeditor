<!--
 * @Author: 陈三石
 * @Date: 2023-12-12 17:19:17
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-18 15:47:24
 * @Description: 'file content'
-->
<template>
  <div class="photo-control">
    <el-divider content-position="left">添加滤镜</el-divider>
    <canvas id="filterCas" width="240" height="800"></canvas>
  </div>
</template>

<script setup>
let canvas;
import { fabric } from "fabric";
import { onMounted } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
const allFilters = [
  {
    key: "Blur",
    props: {
      blur: 0.5
    }
  },
  {
    key: "Brightness",
    props: {
      brightness: 0.05
    }
  },
  {
    key: "ColorMatrix",
    props: {
      matrix: [
        1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502, -0.16404339962244616,
        1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203, -0.16786010706155763, -0.5603416277695248,
        1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0
      ]
    }
  },
  {
    key: "Contrast",
    props: {
      contrast: 0.25
    }
  },
  {
    key: "Convolute",
    props: {
      matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
    }
  },
  {
    key: "Gamma",
    props: {
      gamma: [1, 0.5, 2.1]
    }
  },
  {
    key: "Grayscale",
    props: {}
  },
  {
    key: "HueRotation",
    props: {
      rotation: -0.5
    }
  },
  {
    key: "Invert",
    props: {}
  },
  {
    key: "Noise",
    props: {
      noise: 700
    }
  },
  {
    key: "Pixelate",
    props: {
      blocksize: 8
    }
  },
  {
    key: "RemoveColor",
    props: {
      threshold: 0.2
    }
  },
  {
    key: "Saturation",
    props: { saturation: 1 }
  },
  {
    key: "Vibrance",
    props: {
      vibrance: 1
    }
  }
];
const casStore = useCanvasStore();
onMounted(() => {
  return;
  initCas();
});
function initCas() {
  canvas = new fabric.Canvas("filterCas");
  initFilters();
}
function initFilters() {
  const { addPhotoUrl } = casStore;
  allFilters.forEach(i => {
    fabric.Image.fromURL(addPhotoUrl, img => {
      img.scale(0.5);
      img.filters.push(new fabric.Image.filters[i.key](i.props));
      img.applyFilters();
      canvas.add(img);
    });
  });
}
</script>

<style></style>
