import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Scheduler',
    component: () => import("@/views/schedulerView"),
    redirect: "/interval",
    children: [
      {
        path: '/interval',
        name: 'interval',
        component: () => import("@/views/interval/intervalView"),
      },
      {
        path: '/editInterval',
        name: 'editInterval',
        component: () => import("@/views/interval/editInterval"),
      },
      {
        path: '/addInterval',
        name: 'addInterval',
        component: () => import("@/views/interval/addInterval"),
      },
      {
        path: '/intervalAction',
        name: 'intervalAction',
        component: () => import("@/views/intervalAction/intervalActionView"),
      },
      {
        path: '/addIntervalAction',
        name: 'addIntervalAction',
        component: () => import("@/views/intervalAction/addIntervalAction"),
      },
      {
        path: '/editIntervalAction',
        name: 'editIntervalAction',
        component: () => import("@/views/intervalAction/editIntervalAction"),
      },


    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
