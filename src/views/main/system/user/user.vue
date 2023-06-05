<template>
  <div class="user">
    <userSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <userContent
      ref="contentRef"
      @new-click="handleNewBtnClick"
      @edit-click="handleEditBtnClick"
    />
    <userModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

// 对content组件的操作
const contentRef = ref<InstanceType<typeof userContent>>()
const handleQueryClick = (formData: any) => {
  contentRef.value?.fetchUserList(formData)
}

const handleResetClick = () => {
  contentRef.value?.fetchUserList()
}

// 对modal组件的操作
const modalRef = ref<InstanceType<typeof userModal>>()
const handleNewBtnClick = () => {
  modalRef.value?.setModalVisible(true)
}
const handleEditBtnClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
