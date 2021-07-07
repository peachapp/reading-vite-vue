<template>
  <div class="page-container">
    <!-- title -->
    <van-nav-bar
      class="page-title"
      fixed
      left-arrow
      right-text="搜索"
      @click-left="onBack"
    >
      <template #title>
        <van-search
          class="page-search"
          shape="round"
          v-model="value"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
      </template>
    </van-nav-bar>

    <div class="page-content">
      <!-- 搜索历史 -->

      <!-- 热搜书籍 -->
      <div class="list-container">
        <div class="list-title">热搜书籍</div>
      </div>

      <!-- 搜索结果 -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import router from "@/router/index";
import { search } from "./request";

const store = useStore();

// 请求第几页的数据
const pageNum = 1;
// 请求每页多少条的数据
const pageSize = 10;

// 书籍关键词
let keyWord = ref("");

// 热搜书籍列表
const hotSearchList = computed(() => store.state.hotSearch);

// 返回
const onBack = () => {
  router.go(-1);
};

// 输入框获取焦点
const onFocus = () => {
  console.log("focus");
};

// 搜索
const onSearch = async () => {
  try {
    const res = await search({
      pageNum,
      pageSize,
      keyWord: keyWord.value,
    });
    console.log("search", res);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="less" scoped>
.page-container {
  padding-top: 46px; // van-nav-bar height: 46px;
  height: 100%;
  background: @coloorBg;
  box-sizing: border-box;
}

/deep/ .page-title {
  .van-nav-bar__title {
    flex: 1;
    max-width: 72%;
  }
  .van-icon,
  .van-nav-bar__text {
    color: @color333;
  }
}

.page-search {
  padding: @s6 0;
}

.page-content {
  padding: 12px;
  height: 100%;
  box-sizing: border-box;
}

.list-title {
  font-size: 12px;
}
</style>
