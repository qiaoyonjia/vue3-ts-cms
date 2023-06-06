import { ref } from 'vue'
import type pageModal from '@/components/page-modal/page-modal.vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modalRef.value?.setModalVisible(true)
  }

  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
  }

  return {
    modalRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModal
