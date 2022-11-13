<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
// import menu_slider from './layout/menu_slider.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.content {
  width: 100%;
  position: relative;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px gray;
  background: grey;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
  background: #ededed;
}
</style>
