<template>
  <main class="w-full h-screen overflow-y-scroll bg-prime scrollbar-hide">
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

    <div class="w-full px-4 pt-40 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="flex justify-center" v-for="movie in movies" :key="movie">
        <MovieSlider :movie="movie"></MovieSlider>
      </div>
    </div>
  </main>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import Slider from "../components/Global/slider.vue";
import { Movie } from "../service/repository";
import MovieSlider from "../components/Home/MovieSlider.vue";

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
    };
  },

  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const movies = await Movie.GetAllMovie();
      this.movies = movies.data;
      console.log(this.movies[0]);
    },
  },
  components: { Slider, ChevronDownIcon, MovieSlider },
};
</script>
