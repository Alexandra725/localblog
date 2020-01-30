import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../components/Posts.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue')
  },
  {
    path:'/perfil',
    name:'perfil',
    component: () => import('../components/Perfil.vue')
  },
  {
    path:'/post/:id',
    name:'onepost',
    component: () => import('../components/OnePost.vue')
  },
  {path:'/post',
  name:'perfilposts',
  component: () => import('../components/PerfilPosts.vue')
  },
  {
    path:'/edit/:id',
    name:'editpost',
    component: () => import('../components/EditPost.vue')

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
