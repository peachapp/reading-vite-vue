<template>
	<div class="page-container">
		<div class="page-content">
			<div class="book-detail-container">
				<coverImage class="book-image" :path="bookDetail.coverImg" />
				<div class="book-detail">
					<div class="book-title">{{ bookDetail.title }}</div>
					<div class="book-author">{{ bookDetail.author }}</div>
					<div class="book-tag">
						<span>
							{{ bookDetail.categoryName }}
						</span>
						<span>
							{{ bookDetail.word }}
						</span>
					</div>
				</div>
			</div>
			<div class="book-desc">{{ bookDetail.desc }}</div>
			<van-cell-group class="cell-group-container">
				<van-cell is-link icon="clock-o">
					<template #title>
						<span class="custom-title">最新</span>
						<span class="custom-label">
							{{ (bookDetail.update || {}).chapterName }}
						</span>
					</template>
					<template #value>
						<span class="custom-value">
							{{
								(bookDetail.update || {}).chapterStatus === 'END'
									? '已完结'
									: '连载'
							}}
						</span>
					</template>
				</van-cell>
				<van-cell is-link icon="notes-o">
					<template #title>
						<span class="custom-title">目录</span>
						<span class="custom-label">共{{ bookDetail.chapterNum }}篇</span>
					</template>
				</van-cell>
			</van-cell-group>
		</div>

		<van-tabbar class="tabbar-container">
			<van-tabbar-item>下载</van-tabbar-item>
			<van-tabbar-item>
				<van-button class="read-btn" block color="#12AB76" round>
					开始阅读
				</van-button>
			</van-tabbar-item>
			<van-tabbar-item>加书架</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { debounce } from 'lodash';
import coverImage from '@/components/coverImage.vue';
import { getDetail } from '@/axios';

const router = useRouter();
const route = useRoute();

