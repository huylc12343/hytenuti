import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Homepage/Home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/Admin/Dashboard.vue'),
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/Product/ProductDetail.vue'),
    },
  ],
})

export default router
