import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import AddView from '../views/AddView.vue';
import StockView from '../views/StockView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartView
    },
    {
      path: '/add',
      name: 'add',
      component: AddView
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }

  ]
})

export default router
