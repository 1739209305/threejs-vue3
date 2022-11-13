<template>
  <div class="layout">
    <div class="menu">
      <menu_slider></menu_slider>
    </div>
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import menu_slider from './menu_slider.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.layout {
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
