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
  { path: '/products', name: 'Products', component: () => import('../views/Services.vue') },
  { path: '/services', redirect: '/products' }, // 旧路径兼容
  { path: '/news', name: 'News', component: () => import('../views/News.vue') },
  { path: '/news/:id', name: 'NewsDetail', component: () => import('../views/NewsDetail.vue') },
  { path: '/careers', name: 'Careers', component: () => import('../views/Careers.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') },
  // 管理端(独立布局,不走官网导航;须放在通配重定向之前)
  { path: '/admin/login', name: 'AdminLogin', component: () => import('../views/admin/AdminLogin.vue') },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminLayout.vue'),
    children: [
      { path: '', redirect: '/admin/news' },
      { path: 'news', name: 'AdminNews', component: () => import('../views/admin/AdminNews.vue') },
      { path: 'jobs', name: 'AdminJobs', component: () => import('../views/admin/AdminJobs.vue') },
      { path: 'products', name: 'AdminProducts', component: () => import('../views/admin/AdminProducts.vue') },
      { path: 'honors', name: 'AdminHonors', component: () => import('../views/admin/AdminHonors.vue') },
      { path: 'partners', name: 'AdminPartners', component: () => import('../views/admin/AdminPartners.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// 管理端守卫:未登录一律去登录页(登录页本身放行)
router.beforeEach((to) => {
  if (to.path.startsWith('/admin') && to.path !== '/admin/login' && !localStorage.getItem('yk_admin_token')) {
    return '/admin/login'
  }
})

export default router
