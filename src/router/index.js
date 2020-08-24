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
        meta: { authRequired: true, noDirect: true }
      },
      {
        path: '/report',
        component: () => import(/* webpackChunkName: "Report" */ '../views/home/Report.vue'),
        meta: { authRequired: true, noDirect: true }
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

  const cluster = localStorage.getItem("covWebItem")
  const token = localStorage.setItem(cluster)
  if (cluster && cluster !== "" && token && token !== "") {
    next()
    return
  }
  next({
    name: "signIn"
  })
})


export default router
