<template>
	<div class="page-container">
		<van-nav-bar class="page-title" fixed title="书架" />
		<div class="page-content">
			<van-search
				class="page-search"
				shape="round"
				readonly
				placeholder="请输入搜索关键词"
				@click="onToSearch"
			/>
			<div class="bookshelf-container">
				<div
					v-if="historyBookshelfList && historyBookshelfList.length > 0"
					class="bookshelf-notempty"
				>
					<div
						class="bookshelf-item"
						v-for="(item, index) in historyBookshelfList"
						:key="index"
						@click="onToReading(item._id, item.sourceId)"
						@dblclick="onActionsheetShow(item._id)"
					>
						<coverImage class="bookshelf-image" :path="item.cover" />
						<div class="bookshelf-title">
							{{ item.title }}
						</div>
					</div>
				</div>
				<div v-else class="bookshelf-empty">
					<div class="bookshelf-tips">
						<div>一日无书</div>
						<div>百事荒芜</div>
					</div>
					<van-button
						class="find-btn"
						block
						color="#12AB76"
						@click="onTobookcity"
					>
						去找书
					</van-button>
				</div>
			</div>
		</div>
		<!-- 动作面板 -->
		<van-action-sheet
			v-model:show="actionVisible"
			:actions="actions"
			cancel-text="取消"
			close-on-click-action
			@select="onActionsheetSelect"
			@cancel="onActionsheetHide"
		/>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { cloneDeep } from 'lodash';
import coverImage from '@/components/coverImage.vue';

const store = useStore();
const router = useRouter();

// 书架
const historyBookshelfList = computed(() => store.state.bookshelfList);
let currentBookId = ref(null);
const shelfIndex = computed(() => {
	return historyBookshelfList.value.findIndex(
		(item) => item._id === currentBookId.value,
	);
});
// 动作面板
let actionVisible = ref(false);
const actions = [
	{ id: 1, name: '书籍详情' },
	{ id: 2, name: '删除' },
];

let clickTimer = null;

// 跳转到搜索页
const onToSearch = () => {
	router.push({
		name: 'search',
	});
};

// 跳转到书城
const onTobookcity = () => {
	router.push({
		name: 'bookcity',
	});
};

// 跳转到reading
const onToReading = (bookId, sourceId) => {
	if (clickTimer) {
		window.clearTimeout(clickTimer);
		clickTimer = null;
	}
	clickTimer = window.setTimeout(() => {
		router.push({
			name: 'reading',
			query: {
				bookId,
				sourceId,
			},
		});
	}, 300);
};

// 查看书籍详情
const onToBookDetail = (bookId) => {
	router.push({
		name: 'bookdetail',
		query: { bookId },
	});
};

// 选择actionsheet
const onActionsheetSelect = (action) => {
	if (action.id === 1) {
		onToBookDetail(currentBookId.value);
	}
	if (action.id === 2) {
		historyBookshelfList.value.splice(shelfIndex.value, 1);
	}
};

// 监听书架，更新缓存IndexedDB
watch(historyBookshelfList.value, (newValue) => {
	const cloneValue = cloneDeep(newValue);
	store.dispatch('onSetBookshelfList', cloneValue);
});

// 展示actionsheet
const onActionsheetShow = (bookId) => {
	if (clickTimer) {
		window.clearTimeout(clickTimer);
		clickTimer = null;
	}
	currentBookId.value = bookId;
	actionVisible.value = true;
};

// 隐藏actionsheet
const onActionsheetHide = () => {
	currentBookId.value = null;
	actionVisible.value = false;
};
</script>

<style lang="less" scoped>
.page-container {
	padding-top: 46px; // van-nav-bar height: 46px;
	background-color: @colorfff;
}

.page-content {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.bookshelf-container {
	padding: 0 @s12;
	flex: 1;
}

.bookshelf-notempty {
	display: flex;
	flex-wrap: wrap;

	.bookshelf-item {
		margin-right: @s24;
		margin-bottom: @s12;
		width: 100px;
		&:nth-child(3n) {
			margin-right: 0;
		}
	}

	.bookshelf-image {
		.marginb6();
		height: 120px;
	}

	.bookshelf-title {
		.marginb6();
		.ell1();
		.smallfont(@color000, 400);
	}
}

.bookshelf-empty {
	.bookshelf-tips {
		padding: 80px 0 @s24;
		text-align: center;
		line-height: @s24;
		.basefont();
	}

	.find-btn {
		box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		.basefont();
	}
}
</style>
