/*
 * @Author: 陈三石
 * @Date: 2023-12-06 13:58:44
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-07 15:48:13
 * @Description: 'file content'
 */
import { defineStore } from "pinia";
export const useCanvasStore = defineStore("canvasEditor", {
  state: () => ({
    canvas: null,
    container: {
      w: 900,
      h: 1200,
      scale: 0.6,
      fill: "#fff"
    },
    containerObj: null,
    editType: "shape",
    selectedObj: []
  })
});
