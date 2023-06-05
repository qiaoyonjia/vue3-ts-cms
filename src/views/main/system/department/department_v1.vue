<template>
  <div class="department">
    <pageSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <pageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './c-cpns/page-search.vue'
import pageContent from './c-cpns/page-content.vue'
import pageModal from './c-cpns/page-modal.vue'
import { ref } from 'vue'

// 点击搜索
const contentRef = ref<InstanceType<typeof pageContent>>()
const handleQueryClick = (queryInfo: any) => {
  console.log('contentRef.value', queryInfo)
  contentRef.value?.fetchPageList(queryInfo)
}
const handleResetClick = () => {
  contentRef.value?.fetchPageList()
}

const modalRef = ref<InstanceType<typeof pageModal>>()
const handleNewClick = () => {
  modalRef.value?.setModalVisible(true)
}

const handleEditClick = (itemData: any) => {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped>
.department {
}
</style>
