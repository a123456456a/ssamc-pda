<script setup>
import HTDialog from '@/components/HTDialog/index.vue'
import HTTable from '@/components/HTTable/index.vue'
import { useClickTotal } from '@/views/totalView/useClickTotal.js'
import { useTotalView } from '@/views/totalView/useTotalView.js'
import { inject } from 'vue'

const { currentDate, updateCurrentDate } = inject('currentDateKey')

const { totalDialogState, closeTotalDialog, reloadTotalTable, openTotalDialog } = useClickTotal(currentDate)

const { chartRef } = useTotalView(currentDate, updateCurrentDate, openTotalDialog)

</script>
<template>
  <el-card :body-style="{padding: 0}">
    <template #header>
      <span>总量视图</span>
    </template>
    <div ref="chartRef" style="width: 100%;height: 300px"></div>
  </el-card>

  <h-t-dialog v-model:visible="totalDialogState.visible" :title="totalDialogState.title"
              @closeDialog="closeTotalDialog">
    <h-t-table v-if="totalDialogState.tableData" :table-data="totalDialogState.tableData"
               :column-data="totalDialogState.columnList" @reloadTable="reloadTotalTable"></h-t-table>
  </h-t-dialog>
</template>

<script>
export default {
  name: 'totalView'
}
</script>

<style scoped lang="scss">
:deep(.el-card__header) {
  padding: 10px;
}
</style>