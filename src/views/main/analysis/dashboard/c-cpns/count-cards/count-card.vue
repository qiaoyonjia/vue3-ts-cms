<template>
  <div class="card">
    <div class="header">
      <span>{{ title }}</span>
      <el-tooltip :content="tip" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span v-if="amount === 'saleroom'">￥</span>
      <span ref="count1Ref"> {{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subTitle }}</span>
      <span v-if="amount === 'saleroom'">￥</span>
      <span ref="count2Ref"> {{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'

interface IProps {
  amount: string
  title: string
  tip: string
  number1: number
  number2: number
  subTitle: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tip: '所有商品的总销量',
  number1: 509989,
  number2: 509989,
  subTitle: '商品总销量'
})

const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1)
  const countup2 = new CountUp(count2Ref.value!, props.number2)
  countup1.start()
  countup2.start()
})
</script>

<style scoped lang="less">
.card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
