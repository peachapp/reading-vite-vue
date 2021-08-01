<template>
  <van-image :src="imgTarget + path"> </van-image>
</template>

<script setup>
import { useStore } from "vuex";

defineProps({
  path: String,
});

const store = useStore();

const imgTarget = store.state.imgTarget;
</script>

<style lang="less" scoped>
</style>
