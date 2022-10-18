import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<any> = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/car_exhibition'
  },
  {
    path: '/furniture_show',
    name: 'furniture_show',
    component: () => import('../threejs/furniture_show.vue')
  },
  {
    path: '/car_exhibition',
    name: 'car_exhibition',
    component: () => import('../threejs/car_exhibition.vue')
  },
  {
    path: '/mobile_heart',
    name: 'mobile_heart',
    component: () => import('../threejs/mobile_heart.vue')
  },
  {
    path: '/scene_floating_ball',
    name: 'scene_floating_ball',
    component: () => import('../threejs/scene_floating_ball.vue')
  },
  {
    path: '/vr_house_viewing',
    name: 'vr_house_viewing',
    component: () => import('../threejs/vr_house_viewing.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
