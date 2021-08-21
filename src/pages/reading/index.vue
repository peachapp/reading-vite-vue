<template>
	<div class="page-container">
		<eBook
			v-if="currentChapter"
			:chapter="currentChapter"
			:config="{
				fontSize: 14,
			}"
		/>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import eBook from '@/components/eBook.vue';
import { getBookChapters2, getChapterContent } from '@/axios';
// import { content } from './content';

const route = useRoute();

// 书籍号
const bookId = ref(route.query.bookId);
// 源id
const sourceId = ref(route.query.sourceId);
const chapterList = ref([]);

const currentChapter = ref(null);

// 获取小说章节内容
const onGetChapterContent = async () => {
	try {
		const res = await getChapterContent({
			link: chapterList.value[0].link,
		});
		if (res.ok) {
			currentChapter.value = res.chapter || {};
		}
	} catch (error) {
		console.log(error);
	}
};

// 获取小说章节
const onGetBookChapters = async () => {
	try {
		const res = await getBookChapters2({
			bookId: sourceId.value,
		});
		chapterList.value = res.chapters || [];
		onGetChapterContent();
	} catch (error) {
		console.log(error);
	}
};

onGetBookChapters();
</script>

<style lang="less" scoped>
.page-container {
	height: 100%;
}
</style>
