<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle
      "
      width="30%"
      center
    >
      <el-form label-width="80px" :model="formData" size="large">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
              >
                <template v-for="sub in item.options" :key="sub.value">
                  <el-option :label="sub.label" :value="sub.value" />
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
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
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { ElNotification } from 'element-plus'

interface IProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
    otherInfo?: any
  }
}

const props = defineProps<IProps>()

const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item['prop']] = item['initialValue'] ?? ''
}
const formData = reactive(initialForm)

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

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }

  let res: any = null
  if (isNewRef.value) {
    // 新建
    res = await systemStore.newPageInfoAction(
      props.modalConfig.pageName,
      infoData
    )
  } else {
    // 编辑
    res = await systemStore.editPageInfoAction(
      props.modalConfig.pageName,
      editDate.value.id,
      infoData
    )
  }
  if (res?.code === 1) {
    ElNotification({
      title: '成功',
      message: '操作成功',
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
