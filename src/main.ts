import { createApp } from "vue";
import VueClick from "vue-click";
import App from "./App.vue";
import { createPinia } from "pinia";

import "./index.css";
import router from "./router/index";
const app = createApp(App);
app.use(VueClick);
const pinia = createPinia();
app.use(pinia);
app.use(router);
// app.component("MyTable", {
//   MyTable,
// });
// app.component("TableLine", {
//   TableLine,
// });
app.mount("#app");
