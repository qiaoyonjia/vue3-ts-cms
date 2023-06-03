<template>
  <div class="main">
    {{ counter }}-{{ doubleCounter }}
    <button @click="changeCount">改变</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
const store = useCounterStore()
const counter = store.counter
const doubleCounter = store.doubleCounter

function changeCount() {
  store.changeCounterAction(999)
}
</script>

<style scoped lang="less">
.main {
  color: red;
}
</style>
