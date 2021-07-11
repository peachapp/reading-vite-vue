<template>
  <div class="page-container">
    <div class="page-content">
      <div>
        <coverImage class="res-image" :path="bookDetail.coverImg" />
        <div>
          <div>{{ bookDetail.title }}</div>
          <div>{{ bookDetail.author }}</div>
          <div>
            <span>
              {{ bookDetail.categoryName }}
            </span>
            <span>
              {{ bookDetail.word }}
            </span>
          </div>
        </div>
        <div>{{ bookDetail.desc }}</div>
      </div>
    </div>
    <van-tabbar>
      <van-tabbar-item>下载</van-tabbar-item>
      <van-tabbar-item>开始阅读</van-tabbar-item>
      <van-tabbar-item>加书架</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import coverImage from "@/components/coverImage.vue";
import { getDetail } from "./request";

const router = useRouter();
const route = useRoute();

// 书籍号
const bookId = ref(route.params.bookId);
const bookDetail = ref({});

// 书籍详情
const onGetDetail = async () => {
  try {
    const res = await getDetail({
      bookId: bookId.value,
    });
    if (res.result.code === 0) {
      bookDetail.value = res.data || {};
    }
  } catch (error) {
    console.log(error);
  }
};

onGetDetail();
</script>

<style lang="less" scoped>
.page-container {
  padding-bottom: 50px; // van-tabbar height: 50px;
  height: 100%;
  background: @coloorBg;
  box-sizing: border-box;
}

.page-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
