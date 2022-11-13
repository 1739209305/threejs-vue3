import { createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<any> = [
  // {
  //   path: '/:pathMatch(.*)',
  //   redirect: '/car_exhibition'
  // },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'furniture_show',
        name: 'layout_furniture_show',
        component: () => import('../threejs/furniture_show.vue')
      },
      {
        path: 'car_exhibition',
        name: 'layout_car_exhibition',
        component: () => import('../threejs/car_exhibition.vue')
      },
      {
        path: 'mobile_heart',
        name: 'layout_mobile_heart',
        component: () => import('../threejs/mobile_heart.vue')
      },
      {
        path: 'scene_floating_ball',
        name: 'layout_scene_floating_ball',
        component: () => import('../threejs/scene_floating_ball.vue')
      },
      {
        path: 'vr_house_viewing',
        name: 'layout_vr_house_viewing',
        component: () => import('../threejs/vr_house_viewing.vue')
      }
    ]
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
  history: createWebHashHistory(),
  routes
})

export default router
