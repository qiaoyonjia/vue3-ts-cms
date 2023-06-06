import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 4.1.动态获取所有的路由对象，放到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 读取router/main所有的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  // 4.2 将加载的对象放到localRoutes中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 定义面包屑
  const breadcrumbs: any[] = []
  // 遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 顶层的菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 匹配的菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenuListToPermission(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item?.children ?? [])
      }
    }
  }

  recurseGetPermission(menuList)

  return permissions
}
