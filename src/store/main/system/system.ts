import { defineStore } from 'pinia'
import {
  postUserListData,
  deleteUserById,
  newUserData,
  editUserData
} from '@/service/main/system/system'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    totalCount: 0
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
    }
  }
})

export default useSystemStore
