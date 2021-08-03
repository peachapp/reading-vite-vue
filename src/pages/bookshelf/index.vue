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
						@click="onToReading(item.bookId)"
					>
						<coverImage class="bookshelf-image" :path="item.coverImg" />
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
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import coverImage from '@/components/coverImage.vue';

const store = useStore();
const router = useRouter();

// 书架
const historyBookshelfList = computed(() => store.state.bookshelfList);

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
const onToReading = (bookId) => {
	router.push({
		name: 'reading',
		params: { bookId },
	});
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
		margin-bottom: @s6;
		height: 120px;
	}

	.bookshelf-title {
		margin-bottom: @s6;
		font-size: @fs12;
		font-weight: 600;
		color: @color000;
		.ell1();
	}
}

.bookshelf-empty {
	.bookshelf-tips {
		padding: 80px 0 @s24;
		text-align: center;
		line-height: @s24;
		font-size: @fs14;
		font-weight: 600;
		color: @color000;
	}

	.find-btn {
		box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.4);
		border-radius: 10px;
		font-size: @fs16;
		font-weight: 600;
	}
}
</style>
