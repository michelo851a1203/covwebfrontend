import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "Index" */ '../views/home/Index.vue'),
        meta: { authRequired: true }
      },
      {
        path: '/report',
        component: () => import(/* webpackChunkName: "Report" */ '../views/home/Report.vue'),
        meta: { authRequired: true }
      },
    ]
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
