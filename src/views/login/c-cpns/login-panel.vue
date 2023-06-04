<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">鸿源后台管理系统</h1>
    <!-- tab区域 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 帐号登录 -->
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <PanelAccount ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录 -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanelPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码"></el-checkbox>
      <el-checkbox v-model="isForPwd" label="忘记密码"></el-checkbox>
    </div>
    <el-button
      type="primary"
      class="login-btn"
      size="large"
      @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
const isForPwd = ref(false)
const accountRef = ref<InstanceType<typeof PanelAccount>>()

// 登录
const handleLogin = () => {
  if (activeName.value === 'account') {
    // 获取到子组件实例
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('用户在进行手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
