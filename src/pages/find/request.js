import service from "@/axios/request";
import api from "@/config/api";

// 书籍的全部分类
export const getCategoryChannel = data => {
  return service({
    url: api.find.getCategoryChannel,
    method: "get",
    params: data
  });
};
