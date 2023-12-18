/*
 * @Author: 陈三石
 * @Date: 2023-12-06 10:49:12
 * @LastEditors: 陈三石
 * @LastEditTime: 2023-12-18 16:43:22
 * @Description: 'file content'
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssNesting from "postcss-nesting";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
  },
  css: {
    postcss: {
      plugins: [postcssNesting()]
    }
  },
  base: "/vue-photo-editor/"
});
