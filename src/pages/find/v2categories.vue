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
			<van-tabs v-model:active="activeKey" @change="onTabChange">
				<van-tab
					v-for="(item, index) in typeMapping"
					:key="index"
					:name="index * 1"
					:title="item.zh"
				/>
			</van-tabs>
		</div>
		<div class="page-content">
			<div
				v-if="v2categories && v2categories.length > 0"
				class="mins-container overflowauto"
			>
				<div
					v-for="(catItem, catIndex) in v2categories"
					:key="catItem"
					class="mins-item"
					:class="{
						'mins-item-active': activeKey2 === catIndex,
					}"
					@click="onTab2Change(catIndex)"
				>
					<div class="mins-title">
						{{ catItem }}
					</div>
				</div>
			</div>
			<RecycleScroller
				class="book-container overflowauto"
				:items="bookList"
				:item-size="140"
				key-field="_id"
				v-slot="{ item }"
			>
				<div class="book-item" @click="onToBookDetail(item._id)">
					<coverImage class="book-image" :path="item.cover" />
					<div class="book-content">
						<div class="book-title">{{ item.title }}</div>
						<div class="book-author">{{ item.author }}</div>
						<div class="book-desc">{{ item.shortIntro }}</div>
						<div>
							<van-tag class="page-tag" plain>
								{{ item.minorCate }}
							</van-tag>
						</div>
					</div>
				</div>
			</RecycleScroller>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import coverImage from '@/components/coverImage.vue';
import { getV2Categories, getBookListByCategories } from '@/axios';

const router = useRouter();
const route = useRoute();

// gender
const gender = route.query.gender;
// 大类别
const major = route.query.major;
// typeMapping
const typeMapping = [
	{
		en: 'hot',
		zh: '热门',
	},
	{
		en: 'new',
		zh: '新书',
	},
	{
		en: 'repulation',
		zh: '好评',
	},
	{
		en: 'over',
		zh: '完结',
	},
	{
		en: 'month',
		zh: '包月',
	},
];

// 当前type
let activeKey = ref(0);
// 当前type
let activeKey2 = ref(0);
// 小类列表
let v2categories = ref({});
const bookList = ref([]);

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
			onGetBookListByCategories();
		}
	} catch (error) {
		console.log(error);
	}
};

// 根据分类获取小说列表
const onGetBookListByCategories = async () => {
	try {
		const res = await getBookListByCategories({
			gender,
			major,
			type: typeMapping[activeKey.value].en,
			minor: v2categories.value[activeKey2],
			start: 0,
			limit: 1000000,
		});
		if (res.ok) {
			bookList.value = res.books || [];
			console.log('booklist', bookList.value);
		}
	} catch (error) {
		console.log(error);
	}
};

// tab切换
const onTabChange = (index) => {
	activeKey.value = index;
};

// tab2切换
const onTab2Change = (index) => {
	activeKey2.value = index;
};

// 查看书籍详情
const onToBookDetail = (bookId) => {
	router.push({
		name: 'bookdetail',
		query: { bookId },
	});
};

onGetV2Categories();
</script>

<style lang="less" scoped>
.page-container {
	padding-top: 46px; // van-nav-bar height: 46px;
	background-color: @colorfff;
}

:deep(.page-title) {
	.van-icon {
		color: @colorfff;
	}
}

.page-header {
	height: 44px;
}

:deep(.van-tabs__line) {
	background-color: @colorPrimary;
}

.page-content {
	height: calc(100% - 44px);
	padding-top: @s12;
	display: flex;
	flex-wrap: wrap;
	box-sizing: border-box;
}

.mins-container {
	height: 100%;
	border: 1px solid rgb(235, 237, 240);
	border-left: none;
	box-sizing: border-box;

	.mins-item {
		width: 80px;
		padding: @s12;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		border-top: 1px solid rgb(235, 237, 240);
		position: relative;
	}

	.mins-item:nth-child(1) {
		border-top: none;
	}

	.mins-item-active {
		background: @colorBgPrimary;
	}

	.mins-item-active::before {
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

.book-container {
	flex: 1;
	height: 100%;
	padding: 0 @s12;

	.book-item {
		margin-bottom: @s12;
		display: flex;
		align-items: center;
	}

	.book-image {
		margin-right: @s12;
		width: 80px;
		height: 110px;
		flex-shrink: 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.book-title {
		.marginb6();
		.basefont();
	}

	.book-author {
		.marginb6();
		.smallfont(@color999);
	}

	.book-desc {
		.marginb6();
		.ell2();
		.smallfont(@color999);
	}
}
</style>
