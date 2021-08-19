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
		</van-swipe>
	</div>
</template>

<script setup>
import { ref } from 'vue';
// import { useRouter } from 'vue-router';
import coverImage from '@/components/coverImage.vue';
import { getAllCategories } from '@/axios';

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
		en: 'press',
		zh: '出版',
	},
});
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
	.marginb6();
	.basefont();
}

.cat-count {
	.smallfont(@color999);
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
