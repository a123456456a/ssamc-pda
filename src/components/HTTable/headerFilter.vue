<script setup>

import { inject, onBeforeMount, reactive } from 'vue'
import { Filter } from '@element-plus/icons-vue'
import { filterKey } from '@/components/HTTable/provideKey.js'

const props = defineProps({
  column: {
    type: Object
  }
})
const filterState = reactive({
  label: '',
  property: ''
})

onBeforeMount(() => {
  filterState.label = props.column.label
  filterState.property = props.column.property
})

const popoverState = reactive({
  visible: false,
  searchValue: '',
  isFilter: false
})

const filterItem = reactive({
  text: '',
  value: ''
})

const {delFilterFields, addFilterFields} = inject(filterKey)

const afterLeaveHandler = () => {
  if (!popoverState.searchValue) {
    popoverState.isFilter = false
    delFilterFields(filterItem)
  }
}

const emits = defineEmits(['queryTable'])

// 保存过滤条件
const saveSearchFilter = () => {
  if (popoverState.searchValue) {
    filterItem.text = filterState.property
    filterItem.value = popoverState.searchValue
    addFilterFields(filterItem)
  } else {
    delFilterFields(filterItem)
  }
  popoverState.visible = false
  emits('queryTable')
}
// 重置过滤条件
const resetFilter = () => {
  delFilterFields(filterItem)
  popoverState.isFilter = false
  popoverState.visible = false
  emits('queryTable')
}

// 点击过滤图标
const filterHandler = () => {
  popoverState.isFilter = true
}

</script>
<template>
  <el-row align="middle">
    <el-col :span="16">{{ filterState.label }}</el-col>
    <el-col :span="4">
      <el-popover v-model:visible="popoverState.visible" width="120" trigger="click" @after-leave="afterLeaveHandler">
        <el-input v-model="popoverState.searchValue" size="small" clearable></el-input>
        <el-row align="middle" justify="end" style="margin-top: 8px">
          <el-button type="primary" size="small" @click="saveSearchFilter">确定</el-button>
          <el-button type="danger" size="small" @click="resetFilter">重置</el-button>
        </el-row>
        <template #reference>
          <el-row align="middle" justify="center" @click="filterHandler">
            <el-icon :color="popoverState.isFilter ? '#409EFF': ''">
              <Filter/>
            </el-icon>
          </el-row>
        </template>
      </el-popover>
    </el-col>
<!--    <el-col :span="4">-->
<!--      <el-row align="bottom" @click="sortUpHandler">-->
<!--        <el-icon size="9" :color="isSortUp ? '#409EFF': ''">-->
<!--          <CaretTop/>-->
<!--        </el-icon>-->
<!--      </el-row>-->
<!--      <el-row align="top" @click="sortDownHandler">-->
<!--        <el-icon size="9" :color="isSortDown ? '#409EFF' : ''">-->
<!--          <CaretBottom/>-->
<!--        </el-icon>-->
<!--      </el-row>-->
<!--    </el-col>-->
  </el-row>
</template>

<script>
export default {
  name: 'headerFilter'
}
</script>

<style scoped>

</style>