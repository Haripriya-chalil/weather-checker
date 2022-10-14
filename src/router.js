import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'SearchPage',
    component: () => import('./SearchPage.vue')
  },
  {
    path: '/page1',
    name: 'MainPage',
    component: () => import('./MainPage.vue')
  },
  {
    path: '/page2',
    name: 'MainPage2',
    component: () => import('./MainPage2.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router;