<script setup>

import MainHeader from '@/views/mainHeader.vue'
import { provide, ref, watch } from 'vue'
import { useStore } from '@/pinia/index.js'

const store = useStore()
const currentDate = ref(store.startDate)

const updateSelectDate = (val) => {
  currentDate.value = val
}

watch(() => store.startDate, () => {
  updateSelectDate(store.startDate)
})

provide('currentDateKey', {
  currentDate,
  updateSelectDate
})
</script>
<template>
  <main-header></main-header>
</template>

<script>
export default {
  name: 'incomingInspection'
}
</script>

<style scoped>

</style>