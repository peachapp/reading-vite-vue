import service from "@/axios/request";
import api from "@/config/api";

// 配置接口
export const getAppConfig = data => {
  return service({
    url: api.other.getAppConfig,
    method: "get",
    params: data
  });
};

// 书架
// 搜索书籍
export const search = data => {
  return service({
    url: api.bookshelf.search,
    method: "get",
    params: data
  });
};


// 发现
// 书籍的全部分类
export const getCategoryChannel = data => {
  return service({
    url: api.find.getCategoryChannel,
    method: "get",
    params: data
  });
};


// 书城
// 书籍详情
export const getDetail = data => {
  return service({
    url: api.bookcity.getDetail,
    method: "get",
    params: data
  });
};

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


