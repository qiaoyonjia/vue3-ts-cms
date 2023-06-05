<template>
  <div class="search">
    <!-- 搜索表单 -->
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm[item.prop]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 重置和搜索按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleRefresh">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleSearch"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus/es/components/index.js'
import { reactive, ref } from 'vue'

// 定义自定义事件/接收的属性
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const emit = defineEmits(['queryClick', 'resetClick', 'resetStatus'])
const props = defineProps<IProps>()

// 定义form的数据
const initialForm: any = []
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = ''
}
const searchForm = reactive({ initialForm })

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
const handleRefresh = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}

// 搜索
const handleSearch = () => {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
