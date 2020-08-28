import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/api/Login.js"


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "Index" */ '../views/home/Index.vue'),
        meta: { authRequired: true, noDirect: true, allowRole: [3] }
      },
      {
        path: '/report',
        component: () => import(/* webpackChunkName: "Report" */ '../views/home/Report.vue'),
        meta: { authRequired: true, noDirect: true, allowRole: [1, 3] }
      },
      {
        path: '/scan',
        component: () => import(/* webpackChunkName: "Scan" */ '../views/home/Scan.vue'),
        meta: { authRequired: true, noDirect: true, allowRole: [2] }
      },
      {
        path: '/verifyreport',
        component: () => import(/* webpackChunkName: "VerifyReport" */ '../views/home/VerifyReport.vue'),
        meta: { authRequired: true, noDirect: true, allowRole: [2] }
      },
    ]
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue'),
    meta: { noDirect: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: { noDirect: true }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const loginModule = Login()
  if (!to.meta.noDirect) {
    next({
      name: "signIn"
    })
    return
  }
  if (!to.meta.authRequired) {
    next();
    return;
  }
  if (!loginModule.regainLoginUser()) {
    next({
      name: "signIn"
    })
    return
  }
  const getRole = loginModule.userData.role
  if (to.meta.allowRole.includes(getRole)) {
    next()
    return
  }
  switch (getRole) {
    case 1:
      next("/report")
      break;
    case 2:
      next("/scan")
      break;
    case 3:
      next("/")
      break;
    default:
      next({
        name: "signIn"
      })
      break;
  }
})


export default router
