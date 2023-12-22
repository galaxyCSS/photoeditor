/*
 * @Author: 陈三石
 * @Date: 2023-12-06 13:58:44
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-22 14:29:55
 * @Description: 'file content'
 */
import { defineStore } from "pinia";
export const useCanvasStore = defineStore("canvasEditor", {
  state: () => ({
    canvas: null, // 画布对象
    container: {
      // 容器尺寸信息
      w: 900,
      h: 1200,
      scale: 0.6,
      fill: "#fff"
    },
    containerObj: null, // 容器对象
    editType: "shape", // 编辑器类型
    selectedObj: [], // 选中的元素对象
    isDraw: false, // 是否绘画模式
    pencilBrush: null, // 画笔对象
    BGUrl: "", // 背景
    addPhotoUrl: "", // 添加的图片
    helpLine: {}, // 辅助线
    layerStack: [], // 图层栈
    layerRemoveStack: [] // 已移除的图层栈
  })
});
