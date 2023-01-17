<script setup>
import { onUnmounted, provide, reactive, watchEffect } from 'vue'
import { useHeaderFilter } from '@/components/HTTable/useHeaderFilter.js'
import HeaderFilter from '@/components/HTTable/headerFilter.vue'
import { filterKey } from '@/components/HTTable/provideKey.js'


const {filterFields, addFilterFields, delFilterFields, restFilterFields} = useHeaderFilter()

provide(filterKey, {
  filterFields,
  addFilterFields,
  delFilterFields,
  restFilterFields
})
const props = defineProps({
  tableData: {
    type: Array,
    required: true
  },
  isSelection: {
    type: Boolean,
    default: false
  },
  columnData: {
    type: Array
  },
  headerCellClassNameHandler: {
    type: Function || String
  },
  maxHeight: {
    type: String,
    default: '400px'
  }
})

const tableState = reactive({
  loading: false,
  data: [],
  columnData: []
})

const getTableData = () => {
  tableState.loading = true
  tableState.data = props.tableData
  tableState.columnData = props.columnData
  if (tableState.data.length > 0) {
    tableState.loading = false
  }
}
watchEffect(() => {
  getTableData()
})

const emits = defineEmits(['reloadTable'])

const queryTableHandler = () => {
  emits('reloadTable', filterFields)
}

onUnmounted(() => {
  restFilterFields()
})
</script>
<template>
  <el-table ref="tableRef" v-loading="tableState.loading" :data="tableState.data" border stripe
            :header-cell-class-name="headerCellClassNameHandler" :max-height="maxHeight">
    <el-table-column v-if="isSelection" type="selection"></el-table-column>
    <el-table-column type="index" label="序号" width="60"></el-table-column>
    <template v-for="item in tableState.columnData" :key="item.prop">
      <el-table-column v-if="item.showColumn" :prop="item.prop" :label="item.label" :min-width="item.minWidth">
        <template #header="{column}">
          <header-filter :column="column" @queryTable="queryTableHandler"></header-filter>
        </template>
      </el-table-column>
    </template>

  </el-table>
</template>

<script>
export default {
  name: 'HTTable'
}
</script>

