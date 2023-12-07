<template>
  <div class="shape-editor">
    <div class="list">
      <div class="item">
        <svg-icon iconname="juxing"></svg-icon>
      </div>
      <div class="item">
        <svg-icon iconname="xingzhuang-sanjiaoxing"></svg-icon>
      </div>
      <div class="item">
        <svg-icon iconname="tuoyuanxing"></svg-icon>
      </div>
      <div class="item">
        <svg-icon iconname="yuanxingweixuanzhong"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/SvgIcon.vue";
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
