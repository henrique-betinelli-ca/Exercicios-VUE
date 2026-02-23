import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('../views/PaginaInicial.vue')
  },
  {
    path: '/ExercicioUm',
    name: 'Exercicio Um',
    component: () => import('../views/exercicios/ExercicioUm.vue')
  },
  {
    path: '/ExercicioDois',
    name: 'ExercicioDois',
    component: () => import('../views/exercicios/ExercicioDois.vue')
  },
  {
    path: '/ExercicioTres',
    name: 'ExercicioTres',
    component: () => import('../views/exercicios/ExercicioTres.vue')
  },
  {
    path: '/ExercicioQuatro',
    name: 'ExercicioQuatro',
    component: () => import('../views/exercicios/ExercicioQuatro.vue')
  },
  {
    path: '/ExercicioCinco',
    name: 'ExercicioCnco',
    component: () => import('../views/exercicios/ExercicioCinco.vue')
  },
  {
    path: '/ExercicioSeis',
    name: 'ExercicioSeis',
    component: () => import('../views/exercicios/ExercicioSeis.vue')
  },
  {
    path: '/:PaginaErro(.*)*',
    name: 'PaginaErro',
    component: () => import('../views/PaginaErro.vue')
  },
  {
    path: '/ExercicioSete',
    name: 'ExercicioSete',
    component: () => import('../views/exercicios/ExercicioSete.vue')
  },
  {
    path: '/ExercicioOito',
    name: 'ExercicioOito',
    component: () => import('../views/exercicios/ExercicioOito.vue')
  },
  {
    path: '/ExercicioNove',
    name: 'ExercicioNove',
    component: () => import('../views/exercicios/ExercicioNove.vue'),
  },
  {
    path: '/ExercicioNove/BuscarPaises',
    name: 'BuscarPaises',
    component: () => import('../views/exercicioNove/SearchByNameView.vue')
  },
  {
    path: '/ExercicioNove/BuscarRegiao',
    name: 'BuscarRegiao',
    component: () => import('../views/exercicioNove/SearchByRegionView.vue')
  },
  {
    path: '/ExercicioNove/CompararPaises',
    name: 'CompararPaises',
    component: () => import('../views/exercicioNove/CountryComparisonView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
