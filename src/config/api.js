export default {
  // 书城
  bookcity: {
    // 书籍目录
    getChapterByBookId: "/api/app/open/api/chapter/getByBookId",
    // 书籍章节下载
    getBookContent: "/api/app/open/api/chapter/get",
  },
  // 追书神器
  // 获取所有分类
  getAllCategories: "/api/cats/lv2/statistics",
  // 获取分类下小类别
  getMinCategories: "/api/cats/lv2",
  // 获取排行榜类型
  getRankCategories: "api/ranking/gender",
  // 获取排行榜小说
  getRankList: "/api/ranking",
  // 获取小说信息
  getBookDetail: "/api/book",
  // 获取搜索热词
  getSearchHotWords: "/api/book/search-hotwords",
  // 模糊搜索
  fuzzySearch: "/api/book/fuzzy-search"
};