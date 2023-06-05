<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <el-form label-width="80px" :model="formData" size="large">
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model="formData.name" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input placeholder="请输入真实姓名" v-model="formData.realname" />
        </el-form-item>
        <el-form-item v-if="isNewRef" label="密码" prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            v-model="formData.password"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="cellphone">
          <el-input placeholder="请输手机号" v-model="formData.cellphone" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select
            v-model="formData.roleId"
            placeholder="请选择角色"
            style="width: 100%"
          >
            <template v-for="item in entireRoles" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="选择部门" prop="departmentId">
          <el-select
            v-model="formData.departmentId"
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
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const isNewRef = ref(true)

// 获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

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
    res = await systemStore.newUserInfoAction(formData)
  } else {
    // 编辑
    res = await systemStore.editUserInfoAction(editDate.value.id, formData)
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
