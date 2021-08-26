import service from "@/axios/request";

// 1.获取所有分类
export const getAllCategories = data => {
  return service({
    url: `/api/cats/lv2/statistics`,
    method: "get",
    params: data
  });
};

// 2.获取排行榜类型
export const getRankCategories = data => {
  return service({
    url: `/api/ranking/gender`,
    method: "get",
    params: data
  });
};

// 3.获取排行榜小说
export const getRankList = data => {
  return service({
    url: `/api/ranking/${data.rankId}`,
    method: "get"
  });
};

// 4.获取分类下小类别 0
export const getV2Categories = data => {
  return service({
    url: `/api/cats/lv2`,
    method: "get",
    params: data
  });
};

// 5.根据分类获取小说列表 0
export const getBookListByCategories = data => {
  return service({
    url: `/api/book/by-categories`,
    method: "get",
    params: data
  });
};

// 6.获取小说信息
export const getBookDetail = data => {
  return service({
    url: `/api/book/${data.bookId}`,
    method: "get"
  });
};

// 7.获取小说正版源 0
export const getBtoc = data => {
  return service({
    url: `/api/btoc`,
    method: "get",
    params: {
      view: "summary",
      book: data.bookId
    }
  });
};

// 8.获取小说正版源于盗版源(混合)
export const getAtoc = data => {
  return service({
    url: `/api/atoc`,
    method: "get",
    params: {
      view: "summary",
      book: data.bookId
    }
  });
};

// 9.获取小说章节(根据小说id) 0
export const getBookChapters1 = data => {
  return service({
    url: `/api/mix-atoc/${data.bookId}`,
    method: "get",
    params: {
      view: "chapters"
    }
  });
};

// 10.获取小说章节(根据小说源id) 源id由8获取
export const getBookChapters2 = data => {
  return service({
    url: `/api/atoc/${data.bookId}`,
    method: 'get',
    params: {
      view: 'chapters'
    }
  });
};

// 11.获取小说章节内容
export const getChapterContent = data => {
  return service({
    url: `/chapter/${encodeURIComponent(data.link)}`,
    method: 'get'
  });
};

// 12.获取搜索热词
export const getSearchHotWords = data => {
  return service({
    url: `/api/book/search-hotwords`,
    method: "get",
    params: data
  });
};

// 13.搜索自动补充 0
export const getAutoComplete = data => {
  return service({
    url: `/api/book/auto-complete`,
    method: "get",
    params: data
  });
};

// 14.模糊搜索
export const fuzzySearch = data => {
  return service({
    url: `/api/book/fuzzy-search`,
    method: "get",
    params: data
  });
};

// 15.获取小说最新章节 0
export const getUpdatedChapters = data => {
  return service({
    url: `/api/book`,
    method: "get",
    params: data
  })
};
