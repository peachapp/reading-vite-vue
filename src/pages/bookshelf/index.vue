<template>
  <div class="page-container">
    <van-nav-bar class="page-title" fixed title="书架" />
    <div class="page-content">
      <van-search
        class="page-search"
        placeholder="请输入搜索关键词"
        @focus="onFocus"
      />
      <div class="page-refresh">
        <refresh :loading="loading" @refresh="onRefresh">
          <p>刷新次数:djfjfi</p>
        </refresh>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import refresh from "@/components/refresh.vue";
import router from "@/router/index";

let loading = ref(false);

// 输入框获取焦点
const onFocus = () => {
  router.push({
    name: "search",
  });
};

// 下拉刷新
const onRefresh = () => {
  setTimeout(() => {
    loading = false;
  }, 1000);
};

onMounted(() => {
  console.log("onMounted");
});
</script>

<style lang="less" scoped>
.page-container {
  padding-top: 46px;
  height: 100%;
  background: @coloorBg;
  box-sizing: border-box;
}

.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-refresh {
  padding: 0 12px;
  flex: 1;
}
</style>
