import { useRoute } from 'vue-router'
import { reactive, unref } from 'vue'
import { useMachine } from '@/api/machineList.js'

export function useInflowP(currentDate) {
    const route = useRoute()
    const node = route.params.id

    const inflowState = reactive({
        title: '',
        visible: false,
        tableData: [],
        columnList: []
    })

    // 获取弹框机器列表
    const {getMachineList, tableData, machineColumn} = useMachine()

    // 打开当日流入P弹框
    const openInflowDialog = async () => {
        const date = unref(currentDate)
        inflowState.title = unref(currentDate) + '当日流入P<1机器零件列表'
        inflowState.visible = true
        await getMachineList(node,'', '', date, 0, [], [])
        inflowState.tableData = unref(tableData)
        inflowState.columnList = unref(machineColumn)
    }

    const reloadInflowTable =async (filter) => {
        const date = unref(currentDate)
        const filterFields = unref(filter).map(m => {
            return {
                str_key: m.text,
                str_value: m.value
            }
        })
        await getMachineList(node,'', date, '', 0, filterFields, [])
        inflowState.tableData = unref(tableData)
    }

    // 关闭当日流入P<1弹框
    const closeInflowDialog = () => {
        inflowState.visible = false
    }

    return {
        inflowState,
        openInflowDialog,
        reloadInflowTable,
        closeInflowDialog
    }
}