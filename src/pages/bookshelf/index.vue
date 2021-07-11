<template>
  <div class="page-container">
    <van-nav-bar class="page-title" fixed title="书架" />
    <div class="page-content">
      <van-search
        class="page-search"
        shape="round"
        readonly
        placeholder="请输入搜索关键词"
        @click="onToSearch"
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
import { useRouter } from "vue-router";
import refresh from "@/components/refresh.vue";

const router = useRouter();

let loading = ref(false);

// 跳转到搜索页
const onToSearch = () => {
  router.push({
    name: "search",
  });
};

// 下拉刷新
const onRefresh = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

onMounted(() => {
  console.log("onMounted");
});
</script>

<style lang="less" scoped>
.page-container {
  padding-top: 46px; // van-nav-bar height: 46px;
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
  padding: 0 @s12;
  flex: 1;
}
</style>
