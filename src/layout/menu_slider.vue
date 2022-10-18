<template>
  <div class="menu_slider">
    <header>
      <h1>three.js Exmaple</h1>
    </header>
    <div>
      <ul>
        <li
          @click="toPath(item.path)"
          v-for="(item, index) in menu_list"
          :key="index"
        >
          <img :src="item.img" :alt="item.label" />
          <p>{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const menu_list = [
  {
    img: 'menu/car_exhibition.png',
    label: 'Sports car exhibition',
    path: '/car_exhibition'
  },
  {
    img: 'menu/scene_floating_ball.png',
    label: 'Environmental sphere',
    path: '/scene_floating_ball'
  },
  {
    img: 'menu/furniture_show.png',
    label: 'Furniture Show',
    path: '/furniture_show'
  },
  {
    img: 'menu/vr_house_viewing.png',
    label: 'VR House',
    path: '/vr_house_viewing'
  },
  {
    img: 'menu/mobile_heart.png',
    label: 'Mobile Heart',
    path: '/mobile_heart'
  }
]
let router = useRouter()
const toPath = (path) => {
  router.push({ path: path })
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.menu_slider {
  width: 100%;
  height: 100%;
  border-right: 1px solid #e8e8e8;
}
h1 {
  font-size: 1.5rem;
  padding: 1rem;
  border-bottom: 1px solid #e8e8e8;
}
ul {
  height: calc(100vh - 65px);
  overflow-y: scroll;
}
li {
  border-bottom: 1px solid #e8e8e8;
  padding: 0.5rem 0;
  text-align: center;
}
img {
  width: 100%;
  cursor: pointer;
}
</style>
