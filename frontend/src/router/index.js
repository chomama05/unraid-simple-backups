// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Backups.vue'),
  },
  {
    path: '/configurator/:id?',
    component: () => import('@/views/Configurator.vue'),
  },
  {
    path: '/logs',
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
