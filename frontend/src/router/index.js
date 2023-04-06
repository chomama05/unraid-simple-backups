// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/:id?',
    component: () => import('@/views/Backups.vue'),
  },
  {
    path: '/configurator/:id?',
    component: () => import('@/views/Configurator.vue'),
  },
  {
    name: 'logs',
    path: '/logs/:id?',
    component: () => import('@/views/Logs.vue'),
  },
  {
    path: '/debug',
    component: () => import('@/views/Debug.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
