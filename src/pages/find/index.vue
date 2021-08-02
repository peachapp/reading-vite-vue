<template>
	<div class="page-container">
		<div class="page-header">
			<van-tabs v-model:active="activeKey" @change="onTabChange">
				<van-tab :name="0" title="男生" />
				<van-tab :name="1" title="女生" />
				<van-tab :name="2" title="标签" />
				<van-tab :name="3" title="出版" />
			</van-tabs>
		</div>
		<van-swipe
			class="swipe"
			:show-indicators="false"
			ref="swipeRef"
			@change="onSwipeChange"
		>
			<!-- 男生 -->
			<van-swipe-item class="overflowauto">
				<div class="swipe-item">
					<div
						class="cat-item"
						v-for="(item, index) in categories.male"
						:key="index"
					>
						<div class="cat-left">
							<div class="cat-name">
								{{ item.name }}
							</div>
							<div class="cat-count">{{ item.bookCount }}本</div>
						</div>
						<div class="cat-images">
							<coverImage
								v-for="(imgItem, imgIndex) in item.bookCover"
								:class="'cat-image-' + imgIndex"
								:key="imgIndex"
								:path="imgItem"
							/>
						</div>
					</div>
				</div>
			</van-swipe-item>
			<!-- 女生 -->
			<van-swipe-item class="overflowauto">
				<div class="swipe-item">
					<div
						class="cat-item"
						v-for="(item, index) in categories.female"
						:key="index"
					>
						<div class="cat-left">
							<div class="cat-name">
								{{ item.name }}
							</div>
							<div class="cat-count">{{ item.bookCount }}本</div>
						</div>
						<div class="cat-images">
							<coverImage
								v-for="(imgItem, imgIndex) in item.bookCover"
								:class="'cat-image-' + imgIndex"
								:key="imgIndex"
								:path="imgItem"
							/>
						</div>
					</div>
				</div>
			</van-swipe-item>
			<!-- 标签 -->
			<van-swipe-item class="overflowauto">
				<div class="swipe-item">
					<div
						class="cat-item"
						v-for="(item, index) in categories.picture"
						:key="index"
					>
						<div class="cat-left">
							<div class="cat-name">
								{{ item.name }}
							</div>
							<div class="cat-count">{{ item.bookCount }}本</div>
						</div>
						<div class="cat-images">
							<coverImage
								v-for="(imgItem, imgIndex) in item.bookCover"
								:class="'cat-image-' + imgIndex"
								:key="imgIndex"
								:path="imgItem"
							/>
						</div>
					</div>
				</div>
			</van-swipe-item>
			<!-- 出版 -->
			<van-swipe-item class="overflowauto">
				<div class="swipe-item">
					<div
						class="cat-item"
						v-for="(item, index) in categories.press"
						:key="index"
					>
						<div class="cat-left">
							<div class="cat-name">
								{{ item.name }}
							</div>
							<div class="cat-count">{{ item.bookCount }}本</div>
						</div>
						<div class="cat-images">
							<coverImage
								v-for="(imgItem, imgIndex) in item.bookCover"
								:class="'cat-image-' + imgIndex"
								:key="imgIndex"
								:path="imgItem"
							/>
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
import { getAllCategories } from '@/axios';

// 当前分类
let activeKey = ref(0);
// 分类列表
let categories = ref({});
// swipe 实例
const swipeRef = ref();

// 获取所有分类
const onGetAllCategories = async () => {
	try {
		const res = await getAllCategories();
		if (res.ok) {
			categories.value = res || {};
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

onGetAllCategories();
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
	padding: @s12;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
}

.cat-item {
	margin-bottom: @s12;
	padding: 0 @s12;
	width: 48%;
	height: 70px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.4);
	box-sizing: border-box;
}

.cat-item:nth-child(odd) {
	margin-right: 4%;
}

.cat-name {
	.title();
}

.cat-count {
	.small();
}

.cat-images {
	flex: 1;
	height: 70px;
	position: relative;
}

.cat-image-0 {
	position: absolute;
	top: 20px;
	left: 50%;
	width: 30px;
	height: 40px;
	margin-left: -40px;
	z-index: 1;
}

.cat-image-1 {
	position: absolute;
	top: 10px;
	left: 50%;
	width: 40px;
	height: 50px;
	margin-left: -20px;
	z-index: 2;
}

.cat-image-2 {
	position: absolute;
	top: 20px;
	left: 50%;
	width: 30px;
	height: 40px;
	margin-left: 10px;
	z-index: 1;
}
</style>
