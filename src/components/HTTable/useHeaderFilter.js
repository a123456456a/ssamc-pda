import { ref } from 'vue'

export function useHeaderFilter() {

    const filterFields = ref([])

    // 添加过滤条件
    const addFilterFields = (item) => {
        filterFields.value.push(item)
    }

    // 删除过滤条件
    const delFilterFields = (item) => {
        filterFields.value.forEach((f, index) => {
            if (f.text === item.text) {
                filterFields.value.splice(index, 1)
            }
        })
    }

    // 重置过滤条件
    const restFilterFields = () => {
        filterFields.value = []
    }

    return {
        filterFields,
        addFilterFields,
        delFilterFields,
        restFilterFields
    }
}