import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/bookshelf"
  },
  {
    path: "/",
    component: () => import("@/components/home.vue"),
    children: [
      // 书架
      {
        path: "/bookshelf",
        name: "bookshelf",
        meta: {
          title: "书架",
          keepAlive: true
        },
        component: () => import("@/pages/bookshelf/index.vue"),
      },
      // 发现
      {
        path: "/find",
        name: "find",
        meta: {
          title: "发现",
          keepAlive: true
        },
        component: () => import("@/pages/find/index.vue"),
      },
      // 排行榜
      {
        path: "/bookranking",
        name: "bookranking",
        meta: {
          title: "排行榜",
          keepAlive: true
        },
        component: () => import("@/pages/bookranking/index.vue"),
      },
      // 我的
      {
        path: "/mycenter",
        name: "mycenter",
        meta: {
          title: "我的",
          keepAlive: true
        },
        component: () => import("@/pages/mycenter/index.vue"),
      },
    ]
  },
  // 搜索
  {
    path: "/search",
    name: "search",
    meta: {
      title: "搜索",
      keepAlive: true
    },
    component: () => import("@/pages/search/index.vue"),
  },
  // 书籍详情
  {
    path: "/bookdetail",
    name: "bookdetail",
    meta: {
      title: "书籍详情",
      keepAlive: true
    },
    component: () => import("@/pages/bookdetail/index.vue"),
  },
  // 章节列表
  {
    path: "/chapters",
    name: "chapters",
    meta: {
      title: "章节列表",
      keepAlive: true
    },
    component: () => import("@/pages/bookdetail/chapters.vue")
  },
  // reading
  {
    path: "/reading",
    name: "reading",
    meta: {
      title: "阅读",
      keepAlive: true
    },
    component: () => import("@/pages/bookdetail/reading.vue"),
  },
  // 测试
  {
    path: "/test",
    name: "test",
    meta: {
      title: "测试"
    },
    component: () => import("@/pages/test/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;