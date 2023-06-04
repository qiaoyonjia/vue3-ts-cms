<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="main-menu">
    <!-- logo -->
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="鸿源管理系统" class="img" />
      <h2 class="title" v-show="!isFold">鸿源管理系统</h2>
    </div>
    <!-- menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        background-color="#001529"
        active-text-color="#fff"
        text-color="#b7bdc3"
        unique-opened
        :collapse="isFold"
      >
        <el-sub-menu
          v-for="(item, index) in userMenus"
          :key="item.id"
          :index="item.id + ''"
        >
          <template #title>
            <el-icon
              ><component :is="item.icon.split('el-icon')[1]"></component
            ></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.children"
            :key="item2.id"
            :index="item2.id + ''"
            @click="handleItemClick(item2)"
            >{{ item2.name }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

// 监听item点击
const router = useRouter()
const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}

// ElMenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
  margin-left: -10px;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
