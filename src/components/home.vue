<template>
  <div class="wrapper">
    <div class="wrapper-content" id="wrapper-content">
      <transition name="move" mode="out-in">
        <!-- <keep-alive :include="tagsList"> -->
        <router-view></router-view>
        <!--  </keep-alive> -->
      </transition>
    </div>
    <tabbar />
  </div>
</template>

<script setup>
import tabbar from "./tabbar.vue";
</script>

<style lang="less" scoped>
.wrapper {
}
</style>
