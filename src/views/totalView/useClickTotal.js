import { useMachine } from '@/api/machineList.js'
import { reactive, unref } from 'vue'
import { useRoute } from 'vue-router'

export function useClickTotal(currentDate) {
    const route = useRoute()
    const node = route.params.id
    const totalDialogState = reactive({
        title: '',
        visible: false,
        tableData: [],
        columnList: []
    })


    // 获取弹框机器列表
    const { getMachineList, tableData, machineColumn } = useMachine()

    // 打开工作量弹框
    const openTotalDialog = async () => {
        const date = unref(currentDate)
        totalDialogState.title = unref(currentDate) + '任务总量机器零件列表'
        totalDialogState.visible = true
        await getMachineList(node, '', date, '', 0, [], [])
        totalDialogState.tableData = unref(tableData)
        totalDialogState.columnList = unref(machineColumn)
    }

    const reloadTotalTable = async (filter) => {
        const date = unref(currentDate)
        const filterFields = unref(filter).map(m => {
            return {
                str_key: m.text,
                str_value: m.value
            }
        })
        await getMachineList(node, '', date, '', 0, filterFields, [])
        totalDialogState.tableData = unref(tableData)
    }
    // 关闭工作量弹框
    const closeTotalDialog = () => {
        totalDialogState.visible = false
    }

    return {
        totalDialogState,
        openTotalDialog,
        reloadTotalTable,
        closeTotalDialog
    }
}