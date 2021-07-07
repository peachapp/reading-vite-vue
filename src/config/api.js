export default {
  base: {
    login: "/api/login",
  },
  // 书架
  bookshelf: {
    // 批量检查书籍是否有更新
    checkUpdate: "/api/app/open/api/book/checkUpdate",
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

  },
  // 其他
  other: {
    // 获取热门搜索，书籍默认分类等配置信息，通常是在每次开机时启动
    getAppConfig: "/api/app/open/api/system/getAppConfig"
  }
};