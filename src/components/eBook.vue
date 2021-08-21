<template>
	<div class="flipbook-viewport">
		<div class="container">
			<div class="flipbook">
				<div v-for="(item, index) in contents" :key="index">
					<div
						class="chapter-container"
						:style="{ fontSize: config.fontSize + 'px' }"
					>
						<div class="chapter-header">
							<div class="chapter-title">
								{{ chapter.title }}
							</div>
							<div class="chapter-page">
								{{ index + 1 }}/{{ contents.length }}
							</div>
						</div>
						<div class="chapter-content overflowauto">
							{{ item }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, computed } from 'vue';

const props = defineProps({
	chapter: Object,
	config: Object,
});

const contents = computed(() => {
	const columnCount = Math.floor(
		(window.innerWidth - 24) / props.config.fontSize || 14,
	);
	const lineCount = Math.floor(
		(window.innerHeight - 24) / ((props.config.fontSize || 14) * 1.2),
	);
	const pageCount = columnCount * lineCount;

	let index = 0;
	let result = [];

	while (
		index < Math.ceil((props.chapter.cpContent || '').length / pageCount)
	) {
		const indexContent = (props.chapter.cpContent || '').substr(
			index * pageCount,
			pageCount,
		);
		result.push(indexContent);
		index = index + 1;
	}

	console.log('contents', props.content, result);
	return result;
});

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
	});
};

onMounted(() => {
	loadApp();
});
</script>

<style lang="less" scoped>
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
	// background-color: white;
	background-color: rgb(255, 250, 240);
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
