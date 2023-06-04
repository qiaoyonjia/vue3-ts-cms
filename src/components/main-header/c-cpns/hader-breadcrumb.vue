<template>
  <div class="break-words">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const useMenus = useLoginStore().userMenus
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, useMenus)
})
</script>

<style scoped lang="less">
.break-words {
  color: red;
}
</style>
