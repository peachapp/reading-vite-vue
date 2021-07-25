<template>
	<div class="page-container">
		<eBook />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { debounce } from 'lodash';
import eBook from '@/components/eBook.vue';
import { getChapterByBookId, getBookContent } from '@/axios';

const route = useRoute();

// 书籍号
const bookId = ref(route.params.bookId);
const chapterList = ref([]);

// 书籍目录
const onGetBookContent = debounce(async () => {
	const ids = chapterList.value.map((item) => item.id);
	try {
		const res = await getBookContent({
			bookId: Number(bookId.value),
			chapterIdList: ids,
			v: chapterList.value[0] && chapterList.value[0].v,
		});
		if (res.result.code === 0) {
			console.log('content', res);
			// chapterList.value = res.data.chapters || [];
		}
	} catch (error) {
		console.log(error);
	}
}, 10000);

// 书籍目录
const onGetChapterByBookId = debounce(async () => {
	try {
		const res = await getChapterByBookId({
			bookId: bookId.value,
		});
		console.log('hhhhh', res);
		if (res.result.code === 0) {
			chapterList.value = res.data.chapters || [];
			// onGetBookContent();
		}
	} catch (error) {
		console.log(error);
	}
}, 10000);

onGetChapterByBookId();
// init();
</script>

<style lang="less" scoped>
.page-container {
	height: 100%;
	background-color: rgb(255, 250, 240);
}
</style>
