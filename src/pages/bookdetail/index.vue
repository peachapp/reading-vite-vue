<template>
	<div class="page-container">
		<van-nav-bar
			class="page-title"
			fixed
			left-arrow
			title="书架"
			@click-left="onBack"
		/>
		<div class="page-content overflowauto">
			<div class="book-detail-container">
				<coverImage class="book-image" :path="bookDetail.coverImg" />
				<div class="book-detail">
					<div class="book-title">{{ bookDetail.title }}</div>
					<div class="book-author">{{ bookDetail.author }}</div>
					<div class="book-tag">
						<span>
							{{ bookDetail.categoryName }}
						</span>
						<span>
							{{ bookDetail.word }}
						</span>
					</div>
				</div>
			</div>
			<div class="book-desc">{{ bookDetail.desc }}</div>
			<van-cell-group class="cell-group-container">
				<van-cell is-link icon="clock-o">
					<template #title>
						<span class="custom-title">最新</span>
						<span class="custom-label">
							{{ (bookDetail.update || {}).chapterName }}
						</span>
					</template>
					<template #value>
						<span class="custom-value">
							{{
								(bookDetail.update || {}).chapterStatus === 'END'
									? '已完结'
									: '连载'
							}}
						</span>
					</template>
				</van-cell>
				<van-cell is-link icon="notes-o">
					<template #title>
						<span class="custom-title">目录</span>
						<span class="custom-label">共{{ bookDetail.chapterNum }}章</span>
					</template>
				</van-cell>
			</van-cell-group>
			<!-- 热门推荐 -->
			<van-cell-group class="cell-group-container">
				<van-cell is-link>
					<template #title>
						<span class="custom-title">热门推荐</span>
					</template>
					<template #value>
						<span class="custom-label">查看更多</span>
					</template>
				</van-cell>
			</van-cell-group>
			<div class="recommend-container">
				<div
					class="recommend-item"
					v-for="(item, index) in bookDetail.recommend"
					:key="index"
				>
					<coverImage class="recommend-image" :path="item.coverImg" />
					<div class="recommend-title">{{ item.title }}</div>
					<div class="recommend-author">{{ item.author }}</div>
				</div>
			</div>
			<van-button class="refresh-btn" block> 换一批 </van-button>
		</div>

		<van-tabbar class="tabbar-container">
			<van-tabbar-item>
				<view class="tabbar-text-active">下载</view>
			</van-tabbar-item>
			<van-tabbar-item>
				<van-button class="read-btn" block color="#12AB76" round>
					开始阅读
				</van-button>
			</van-tabbar-item>
			<van-tabbar-item @click="onUpdateBookshelf">
				<view v-if="shelfIndex > -1" class="tabbar-text">在书架</view>
				<view v-else class="tabbar-text-active">加书架</view>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { debounce } from 'lodash';
import coverImage from '@/components/coverImage.vue';
import { getDetail } from '@/axios';

const router = useRouter();
const route = useRoute();

// 书籍号
const bookId = ref(route.params.bookId);
const bookDetail = ref({});

// 书架
const historyBookshelfList = ref(
	JSON.parse(localStorage.getItem('bookshelfList')) || [],
);
const shelfIndex = computed(() => {
	return historyBookshelfList.value.findIndex(
		(item) => item.bookId === bookDetail.value.bookId,
	);
});

// 返回
const onBack = () => {
	router.go(-1);
};

// 书籍详情
const onGetDetail = debounce(async () => {
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
}, 10000);

// 更新书架
const onUpdateBookshelf = () => {
	if (shelfIndex.value > -1) {
		historyBookshelfList.value.splice(shelfIndex.value, 1);
	} else {
		historyBookshelfList.value.push(bookDetail.value);
	}
};

// 监听书架，更新localStorage
watch(historyBookshelfList.value, (newValue) => {
	localStorage.setItem('bookshelfList', JSON.stringify(newValue));
});

onGetDetail();
</script>

<style lang="less" scoped>
.page-container {
	padding-top: 46px; // van-nav-bar height: 46px;
	padding-bottom: 50px; // van-tabbar height: 50px;
}

:deep(.page-title) {
	.van-icon {
		color: @colorfff;
	}
}

.page-content {
	height: 100%;
	box-sizing: border-box;
}

.book-detail-container {
	padding: @s12;
	display: flex;
	background: @colorfff;

	.book-image {
		margin-right: @s12;
		width: 80px;
		height: 110px;
	}

	.book-title {
		margin-bottom: @s6;
		font-size: @fs14;
		font-weight: 600;
		color: @color000;
	}

	.book-author,
	.book-tag {
		margin-bottom: @s6;
		font-size: @fs12;
		color: @color999;
		font-weight: 600;
	}

	.book-tag span {
		margin-right: @s6;
	}
}

.book-desc {
	padding: @s12;
	background: @colorfff;
	font-size: @fs12;
	color: @color999;
}

.cell-group-container {
	margin-top: @s12;
	overflow: hidden;
	white-space: nowrap;

	.custom-label {
		margin-left: @s6;
		font-size: @fs12;
		color: @color999;
	}

	.custom-value {
		color: @colorPrimary;
	}
}

.recommend-container {
	padding: @s12 @s12 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	background: @colorfff;

	.recommend-item {
		margin-bottom: @s12;
		width: 100px;
	}

	.recommend-image {
		margin-bottom: @s6;
		height: 120px;
	}

	.recommend-title {
		margin-bottom: @s6;
		font-size: @fs12;
		font-weight: 600;
		color: @color000;
		.ell1();
	}

	.recommend-author {
		font-size: @fs12;
		font-weight: 600;
		color: @color999;
	}
}

.refresh-btn {
	margin-bottom: @s12;
	font-size: @fs12;
	color: @colorPrimary;
}

.tabbar-text-active {
	color: @colorPrimary;
}

.read-btn {
	width: 150px;
	height: 50px;
	font-size: @fs18;
	font-weight: 600;
}
</style>
