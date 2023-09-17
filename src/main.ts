import { createApp } from "vue";
import VueClick from "vue-click";
import App from "./App.vue";
import { createPinia } from "pinia";
import { plugin, defaultConfig } from "@formkit/vue";
import "./index.css";
import router from "./router/index";
import config from "../formkit.config.ts";

const app = createApp(App);
app.use(VueClick);
const pinia = createPinia();
app.use(pinia);
app.use(router);
// app.use(plugin, defaultConfig);
app.use(plugin, defaultConfig(config));
// app.component("MyTable", {
//   MyTable,
// });
// app.component("TableLine", {
//   TableLine,
// });
app.mount("#app");
