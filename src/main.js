import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import less from "less";
import { Button, Tabbar, TabbarItem, NavBar, Search, PullRefresh, Image as VanImage, Empty, List, Tag, Loading, Cell, CellGroup, Swipe, SwipeItem, Tab, Tabs, Icon, Rate } from "vant";
import "./config/rem";

const app = createApp(App);

app.use(router);
app.use(store);

// app.use(less);

// 全局注册组件
app.use(Button);
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Search);
app.use(PullRefresh);
app.use(VanImage);
app.use(Empty);
app.use(List);
app.use(Tag);
app.use(Loading);
app.use(Cell);
app.use(CellGroup);
app.use(Swipe);
app.use(SwipeItem);
app.use(Tab);
app.use(Tabs);
app.use(Icon);
app.use(Rate);

app.mount("#app");
