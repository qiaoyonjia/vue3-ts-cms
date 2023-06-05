import { defineStore } from 'pinia'
import {
  postUserListData,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    totalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 获取用户信息表
    async postUserListAction(queryInfo: any) {
      const userListResult = await postUserListData(queryInfo)
      const { totalCount, list } = userListResult.data
      this.userList = list
      this.totalCount = totalCount
    },
    // 根据Id删除用户
    async deleteUserByIdAction(id: number) {
      // 删除
      const deleteResult = await deleteUserById(id)
      // 重新请求
      this.postUserListAction({ offset: 0, size: 10 })

      return deleteResult
    },
    // 创建用户
    async newUserInfoAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      // 重新请求
      this.postUserListAction({ offset: 0, size: 10 })
      return newResult
    },
    // 修改用户信息
    async editUserInfoAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      // 重新请求
      this.postUserListAction({ offset: 0, size: 10 })
      return editResult
    },

    /**针对页面数据，增删改查 */
    // 查询页面
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },

    // 删除页面
    async deletePageByIdAction(pageName: string, id: number) {
      // 删除
      const deleteResult = await deletePageById(pageName, id)
      // 重新请求
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      return deleteResult
    },

    // 创建页面
    async newPageInfoAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      // 重新请求
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      return newResult
    },
    // 修改页面信息
    async editPageInfoAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      // 重新请求
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      return editResult
    }
  }
})

export default useSystemStore
