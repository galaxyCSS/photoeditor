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
let helpLine = {
  ltLine: null,
  rtLine: null,
  centerLine: null
};
function createShape(shape) {
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
  rect.on("moving", opt => {
    let target = casStore.selectedObj[0];
    setMoveLine(target, "tl", "bl", "ltLine");
    setMoveLine(target, "tr", "br", "rtLine");
    setCenterLine(target, "left", "left", "centerLine");
  });
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
  triangle.on("moving", opt => {
    let target = casStore.selectedObj[0];
    setMoveLine(target, "tl", "bl", "ltLine");
    setMoveLine(target, "tr", "br", "rtLine");
    setCenterLine(target, "left", "left", "centerLine");
  });
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
  circle.on("moving", opt => {
    let target = casStore.selectedObj[0];
    setMoveLine(target, "tl", "bl", "ltLine");
    setMoveLine(target, "tr", "br", "rtLine");
    setCenterLine(target, "left", "left", "centerLine");
  });
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
  ellipse.on("moving", opt => {
    let target = casStore.selectedObj[0];
    setMoveLine(target, "tl", "bl", "ltLine");
    setMoveLine(target, "tr", "br", "rtLine");
    setCenterLine(target, "left", "left", "centerLine");
  });
}
function setMoveLine(target, typeA, typeB, lineType) {
  const { canvas } = casStore;
  let leftPoint = target.lineCoords[typeA];
  let allObjs = canvas.getObjects();
  allObjs = allObjs.filter(i => !i.hasOwnProperty("isSelf"));
  let item = allObjs.find(i => setDoubleNum(i.lineCoords[typeB].x) === setDoubleNum(leftPoint.x));
  canvas.remove(helpLine[lineType]);
  if (item) {
    let endPoint = item.lineCoords[typeB];
    helpLine[lineType] = new fabric.Line([leftPoint.x, leftPoint.y, endPoint.x, endPoint.y], {
      stroke: "red"
    });
    canvas.add(helpLine[lineType]);
    helpLine[lineType].selectable = false;
  } else {
    canvas.remove(helpLine[lineType]);
  }
  casStore.helpLine = markRaw(helpLine);
}
function setCenterLine(target, typeA, typeB, lineType) {
  const { canvas } = casStore;
  let leftPoint = {
    x: target[typeA],
    y: target.top
  };
  let allObjs = canvas.getObjects();
  allObjs = allObjs.filter(i => !i.hasOwnProperty("isSelf"));
  let item = allObjs.find(i => setDoubleNum(i[typeB]) === setDoubleNum(leftPoint.x));
  canvas.remove(helpLine[lineType]);
  if (item) {
    let endPoint = {
      x: item[typeB],
      y: item.top
    };
    helpLine[lineType] = new fabric.Line([leftPoint.x, leftPoint.y, endPoint.x, endPoint.y], {
      stroke: "red"
    });
    canvas.add(helpLine[lineType]);
    helpLine[lineType].selectable = false;
  } else {
    canvas.remove(helpLine[lineType]);
  }
  casStore.helpLine = helpLine;
}
function setDoubleNum(num) {
  return Math.floor(num);
}
</script>

<style lang="postcss" scoped>
.shape-editor {
  .list {
    display: flex;
    border: 1px solid #eee;
    flex-wrap: wrap;
    padding: 10px 15px;
    justify-content: space-between;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 20px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
</style>
