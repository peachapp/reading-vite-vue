<template>
	<div class="page-container">
		<!-- title -->
		<van-nav-bar
			class="page-title"
			fixed
			left-arrow
			right-text="搜索"
			@click-left="onBack"
			@click-right="onSearch"
		>
			<template #title>
				<van-search
					class="page-search"
					shape="round"
					v-model="searchState.keyWord"
					placeholder="请输入搜索关键词"
					@search="onSearch"
				/>
			</template>
		</van-nav-bar>

		<div class="page-content overflowauto">
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
					@click="onSearchByHistory(item)"
				>
					{{ item }}
				</van-tag>
			</div>

			<!-- 搜索结果 -->
			<div v-if="searchFlag" class="list-container">
				<div class="list-title">搜索结果</div>
				<van-loading v-if="searchState.searchLoading" size="24px" vertical>
					加载中...
				</van-loading>
				<van-list
					v-else-if="searchResList && searchResList.length > 0"
					v-model:loading="searchState.loading"
					:finished="searchState.finished"
					finished-text="没有更多了"
					@load="onLoadList"
				>
					<div
						v-for="(item, index) in searchResList"
						:key="index"
						class="res-item"
						@click="onToBookDetail(item.bookId)"
					>
						<coverImage class="res-image" :path="item.coverImg" />
						<div class="res-content">
							<div class="res-title">{{ item.title }}</div>
							<div class="res-author">{{ item.author }}</div>
							<div class="res-desc">{{ item.desc }}</div>
							<div>
								<van-tag plain style="margin-right: 6px">
									{{ item.chapterStatus === 'END' ? '已完结' : '连载' }}
								</van-tag>
								<van-tag plain>{{ item.categoryName }}</van-tag>
							</div>
						</div>
					</div>
				</van-list>
				<van-empty v-else description="暂无数据" />
			</div>

			<!-- 热搜书籍 -->
			<div v-if="!searchFlag" class="list-container">
				<div class="list-title">热搜书籍</div>
				<template v-if="hotSearchList && hotSearchList.length > 0">
					<div
						v-for="(item, index) in hotSearchList"
						:key="index"
						class="hot-item"
						@click="onToBookDetail(item.bookId)"
					>
						<div class="hot-number" :class="{ 'hot-number-active': index < 3 }">
							{{ index + 1 }}
						</div>
						<coverImage class="hot-image" :path="item.coverImg" />
						<div class="hot-content">
							<div class="hot-title">{{ item.title }}</div>
							<div class="hot-desc">{{ item.desc }}</div>
						</div>
					</div>
				</template>
				<van-empty v-else description="暂无数据" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { debounce } from 'lodash';
import coverImage from '@/components/coverImage.vue';
import { search } from '@/axios';

const store = useStore();
const router = useRouter();

// 当前页面是搜索结果还是热搜列表 true：搜索结果，false：热搜列表
let searchFlag = ref(false);

const searchState = reactive({
	pageSize: 30, // 请求每页多少条的数据
	keyWord: '', // 书籍关键词
	pageNum: 1, // 请求第几页的数据,
	searchLoading: false, // search是否处于加载状态
	loading: false, // list是否处于加载状态
	finished: false, // list是否已加载完成
});

// 搜索结果
let searchResList = ref([]);

// 搜索历史
let keyWordsHistory = ref(JSON.parse(localStorage.getItem('keyWords')) || []);

// 热搜书籍列表
const hotSearchList = computed(() => store.state.hotSearch);

// 返回
const onBack = () => {
	router.go(-1);
};

// 搜索结果
const onGetSearchResList = debounce(async () => {
	try {
		const res = await search({
			pageSize: searchState.pageSize,
			pageNum: searchState.pageNum,
			keyWord: searchState.keyWord,
		});
		searchState.searchLoading = false;
		searchState.loading = false;
		// 如果有搜索关键字，更新搜索历史
		if (searchState.keyWord) {
			if (!keyWordsHistory.value.includes(searchState.keyWord)) {
				keyWordsHistory.value.push(searchState.keyWord);
			}
		}
		if (res.result.code === 0) {
			// 第一页，需要先将旧值清除掉
			if (searchState.pageNum === 1) {
				searchResList.value = [];
			}
			searchResList.value = [...searchResList.value, ...res.data.list];
			if ((res.data.list || []).length === searchState.pageSize) {
				searchState.pageNum = searchState.pageNum + 1;
			} else {
				searchState.finished = true;
			}
		}
	} catch (error) {
		console.log(error);
	}
}, 10000);

// 搜索
const onSearch = () => {
	searchFlag.value = true;
	searchState.pageNum = 1;
	searchState.finished = false;
	searchState.searchLoading = true;
	onGetSearchResList();
};

// 通过历史搜索关键字搜索
const onSearchByHistory = (value) => {
	searchState.keyWord = value;
	onSearch();
};

// 加载更多
const onLoadList = () => {
	searchState.loading = true;
	onGetSearchResList();
};

// 清空搜索历史
const onClearKeyWordsHistory = () => {
	keyWordsHistory.value.splice(0, keyWordsHistory.value.length);
};

// 监听搜索历史，更新localStorage
watch(keyWordsHistory.value, (newValue) => {
	localStorage.setItem('keyWords', JSON.stringify(newValue));
});

// 查看书籍详情
const onToBookDetail = (bookId) => {
	router.push({
		name: 'bookdetail',
		params: { bookId },
	});
};
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
	font-size: @fs12;
	color: @color999;
}

.keywords-item {
	margin: @s12 @s6 @s12 0;
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
		margin-bottom: @s6;
		font-size: @fs14;
		font-weight: 600;
		color: @color000;
	}

	.res-author {
		margin-bottom: @s6;
		font-size: @fs12;
		font-weight: 600;
		color: @color999;
	}

	.res-desc {
		margin-bottom: @s6;
		.ell2();
		font-size: @fs12;
		color: @color999;
	}
}

.hot-item {
	margin-top: @s12;
	display: flex;
	align-items: center;

	.hot-number {
		width: @s24;
		text-align: center;
		font-size: @fs14;
		font-weight: 600;
		color: @color999;
		flex-shrink: 0;
	}

	.hot-number-active {
		color: #b22828;
	}

	.hot-image {
		margin: 0 @s12;
		width: 60px;
		height: 88px;
		flex-shrink: 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.hot-title {
		margin-bottom: @s6;
		font-size: @fs14;
		font-weight: 600;
		color: @color000;
	}

	.hot-desc {
		.ell2();
		font-size: @fs12;
		color: @color999;
	}
}
</style>
