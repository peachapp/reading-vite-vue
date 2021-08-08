import { createStore } from "vuex";
import yuxStorage from 'yux-storage';
// import { quest } from "@/axios";

export default createStore({
  state: {
    target: "http://api.zhuishushenqi.com",
    imgTarget: "http://statics.zhuishushenqi.com",
    bookshelfList: [], // 书架
    keyWords: [], // 历史搜索
  },
  mutations: {
    update_categories(state, data) {
      state.categories = data || [];
    },
    update_hotSearch(state, data) {
      state.hotSearch = data || [];
    },
    update_bookshelfList(state, data) {
      state.bookshelfList = data || [];
    },
    update_keyWords(state, data) {
      state.keyWords = data || [];
    }
  },
  actions: {
    async onGetBookshelfList({ commit }) {
      try {
        const res = await yuxStorage.getItem('bookshelfList');
        commit("update_bookshelfList", res);
      } catch (error) {
        console.log(error);
      }
    },
    async onSetBookshelfList({ commit }, data) {
      try {
        await yuxStorage.setItem('bookshelfList', data);
        commit("update_bookshelfList", data);
      } catch (error) {
        console.log(error);
      }
    },
    async onGetKeyWords({ commit }) {
      try {
        const res = await yuxStorage.getItem('keyWords');
        commit("update_keyWords", res);
      } catch (error) {
        console.log(error);
      }
    },
    async onSetKeyWords({ commit }, data) {
      try {
        await yuxStorage.setItem('keyWords', data);
        commit("update_keyWords", data);
      } catch (error) {
        console.log(error);
      }
    },
    // async quest({ commit }) {
    //   try {
    //     const res = await quest();
    //     if (res.result.code === 0) {
    //       commit("update_categories", res.data.categories);
    //       commit("update_hotSearch", res.data.hotSearch);
    //     };
    //   } catch (error) {
    //     console.log(error);
    //   };
    // },
  },
})