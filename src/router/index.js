import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/movie/:id",
      name: "movieId",
      component: () => import("../views/Movie.id.vue"),
    },
    {
      path: "/movie",
      name: "movie",
      component: () => import("../views/MovieListView.vue"),
    },
    {
      path: "/comment",
      name: "comment",
      component: () => import("../views/CommentsView.vue"),
    },
    {
      path: "/my",
      name: "my",
      component: () => import("../views/MyView.vue"),
    },
    {
      path: "/my/setting",
      name: "setting",
      component: () => import("../views/SettingView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router;
