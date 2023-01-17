// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendPlainComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

import vintage from '@/theme/vintage.json'
import { reactive } from 'vue'

export function useEcharts() {
    const underLine =
        'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAbCAYAAAA+nNxPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABBSURBVFhH7c/BCQAwDMNAp/vvnPTRIZSiA+O3KknfrXfer2cIjSE0htAYQmMIjSE0htAYQmMIjSE0htAYQvNJSDJsvgE1zcTjegAAAABJRU5ErkJggg=='
    // 注册必须的组件
    echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        BarChart,
        LineChart,
        LabelLayout,
        UniversalTransition,
        CanvasRenderer,
        LegendPlainComponent
    ])
    // 注册主题
    echarts.registerTheme('vintage', vintage)

    const options = reactive({
        legend: {},
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            left: '3%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            triggerEvent: true,
            nameTextStyle: {
                fontWeight: 'bolder'
            }
        },
        yAxis: [],
        dataset: {},
        series: []
    })
    return {
        echarts,
        options,
        underLine
    }
}