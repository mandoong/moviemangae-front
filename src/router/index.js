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
      path: "/movie",
      name: "movie",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/MovieView.vue"),
    },
    {
      path: "/movie/:id",
      name: "movieId",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Movie.id.vue"),
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
  ],
});

export default router;
