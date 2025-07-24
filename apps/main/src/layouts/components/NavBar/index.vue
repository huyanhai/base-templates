<template>
  <div class="navbar">
    <div class="flex-y-center">
      <!-- 菜单折叠按钮 -->
      <Hamburger :is-active="isSidebarOpened" @toggle-click="toggleSideBar" />
    </div>
    <!-- 导航栏操作区域 -->
    <div class="navbar__actions">
      <NavbarActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store";
import Hamburger from "@/components/Hamburger/index.vue";
import NavbarActions from "./components/NavbarActions.vue";

const appStore = useAppStore();

// 侧边栏展开状态
const isSidebarOpened = computed(() => appStore.sidebar.opened);

// 切换侧边栏展开/折叠状态
function toggleSideBar() {
  console.log("🔄 Hamburger clicked! Current state:", isSidebarOpened.value);
  console.log("🔄 Device type:", appStore.device);
  appStore.toggleSidebar();
  console.log("🔄 New state:", appStore.sidebar.opened);
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $navbar-height;

  &__actions {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
