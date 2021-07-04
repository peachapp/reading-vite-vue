<template>
  <div class="page-container">
    <van-nav-bar fixed title="书架" />
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
import { ref } from "vue";
import refresh from "../../components/refresh.vue";

let loading = ref(false);

// 输入框获取焦点
const onFocus = () => {
  console.log("focus");
};

const onRefresh = () => {
  setTimeout(() => {
    loading = false;
  }, 1000);
};
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
  flex: 1;
}
</style>
