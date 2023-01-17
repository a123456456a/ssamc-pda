<script setup>

import MainHeader from '@/views/mainHeader.vue'
import PView from '@/views/pView/index.vue'
import { provide, ref, watch } from 'vue'
import { useStore } from '@/pinia/index.js'
import TotalView from '@/views/totalView/index.vue'

const store = useStore()
// 当前日期
const currentDate = ref(store.startDate)
const updateCurrentDate = (val) => {
  currentDate.value = val
}
// P<1得值
const currentPNum = ref(0)
const updateCurrentPNum = (val) => {
  currentPNum.value = val
}
watch(() => store.startDate, () => {
  updateCurrentDate(store.startDate)
})

provide('currentDateKey', {
  currentDate,
  currentPNum,
  updateCurrentDate
})
</script>
<template>
  <main-header></main-header>
  <el-divider/>
  <total-view></total-view>
  <el-divider/>
  <p-view></p-view>
  <el-divider/>
  <el-card>A/D视图</el-card>
</template>
<script>

export default {
  name: 'administrationReceipt'
}
</script>

<style scoped>

</style>
