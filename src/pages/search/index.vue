<template>
	<div class="page-container">
		<!-- title -->
		<van-nav-bar
			class="page-title"
			fixed
			left-arrow
			right-text="搜索"
			@click-left="onBack"
			@click-right="onFuzzySearch"
		>
			<template #title>
				<van-search
					class="page-search"
					shape="round"
					v-model="keyWord"
					placeholder="请输入搜索关键词"
					@search="onFuzzySearch"
				/>
			</template>
		</van-nav-bar>

		<div class="page-content overflowauto">
			<!-- 搜索热词 -->
			<div
				v-if="searchHotWords && searchHotWords.length > 0"
				class="hotwords-container"
			>
				<div class="list-title">
					<span> 搜索热词 </span>
					<span> 查看更多 </span>
				</div>
				<van-tag
					class="hotwords-item"
					v-for="(item, index) in 10"
					round
					color="#e7e8ea"
					text-color="#333"
					:key="index"
					@click="onSearchByInk(searchHotWords[index].word)"
				>
					{{ searchHotWords[index].word }}
				</van-tag>
			</div>
			<!-- 搜索历史 -->
			<div
				v-if="keyWordsHistory && keyWordsHistory.length > 0"
				class="keywords-container"
			>
				<div class="list-title">
					<span> 搜索历史 </span>
					<span @click="onClearKeyWordsHistory"> 清空 </span>
				</div>
				<van-tag
					class="keywords-item"
					v-for="(item, index) in keyWordsHistory"
					round
					color="#e7e8ea"
					text-color="#333"
					:key="index"
					@click="onSearchByInk(item)"
				>
					{{ item }}
				</van-tag>
			</div>

			<!-- 搜索结果 -->
			<div class="list-container">
				<div class="list-title">搜索结果</div>
				<van-loading v-if="loading" size="24px" vertical>
					加载中...
				</van-loading>
				<div v-else-if="searchResList && searchResList.length > 0">
					<div
						v-for="(item, index) in searchResList"
						:key="index"
						class="res-item"
						@click="onToBookDetail(item._id)"
					>
						<coverImage class="res-image" :path="item.cover" />
						<div class="res-content">
							<div class="res-title">{{ item.title }}</div>
							<div class="res-author">{{ item.author }}</div>
							<div class="res-desc">{{ item.shortIntro }}</div>
							<div>
								<van-tag plain style="margin-right: 6px">
									{{ item.chapterStatus === 'END' ? '已完结' : '连载' }}
								</van-tag>
								<van-tag plain>{{ item.cat }}</van-tag>
							</div>
						</div>
					</div>
				</div>
				<van-empty v-else description="暂无数据" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { cloneDeep } from 'lodash';
import coverImage from '@/components/coverImage.vue';
import { getSearchHotWords, fuzzySearch } from '@/axios';

const store = useStore();
const router = useRouter();

const searchHotWords = ref([]); // 搜索热词
const keyWord = ref(''); // 搜索关键词
const loading = ref(false); // search是否处于加载状态
const searchResList = ref([]); // 搜索结果
const keyWordsHistory = computed(() => store.state.keyWords); // 搜索历史

// 返回
const onBack = () => {
	router.go(-1);
};

// 获取搜索热词
const onGetSearchHotWords = async () => {
	try {
		const res = await getSearchHotWords();
		if (res.ok) {
			searchHotWords.value = res.searchHotWords || [];
		}
	} catch (error) {
		console.log(error);
	}
};

// 搜索结果
const onFuzzySearch = async () => {
	try {
		loading.value = true;
		const res = await fuzzySearch({
			query: keyWord.value,
		});
		loading.value = false;
		// 如果有搜索关键字，更新搜索历史
		if (keyWord.value) {
			if (!keyWordsHistory.value.includes(keyWord.value)) {
				keyWordsHistory.value.push(keyWord.value);
			}
		}
		if (res.ok) {
			searchResList.value = res.books || [];
		}
	} catch (error) {
		console.log(error);
	}
};

// 快捷搜索（通过搜索热词关键字搜索，通过历史搜索关键字搜索）
const onSearchByInk = (value) => {
	keyWord.value = value;
	onFuzzySearch();
};

// 清空搜索历史
const onClearKeyWordsHistory = () => {
	keyWordsHistory.value.splice(0, keyWordsHistory.value.length);
};

// 监听搜索历史，更新localStorage
watch(keyWordsHistory.value, (newValue) => {
	const cloneValue = cloneDeep(newValue);
	store.dispatch('onSetKeyWords', cloneValue);
});

// 查看书籍详情
const onToBookDetail = (bookId) => {
	router.push({
		name: 'bookdetail',
		params: { bookId },
	});
};

onGetSearchHotWords();
</script>

<style lang="less" scoped>
.page-container {
	padding-top: 46px; // van-nav-bar height: 46px;
	background-color: @colorfff;
}

:deep(.page-title) {
	.van-nav-bar__title {
		flex: 1;
		max-width: 72%;
	}
	.van-icon,
	.van-nav-bar__text {
		color: @colorfff;
	}
}

.page-search {
	padding: @s6 0;
	background-color: transparent;
}

.page-content {
	padding: @s12;
	height: 100%;
	box-sizing: border-box;
}

.list-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.smallfont(@color999);
}

.hotwords-container,
.keywords-container {
	margin-bottom: @s12;
}

.hotwords-item,
.keywords-item {
	margin: @s12 @s6 0 0;
}

.res-item {
	margin-top: @s12;
	display: flex;
	align-items: center;

	.res-image {
		margin-right: @s12;
		width: 80px;
		height: 110px;
		flex-shrink: 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.res-title {
		.marginb6();
		.basefont();
	}

	.res-author {
		.marginb6();
		.smallfont(@color999);
	}

	.res-desc {
		.marginb6();
		.ell2();
		.smallfont(@color999);
	}
}
</style>
