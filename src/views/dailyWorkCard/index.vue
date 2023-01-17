<script setup>

import { inject, onMounted, ref, unref, watch } from 'vue'
import { useStore } from '@/pinia/index.js'
import { useRoute } from 'vue-router'
import { req } from '@/api/request.js'
import HTDialog from '@/components/HTDialog/index.vue'
import { useWorkDialog } from '@/views/dailyWorkCard/useWorkDialog.js'
import HTTable from '@/components/HTTable/index.vue'
import { useScheduled } from '@/views/dailyWorkCard/useScheduled.js'
import { useInflowP } from '@/views/dailyWorkCard/useInflowP.js'

const store = useStore()

const route = useRoute()
const node = route.params.id


const {currentDate} = inject('currentDateKey')
const currentData = ref({})
const getDailyWorkCardData = async (str_type, dt_date) => {
  const params = {
    ac: 'pda_pcard',
    str_type,
    dt_date
  }
  const {data} = await req.post(params)
  currentData.value = data
}
onMounted(() => {
  getDailyWorkCardData(node, unref(currentDate))
})

watch(() => store.isRefresh, () => {
  if (store.isRefresh) {
    console.log(2)
  }
})

watch(currentDate, () => {
  getDailyWorkCardData(node, unref(currentDate))
})

// 点击工作量事件
const {workDataState, openWorkDialog, reloadWorkTable, closeWorkDialog} = useWorkDialog(currentDate)

// 点击排产事件
const {scheduledState, openScheduledDialog, reloadScheduledTable, closeScheduledDialog} = useScheduled(currentDate)

// 点击当日流入P事件
const {inflowState, closeInflowDialog, openInflowDialog, reloadInflowTable} = useInflowP(currentDate)


</script>
<template>
  <el-affix>
    <el-card :body-style="{padding: '10px'}">
      <el-row align="middle" justify="space-between">
        <span>{{ currentDate }}工作量</span>
        <el-link type="primary" @click="openWorkDialog">{{ currentData.int_pcnum }}</el-link>
      </el-row>
      <el-divider></el-divider>
      <el-row align="middle" justify="start">
        <el-col :span="4">
          <span style="color: #e6a23c">P(&lt;1)<el-divider direction="vertical"></el-divider></span>
        </el-col>
        <el-col :span="4">{{ currentData.int_pnum }}</el-col>
        <el-col :span="4">
          <span style="color: red">A(All)<el-divider direction="vertical"></el-divider></span>
        </el-col>
        <el-col :span="4">{{ currentData.int_anum }}</el-col>
        <el-col :span="4">
          <span style="color: green">D(All)<el-divider direction="vertical"></el-divider></span>
        </el-col>
        <el-col :span="4">{{ currentData.int_dnum }}</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row align="middle" justify="start">
        <el-col :span="4">
          <span style="color: #006600">已排&nbsp;&nbsp;<el-divider direction="vertical"></el-divider></span>
        </el-col>
        <el-col :span="4">
          <el-col :span="4">
            <el-link type="primary" @click="openScheduledDialog">{{ currentData.int_pcnum }}</el-link>
          </el-col>
        </el-col>
        <el-col :span="8">
          <span style="color: #006600">当日流入P(&lt;1)<el-divider direction="vertical"></el-divider></span>
        </el-col>
        <el-col :span="4">
          <el-col :span="4">
            <el-link type="primary" @click="openInflowDialog">{{ currentData.int_xjnum }}</el-link>
          </el-col>
        </el-col>
      </el-row>
    </el-card>
  </el-affix>

  <!--  工作量弹框-->
  <h-t-dialog v-model:visible="workDataState.visible" :title="workDataState.title" @closeDialog="closeWorkDialog">
    <el-row align="middle" justify="end">
      <span>总条数:{{'40'}}</span>
    </el-row>
    <h-t-table v-if="workDataState.tableData" :table-data="workDataState.tableData"
               :column-data="workDataState.columnList" @reloadTable="reloadWorkTable"></h-t-table>
  </h-t-dialog>

  <!--  已排弹框-->
  <h-t-dialog v-model:visible="scheduledState.visible" :title="scheduledState.title"
              @closeDialog="closeScheduledDialog">
    <h-t-table v-if="scheduledState.tableData" :table-data="scheduledState.tableData"
               :column-data="scheduledState.columnList" @reloadTable="reloadScheduledTable"></h-t-table>
  </h-t-dialog>

  <!--  当日流入P<1弹框-->
  <h-t-dialog v-model:visible="inflowState.visible" :title="inflowState.title"
              @closeDialog="closeInflowDialog">
    <h-t-table v-if="inflowState.tableData" :table-data="inflowState.tableData"
               :column-data="inflowState.columnList" @reloadTable="reloadInflowTable"></h-t-table>
  </h-t-dialog>
</template>

<script>
export default {
  name: 'dailyWorkCard'
}
</script>

<style scoped lang="scss">
:deep(.el-divider--horizontal) {
  margin: 5px 0;
}
</style>