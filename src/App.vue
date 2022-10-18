<template>
  <div class="app">
    <div class="menu">
      <menu_slider></menu_slider>
    </div>
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import menu_slider from './layout/menu_slider.vue'
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
.menu {
  width: 20%;
}
.content {
  width: 80%;
  position: relative;
}
</style>
