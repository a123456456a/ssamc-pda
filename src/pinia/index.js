import { defineStore } from 'pinia'
import moment from 'moment'

export const useStore = defineStore('storeId', {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            startDate: moment().format('YYYY-MM-DD'),
            endDate: moment().add(6, 'day').format('YYYY-MM-DD'),
            isRefresh: false
        }
    }
})