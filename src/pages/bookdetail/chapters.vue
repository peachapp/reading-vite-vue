<template>
	<div class="page-container">
		<van-nav-bar
			class="page-title"
			fixed
			left-arrow
			title="章节列表"
			@click-left="onBack"
		/>
		<RecycleScroller
			class="page-content overflowauto"
			:items="chapterList"
			:item-size="30"
			key-field="id"
			v-slot="{ item }"
		>
			<div class="chapter-item" @click="onFastForward(item.id)">
				{{ item.title }}
			</div>
		</RecycleScroller>
	</div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { cloneDeep } from 'lodash';
import { getBookChapters2 } from '@/axios';

const store = useStore();
const router = useRouter();
const route = useRoute();

// 书籍号
const bookId = ref(route.query.bookId);
// 源id
const sourceId = ref(route.query.sourceId);
// 章节列表
const chapterList = ref([]);

// 获取小说章节
const onGetBookChapters = async () => {
	try {
		const res = await getBookChapters2({
			bookId: sourceId.value,
		});
		chapterList.value = res.chapters || [];
	} catch (error) {
		console.log(error);
	}
};

// 返回
const onBack = () => {
	router.go(-1);
};

// 快进章节
const onFastForward = (id) => {
	const cloneValue = cloneDeep(store.state.chapterIndexs);
	const index = chapterList.value.findIndex((item) => item.id === id);
	cloneValue[bookId.value] = index;
	store.dispatch('onSetChapterIndexs', cloneValue);
	nextTick(() => {
		onToReading();
	});
};

// 跳转到reading
const onToReading = () => {
	router.push({
		name: 'reading',
		query: {
			bookId: bookId.value,
			sourceId: sourceId.value,
		},
	});
};

onGetBookChapters();
</script>

<style lang="less" scoped>
.page-container {
	padding-top: 46px; // van-nav-bar height: 46px;
}

:deep(.page-title) {
	.van-icon {
		color: @colorfff;
	}
}

.page-content {
	height: 100%;
	padding: @s12;
	box-sizing: border-box;
}
</style>
