import { createRouter, createWebHistory } from 'vue-router'

import siswaPage from '../views/siswa.vue'
import Dashboard from '../views/Dashboard.vue'
import kelasPage from '../views/kelas.vue'
import bukuPage from '../views/buku.vue'
import peminjamanPage from '../views/peminjaman.vue'
import login from '../views/login.vue'


const routes = [
  {
    path : '/',
    name : 'dashboard',
    component : Dashboard
  },
  {
    path : '/login',
    name : 'login',
    component : login
  },
  // {
  //   path : '/tes',
  //   name : 'tes',
  //   component : tes
  // },
  {
    path: '/siswa',
    name: 'siswa',
    component: siswaPage
  },
  {
    path: '/kelas',
    name: 'kelas',
    component: kelasPage
  },
  {
    path: '/buku',
    name: 'buku',
    component: bukuPage
  },
  {
    path : '/peminjaman',
    name : 'peminjaman',
    component: peminjamanPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/siswa.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
