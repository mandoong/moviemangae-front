<style scoped>
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-40px);
  opacity: 0;
}
</style>

<template>
  <main
    ref="scroll"
    class="w-full h-screen scrollbar-hide bg-prime overflow-y-scroll"
  >
    <Transition>
      <Head v-if="header" />
    </Transition>
    <div class="h-16 w-full"></div>

    <SearchBar @focused="searching = true"></SearchBar>
    <ContentWrap v-if="searching === false">
      <!-- <LibraryFrame :movies1="movies1" :movies2="movies1"></LibraryFrame> -->
      <Banner></Banner>

      <RecommendComment></RecommendComment>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <MovieSlider :movie="data" />
        </template>
      </Slider>

      <Slider :rows="movies1">
        <template #item="{ data }">
          <MovieSlider :movie="data" />
        </template>
      </Slider>

      <Slider :rows="movies1">
        <template #item="{ data }">
          <MovieSlider :movie="data" />
        </template>
      </Slider>

      <div class="flex justify-center">더 많은 영화 찾으러 가기!</div>
    </ContentWrap>
  </main>
</template>

<script>
import SearchBar from "../components/Home/SearchBar.vue";
import LibraryFrame from "../components/Home/LibraryFrame.vue";
import RecommendComment from "../components/Home/RecommendComments.vue";
import ContentWrap from "../components/Global/ContentWrap.vue";
import MovieSlider from "../components/Home/MovieSlider.vue";
import Banner from "../components/Home/Banner.vue";
import { Movie } from "../service/repository";
import Slider from "../components/Global/slider.vue";

import Head from "../components/Global/Head.vue";
export default {
  data() {
    return {
      movies1: null,
      movies2: [{}, {}, {}, {}, {}, {}],
      searching: false,
      yPosition: 0,
    };
  },
  computed: {
    header() {
      if (this.searching) {
        return false;
      }

      return this.yPosition < 250;
    },
  },

  mounted() {
    this.getTop10Movie();
    this.$refs.scroll.addEventListener("scroll", this.onScroll);
  },

  destroyed() {
    this.$refs.scroll.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    async getTop10Movie() {
      const result = await Movie.GetTop10();
      this.movies1 = result.data;
    },
    onScroll() {
      this.yPosition = this.$refs.scroll.scrollTop;
    },
  },

  components: {
    SearchBar,
    LibraryFrame,
    RecommendComment,
    ContentWrap,
    MovieSlider,
    Banner,
    Slider,
    Head,
  },
};
</script>
