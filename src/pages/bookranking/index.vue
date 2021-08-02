<template>
	<div class="page-container">
		<div class="page-header">
			<van-tabs v-model:active="activeKey" @change="onTabChange">
				<van-tab :name="0" title="男频" />
				<van-tab :name="1" title="女频" />
				<van-tab :name="2" title="标签" />
				<van-tab :name="3" title="epub" />
			</van-tabs>
		</div>
		<van-swipe
			class="swipe"
			:show-indicators="false"
			ref="swipeRef"
			@change="onSwipeChange"
		>
			<!-- 男生 -->
			<van-swipe-item>
				<div class="swipe-item">
					<div class="cat-container">
						<div
							v-for="(item, index) in categories.male"
							:key="index"
							class="cat-item"
							:class="{ 'cat-item-active': activeSwipeKey[0] === index }"
							@click="onSwipeTabChange(0, index)"
						>
							<div class="cat-title">
								{{ item.shortTitle }}
							</div>
						</div>
					</div>
					<div class="rank-container">
						<div
							class="rank-item"
							v-for="(item, index) in rankList[0].books"
							:key="index"
						>
							<coverImage class="rank-image" :path="item.cover" />
							<div class="rank-content">
								<div class="rank-title">{{ item.title }}</div>
								<div class="rank-author">{{ item.author }}</div>
								<div class="rank-desc">{{ item.shortIntro }}</div>
								<div>
									<van-tag plain>
										{{ item.minorCate }}
									</van-tag>
								</div>
							</div>
						</div>
					</div>
				</div>
			</van-swipe-item>
			<!-- 女生 -->
			<van-swipe-item>
				<div class="swipe-item">
					<div class="cat-container">
						<div
							v-for="(item, index) in categories.female"
							:key="index"
							class="cat-item"
							:class="{ 'cat-item-active': activeSwipeKey[1] === index }"
							@click="onSwipeTabChange(1, index)"
						>
							<div class="cat-title">
								{{ item.shortTitle }}
							</div>
						</div>
					</div>
					<div class="rank-container">
						<div
							class="rank-item"
							v-for="(item, index) in rankList[1].books"
							:key="index"
						>
							<coverImage class="rank-image" :path="item.cover" />
							<div class="rank-content">
								<div class="rank-title">{{ item.title }}</div>
								<div class="rank-author">{{ item.author }}</div>
								<div class="rank-desc">{{ item.shortIntro }}</div>
								<div>
									<van-tag plain>
										{{ item.minorCate }}
									</van-tag>
								</div>
							</div>
						</div>
					</div>
				</div>
			</van-swipe-item>
			<!-- 标签 -->
			<van-swipe-item>
				<div class="swipe-item">
					<div class="cat-container">
						<div
							v-for="(item, index) in categories.picture"
							:key="index"
							class="cat-item"
							:class="{ 'cat-item-active': activeSwipeKey[2] === index }"
							@click="onSwipeTabChange(2, index)"
						>
							<div class="cat-title">
								{{ item.shortTitle }}
							</div>
						</div>
					</div>
					<div class="rank-container">
						<div
							class="rank-item"
							v-for="(item, index) in rankList[2].books"
							:key="index"
						>
							<coverImage class="rank-image" :path="item.cover" />
							<div class="rank-content">
								<div class="rank-title">{{ item.title }}</div>
								<div class="rank-author">{{ item.author }}</div>
								<div class="rank-desc">{{ item.shortIntro }}</div>
								<div>
									<van-tag plain>
										{{ item.minorCate }}
									</van-tag>
								</div>
							</div>
						</div>
					</div>
				</div>
			</van-swipe-item>
			<!-- 出版 -->
			<van-swipe-item>
				<div class="swipe-item">
					<div class="cat-container">
						<div
							v-for="(item, index) in categories.epub"
							:key="index"
							class="cat-item"
							:class="{ 'cat-item-active': activeSwipeKey[3] === index }"
							@click="onSwipeTabChange(3, index)"
						>
							<div class="cat-title">
								{{ item.shortTitle }}
							</div>
						</div>
					</div>
					<div class="rank-container">
						<div
							class="rank-item"
							v-for="(item, index) in rankList[3].books"
							:key="index"
						>
							<coverImage class="rank-image" :path="item.cover" />
							<div class="rank-content">
								<div class="rank-title">{{ item.title }}</div>
								<div class="rank-author">{{ item.author }}</div>
								<div class="rank-desc">{{ item.shortIntro }}</div>
								<div>
									<van-tag plain>
										{{ item.minorCate }}
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
// import { useRouter } from 'vue-router';
import coverImage from '@/components/coverImage.vue';
import { getRankCategories, getRankList } from '@/axios';

const keyMapping = {
	0: 'male',
	1: 'female',
	2: 'picture',
	3: 'epub',
};

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
		categories.value[keyMapping[activeKey.value]][
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
				const id = ((categories.value[keyMapping[i]] || [])[0] || {})._id;
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

:deep(.van-swipe-item) {
	overflow-y: auto;
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
	overflow-y: auto;

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
	overflow-y: auto;

	.rank-item {
		margin-top: @s12;
		display: flex;
		align-items: center;
	}

	.rank-image {
		margin-right: @s12;
		width: 60px;
		height: 90px;
		flex-shrink: 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.rank-title {
		margin-bottom: @s6;
		font-size: @fs14;
		font-weight: 600;
		color: @color000;
	}

	.rank-author {
		margin-bottom: @s6;
		font-size: @fs12;
		font-weight: 600;
		color: @color999;
	}

	.rank-desc {
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
