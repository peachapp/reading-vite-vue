import service from "@/axios/request";
import api from "@/config/api";

// 书籍目录
export const getChapterByBookId = data => {
  return service({
    url: api.bookcity.getChapterByBookId,
    method: "get",
    params: data
  });
}

// 书籍章节下载
export const getBookContent = data => {
  return service({
    url: api.bookcity.getBookContent,
    method: "post",
    data
  });
}

// 追书神器
// 获取所有分类
export const getAllCategories = data => {
  return service({
    url: api.getAllCategories,
    method: "get",
    params: data
  });
}

// 获取排行榜类型
export const getRankCategories = data => {
  return service({
    url: api.getRankCategories,
    method: "get",
    params: data
  });
}

// 获取排行榜小说
export const getRankList = data => {
  return service({
    url: `${api.getRankList}/${data.rankId}`,
    method: "get"
  });
}

// 获取小说信息
export const getBookDetail = data => {
  return service({
    url: `${api.getBookDetail}/${data.bookId}`,
    method: "get"
  });
}

// 获取搜索热词
export const getSearchHotWords = data => {
  return service({
    url: api.getSearchHotWords,
    method: "get",
    params: data
  });
}

// 模糊搜索
export const fuzzySearch = data => {
  return service({
    url: api.fuzzySearch,
    method: "get",
    params: data
  });
}


