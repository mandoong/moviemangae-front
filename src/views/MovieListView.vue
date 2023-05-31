<template>
  <main
    ref="scroll"
    class="w-full h-screen overflow-y-scroll bg-prime scrollbar-hide"
  >
    <div class="fixed w-full top-0">
      <div
        class="max-w-[700px] bg-prime text-main flex justify-center flex-col items-center px-4"
      >
        <div class="text py-4">작품 탐색</div>
        <div class="w-full flex gap-2">
          <div class="w-12 h-12" v-for="item in platform" :key="item">
            <div
              class="w-12 h-12 bg-cover bg-center"
              :style="{ 'background-image': `url(${item.img})` }"
            ></div>
          </div>
        </div>
        <div class="w-full pb-4">
          <Slider :rows="options">
            <template #item="{ data }">
              <div
                class="px-2 h-6 text-xs flex justify-center items-center font-bold rounded-md bg-sub"
              >
                <div class="w-12">{{ data.option }}</div>
                <ChevronDownIcon class="h-4 w-4 text-main" />
              </div>
            </template>
          </Slider>
        </div>
      </div>
    </div>

    <div
      class="w-full px-4 pt-40 grid grid-cols-2 md:grid-cols-5 gap-2"
      ref="movieList"
    >
      <transition-group name="fade">
        <div v-for="movie in movies" :key="movie">
          <div class="flex justify-center h-42 overflow-hidden">
            <MovieList :movie="movie"></MovieList>
          </div>
        </div>
      </transition-group>
      <div ref="observer" class="h-20"></div>
    </div>
  </main>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import Slider from "../components/Global/slider.vue";
import { Movie } from "../service/repository";
import MovieList from "../components/Global/MovieList.vue";

export default {
  data() {
    return {
      platform: [
        {
          name: "Netplix",
          img: "https://static.kinolights.com/icon/btn_squircle_netflix.png",
        },
        {
          name: "disney",
          img: "https://static.kinolights.com/icon/btn_squircle_disneyplus.png",
        },
        {
          name: "watcha",
          img: "https://static.kinolights.com/icon/btn_squircle_watcha.png",
        },
      ],

      options: [
        { option: "좋아요" },
        { option: "장르" },
        { option: "국가" },
        { option: "등급" },
        { option: "연대" },
        { option: "해외평점" },
        { option: "러닝타임" },
      ],

      movies: [],
      page: 1,
    };
  },

  mounted() {
    this.fetch();
    this.observeMovies();
  },

  destroyed() {},

  methods: {
    async fetch() {
      const movies = await Movie.GetAllMovie();
      this.movies.push(...movies.data);
    },

    observeMovies() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.addMovies();
            }
          });
        },
        {
          threshold: 0,
        }
      );

      observer.observe(this.$refs.observer);
    },

    async addMovies() {
      const movies = await Movie.GetAllMovie(this.page);
      this.movies.push(...movies.data);
      this.page++;
      console.log(this.page);
    },
  },
  components: { Slider, ChevronDownIcon, MovieList },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-enter-active {
  transition: all 1s ease;
}
</style>
