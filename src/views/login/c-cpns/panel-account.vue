<template>
  <div class="panel-account">
    <el-form
      label-width="60px"
      :model="account"
      ref="formRef"
      :rules="accountRules"
      status-icon
    >
      <el-form-item label="帐号" size="large" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" size="large" prop="password">
        <el-input show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 校验规则
const accountRules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,20}$/,
      message: '必须是5-20位数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
})

// 账号登录逻辑
const formRef = ref<any>()
const loginStore = useLoginStore()
const loginAction = (isRemPwd: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 向服务器发送网络请求
      loginStore.loginAccountAction(account).then((res) => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, account.name)
          localCache.setCache(CACHE_PASSWORD, account.password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops,请输入正确的帐号和密码')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.panel-account {
  color: red;
}
</style>
