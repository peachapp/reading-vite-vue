import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import less from "less";
import { Button, Tabbar, TabbarItem, NavBar, Search, PullRefresh } from "vant";
import "./config/rem";

const app = createApp(App);

app.use(router);

// app.use(less);

// 全局注册组件
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Search);
app.use(PullRefresh);

app.mount("#app");
