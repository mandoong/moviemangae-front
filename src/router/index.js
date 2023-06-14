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
      path: "/movie/list",
      name: "movieContainer",
      component: () => import("../views/HomeMoviesContainerView.vue"),
    },
    {
      path: "/movie/search",
      name: "searchMovie",
      component: () => import("../views/SearchMovieView.vue"),
    },
    {
      path: "/movie/:id/comment",
      name: "createComment",
      component: () => import("../views/CreateCommentView.vue"),
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
      path: "/my/comment",
      name: "myComment",
      component: () => import("../views/MyCommentView.vue"),
    },
    {
      path: "/my/movie",
      name: "myMovie",
      component: () => import("../views/MyLikeMovieView.vue"),
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
    {
      path: "/login/naver",
      name: "naverRedirect",
      component: () => import("../views/loginRedirect/RedirectNaver.vue"),
    },
    {
      path: "/login/google",
      name: "googleRedirect",
      component: () => import("../views/loginRedirect/RedirectGoogle.vue"),
    },
    {
      path: "/login/kakao",
      name: "kakaoRedirect",
      component: () => import("../views/loginRedirect/RedirectKakao.vue"),
    },
  ],
});

export default router;