// 书籍号
const bookId = ref(route.params.bookId);
const bookDetail = ref({
	author: '恐怖的南瓜头',
	bookId: 31035,
	categoryName: '都市小说',
	chapterNum: 452,
	coverImg: '/file/group1/book/fe8d23d1-9ce0-42a4-9132-27f61f5e9875.jpg',
	desc: ' 香港称他为国际级大导演。好莱坞称他为电影大师。影迷们叫他恐怖大师。他是B级片之王，也被Cult迷们尊为黑暗教皇。他，一个不小心重生的导演。1984年，一切从香港开始…… ',
	recommend: [
		{
			author: '老鹰吃小鸡',
			bookId: 56124,
			categoryName: '都市小说',
			chapterStatus: 'SERIALIZE',
			coverImg: '/file/group1/book/6b16573e-60e4-4a96-a06a-c333a0f6db8b.jpg',
			desc: ' 我是这诸天万族的劫！已有完本作品《全球高武》《重生之财源滚滚》，没看过的书友可以去看看，新书收藏一下慢慢养。 ',
			title: '万族之劫',
			word: '10769万字',
		},
		{
			author: '叶辰萧初然',
			bookId: 55500,
			categoryName: '都市小说',
			chapterStatus: 'SERIALIZE',
			coverImg: '/file/group1/book/53637446-aee0-4d69-b2e7-1dfdaf30c249.jpg',
			desc: ' 叶辰是所有人都瞧不起的上门女婿，但没有人知道他的真实身份却是顶尖家族的大少爷，那些瞧不起他的人，终究要跪在他的面前，诚惶诚恐的叫他一声爷！ ',
			title: '上门龙婿（叶辰萧初然）',
			word: '1365万字',
		},
		{
			author: '柳岸花又明',
			bookId: 52445,
			categoryName: '都市小说',
			chapterStatus: 'SERIALIZE',
			coverImg: '/file/group1/book/6e87220f-3198-4247-bf62-495f9ff8a2a2.jpg',
			desc: ' 万万没想到，社会精英、钻石单身汉的陈汉升居然重生了，一觉醒来变成了高三毕业生。　　十字路口的陈汉升也在犹豫，到底是按部就班成为千万富翁；还是努力一把，在个人资产后面加几个零，并改变历史进程。　　已有作品《大时代1994》，书友群601246758。 ',
			title: '我真没想重生啊',
			word: '2413万字',
		},
		{
			author: '不吃鱼的猫儿',
			bookId: 54105,
			categoryName: '都市小说',
			chapterStatus: 'SERIALIZE',
			coverImg: '/file/group1/book/ddaeba67-75d2-42ae-81cd-bd44d30c4871.jpg',
			desc: ' 三年前，秦浩送外卖的时候，被豪车撞倒了，没想到反被车主逼着跪在车前忏悔，被豪车大灯照了一个晚上，秦浩的双眼就此瞎了。从此，他悲惨的人生开始了；为了替父还债，秦浩成了上门女婿，受尽歧视鄙夷，过着憋屈的生活；三年之后，秦浩睁开双眼，一道神芒闪过。 ',
			title: '极品上门女婿（秦浩林若涵）',
			word: '753万字',
		},
		{
			author: '鱼人二代',
			bookId: 30769,
			categoryName: '都市小说',
			chapterStatus: 'SERIALIZE',
			coverImg: '/file/group1/book/98c52a2f-b82e-46f8-9af8-b3de775f8a16.jpg',
			desc: ' 一个大山里走出来的绝世高手，一块能预知未来的神秘玉佩……林逸是一名普通学生，不过，他还身负另外一个重任，那就是追校花！而且还是奉校花老爸之命！虽然林逸很不想跟这位难伺候的大小姐打交道，但是长辈之命难违抗，他不得不千里迢迢的转学到了松山市，给大小姐鞍前马后的当跟班……于是，史上最牛B的跟班出现了——大小姐的贴身高手！看这位跟班如何发家致富偷小姐，开始他奉旨泡妞牛X闪闪的人生……本书有点儿纯……也有点儿小暧昧…… ',
			title: '校花的贴身高手',
			word: '28361万字',
		},
		{
			author: '大红大紫',
			bookId: 52223,
			categoryName: '都市小说',
			chapterStatus: 'SERIALIZE',
			coverImg: '/file/group1/book/365905dc-d879-4b2c-908c-9e9ccbfe0f24.jpg',
			desc: ' 他是国之重器，却亦正亦邪，正能守国门摄八方，邪能一剑西去血流成河，当这样一个妖孽人物出狱之后重返都市，面对形形色色的美人与繁花似锦的喧闹，会擦出如何绚丽火花？必将举世无双！大红大紫出品必属精品，有多.. ',
			title: '都市之最强狂兵（都市狂枭）',
			word: '3391万字',
		},
	],
	title: '大导演1984',
	update: {
		chapterId: 1256106391236632578,
		chapterName: '第七十二章 大结局 百度百科',
		chapterStatus: 'END',
		time: 1377639876000,
	},
	word: '137万字',
});

// 书籍详情
const onGetDetail = debounce(async () => {
	try {
		const res = await getDetail({
			bookId: bookId.value,
		});
		if (res.result.code === 0) {
			bookDetail.value = res.data || {};
		}
	} catch (error) {
		console.log(error);
	}
}, 10000);

// onGetDetail();
</script>

<style lang="less" scoped>
.page-container {
	padding-bottom: 50px; // van-tabbar height: 50px;
}

.page-content {
	padding: @s24 @s12 @s12;
	height: 100%;
	box-sizing: border-box;
	overflow-y: auto;
}

.book-detail-container {
	display: flex;

	.book-image {
		margin-right: @s12;
		width: 80px;
		height: 110px;
	}

	.book-title {
		margin-bottom: @s6;
		font-size: @fs14;
		font-weight: 600;
		color: @color000;
	}

	.book-author,
	.book-tag {
		margin-bottom: @s6;
		font-size: @fs12;
		color: @color999;
		font-weight: 600;
	}

	.book-tag span {
		margin-right: @s6;
	}
}

.book-desc {
	margin-top: @s12;
	font-size: @fs12;
	color: @color999;
}

.cell-group-container {
	margin-top: @s12;
	overflow: hidden;
	white-space: nowrap;

	.custom-label {
		margin-left: @s6;
		font-size: @fs12;
		color: @color999;
	}

	.custom-value {
		color: @colorPrimary;
	}
}

:deep(.tabbar-container) {
	.van-tabbar-item {
		color: @colorPrimary;
	}
}

.read-btn {
	width: 150px;
	height: 50px;
	font-size: @fs18;
	font-weight: 600;
}
</style>
