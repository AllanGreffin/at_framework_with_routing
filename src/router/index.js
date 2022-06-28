import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/books",
    name: "books",
    component: () =>
      import("../views/ListBooks.vue"),
  },
  {
    path: "/addBook",
    name: "addBook",
    component: () =>
      import("../views/AddBook.vue"),
  },
  {
    path: "/editBook/:id",
    name: "editBook",
    component: () =>
      import("../views/EditBook.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
