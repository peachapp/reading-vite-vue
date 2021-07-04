<template>
  <van-tabbar
    class="vantabbar"
    route
    active-color="#12ab76"
    inactive-color="#999"
    v-model="activeKey"
  >
    <van-tabbar-item to="/bookshelf">
      <template #icon>
        <span class="iconfont icon-shujia vantabbar-icon"></span>
      </template>
      <div class="vantabbar-text">书架</div>
    </van-tabbar-item>
    <van-tabbar-item to="/find">
      <template #icon>
        <span class="iconfont icon-faxian vantabbar-icon"></span>
      </template>
      <div class="vantabbar-text">发现</div>
    </van-tabbar-item>
    <van-tabbar-item to="/bookcity">
      <template #icon>
        <span class="iconfont icon-shucheng vantabbar-icon"></span>
      </template>
      <div class="vantabbar-text">书城</div>
    </van-tabbar-item>
    <van-tabbar-item to="/mycenter">
      <template #icon>
        <span class="iconfont icon-wode vantabbar-icon"></span>
      </template>
      <div class="vantabbar-text">我的</div>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";

const activeKey = ref(0);
</script>

<style lang="less" scoped></style>
