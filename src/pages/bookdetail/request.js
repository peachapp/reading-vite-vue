import service from "@/axios/request";
import api from "@/config/api";

// 书籍详情
export const getDetail = data => {
  return service({
    url: api.bookcity.getDetail,
    method: "get",
    params: data
  });
};
