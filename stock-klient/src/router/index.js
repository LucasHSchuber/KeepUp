import { createRouter, createWebHistory } from 'vue-router';
import StartView from '../views/StartView.vue';
import AddView from '../views/AddView.vue';
import StockView from '../views/StockView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MyAddedStockView from '../views/MyAddedStockView.vue';


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
      component: AddView,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('token')) {
          next()
        } else{
          next('login')
        }
      }
    },
    {
      path: '/stock',
      name: 'stock',
      component: StockView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('token')) {
          next()
        } else{
          next('login')
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/mystock',
      name: 'mystock',
      component: MyAddedStockView,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('token')) {
          next()
        } else{
          next('login')
        }
      }
    }

  ]
})

export default router
