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
					<div>列表</div>
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
				</div>
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import coverImage from '@/components/coverImage.vue';
import { getRankCategories } from '@/axios';

// 当前分类
let activeKey = ref(0);
// 分类列表
let categories = ref({});
// swipe 实例
const swipeRef = ref();
let activeSwipeKey = ref([0, 0, 0, 0]);

// 获取排行榜类型
const onGetRankCategories = async () => {
	try {
		const res = await getRankCategories();
		if (res.ok) {
			categories.value = res || {};
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
}

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
</style>
