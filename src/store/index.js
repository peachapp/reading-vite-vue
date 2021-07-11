import { createStore } from "vuex";
import { getAppConfig } from "./request";

export default createStore({
  state: {
    target: "http://yuenov.com:15555/",
    categories: [], // 书籍默认的分类列表
    hotSearch: [], // 热搜书籍列表
  },
  mutations: {
    update_categories(state, data) {
      state.categories = data || [];
    },
    update_hotSearch(state, data) {
      state.hotSearch = data || [];
    },
  },
  actions: {
    async onGetAppConfig({ commit }) {
      try {
        const res = await getAppConfig();
        if (res.result.code === 0) {
          commit("update_categories", res.data.categories);
          commit("update_hotSearch", res.data.hotSearch);
        };
      } catch (error) {
        console.log(error);
      };
    },
  },
})