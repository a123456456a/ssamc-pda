<script setup>
import { Search, Refresh } from '@element-plus/icons-vue'
import DailyWorkCard from '@/views/dailyWorkCard/index.vue'
import { useStore } from '@/pinia/index.js'
import { onMounted, ref } from 'vue'
import { req } from '@/api/request.js'


const store = useStore()

const selectDate = ref([])
const changeDate = (val) => {
  selectDate.value = val
}

const searchHandler = () => {
  store.startDate = selectDate.value[0]
  store.endDate = selectDate.value[1]
}

const refreshHandler = async () => {
  store.isRefresh = false
  const params = {
    "ac": "pda_getpsmbegindate"
  }
  await req.post(params)
  store.isRefresh = true
}

onMounted(() => {
  selectDate.value = [store.startDate, store.endDate]
})
</script>
<template>
  <el-row align="top">
    <el-col :span="6">
      <el-date-picker v-model="selectDate" type="daterange" start-placeholder="Start date"
                      end-placeholder="End date" value-format="YYYY-MM-DD"
                      @change="changeDate" :clearable="false"></el-date-picker>
    </el-col>
    <el-col :span="1">
      <el-button type="primary" :icon="Search" circle @click="searchHandler"></el-button>
    </el-col>
    <el-col :span="10">
      <el-button type="primary" :icon="Refresh" circle @click="refreshHandler"></el-button>
    </el-col>
    <el-col :span="7">
      <daily-work-card></daily-work-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'mainHeader'
}
</script>

<style scoped lang="scss">
:deep(.el-date-editor) {
  width: auto;
}
</style>