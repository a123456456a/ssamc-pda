import { useRoute } from 'vue-router'
import { reactive, unref } from 'vue'
import { useMachine } from '@/api/machineList.js'

export function useScheduled(currentDate) {
    const route = useRoute()
    const node = route.params.id

    const scheduledState = reactive({
        title: '',
        visible: false,
        tableData: [],
        columnList: []
    })

    // 获取弹框机器列表
    const {getMachineList, tableData, machineColumn} = useMachine()

    // 打开排产弹框
    const openScheduledDialog = async () => {
        const date = unref(currentDate)
        scheduledState.title = unref(currentDate) + '已排机器零件列表'
        scheduledState.visible = true
        await getMachineList(node,'', date, '', 0, [], [])
        scheduledState.tableData = unref(tableData)
        scheduledState.columnList = unref(machineColumn)
    }

    const reloadScheduledTable =async (filter) => {
        const date = unref(currentDate)
        const filterFields = unref(filter).map(m => {
            return {
                str_key: m.text,
                str_value: m.value
            }
        })
        await getMachineList(node,'', date, '', 0, filterFields, [])
        scheduledState.tableData = unref(tableData)
    }

    // 关闭排产弹框
    const closeScheduledDialog = () => {
        scheduledState.visible = false
    }

    return {
        scheduledState,
        openScheduledDialog,
        reloadScheduledTable,
        closeScheduledDialog
    }
}