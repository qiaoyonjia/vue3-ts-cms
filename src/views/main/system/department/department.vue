<template>
  <div class="department">
    <pageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <pageModal :modalConfig="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { computed, ref } from 'vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import userMainStore from '@/store/main/main'

const modalConfigRef = computed(() => {
  const mainStore = userMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...departments)
    }
  })
  return modalConfig
})

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
