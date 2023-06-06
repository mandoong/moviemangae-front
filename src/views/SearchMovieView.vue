<template>
  <main
    class="w-full px-4 h-screen pb-40 overflow-y-scroll bg-prime scrollbar-hide"
  >
    <div class="flex items-center bg-prime w-full h-14 sticky top-0">
      <button class="w-12" @click="$router.back()">
        <ChevronLeftIcon class="h-8 w-8 text-gray-500" />
      </button>
      <div class="flex-1 text py-4 h-14 text-center text-main sticky top-0">
        '{{ keyword }}' 키워드로 검색한 영화
      </div>
      <div class="w-12"></div>
    </div>
    <div v-for="movie in movies" :key="movie">
      <div
        class="w-full h-24 flex gap-2 items-center rounded-lg text-subText bg-sub p-2 mb-2"
        @click="$router.push(`/movie/${movie.id}`)"
      >
        <div
          class="rounded-lg w-14 aspect-[10/14] bg-cover bg-center"
          :style="{ backgroundImage: `url(${movie.imageUrl})` }"
        ></div>
        <div class="flex-1 h-full">
          <div class="text-main">{{ movie.title }}</div>
          <div class="text-xs">{{ movie.genre.join(" · ") }}</div>
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
    return { movies: null, keyword: "" };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const keyword = this.$route.query.keyword;
      this.keyword = keyword;
      const movie = await Movie.GetSearchMovies(keyword);
      this.movies = movie.data;
    },
  },
  components: { CommentInfo, ChevronLeftIcon },
};
</script>
