import{_ as a}from"./coverImage.8ee5166a.js";import{g as e}from"./index.eb128dc6.js";import{t as s,v as t,p as l,r as c,o as n,x as o,s as i,q as v,J as r,Q as u,w as d,M as p,O as m,c as f,U as h,X as g}from"./vendor.8d857a94.js";s("data-v-a8c597fa");const w={class:"page-container"},k={class:"page-header"},y={class:"swipe-item"},_={class:"cat-left"},b={class:"cat-name"},z={class:"cat-count"},C={class:"cat-images"};t();const j={setup(s){const t=l({0:{en:"male",zh:"男生"},1:{en:"female",zh:"女生"},2:{en:"picture",zh:"标签"},3:{en:"press",zh:"出版"}});let j=l(0),x=l({});const I=l(),U=a=>{I.value.swipeTo(a)},q=a=>{j.value=a};return(async()=>{try{const a=await e();a.ok&&(x.value=a||{})}catch(a){console.log(a)}})(),(e,s)=>{const l=c("van-tab"),J=c("van-tabs"),M=c("van-swipe-item"),O=c("van-swipe");return n(),o("div",w,[i("div",k,[v(J,{active:r(j),"onUpdate:active":s[0]||(s[0]=a=>u(j)?j.value=a:j=a),onChange:U},{default:d((()=>[(n(!0),o(p,null,m(t.value,((a,e)=>(n(),f(l,{key:e,name:1*e,title:a.zh},null,8,["name","title"])))),128))])),_:1},8,["active"])]),v(O,{class:"swipe","show-indicators":!1,ref:I,onChange:q},{default:d((()=>[(n(!0),o(p,null,m(t.value,((e,s)=>(n(),f(M,{class:"overflowauto",key:s},{default:d((()=>[i("div",y,[(n(!0),o(p,null,m(r(x)[e.en],((e,s)=>(n(),o("div",{class:"cat-item",key:s},[i("div",_,[i("div",b,h(e.name),1),i("div",z,h(e.bookCount)+"本",1)]),i("div",C,[(n(!0),o(p,null,m(e.bookCover,((e,s)=>(n(),f(a,{class:g("cat-image-"+s),key:s,path:e},null,8,["class","path"])))),128))])])))),128))])])),_:2},1024)))),128))])),_:1},512)])}},__scopeId:"data-v-a8c597fa"};export{j as default};
