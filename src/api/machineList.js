import { req } from '@/api/request.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'


export function useMachine() {
    const tableData = ref([])

    const machineColumn = ref([])

    const route = useRoute()
    console.log(route)

    /**
     *
     * @param str_type  节点类型
     * @param dt_plan
     * @param dt_schedule  排产时间
     * @param dt_now 当日排产时间
     * @param is_all  是否点击总量视图
     * @param filter_fields  过滤条件
     * @param sort_fields  排序条件
     */
    async function getMachineList(str_type, dt_plan, dt_schedule, dt_now, is_all, filter_fields, sort_fields) {
        const params = {
            ac: 'pda_get_pda_list_pn',
            dt_plan,
            dt_schedule,
            str_type,
            dt_now,
            is_all,
            filter_fields,
            sort_fields
        }

        const {data} = await req.post(params)

        machineColumn.value = [
            { showColumn: true, prop: 'str_esn', label: '发动机号', minWidth: 65 },
            { showColumn: true, prop: 'str_wo', label: '工作指令', minWidth: 65 },
            { showColumn: true, prop: 'str_sm', label: '单元体', minWidth: 55 },
            { showColumn: true, prop: 'str_pn', label: '件号', minWidth: 55 },
            { showColumn: true, prop: 'str_part_name', label: '零件名称', minWidth: 100 },
            { showColumn: true, prop: 'dt_plan', label: '计划开工时间', minWidth: 90 },
            { showColumn: true, prop: 'dt_schedule', label: '排产日期', minWidth: 65 },
            { showColumn: true, prop: 'dt_planend', label: '计划完工时间', minWidth: 90 },
            { showColumn: true, prop: 'int_num', label: '数量', minWidth: 45 },
            { showColumn: true, prop: 'str_ycode', label: '订单号', minWidth: 65 },
            { showColumn: true, prop: 'str_billcode', label: '运单号', minWidth: 65 },
            { showColumn: true, prop: 'dt_ssamc', label: 'SSAMC时间', minWidth: 85 }
        ]
        tableData.value = data
    }


    return {
        tableData,
        machineColumn,
        getMachineList
    }
}
