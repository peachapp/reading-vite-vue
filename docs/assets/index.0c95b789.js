import{u as e,r as t,o,c as s,a as n,b as a,d as i,y as r,e as c,B as d,T as l,f as m,N as u,S as p,P as h,I as _,E as f,L as k,g as y,h as L,C as g,i as E,j as b,k as A,l as v,m as I,n as P,R as W,A as j}from"./vendor.8d857a94.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const O={setup(n){const a=e();return a.dispatch("onGetBookshelfList"),a.dispatch("onGetKeyWords"),(e,n)=>{const a=t("router-view");return o(),s(a)}}},T={},R=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`./${e}`)in T)return;T[e]=!0;const t=e.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${o}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":"modulepreload",t||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),t?new Promise(((e,t)=>{s.addEventListener("load",e),s.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},w=[{path:"/",redirect:"/bookshelf"},{path:"/",component:()=>R((()=>import("./home.fdfc1ad7.js")),["assets/home.fdfc1ad7.js","assets/home.e4863155.css","assets/vendor.8d857a94.js","assets/vendor.26802100.css"]),children:[{path:"/bookshelf",name:"bookshelf",meta:{title:"书架",keepAlive:!0},component:()=>R((()=>import("./index.e7825643.js")),["assets/index.e7825643.js","assets/index.8d3185f8.css","assets/vendor.8d857a94.js","assets/vendor.26802100.css","assets/lodash.97ff05ac.js","assets/coverImage.8ee5166a.js"])},{path:"/find",name:"find",meta:{title:"发现",keepAlive:!0},component:()=>R((()=>import("./index.fe371d59.js")),["assets/index.fe371d59.js","assets/index.5e870e04.css","assets/coverImage.8ee5166a.js","assets/vendor.8d857a94.js","assets/vendor.26802100.css","assets/index.eb128dc6.js","assets/index.f28d446e.css"])},{path:"/bookranking",name:"bookranking",meta:{title:"排行榜",keepAlive:!0},component:()=>R((()=>import("./index.bca8dea2.js")),["assets/index.bca8dea2.js","assets/index.36a6f0b7.css","assets/vendor.8d857a94.js","assets/vendor.26802100.css","assets/coverImage.8ee5166a.js","assets/index.eb128dc6.js","assets/index.f28d446e.css"])},{path:"/mycenter",name:"mycenter",meta:{title:"我的",keepAlive:!0},component:()=>R((()=>import("./index.1e46fdb1.js")),["assets/index.1e46fdb1.js","assets/vendor.8d857a94.js","assets/vendor.26802100.css"])}]},{path:"/search",name:"search",meta:{title:"搜索",keepAlive:!0},component:()=>R((()=>import("./index.1842ec8b.js")),["assets/index.1842ec8b.js","assets/index.6eda0418.css","assets/vendor.8d857a94.js","assets/vendor.26802100.css","assets/lodash.97ff05ac.js","assets/coverImage.8ee5166a.js","assets/index.eb128dc6.js","assets/index.f28d446e.css"])},{path:"/bookdetail",name:"bookdetail",meta:{title:"书籍详情",keepAlive:!0},component:()=>R((()=>import("./index.4d59de73.js")),["assets/index.4d59de73.js","assets/index.c22d02f7.css","assets/vendor.8d857a94.js","assets/vendor.26802100.css","assets/lodash.97ff05ac.js","assets/coverImage.8ee5166a.js","assets/index.eb128dc6.js","assets/index.f28d446e.css"])},{path:"/reading",name:"reading",meta:{title:"阅读",keepAlive:!0},component:()=>R((()=>import("./index.139aaa3a.js")),["assets/index.139aaa3a.js","assets/index.05045e29.css","assets/vendor.8d857a94.js","assets/vendor.26802100.css","assets/eBook.0f21a3d6.js","assets/eBook.29045ac6.css","assets/index.eb128dc6.js","assets/index.f28d446e.css"])},{path:"/test",name:"test",meta:{title:"测试"},component:()=>R((()=>import("./index.061f7b6a.js")),["assets/index.061f7b6a.js","assets/index.7c48c8cf.css","assets/eBook.0f21a3d6.js","assets/eBook.29045ac6.css","assets/vendor.8d857a94.js","assets/vendor.26802100.css"])}],x=n({history:a(),routes:w});var D=i({state:{target:"http://api.zhuishushenqi.com",imgTarget:"http://statics.zhuishushenqi.com",bookshelfList:[],keyWords:[]},mutations:{update_categories(e,t){e.categories=t||[]},update_hotSearch(e,t){e.hotSearch=t||[]},update_bookshelfList(e,t){e.bookshelfList=t||[]},update_keyWords(e,t){e.keyWords=t||[]}},actions:{async onGetBookshelfList({commit:e}){try{e("update_bookshelfList",await r.getItem("bookshelfList"))}catch(t){console.log(t)}},async onSetBookshelfList({commit:e},t){try{await r.setItem("bookshelfList",t),e("update_bookshelfList",t)}catch(o){console.log(o)}},async onGetKeyWords({commit:e}){try{e("update_keyWords",await r.getItem("keyWords"))}catch(t){console.log(t)}},async onSetKeyWords({commit:e},t){try{await r.setItem("keyWords",t),e("update_keyWords",t)}catch(o){console.log(o)}}}});function V(){const e=document.documentElement.clientWidth/375;document.documentElement.style.fontSize=37.5*Math.min(e,2)+"px"}V(),window.onresize=function(){V()};const S=c(O);S.use(x),S.use(D),S.use(d),S.use(l),S.use(m),S.use(u),S.use(p),S.use(h),S.use(_),S.use(f),S.use(k),S.use(y),S.use(L),S.use(g),S.use(E),S.use(b),S.use(A),S.use(v),S.use(I),S.use(P),S.use(W),S.use(j),S.mount("#app");
