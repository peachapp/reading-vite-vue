<template>
	<div class="page-container">
		<eBook />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import eBook from '@/components/eBook.vue';
import { getBookChapters2, getChapterContent } from '@/axios';

const route = useRoute();

// 书籍号
const bookId = ref(route.params.bookId);
const chapterList = ref([]);

// 获取小说章节内容
const onGetChapterContent = async () => {
	const ids = chapterList.value.map((item) => item.id);
	try {
		const res = await getChapterContent({
			link: chapterList.value[0].link,
		});
		console.log('resssss', res);
		if (res.result.code === 0) {
			console.log('content', res);
			// chapterList.value = res.data.chapters || [];
		}
	} catch (error) {
		console.log(error);
	}
};

// 获取小说章节
const onGetBookChapters = async () => {
	try {
		const res = await getBookChapters2({
			bookId: bookId.value,
		});
		chapterList.value = res.chapters || [];
		// onGetChapterContent();
	} catch (error) {
		console.log(error);
	}
};

onGetBookChapters();
</script>

<style lang="less" scoped>
.page-container {
	height: 100%;
	background-color: rgb(255, 250, 240);
}
</style>
