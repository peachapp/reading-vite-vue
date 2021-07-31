export default {
  base: {
    login: "/api/login",
  },
  // 书架
  bookshelf: {
    // 搜索书籍
    search: "/api/app/open/api/book/search"
  },
  // 发现
  find: {
    // 书籍的全部分类
    getCategoryChannel: "/api/app/open/api/category/getCategoryChannel"
  },
  // 书城
  bookcity: {
    // 书籍详情
    getDetail: "/api/app/open/api/book/getDetail",
    // 书籍目录
    getChapterByBookId: "/api/app/open/api/chapter/getByBookId",
    // 书籍章节下载
    getBookContent: "/api/app/open/api/chapter/get",
  },
  // 其他
  other: {
    // 获取热门搜索，书籍默认分类等配置信息，通常是在每次开机时启动
    getAppConfig: "/api/app/open/api/system/getAppConfig"
  },
  // 追书神器
  // 获取所有分类
  getAllCategories: "/api/cats/lv2/statistics"
};