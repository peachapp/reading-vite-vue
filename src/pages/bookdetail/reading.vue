<template>
	<div class="page-container">
		<div class="flipbook-viewport">
			<div class="container">
				<div class="flipbook">
					<div v-for="(item, index) in chapterContents" :key="index">
						<div class="chapter-container">
							<div class="chapter-header">
								<div class="chapter-title">
									{{ item.title }}
								</div>
								<div class="chapter-page">
									{{ currentChapterIndex + 1 }}/{{ chapterList.length }}
								</div>
							</div>
							<div class="chapter-content overflowauto">
								{{ item.cpContent }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { cloneDeep } from 'lodash';
import { getBookChapters2, getChapterContent } from '@/axios';

const PAGE_SIZE = 30;

const store = useStore();
const route = useRoute();

const config = ref({
	fontSize: 14,
	backgroundColor: 'rgb(255, 250, 240)',
});

// 书籍号
const bookId = route.query.bookId;
// 源id
const sourceId = route.query.sourceId;
// 章节列表
const chapterList = ref([]);
// 当前索引
const currentChapterIndex = ref(store.state.chapterIndexs[bookId] || 0);
// 章节内容
const chapterContents = ref([]);

const turning = ref(false);

// 获取小说章节
const onGetBookChapters = async () => {
	try {
		const res = await getBookChapters2({ sourceId });
		chapterList.value = res.chapters || [];
		onGetChapterContent();
	} catch (error) {
		console.log(error);
	}
};

// 获取小说章节内容
const onGetChapterContent = async () => {
	try {
		for (let i = 0; i < PAGE_SIZE; i++) {
			const res = await getChapterContent({
				link: chapterList.value[currentChapterIndex.value + i].link,
			});
			if (res.ok) {
				chapterContents.value.push(res.chapter);
			}
		}
		loadApp();
	} catch (error) {
		console.log(error);
	}
};

watch(
	() => currentChapterIndex.value,
	(newValue) => {
		const cloneValue = cloneDeep(store.state.chapterIndexs);
		cloneValue[bookId] = newValue;
		store.dispatch('onSetChapterIndexs', cloneValue);
	},
);

const loadApp = () => {
	const windowWidth = window.innerWidth;
	const windowHeight = window.innerHeight;
	// Create the flipbook
	window.$('.flipbook').turn({
		// Width
		width: windowWidth,

		// Height
		height: windowHeight,

		// Display
		display: 'single',

		// Elevation
		elevation: 50,

		// Enable gradients
		gradients: true,

		// Auto center this flipbook
		autoCenter: true,

		when: {
			start: () => {
				console.log('start');
			},
			turning: () => {
				turning.value = true;
				console.log('turning');
			},
			turned: (e, currentPage, view) => {
				if (turning.value) {
					currentChapterIndex.value = currentPage - 1;
				}
				console.log('turned', e, currentPage, view);
			},
		},
	});
};

onGetBookChapters();
</script>

<style lang="less" scoped>
.page-container {
}

.flipbook-viewport {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.flipbook-viewport .container {
	position: absolute;
	top: 0;
	left: 0;
	margin: auto;
}

.flipbook-viewport .flipbook {
	left: 0;
	top: 0;
}

.flipbook-viewport .page {
	background-color: v-bind('config.backgroundColor');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.flipbook .page {
	-webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	-moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	-ms-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	-o-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.flipbook-viewport .page img {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	margin: 0;
}

.flipbook-viewport .shadow {
	-webkit-transition: -webkit-box-shadow 0.5s;
	-moz-transition: -moz-box-shadow 0.5s;
	-o-transition: -webkit-box-shadow 0.5s;
	-ms-transition: -ms-box-shadow 0.5s;

	-webkit-box-shadow: 0 0 20px #ccc;
	-moz-box-shadow: 0 0 20px #ccc;
	-o-box-shadow: 0 0 20px #ccc;
	-ms-box-shadow: 0 0 20px #ccc;
	box-shadow: 0 0 20px #ccc;
}

.chapter-container {
	height: 100%;
	font-size: v-bind('config.fontSize');
}

.chapter-header {
	padding: @s12;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.chapter-title {
	.pagetitle2();
}

.chapter-content {
	padding: 0 @s12 @s12;
	height: calc(100% - 47px);
	box-sizing: border-box;
	line-height: 2;
	word-break: break-all;
}
</style>
