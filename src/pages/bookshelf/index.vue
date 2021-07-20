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
			<div class="bookshelf">
				<div
					v-if="keyWordsHistory && keyWordsHistory.length > 0"
					class="bookshelf-notempty"
				>
					shujia
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// let loading = ref(false);

// 跳转到搜索页
const onToSearch = () => {
	router.push({
		name: 'search',
	});
};

const onTobookcity = () => {
	router.push({
		name: 'bookcity',
	});
};

onMounted(() => {
	console.log('onMounted');
});
</script>

<style lang="less" scoped>
.page-container {
	padding-top: 46px; // van-nav-bar height: 46px;
}

.page-content {
	height: 100%;
	display: flex;
	flex-direction: column;
}

.bookshelf {
	padding: 0 @s12;
	flex: 1;
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
