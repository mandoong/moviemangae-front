<template>
  <main
    class="w-full px-4 h-screen pb-40 overflow-y-scroll bg-prime scrollbar-hide"
  >
    <div class="bg-prime w-full text-main h-24 sticky top-0">
      <div class="flex items-center">
        <button class="w-12" @click="$router.back()">
          <ChevronLeftIcon class="h-8 w-8 text-gray-500" />
        </button>
        <div class="flex-1 text py-4 h-14 text-center text-main sticky top-0">
          나의 영화
        </div>
        <div class="w-12"></div>
      </div>
      <div class="flex gap-4 px-4">
        <button
          @click="(selectType = 'like'), (selectMovieList = likeMovies)"
          class="flex-1 text-center pb-1"
          :class="
            selectType === 'like'
              ? 'text-main border-b-2 border-blue-400'
              : 'text-subText'
          "
        >
          좋아요
        </button>
        <button
          @click="(selectType = 'dislike'), (selectMovieList = dislikeMovies)"
          class="flex-1 text-center pb-1"
          :class="
            selectType === 'dislike'
              ? 'text-main border-b-2 border-blue-400'
              : 'text-subText'
          "
        >
          별로에요
        </button>
      </div>
    </div>
    <div v-for="movie in selectMovieList" :key="movie">
      <div
        class="w-full h-24 flex gap-2 items-center rounded-lg text-subText bg-sub2 p-2 mb-2"
        @click="$router.push(`/movie/${movie.movie.id}`)"
      >
        <div
          class="rounded-lg w-14 aspect-[10/14] bg-slate-500 bg-cover bg-center"
          :style="{ backgroundImage: `url(${movie.movie.imageUrl})` }"
        ></div>
        <div class="flex-1 h-full">
          <div class="text-main">{{ movie.movie.title }}</div>
          <div class="text-xs">
            {{ JSON.parse(movie.movie.genre).join(" · ") }}
          </div>
          <div class="text-xs">{{ movie.movie.dateCreated }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import CommentInfo from "../components/Comment/CommentInfo.vue";
import { Movie, User } from "../service/repository";

export default {
  data() {
    return {
      likeMovies: [],
      dislikeMovies: [],
      selectType: null,
      selectMovieList: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const user = await User.GetLikeMovies();
      if (user.status === 200) {
        this.likeMovies = user.data.liked_movie;
        this.dislikeMovies = user.data.disliked_movie;
        if (this.$route.query.type === "dislike") {
          this.selectType = "dislike";
          this.selectMovieList = this.dislikeMovies;
        } else {
          this.selectType = "like";
          this.selectMovieList = this.likeMovies;
        }
      }
    },
  },
  components: { CommentInfo, ChevronLeftIcon },
};
</script>
