import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import TableHeder from "../components/TableHeder.vue";
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
      path: "/:id",
      name: "MyTable",
      component: MyTable,
    },
    {
      path: "/table/:id",
      name: "table",

      component: TableHeder,
    },
  ],
});

export default router;
