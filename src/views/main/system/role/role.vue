<template>
  <div class="role">
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
    <pageModal :modalConfig="modalConfig" ref="modalRef" :otherInfo="otherInfo">
      <template #menulist>
        <el-tree
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import userMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal()

// 获取完整的菜单
const mainStore = userMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({})
function handleElTreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = menuList
}

// const modalConfigRef = computed(() => {
//   const mainStore = userMainStore()
//   const departments = mainStore.entireDepartments.map((item) => {
//     return { label: item.name, value: item.id }
//   })
//   modalConfig.formItems.forEach((item) => {
//     if (item.prop === 'parentId') {
//       item.options?.push(...departments)
//     }
//   })
//   return modalConfig
// })
</script>

<style scoped lang="less"></style>
