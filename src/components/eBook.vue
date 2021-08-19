<template>
	<div class="flipbook-viewport">
		<div class="container">
			<div class="flipbook">
				<div>
					<div
						class="flipbook-content"
						:style="{ fontSize: config.fontSize + 'px' }"
					>
						{{ contents }}
					</div>
				</div>
				<div>222</div>
				<div>333</div>
				<div>444</div>
				<div>555</div>
				<div>666</div>
				<div>777</div>
				<div>888</div>
				<div>999</div>
				<div>101010</div>
				<div>111111</div>
				<div>121212</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, computed } from 'vue';

const props = defineProps({
	content: String,
	config: Object,
});

const contents = computed(() => {
	const columnCount = Math.floor(
		(window.innerWidth - 24) / props.config.fontSize || 14,
	);

	const lineCount = Math.floor(
		(window.innerHeight - 24) / ((props.config.fontSize || 14) + 12),
	);

	console.log('colu', columnCount, 'lin', lineCount);

	return props.content + 'fffffff';
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
	background-color: white;
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

.flipbook-content {
	padding: @s12;
	box-sizing: border-box;
	line-height: 1.4;
}
</style>
