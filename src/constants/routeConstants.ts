export interface RouteConfig {
  PATH: string;
  NAME: string;
}

const routes: Record<string, RouteConfig> = {
  Home: {
    PATH: "/",
    NAME: "Home",
  },
  MyTable: {
    PATH: "/:id",
    NAME: "MyTable",
  },
  TableHeader: {
    PATH: "/table/:id",
    NAME: "TableHeader",
  },
  NotFound: {
    PATH: "/:pathMatch(.*)*",
    NAME: "NotFound",
  },
};

export default routes;
