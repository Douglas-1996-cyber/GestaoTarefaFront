import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/LoginComponent.vue'
import Cadastro from '../components/CadastroComponent.vue'
import TelaInicial from '../components/TelaInicial.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
  },
  {
    path: '/telaInicial',
    name: 'telaInicial',
    component: TelaInicial
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
