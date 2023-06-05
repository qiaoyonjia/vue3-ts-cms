<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <el-form label-width="80px" :model="formData" size="large">
        <el-form-item label="部门名称" prop="name">
          <el-input placeholder="请输入部门名称" v-model="formData.name" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input placeholder="请输入部门领导" v-model="formData.leader" />
        </el-form-item>
        <el-form-item label="选择部门" prop="parentId">
          <el-select
            v-model="formData.parentId"
            placeholder="请选择部门"
            style="width: 100%"
          >
            <template v-for="item in entireDepartments" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { ElNotification } from 'element-plus'

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

const isNewRef = ref(true)

// 获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)

// 定义内部属性
const dialogVisible = ref(false)
const editDate = ref()

const setModalVisible = (isNew: boolean, itemData?: any) => {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editDate.value = itemData
  } else {
    // 新建数据
    for (const key in formData) {
      formData[key] = ''
    }
    editDate.value = null
  }
}

// 点击确定
const handleConfirmClick = async () => {
  dialogVisible.value = false
  let res: any = null
  if (isNewRef.value) {
    // 新建
    res = await systemStore.newPageInfoAction('department', formData)
  } else {
    // 编辑
    res = await systemStore.editPageInfoAction(
      'department',
      editDate.value.id,
      formData
    )
  }
  if (res?.code === 1) {
    ElNotification({
      title: '成功',
      message: '用户操作成功',
      type: 'success'
    })
  }
}

defineExpose({ setModalVisible })
</script>

<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
