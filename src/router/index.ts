import { createRouter, createWebHistory } from 'vue-router'
import LeaguesView from '../views/LeaguesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'leagues',
      component: LeaguesView
    },
    // Redirect any unmatched route to the Home route
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
