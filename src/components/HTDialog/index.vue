<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '80%'
  },
  title: {
    type: String
  },
  isShowSave: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:visible', 'closeDialog'])

// 双向绑定组件
const dialogVisible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emits('update:visible', val)
  }
})
// 关闭弹框
const closeDialogHandler = () => {
  emits('closeDialog')
  dialogVisible.value = false
}
// 保存弹框数据
const saveDialog = () => {
  emits('save')
}
</script>
<template>
  <el-dialog v-model="dialogVisible" :width="width" :title="title" append-to-body @close="closeDialogHandler" destroy-on-close>

    <slot></slot>

    <template #footer>
      <el-button style="margin-left: 20px" size="small" type="danger" @click="closeDialogHandler">Cancel</el-button>
      <el-button v-if="isShowSave" size="small" type="primary" @click="saveDialog">Save</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'HTDialog'
}
</script>

<style lang="scss">
.el-dialog__header {
  padding: 10px 20px;
  height: 25px;
  line-height: 25px;
  text-align: left;
  margin: 0;
  background-color: #303133;
  border-bottom: solid 1px #303133;
}

.el-dialog__title {
  color: #fff;
  font-size: 14px;
}

.el-dialog__footer {
  padding: 10px 20px;
  border-top: solid 1px #303133;
}
</style>