import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/NotFound.vue";

import TableHeader from "../components/TableHeader.vue";
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
      name: "TableHeader",

      component: TableHeader,
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

export default router;
