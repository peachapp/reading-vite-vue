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
      // 书城
      {
        path: "/bookcity",
        name: "bookcity",
        meta: {
          title: "书城",
          keepAlive: true
        },
        component: () => import("@/pages/bookcity/index.vue"),
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