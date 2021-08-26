<template>
	<router-view></router-view>
</template>

<script setup>
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

import { useStore } from 'vuex';
const store = useStore();
store.dispatch('onGetBookshelfList');
store.dispatch('onGetKeyWords');
store.dispatch('onGetChapterIndexs');
</script>

<style lang="less">
body,
html {
	height: 100%;
}

#app {
	height: 100%;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	.basefont(@color333, 100);
	background: @colorBg;
}

.page-container {
	height: 100%;
	box-sizing: border-box;
}

.page-title {
	background-color: @colorPrimary !important;

	.van-nav-bar__title {
		.pagetitle1();
	}
}

.overflowauto {
	/* firefox */
	scrollbar-width: none;
	/* IE 10+ */
	-ms-overflow-style: none;
	overflow-x: hidden;
	overflow-y: auto;
}

.overflowauto::-webkit-scrollbar {
	/* Chrome Safari */
	display: none;
}
</style>
