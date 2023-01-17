// 获取dataset
import { req } from '@/api/request.js'
import { useEcharts } from '@/hook/useEcharts.js'
import { useStore } from '@/pinia/index.js'
import moment from 'moment'
import { onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useTotalView(currentDate, updateCurrentDate, openTotalDialog) {
    const store = useStore()
    const route = useRoute()
    const totalViewData = ref([])

    // 获取总量视图
    const getTotalView = async () => {
        const dt_begin = store.startDate
        const dt_end = store.endDate
        const str_type = route.params.id
        const params = {
            ac: 'pda_GetPdaSummary',
            dt_begin,
            dt_end,
            str_type
        }
        const { data } = await req.post(params)
        totalViewData.value = data
    }
    const chartRef = ref(null)
    let chart = null

    const { echarts, options, underLine } = useEcharts()

    const getDataset = () => {
        options.dataset.source = unref(totalViewData)
    }
    // 获取series
    const getSeries = () => {
        const seriesList = ['num_capacity', 'num_input', 'num_now_day', 'num_out', 'num_total']
        options.series = seriesList.map(m => {
            let name = ''
            let yAxisIndex = 0
            let lineStyle = {}
            let itemStyle = {}
            let type = 'line'
            let position = 'top'
            if (m === 'num_total') {
                name = '任务总量'
                yAxisIndex = 1
                lineStyle = {
                    color: '#FF0000'
                }
                itemStyle = {
                    color: '#FF0000'
                }
                position = 'left'
            }
            if (m === 'num_capacity') {
                name = '参考产能'
                lineStyle = {
                    type: 'dashed',
                    color: '#00FFFF'
                }
                itemStyle = {
                    color: '#00FFFF'
                }
                position = 'left'
            }
            if (m === 'num_input') {
                name = '当日输入量'
                lineStyle = {
                    color: '#87CEFA'
                }
                itemStyle = {
                    color: '#87CEFA'
                }
                type = 'line'
            }
            if (m === 'num_out') {
                name = '当日输出量'
                lineStyle = {
                    color: '#00FF00'
                }
                itemStyle = {
                    color: '#00FF00'
                }
                type = 'line'
            }
            if (m === 'num_now_day') {
                name = '当日排产量'
                itemStyle = {
                    color: '#006600'
                }
                lineStyle = {
                    color: '#006600',
                    width: 3
                }
                type = 'line'
            }

            return {
                name,
                type,
                step: 'middle',
                yAxisIndex,
                seriesLayoutBy: 'row',
                encode: { x: 'dt_date', y: m },
                label: {
                    show: true,
                    position
                },
                lineStyle,
                itemStyle
            }

        })
    }
    // 获取x轴样式
    const getXAxisLabel = () => {
        options.xAxis.axisLabel = {
            color: value => {
                return moment(value).isSame(currentDate.value) ? 'red' : 'black'
            },
            formatter: val => {
                const is_pc = totalViewData.value.filter(f => f.dt_date === val)[0].is_pc
                return val + '\n' + (is_pc ? '{hr|}' : '{none|}')
            },
            padding: [3, 10, 10, 5],
            rich: {
                hr: {
                    width: '100%',
                    height: 1,
                    align: 'left',
                    backgroundColor: { image: underLine } //文本块背景图片
                },
                none: {
                    width: '40%',
                    height: 1
                }
            }
        }
    }
    // 获取y轴样式
    const getYAxisLabel = () => {
        options.yAxis = [
            { type: 'value', axisLabel: {} },
            { type: 'value', show: true }
        ]
    }
    // 初始化表格
    const echartsInit = () => {
        // 初始化echarts
        const chartRefWrap = unref(chartRef)
        if (chartRefWrap) {
            chart = echarts.init(chartRefWrap, 'vintage')
            chart.setOption(options)
            window.addEventListener('resize', chartsResize)
            chart.on('click', (params) => {
                // 点击X轴触发
                if (params.componentType === 'xAxis') {
                    updateCurrentDate(params.value)
                }
                // 点击任务总量触发
                if (params.componentType === 'series' && params.seriesName === '任务总量') {
                    const now = moment().format('YYYY-MM-DD')
                    if (moment(now).isSame(params.name)) {
                        openTotalDialog()
                    }
                }
            })
        }
    }
    // 重置图标
    const chartsResize = () => {
        chart && chart.resize()
    }

    watch([() => store.startDate, () => store.endDate], async () => {
        chart.dispose()
        await getTotalView()
        getDataset()
        getSeries()
        getXAxisLabel()
        getYAxisLabel()
        echartsInit()
    })

    watch(currentDate, async () => {
        chart.dispose()
        await getTotalView()
        getDataset()
        getSeries()
        getXAxisLabel()
        getYAxisLabel()
        echartsInit()
    })

    onMounted(async () => {
        await getTotalView()
        getDataset()
        getSeries()
        getXAxisLabel()
        getYAxisLabel()
        echartsInit()
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', chartsResize)
        chart.dispose()
        chart = null
    })

    return {
        chartRef
    }
}
