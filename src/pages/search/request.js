import service from "@/axios/request";
import api from "@/config/api";

// 搜索书籍
export const search = data => {
  return service({
    url: api.bookshelf.search,
    method: "get",
    params: data
  });
};
