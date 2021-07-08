<template>
  <van-pull-refresh style="height: 100%" v-model="loading" @refresh="refresh">
    <!-- 加载提示 -->
    <!-- <template #loading>
      <img class="loading-img" src="@/assets/images/refresh.gif" />
    </template> -->

    <slot></slot>
  </van-pull-refresh>
</template>
<script setup>
defineProps({
  loading: Boolean,
});

const emit = defineEmit(["refresh"]);

const refresh = () => {
  emit("refresh");
};
</script>

<style lang="less" scoped></style>
