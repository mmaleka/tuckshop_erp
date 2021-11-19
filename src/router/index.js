import Vue from 'vue'
import VueRouter from 'vue-router'
import SellProductHome from '../views/SellProductHome.vue'
import SellProductCreateOrder from '../views/SellProductCreateOrder.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SellProductHome',
    component: SellProductHome
  },
  {
    path: '/sellproductcreateorder/:id',
    name: 'SellProductCreateOrder',
    component: SellProductCreateOrder
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Register.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: () => import(/* webpackChunkName: "about" */ '../views/AddProduct.vue')
  },
  // {
  //   path: '/product_detail/:id',
  //   name: 'ProductDetail',
  //   meta: {
  //     requiresAuth: true
  //   },
  //   component: () => import(/* webpackChunkName: "product_detail" */ '../views/ProductDetail.vue')
  // },
]

const router = new VueRouter({
  routes
})

export default router
