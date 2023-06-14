<template>
  <main
    class="w-full px-4 h-screen pb-40 overflow-y-scroll bg-prime scrollbar-hide"
  >
    <div class="flex items-center bg-prime w-full h-14 sticky top-0">
      <button class="w-12" @click="$router.back()">
        <ChevronLeftIcon class="h-8 w-8 text-gray-500" />
      </button>
      <div class="flex-1 text py-4 h-14 text-center text-main sticky top-0">
        {{ title }}
      </div>
      <div class="w-12"></div>
    </div>
    <div v-for="movie in movies" :key="movie">
      <div
        class="w-full h-24 flex gap-2 items-center rounded-lg text-subText bg-sub2 p-2 mb-2"
        @click="$router.push(`/movie/${movie.id}`)"
      >
        <div
          class="rounded-lg w-14 aspect-[10/14] bg-slate-500 bg-cover bg-center"
          :style="{ backgroundImage: `url(${movie.imageUrl})` }"
        ></div>
        <div class="flex-1 h-full">
          <div class="text-main">{{ movie.title }}</div>
          <div class="text-xs">{{ JSON.parse(movie.genre).join(" · ") }}</div>
          <div class="text-xs">{{ movie.dateCreated }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import CommentInfo from "../components/Comment/CommentInfo.vue";
import { Movie } from "../service/repository";

export default {
  data() {
    return { movies: null, title: "" };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const type = this.$route.query.type;
      switch (type) {
        case "deadline":
          const deadlineMovies = await Movie.GetDeadlineMovie();
          this.movies = deadlineMovies.data;
          this.title = new Date().getMonth() + 1 + `월 넷플릭스 종료 예정작`;
          break;

        case "favorite":
          const favoriteMovies = await Movie.GetFavoriteMovies();
          this.movies = favoriteMovies.data;
          this.title = "키노 회원 들이 보고 있어요!";
          break;

        case "top10":
          const top10Movies = await Movie.GetTop10();
          this.movies = top10Movies.data;
          this.title = "넷플릭스 TOP 10";
          break;
      }
    },
  },
  components: { CommentInfo, ChevronLeftIcon },
};
</script>
