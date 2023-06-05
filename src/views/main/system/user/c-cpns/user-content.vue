<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" width="65" label="序号" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150"
        />
        <el-table-column align="center" prop="enable" label="状态" width="80">
          <!-- 作用域插槽 -->
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template #default="scope">
            <el-button
              size="small"
              text
              icon="Edit"
              type="primary"
              @click="handleEditBtnClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              text
              icon="Delete"
              type="danger"
              @click="handleDeleteBtnClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'

// 发起action，请求userList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

const emit = defineEmits(['newClick', 'editClick'])

// 用于发送网络请求
const fetchUserList = (formData: any = {}) => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUserListAction(queryInfo)
}

fetchUserList()
// 获取userList数据进行展示
const { userList, totalCount } = storeToRefs(systemStore)

// 页面相关
const handleSizeChange = () => {
  fetchUserList()
}

const handleCurrentChange = () => {
  fetchUserList()
}

// 删除用户
const handleDeleteBtnClick = async (id) => {
  const res = await systemStore.deleteUserByIdAction(id)
  if (res.code === 1) {
    ElNotification({
      title: '删除成功',
      message: '删除用户成功',
      type: 'success'
    })
  }
}

// 编辑
const handleEditBtnClick = (itemData: any) => {
  emit('editClick', itemData)
}

// 新建用户
const handleNewUserClick = () => {
  emit('newClick')
}

defineExpose({ fetchUserList })
</script>

<style scoped lang="less">
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 20px;
    }
  }

  .table {
    .el-button {
      margin-left: 0;
    }
  }

  .footer {
    display: flex;
    justify-content: end;
    margin-top: 10px;
  }
}
</style>
