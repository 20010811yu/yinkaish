import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// 禁用浏览器刷新时的滚动位置恢复,避免刷新先显示页脚再跳回顶部
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const routes = [
  // 首页静态导入:作为主要落地页随主包加载,避免刷新时异步分包空窗(页脚贴导航)
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: () => import('../views/About.vue') },
  { path: '/services', name: 'Services', component: () => import('../views/Services.vue') },
  { path: '/news', name: 'News', component: () => import('../views/News.vue') },
  { path: '/news/:id', name: 'NewsDetail', component: () => import('../views/NewsDetail.vue') },
  { path: '/careers', name: 'Careers', component: () => import('../views/Careers.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
