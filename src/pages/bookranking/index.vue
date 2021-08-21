<template>
	<div class="page-container">
		<div class="page-header">
			<van-tabs v-model:active="activeKey" @change="onTabChange">
				<van-tab
					v-for="(item, index) in keyMapping"
					:key="index"
					:name="index * 1"
					:title="item.zh"
				/>
			</van-tabs>
		</div>
		<van-swipe
			class="swipe"
			:show-indicators="false"
			ref="swipeRef"
			@change="onSwipeChange"
		>
			<van-swipe-item v-for="(item, index) in keyMapping" :key="index">
				<div class="swipe-item">
					<div class="cat-container overflowauto">
						<div
							v-for="(catItem, catIndex) in categories[item.en]"
							:key="catIndex"
							class="cat-item"
							:class="{ 'cat-item-active': activeSwipeKey[index] === catIndex }"
							@click="onSwipeTabChange(index, catIndex)"
						>
							<div class="cat-title">
								{{ catItem.shortTitle }}
							</div>
						</div>
					</div>
					<div class="rank-container overflowauto">
						<div
							class="rank-item"
							v-for="(rankItem, rankIndex) in rankList[index].books"
							:key="rankIndex"
							@click="onToBookDetail(rankItem._id)"
						>
							<coverImage class="rank-image" :path="rankItem.cover" />
							<div class="rank-content">
								<div class="rank-title">{{ rankItem.title }}</div>
								<div class="rank-author">{{ rankItem.author }}</div>
								<div class="rank-desc">{{ rankItem.shortIntro }}</div>
								<div>
									<van-tag plain>
										{{ rankItem.minorCate }}
									</van-tag>
								</div>
							</div>
						</div>
					</div>
				</div>
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import coverImage from '@/components/coverImage.vue';
import { getRankCategories, getRankList } from '@/axios';

const router = useRouter();

const keyMapping = ref({
	0: {
		en: 'male',
		zh: '男生',
	},
	1: {
		en: 'female',
		zh: '女生',
	},
	2: {
		en: 'picture',
		zh: '标签',
	},
	3: {
		en: 'epub',
		zh: 'epub',
	},
});

// 当前分类
let activeKey = ref(0);
// 分类列表
let categories = ref({});
// swipe 实例
const swipeRef = ref();
let activeSwipeKey = ref([0, 0, 0, 0]);
let rankList = ref([{}, {}, {}, {}]);

const rankId = computed(() => {
	const activeCat =
		categories.value[keyMapping.value[activeKey.value].en][
			activeSwipeKey.value[activeKey.value]
		];
	return activeCat._id;
});

// 获取排行榜类型
const onGetRankCategories = async () => {
	try {
		const res = await getRankCategories();
		if (res.ok) {
			categories.value = res || {};
			for (let i = 0; i < 4; i++) {
				const id = ((categories.value[keyMapping.value[i].en] || [])[0] || {})
					._id;
				await onGetRankList(i, id);
			}
		}
	} catch (error) {
		console.log(error);
	}
};

// 获取排行榜小说
const onGetRankList = async (index, rankId) => {
	try {
		const res = await getRankList({ rankId });
		if (res.ok) {
			rankList.value[index] = res.ranking || {};
		}
	} catch (error) {
		console.log(error);
	}
};

// tab切换
const onTabChange = (value) => {
	swipeRef.value.swipeTo(value);
};

// swipe切换
const onSwipeChange = (value) => {
	activeKey.value = value;
};

// swipe中的tab切换
const onSwipeTabChange = (index, value) => {
	activeSwipeKey.value[index] = value;
	onGetRankList(activeKey.value, rankId.value);
};

// 查看书籍详情
const onToBookDetail = (bookId) => {
	router.push({
		name: 'bookdetail',
		query: { bookId },
	});
};

onGetRankCategories();
</script>

<style lang="less" scoped>
.page-container {
	background-color: @colorfff;
}

.page-header {
	height: 44px;
}

:deep(.van-tabs__line) {
	background-color: @colorPrimary;
}

.swipe {
	height: calc(100% - 44px);
}

.swipe-item {
	height: 100%;
	padding-top: @s12;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
}

.cat-container {
	height: 100%;
	border: 1px solid rgb(235, 237, 240);
	border-left: none;
	box-sizing: border-box;

	.cat-item {
		width: 80px;
		padding: @s12;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		border-top: 1px solid rgb(235, 237, 240);
		position: relative;
	}

	.cat-item:nth-child(1) {
		border-top: none;
	}

	.cat-item-active {
		background: @colorBgPrimary;
	}

	.cat-item-active::before {
		content: '';
		width: 3px;
		height: 20px;
		margin-top: -10px;
		position: absolute;
		top: 50%;
		left: 0;
		background: @colorPrimary;
	}
}

.rank-container {
	padding: 0 @s12;
	height: 100%;
	flex: 1;

	.rank-item {
		margin-bottom: @s12;
		display: flex;
		align-items: center;
	}

	.rank-image {
		margin-right: @s12;
		width: 80px;
		height: 110px;
		flex-shrink: 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.rank-title {
		.marginb6();
		.basefont();
	}

	.rank-author {
		.marginb6();
		.smallfont(@color999);
	}

	.rank-desc {
		.marginb6();
		.ell2();
		.smallfont(@color999);
	}
}
</style>
