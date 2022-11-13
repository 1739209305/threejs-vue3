import { createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<any> = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/layout/car'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'chair',
        name: 'layout_chair',
        component: () => import('../threejs/chair.vue')
      },
      {
        path: 'car',
        name: 'layout_car',
        component: () => import('../threejs/car.vue')
      },
      {
        path: 'heart',
        name: 'layout_heart',
        component: () => import('../threejs/heart.vue')
      },
      {
        path: 'environment',
        name: 'layout_environment',
        component: () => import('../threejs/environment.vue')
      },
      {
        path: 'room',
        name: 'layout_room',
        component: () => import('../threejs/room.vue')
      }
    ]
  },
  {
    path: '/chair',
    name: 'chair',
    component: () => import('../threejs/chair.vue')
  },
  {
    path: '/car',
    name: 'car',
    component: () => import('../threejs/car.vue')
  },
  {
    path: '/heart',
    name: 'heart',
    component: () => import('../threejs/heart.vue')
  },
  {
    path: '/environment',
    name: 'environment',
    component: () => import('../threejs/environment.vue')
  },
  {
    path: '/room',
    name: 'room',
    component: () => import('../threejs/room.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
