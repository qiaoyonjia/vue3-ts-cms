<template>
  <div class="dashboard">
    <!-- 1.顶部数字的数据显示 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6"><CountCard v-bind="item" /></el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-cards/count-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'

// 1.发送请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.从store获取数据
const { amountList } = storeToRefs(analysisStore)
</script>

<style scoped lang="less"></style>
