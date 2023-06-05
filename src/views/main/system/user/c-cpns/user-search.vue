<template>
  <div class="search">
    <!-- 搜索表单 -->
    <el-form label-width="80px" size="large" :model="searchForm" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input placeholder="请输入用户名" v-model="searchForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              placeholder="请输入真实姓名"
              v-model="searchForm.realname"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              placeholder="请输入手机号码"
              v-model="searchForm.cellphone"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              placeholder="请选择状态"
              style="width: 100%"
              v-model="searchForm.enable"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
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

// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick', 'resetStatus'])

// 定义form的数据
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: []
})

// 重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
const handleRefresh = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}

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
