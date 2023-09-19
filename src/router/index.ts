import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";

import TableHeder from "../components/TableHeder.vue";
import MyTable from "../components/MyTable.vue";
import AllTables from "../components/AllTables.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../components/Home.vue"),
    },

    {
      path: "/:id",
      name: "MyTable",
      component: MyTable,
    },
    {
      path: "/table/:id",
      name: "TableHeder",

      component: TableHeder,
    },
  ],
});

export default router;
