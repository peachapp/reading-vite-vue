<template>
	<div class="page-container">
		<van-nav-bar
			class="page-title"
			fixed
			left-arrow
			:title="major"
			@click-left="onBack"
		/>
		<div class="page-header">
			<van-tabs
				v-if="v2categories && v2categories.length > 0"
				v-model:active="activeKey"
				@change="onTabChange"
			>
				<van-tab
					v-for="(item, index) in keyMapping"
					:key="index"
					:name="index * 1"
					:title="item.zh"
				/>
			</van-tabs>
		</div>
		<!-- <van-swipe
			class="swipe"
			:show-indicators="false"
			ref="swipeRef"
			@change="onSwipeChange"
		>
			<van-swipe-item
				class="overflowauto"
				v-for="(item, index) in keyMapping"
				:key="index"
			>
				<div class="swipe-item">
					<div
						class="cat-item"
						v-for="(catItem, catIndex) in categories[item.en]"
						:key="catIndex"
					>
						<div class="cat-left">
							<div class="cat-name">
								{{ catItem.name }}
							</div>
							<div class="cat-count">{{ catItem.bookCount }}本</div>
						</div>
						<div class="cat-images">
							<coverImage
								v-for="(imgItem, imgIndex) in catItem.bookCover"
								:class="'cat-image-' + imgIndex"
								:key="imgIndex"
								:path="imgItem"
							/>
						</div>
					</div>
				</div>
			</van-swipe-item>
		</van-swipe> -->
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import coverImage from '@/components/coverImage.vue';
import { getV2Categories } from '@/axios';

const router = useRouter();
const route = useRoute();

// gender
const gender = route.query.gender;
// 大类别
const major = route.query.major;

// 当前分类
let activeKey = ref(0);
// 分类列表
let v2categories = ref({});
// swipe 实例
const swipeRef = ref();

// 返回
const onBack = () => {
	router.go(-1);
};

// 获取所有分类
const onGetV2Categories = async () => {
	try {
		const res = await getV2Categories();
		if (res.ok) {
			const majorIndex = (res[gender] || []).findIndex(
				(item) => item.major === major,
			);
			v2categories.value = ((res[gender] || [])[majorIndex] || {}).mins || [];
		}
	} catch (error) {
		console.log(error);
	}
};

// tab切换
const onTabChange = (index) => {
	swipeRef.value.swipeTo(index);
};

// swipe切换
const onSwipeChange = (index) => {
	activeKey.value = index;
};

onGetV2Categories();
</script>

<style lang="less" scoped>
.page-container {
	padding-top: 46px; // van-nav-bar height: 46px;
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
</style>
