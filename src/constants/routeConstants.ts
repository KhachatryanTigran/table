export default {
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
