<script setup>
import { Cloudy, Moon, MostlyCloudy, PartlyCloudy, Sunny, Sunrise, Sunset } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = route.path
const defaultActive = ref(path)
</script>
<template>
  <el-container>
    <el-aside width="200px" style="background: #122632">
      <el-menu :default-active="defaultActive" router background-color="#122632" active-text-color="#2bbb8a"
               text-color="#ffffff">
        <el-menu-item index="/receipt/1">
          <el-icon>
            <Sunrise></Sunrise>
          </el-icon>
          行政接收
        </el-menu-item>
        <el-menu-item index="/inspection/2">
          <el-icon>
            <Sunny></Sunny>
          </el-icon>
          进厂检验
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <MostlyCloudy></MostlyCloudy>
          </el-icon>
          入库
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <PartlyCloudy></PartlyCloudy>
          </el-icon>
          锁库
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <Sunset></Sunset>
          </el-icon>
          发料
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <Cloudy></Cloudy>
          </el-icon>
          点灯
        </el-menu-item>
        <el-menu-item>
          <el-icon>
            <Moon></Moon>
          </el-icon>
          集件箱运输
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <el-scrollbar height="calc(100vh - 20px)">
        <router-view></router-view>
      </el-scrollbar>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: 'mainView'
}
</script>

<style scoped lang="scss">
:deep(.el-main) {
  padding: 10px;
}

:deep(.el-menu) {
  border-right: none;
}
</style>