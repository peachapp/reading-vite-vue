<template>
  <div class="wrapper">
    <div class="wrapper-content" id="wrapper-content">
      <router-view v-slot="{ Component, route }">
        <transition name="move" mode="out-in">
          <keep-alive v-if="route.meta.keepAlive">
            <component :is="Component" />
          </keep-alive>
          <component :is="Component" v-else />
        </transition>
      </router-view>
    </div>
    <tabbar />
  </div>
</template>

<script setup>
import tabbar from "./tabbar.vue";
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
}

.wrapper-content {
  height: 100%;
}
</style>
