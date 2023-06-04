import { defineStore } from 'pinia'
import router from '@/router'
import {
  accountLogin,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: []
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    // 登录
    async loginAccountAction(account: IAccount) {
      // 1.账号登录，获取token等信息
      const loginRes = await accountLogin(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusRes = await getUserMenuByRoleId(this.userInfo.role.id)
      const userMenus = userMenusRes.data
      this.userMenus = userMenus

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfoRes.data)
      localCache.setCache('userMenus', userMenusRes.data)

      // 重要：动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 5.跳转到main
      router.push('/main')
    },
    // 刷新时重新加载所有路由
    loadLocalCacheAction() {
      // 用户进行刷新的时候默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
