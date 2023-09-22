import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/NotFound.vue";
import ROUTES from "../constants/routeConstants.ts";
import TableHeader from "../components/TableHeader.vue";
import MyTable from "../components/MyTable.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.Home.PATH,
      name: ROUTES.Home.NAME,
      component: () => import("../components/Home.vue"),
    },

    {
      path: ROUTES.MyTable.PATH,
      name: ROUTES.MyTable.NAME,
      component: MyTable,
    },
    {
      path: ROUTES.TableHeader.PATH,
      name: ROUTES.TableHeader.NAME,

      component: TableHeader,
    },
    {
      path: ROUTES.NotFound.PATH,
      name: ROUTES.NotFound.NAME,
      component: NotFound,
    },
  ],
});

export default router;
