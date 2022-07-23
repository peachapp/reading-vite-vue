import{t as a,v as l,u as s,F as e,_ as t,p as o,G as c,H as i,r as n,o as u,x as r,q as v,s as d,U as p,M as b,O as m,J as g,Q as k,w as f,c as _,V as h}from"./vendor.8d857a94.js";import{l as y}from"./lodash.97ff05ac.js";import{_ as w}from"./coverImage.8ee5166a.js";import{d as I,e as x}from"./index.eb128dc6.js";a("data-v-4c1161d6");const C={class:"page-container"},j={class:"page-content overflowauto"},V={class:"book-detail-container"},q={class:"book-detail"},L={class:"book-title"},B={class:"book-author"},F={class:"book-tag"},U={class:"book-honor"},z={class:"book-rating"},A={class:"custom-title"},D={style:{"margin-right":"3px"}},G={class:"custom-label"},H={class:"book-retention"},J={class:"custom-title"},M=d("div",{class:"custom-label"},"读者留存",-1),O={class:"book-follower"},Q={class:"custom-title"},R=d("div",{class:"custom-label"},"累计人气",-1),S=d("span",{class:"custom-title"},"简介",-1),E={class:"book-desc"},K=d("span",{class:"custom-title"},"最新",-1),N={class:"custom-label"},P=d("span",{class:"custom-title"},"目录",-1),T={class:"custom-label"},W=d("span",{class:"custom-title"},"图书信息",-1),X={class:"book-copyright"},Y=d("view",{class:"tabbar-text-active"},"下载",-1),Z=h(" 开始阅读 "),$={key:0,class:"tabbar-text"},aa={key:1,class:"tabbar-text-active"};l();const la={setup(a){const l=s(),la=e(),sa=t(),ea=o(sa.query.bookId),ta=o({}),oa=c((()=>5*(ta.value.rating||{}).score/10)),ca=c((()=>l.state.bookshelfList)),ia=c((()=>ca.value.findIndex((a=>a._id===ta.value._id)))),na=()=>{la.go(-1)},ua=async()=>{try{const a=await x({bookId:ea.value});ta.value.sourceId=((a||[])[0]||{})._id}catch(a){console.log(a)}},ra=()=>{ia.value>-1?ca.value.splice(ia.value,1):ca.value.push(ta.value)};i(ca.value,(a=>{const s=y.exports.cloneDeep(a);l.dispatch("onSetBookshelfList",s)}));const va=()=>{la.push({name:"reading",query:{bookId:ea.value,sourceId:ta.value.sourceId}})};return(async()=>{try{const a=await I({bookId:ea.value});ta.value=a||{},ua()}catch(a){console.log(a)}})(),(a,l)=>{const s=n("van-nav-bar"),e=n("van-tag"),t=n("van-rate"),o=n("van-cell"),c=n("van-cell-group"),i=n("van-tabbar-item"),y=n("van-button"),I=n("van-tabbar");return u(),r("div",C,[v(s,{class:"page-title",fixed:"","left-arrow":"",title:ta.value.title,onClickLeft:na},null,8,["title"]),d("div",j,[d("div",V,[v(w,{class:"book-image",path:ta.value.cover},null,8,["path"]),d("div",q,[d("div",L,p(ta.value.title),1),d("div",B,p(ta.value.author),1),d("div",F,[d("span",null,p(ta.value.cat),1),d("span",null,p(ta.value.wordCount)+"字 ",1)]),d("div",null,[(u(!0),r(b,null,m(ta.value.tags,((a,l)=>(u(),_(e,{style:{"margin-right":"12px"},color:"#12ab76",plain:"",key:l},{default:f((()=>[h(p(a),1)])),_:2},1024)))),128))])])]),d("div",U,[d("div",z,[d("div",A,[d("span",D,p((ta.value.rating||{}).score),1),v(t,{size:"14",gutter:"0",color:"#12ab76","allow-half":"",modelValue:g(oa),"onUpdate:modelValue":l[0]||(l[0]=a=>k(oa)?oa.value=a:null),readonly:""},null,8,["modelValue"])]),d("div",G,p((ta.value.rating||{}).tip),1)]),d("div",H,[d("div",J,p(ta.value.retentionRatio)+"%",1),M]),d("div",O,[d("div",Q,p(ta.value.totalFollower),1),R])]),d("div",null,[v(c,{class:"cell-group-container"},{default:f((()=>[v(o,{icon:"description"},{title:f((()=>[S])),_:1})])),_:1}),d("div",E,p(ta.value.longIntro),1)]),v(c,{class:"cell-group-container"},{default:f((()=>[v(o,{icon:"clock-o"},{title:f((()=>[K,d("span",N,p(ta.value.updated),1)])),_:1}),v(o,{"is-link":"",icon:"notes-o"},{title:f((()=>[P,d("span",T,p(ta.value.lastChapter),1)])),_:1})])),_:1}),d("div",null,[v(c,{class:"cell-group-container"},{default:f((()=>[v(o,null,{title:f((()=>[W])),_:1})])),_:1}),d("div",X," 版权信息："+p(ta.value.copyrightInfo),1)])]),v(I,{class:"tabbar-container"},{default:f((()=>[v(i,null,{default:f((()=>[Y])),_:1}),v(i,null,{default:f((()=>[v(y,{class:"read-btn",block:"",color:"#12AB76",round:"",onClick:va},{default:f((()=>[Z])),_:1})])),_:1}),v(i,{onClick:ra},{default:f((()=>[g(ia)>-1?(u(),r("view",$,"在书架")):(u(),r("view",aa,"加书架"))])),_:1})])),_:1})])}},__scopeId:"data-v-4c1161d6"};export{la as default};