import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue')
    },
    {
      path: '/:patchMatch(.*)',
      component: () => import('@/views/notFound/NotFound.vue')
    }
  ]
})

// 导航守卫
// to(跳转的位置) from(从那里跳转过来)
// 返回值:决定导航的路径
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  // 未登录跳转到登录页面
  if (to.path === '/main' && !token) {
    return '/login'
  }

  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
