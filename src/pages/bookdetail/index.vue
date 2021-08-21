<template>
	<div class="page-container">
		<van-nav-bar
			class="page-title"
			fixed
			left-arrow
			:title="bookDetail.title"
			@click-left="onBack"
		/>
		<div class="page-content overflowauto">
			<!-- 基本信息 -->
			<div class="book-detail-container">
				<coverImage class="book-image" :path="bookDetail.cover" />
				<div class="book-detail">
					<div class="book-title">{{ bookDetail.title }}</div>
					<div class="book-author">{{ bookDetail.author }}</div>
					<div class="book-tag">
						<span>
							{{ bookDetail.cat }}
						</span>
						<span> {{ bookDetail.wordCount }}字 </span>
					</div>
					<div>
						<van-tag
							style="margin-right: 12px"
							color="#12ab76"
							plain
							v-for="(tagItem, tagIndex) in bookDetail.tags"
							:key="tagIndex"
						>
							{{ tagItem }}
						</van-tag>
					</div>
				</div>
			</div>
			<!-- 排行信息 -->
			<div class="book-honor">
				<div class="book-rating">
					<div class="custom-title">
						<span style="margin-right: 3px">
							{{ (bookDetail.rating || {}).score }}
						</span>
						<van-rate
							size="14"
							gutter="0"
							color="#12ab76"
							allow-half
							v-model="bookScore"
							readonly
						/>
					</div>
					<div class="custom-label">
						{{ (bookDetail.rating || {}).tip }}
					</div>
				</div>
				<div class="book-retention">
					<div class="custom-title">{{ bookDetail.retentionRatio }}%</div>
					<div class="custom-label">读者留存</div>
				</div>
				<div class="book-follower">
					<div class="custom-title">{{ bookDetail.totalFollower }}</div>
					<div class="custom-label">累计人气</div>
				</div>
			</div>
			<!-- 简介 -->
			<div>
				<van-cell-group class="cell-group-container">
					<van-cell icon="description">
						<template #title>
							<span class="custom-title">简介</span>
						</template>
					</van-cell>
				</van-cell-group>
				<div class="book-desc">{{ bookDetail.longIntro }}</div>
			</div>
			<!-- 最新/目录 -->
			<van-cell-group class="cell-group-container">
				<van-cell icon="clock-o">
					<template #title>
						<span class="custom-title">最新</span>
						<span class="custom-label">
							{{ bookDetail.updated }}
						</span>
					</template>
				</van-cell>
				<van-cell is-link icon="notes-o">
					<template #title>
						<span class="custom-title">目录</span>
						<span class="custom-label">{{ bookDetail.lastChapter }}</span>
					</template>
				</van-cell>
			</van-cell-group>

			<!-- 版权信息 -->
			<div>
				<van-cell-group class="cell-group-container">
					<van-cell>
						<template #title>
							<span class="custom-title">图书信息</span>
						</template>
					</van-cell>
				</van-cell-group>
				<div class="book-copyright">
					版权信息：{{ bookDetail.copyrightInfo }}
				</div>
			</div>
		</div>

		<van-tabbar class="tabbar-container">
			<van-tabbar-item>
				<view class="tabbar-text-active">下载</view>
			</van-tabbar-item>
			<van-tabbar-item>
				<van-button
					class="read-btn"
					block
					color="#12AB76"
					round
					@click="onToReading"
				>
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
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { cloneDeep } from 'lodash';
import coverImage from '@/components/coverImage.vue';
import { getBookDetail, getAtoc } from '@/axios';

const store = useStore();
const router = useRouter();
const route = useRoute();

// 书籍号
const bookId = ref(route.query.bookId);
const bookDetail = ref({});
// 评分
const bookScore = computed(() => {
	return ((bookDetail.value.rating || {}).score * 5) / 10;
});

// 书架
const historyBookshelfList = computed(() => store.state.bookshelfList);
const shelfIndex = computed(() => {
	return historyBookshelfList.value.findIndex(
		(item) => item._id === bookDetail.value._id,
	);
});

// 返回
const onBack = () => {
	router.go(-1);
};

// 书籍详情
const onGetBookDetail = async () => {
	try {
		const res = await getBookDetail({
			bookId: bookId.value,
		});
		bookDetail.value = res || {};
		onGetAtoc();
	} catch (error) {
		console.log(error);
	}
};

// 获取小说源
const onGetAtoc = async () => {
	try {
		const res = await getAtoc({ bookId: bookId.value });
		bookDetail.value.sourceId = ((res || [])[0] || {})._id;
	} catch (error) {
		console.log(error);
	}
};

// 更新书架
const onUpdateBookshelf = () => {
	if (shelfIndex.value > -1) {
		historyBookshelfList.value.splice(shelfIndex.value, 1);
	} else {
		historyBookshelfList.value.push(bookDetail.value);
	}
};

// 监听书架，更新缓存IndexedDB
watch(historyBookshelfList.value, (newValue) => {
	const cloneValue = cloneDeep(newValue);
	store.dispatch('onSetBookshelfList', cloneValue);
});

// 跳转到reading
const onToReading = () => {
	router.push({
		name: 'reading',
		query: {
			bookId: bookId.value,
			sourceId: bookDetail.value.sourceId,
		},
	});
};

onGetBookDetail();
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
		.marginb6();
		.basefont();
	}

	.book-author,
	.book-tag {
		.marginb6();
		.smallfont(@color999);
	}

	.book-tag span {
		margin-right: @s6;
	}
}

.book-honor {
	margin-top: @s12;
	padding: @s12 0;
	display: flex;
	text-align: center;
	background: @colorfff;
}

.book-rating,
.book-retention,
.book-follower {
	width: 33.3333%;
	flex: 1;

	.custom-title {
		.marginb6();
		.smallfont();
	}

	.custom-label {
		.smallfont(@color999);
	}
}

.book-desc,
.book-copyright {
	padding: @s12;
	background: @colorfff;
	.smallfont(@color999);
}

.cell-group-container {
	margin-top: @s12;
	overflow: hidden;
	white-space: nowrap;

	.custom-label {
		margin-left: @s6;
		.smallfont(@color999);
	}
}

.tabbar-text-active {
	color: @colorPrimary;
}

.read-btn {
	width: 150px;
	height: 50px;
	.basefont();
}
</style>
