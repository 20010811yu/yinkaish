import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/services', name: 'Services', component: () => import('../views/Services.vue') },
  { path: '/team', name: 'Team', component: () => import('../views/Team.vue') },
  { path: '/news', name: 'News', component: () => import('../views/News.vue') },
  { path: '/news/:id', name: 'NewsDetail', component: () => import('../views/NewsDetail.vue') },
  { path: '/careers', name: 'Careers', component: () => import('../views/Careers.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
