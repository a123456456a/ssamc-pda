<script setup>
import {ref} from "vue";
import {Setting} from '@element-plus/icons-vue'

const dayNum = ref(7)
const changeDayNum = (currentValue) => {
  // TODO  调用接口
  console.log(currentValue)
}
</script>
<template>
  <el-card :body-style="{padding: 0}">
    <template #header>
      <el-row align="middle">
        <el-col :span="5">{{ '2023-01-17' }} 调整P</el-col>
        <el-col :span="1">天数:</el-col>
        <el-col :span="4">
          <el-input-number v-model="dayNum" size="small" :step="7" step-strictly :min="7" :value-on-clear="7"
                           @change="changeDayNum"></el-input-number>
        </el-col>
        <el-col :span="1" :offset="6">排产:</el-col>
        <el-col :span="4">
          <el-input size="small">
            <template #append>
              <el-button size="small" :icon="Setting"/>
            </template>
          </el-input>
        </el-col>
      </el-row>
    </template>
    {{ '1' }}
  </el-card>
</template>

<script>
export default {
  name: 'pView'
}
</script>

<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 10px;
}
</style>
