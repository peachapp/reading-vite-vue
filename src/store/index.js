import { createStore } from "vuex";
import yuxStorage from 'yux-storage';
// import { quest } from "@/axios";

export default createStore({
  state: {
    target: "http://api.zhuishushenqi.com",
    imgTarget: "http://statics.zhuishushenqi.com",
    bookshelfList: [], // 书架
    keyWords: [], // 历史搜索
    chapterIndexs: {}, // 书籍章节index
  },
  mutations: {
    update_bookshelfList(state, data) {
      state.bookshelfList = data || [];
    },
    update_keyWords(state, data) {
      state.keyWords = data || [];
    },
    update_chapterIndexs(state, data) {
      state.chapterIndexs = data || {};
    }
  },
  actions: {
    // 书架
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
    // 历史搜索
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
    // 书籍章节index
    async onGetChapterIndexs({ commit }) {
      try {
        const res = await yuxStorage.getItem('chapterIndexs');
        commit("update_chapterIndexs", res);
      } catch (error) {
        console.log(error);
      }
    },
    async onSetChapterIndexs({ commit }, data) {
      try {
        await yuxStorage.setItem('chapterIndexs', data);
        commit("update_chapterIndexs", data);
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