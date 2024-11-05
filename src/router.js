import { createRouter, createWebHistory } from 'vue-router';
import Products from './components/Products.vue';
import Kart from './components/Kart.vue';

const routes = [
  {
    path: '/products',
    name: 'products',
    component: Products,
  },
  {
    path: '/kart',
    name: 'kart',
    component: Kart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
