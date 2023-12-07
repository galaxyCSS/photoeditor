<template>
  <div class="shape-editor">
    <div class="list">
      <div class="item" @click="createShape('rect')">
        <svg-icon iconname="juxing"></svg-icon>
      </div>
      <div class="item" @click="createShape('triangle')">
        <svg-icon iconname="xingzhuang-sanjiaoxing"></svg-icon>
      </div>
      <div class="item" @click="createShape('ellipse')">
        <svg-icon iconname="tuoyuanxing"></svg-icon>
      </div>
      <div class="item" @click="createShape('circle')">
        <svg-icon iconname="yuanxingweixuanzhong"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { markRaw } from "vue";
import SvgIcon from "@/components/SvgIcon.vue";
import { useCanvasStore } from "@/store/modules/canvas";
const casStore = useCanvasStore();
function createShape(shape) {
  const { canvas } = casStore;
  canvas.on("selection:created", onSelectionCreated);
  canvas.on("selection:cleared", onSelectionCleared);
  canvas.on("selection:updated", onSelectionUpdated);
  switch (shape) {
    case "rect":
      createRectShape();
      break;
    case "triangle":
      createTriangleShape();
      break;
    case "circle":
      createCircleShape();
      break;
    case "ellipse":
      createEllipseShape();
      break;
  }
}
function onSelectionCreated(opt) {
  casStore.selectedObj = markRaw(opt.selected);
}
function onSelectionCleared() {
  casStore.selectedObj = markRaw([]);
}
function onSelectionUpdated(opt) {
  casStore.selectedObj = markRaw(opt.selected);
}
function createRectShape() {
  const { canvas } = casStore;
  const rect = new fabric.Rect({
    fill: "#1890ff",
    width: 100,
    height: 100,
    originX: "center",
    originY: "center"
  });
  canvas.add(rect);
  rect.type = "shape";
  rect.center();
}
function createTriangleShape() {
  const { canvas } = casStore;
  const triangle = new fabric.Triangle({
    width: 80,
    height: 100,
    fill: "#1890ff",
    originX: "center",
    originY: "center"
  });
  canvas.add(triangle);
  triangle.type = "shape";
  triangle.center();
}
function createCircleShape() {
  const { canvas } = casStore;
  const circle = new fabric.Circle({
    radius: 50,
    fill: "#1890ff",
    originX: "center",
    originY: "center"
  });
  canvas.add(circle);
  circle.type = "shape";
  circle.center();
}
function createEllipseShape() {
  const { canvas } = casStore;
  const ellipse = new fabric.Ellipse({
    fill: "#1890ff",
    rx: 70,
    ry: 30,
    originX: "center",
    originY: "center"
  });
  canvas.add(ellipse);
  ellipse.type = "shape";
  ellipse.center();
}
</script>

<style lang="postcss" scoped>
.shape-editor {
  .list {
    display: flex;
    border: 1px solid #eee;
    flex-wrap: wrap;
    .item {
      width: 50%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 40px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
