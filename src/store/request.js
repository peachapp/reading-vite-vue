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
