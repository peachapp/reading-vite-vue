<template>
  <div class="page-container">
    <!-- title -->
    <van-nav-bar
      class="page-title"
      fixed
      left-arrow
      right-text="搜索"
      @click-left="onBack"
      @click-right="onSearch"
    >
      <template #title>
        <van-search
          class="page-search"
          shape="round"
          v-model="searchState.keyWord"
          placeholder="请输入搜索关键词"
          @search="onSearch"
        />
      </template>
    </van-nav-bar>

    <div class="page-content">
      <!-- 搜索历史 -->

      <!-- 搜索结果 -->
      <div v-if="searchFlag" class="list-container">
        <div class="list-title">搜索结果</div>
        <van-list
          v-if="searchResList && searchResList.length > 0"
          v-model:loading="searchState.loading"
          :finished="searchState.finished"
          finished-text="没有更多了"
          @load="onGetSearchResList"
        >
          <div
            v-for="(item, index) in searchResList"
            :key="index"
            class="res-item"
          >
            <coverImage class="res-image" :path="item.coverImg" />
            <div class="res-content">
              <div class="res-title">{{ item.title }}</div>
              <div class="res-author">{{ item.author }}</div>
              <div class="res-desc">{{ item.desc }}</div>
              <div>
                <van-tag plain style="margin-right: 6px">
                  {{ item.chapterStatus === "END" ? "已完结" : "连载" }}
                </van-tag>
                <van-tag plain>{{ item.categoryName }}</van-tag>
              </div>
            </div>
          </div>
        </van-list>
        <van-empty v-else description="暂无数据" />
      </div>

      <!-- 热搜书籍 -->
      <div v-if="!searchFlag" class="list-container">
        <div class="list-title">热搜书籍</div>
        <template v-if="hotSearchList && hotSearchList.length > 0">
          <div
            v-for="(item, index) in hotSearchList"
            :key="index"
            class="hot-item"
          >
            <div class="hot-number" :class="{ 'hot-number-active': index < 3 }">
              {{ index + 1 }}
            </div>
            <coverImage class="hot-image" :path="item.coverImg" />
            <div class="hot-content">
              <div class="hot-title">{{ item.title }}</div>
              <div class="hot-desc">{{ item.desc }}</div>
            </div>
          </div>
        </template>
        <van-empty v-else description="暂无数据" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import router from "@/router/index";
import coverImage from "@/components/coverImage.vue";
import { search } from "./request";

const store = useStore();

let searchFlag = ref(false);

const searchState = reactive({
  pageSize: 30, // 请求每页多少条的数据
  keyWord: "", // 书籍关键词
  pageNum: 1, // 请求第几页的数据
  loading: false, // 是否处于加载状态
  finished: false, // 是否已加载完成
});

// 搜索结果
let searchResList = ref([]);

// 搜索历史
let keyWordsHistory = ref([]);

// 热搜书籍列表
const hotSearchList = computed(() => store.state.hotSearch);

// 返回
const onBack = () => {
  router.go(-1);
};

// 搜索结果
const onGetSearchResList = async () => {
  searchState.loading = true;
  try {
    const res = await search({
      pageSize: searchState.pageSize,
      pageNum: searchState.pageNum,
      keyWord: searchState.keyWord,
    });
    searchState.loading = false;
    if (res.result.code === 0) {
      if (searchState.pageNum === 1) {
        searchResList.value = [];
      }
      searchResList.value = [...searchResList.value, ...res.data.list];
      if ((res.data.list || []).length === searchState.pageSize) {
        searchState.pageNum = searchState.pageNum + 1;
      } else {
        searchState.finished = true;
      }
      if (!searchFlag.value) {
        searchFlag.value = true;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// 搜索
const onSearch = () => {
  searchState.pageNum = 1;
  searchState.finished = false;
  onGetSearchResList();
};
</script>

<style lang="less" scoped>
.page-container {
  padding-top: 46px; // van-nav-bar height: 46px;
  height: 100%;
  background: @coloorBg;
  box-sizing: border-box;
}

:deep(.page-title) {
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
  padding: @s12;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.list-title {
  font-size: @fs12;
  color: @color999;
}

.hot-item {
  margin-top: @s12;
  display: flex;
  align-items: center;

  .hot-number {
    width: @s24;
    text-align: center;
    font-size: @fs14;
    font-weight: 600;
    color: @color999;
    flex-shrink: 0;
  }

  .hot-number-active {
    color: #b22828;
  }

  .hot-image {
    margin: 0 @s12;
    width: 60px;
    height: 88px;
    flex-shrink: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  .hot-title {
    margin-bottom: @s6;
    font-size: @fs14;
    font-weight: 600;
    color: @color000;
  }

  .hot-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    flex-direction: column;
    font-size: @fs12;
    color: @color999;
  }
}

.res-item {
  margin-top: @s12;
  display: flex;
  align-items: center;

  .res-image {
    margin-right: @s12;
    width: 80px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  .res-title {
    margin-bottom: @s6;
    font-size: @fs14;
    font-weight: 600;
    color: @color000;
  }

  .res-author {
    margin-bottom: @s6;
    font-size: @fs12;
    color: @color999;
    font-weight: 600;
  }

  .res-desc {
    margin-bottom: @s6;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    flex-direction: column;
    font-size: @fs12;
    color: @color999;
  }
}
</style>
