import { createRouter, createWebHistory } from "vue-router";

import TableHeder from "../components/TableHeder.vue";
import MyTable from "../components/MyTable.vue";

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
