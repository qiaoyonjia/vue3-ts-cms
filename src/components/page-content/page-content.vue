<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewUserClick" v-if="isCreate">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        style="width: 100%"
        border
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  text
                  icon="Edit"
                  type="primary"
                  @click="handleEditBtnClick(scope.row)"
                  v-if="isUpdate"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  text
                  icon="Delete"
                  type="danger"
                  @click="handleDeleteBtnClick(scope.row.id)"
                  v-if="isDelete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
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
import usePermission from '@/hooks/usePremissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

const props = defineProps<IProps>()

// 获取是否有对应的增删改查的权限

const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)

// 发起action，请求userList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

const emit = defineEmits(['newClick', 'editClick'])

// 用于发送网络请求
const fetchPageList = (formData: any = {}) => {
  if (!isQuery) return
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const pageInfo = { size, offset }

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

fetchPageList()
// 获取userList数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 页面相关
const handleSizeChange = () => {
  fetchPageList()
}

const handleCurrentChange = () => {
  fetchPageList()
}

// 删除用户
const handleDeleteBtnClick = async (id) => {
  const res = await systemStore.deletePageByIdAction(
    props.contentConfig.pageName,
    id
  )
  if (res.code === 1) {
    ElNotification({
      title: '删除成功',
      message: '删除成功',
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

defineExpose({ fetchPageList })
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
