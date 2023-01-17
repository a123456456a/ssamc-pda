import { reactive, unref } from 'vue'
import { useMachine } from '@/api/machineList.js'
import { useRoute } from 'vue-router'

export function useWorkDialog(currentDate) {
    const route = useRoute()
    const node = route.params.id
    const workDataState = reactive({
        title: '',
        visible: false,
        tableData: [],
        columnList: []
    })

    // 获取弹框机器列表
    const {getMachineList, tableData, machineColumn} = useMachine()
    // 打开工作量弹框
    const openWorkDialog = async () => {
        const date = unref(currentDate)
        workDataState.title = unref(currentDate) + '工作量机器零件列表'
        workDataState.visible = true
        await getMachineList(node,'', date, '', 0, [], [])
        workDataState.tableData = unref(tableData)
        workDataState.columnList = unref(machineColumn)
    }

    const reloadWorkTable =async (filter) => {
        const date = unref(currentDate)
        const filterFields = unref(filter).map(m => {
            return {
                str_key: m.text,
                str_value: m.value
            }
        })
        await getMachineList(node,'', date, '', 0, filterFields, [])
        workDataState.tableData = unref(tableData)
    }
    // 关闭工作量弹框
    const closeWorkDialog = () => {
        workDataState.visible = false
    }

    return {
        workDataState,
        openWorkDialog,
        reloadWorkTable,
        closeWorkDialog
    }
}