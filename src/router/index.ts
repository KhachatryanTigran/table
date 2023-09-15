import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import MyTable from "../components/MyTable.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/table/:id",
      name: "table",

      component: MyTable,
    },
  ],
});

export default router;
