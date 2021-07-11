<template>
  <van-image :src="target + path"> </van-image>
</template>

<script setup>
import { useStore } from "vuex";

defineProps({
  path: String,
});

const store = useStore();

const target = store.state.target;
</script>

<style lang="less" scoped>
</style>
