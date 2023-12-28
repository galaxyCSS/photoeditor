<!--
 * @Author: 陈三石
 * @Date: 2023-12-06 17:45:38
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-28 14:02:55
 * @Description: 'file content'
-->
<template>
  <el-divider content-position="left">背景色</el-divider>
  <div class="color-picker">
    <el-color-picker :model-value="color" show-alpha @change="colorChange" />
    <div :style="{ background: color }" class="color-bar"></div>
  </div>
  <div class="advise-color">
    <div class="label">推荐配色</div>
    <div class="item-list" v-for="item in colors">
      <div class="item" v-for="itema in item" :style="{ background: itema }" @click="colorChange(itema)"></div>
    </div>
    <div class="memo">
      <span>配色方案来自:</span>
      <el-link href="https://ant-design.antgroup.com/docs/spec/colors-cn" target="_blank" type="primary">Ant Design</el-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
const color = ref("#fff");
const colors = [
  ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"],
  ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"],
  ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"],
  ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"],
  ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"],
  ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"],
  ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"],
  ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"],
  ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"],
  ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"],
  ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"],
  ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"],
  ["#ffffff", "#fafafa", "#f5f5f5", "#f0f0f0", "#d9d9d9", "#bfbfbf", "#8c8c8c", "#595959", "#434343", "#262626"]
];
function colorChange(val) {
  const { containerObj, canvas } = casStore;
  containerObj.set("fill", val);
  canvas.requestRenderAll();
  color.value = val;
}
</script>

<style lang="postcss" scoped>
.color-picker {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .color-bar {
    flex: 1;
    height: 25px;
    margin-left: 20px;
    border: 1px solid #eee;
  }
}
.advise-color {
  .label {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .item-list {
    display: flex;
    margin-bottom: 3px;
    justify-content: space-between;
    margin-bottom: 5px;
    .item {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .memo {
    font-size: 12px;
    display: flex;
    align-items: center;
  }
}
</style>
