import { createRouter, createWebHistory } from 'vue-router'

import siswaPage from '../views/siswa.vue'
import Dashboard from '../views/Dashboard.vue'
import kelasPage from '../views/kelas.vue'
import bukuPage from '../views/buku.vue'
import peminjamanPage from '../views/peminjaman.vue'
import login from '../components/login.vue'
import register from '../components/Register.vue'

const routes = [
  {
    path : '/',
    name : 'dashboard',
    component : Dashboard
  },
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
    path : '/login',
    name : 'login',
    component: login
  },
  {
    path : '/register',
    name : 'register',
    component: register
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const Auth = JSON.parse(localStorage.getItem('Auth'));
router.beforeEach((to,from,next) => {
 if(to.name !=='login' && !Auth) next({ name: 'login' });
 if(to.name =='login' && 'register' && Auth) next({ name: 'dashboard' });
 else next()
});

export default router
