<script setup>
import SearchBar from "../components/Home/SearchBar.vue";
import LibraryFrame from "../components/Home/LibraryFrame.vue";
import RecommendComment from "../components/Home/RecommendComments.vue";
import ContentWrap from "../components/Global/ContentWrap.vue";
import MovieSlider from "../components/Home/MovieSlider.vue";
import Banner from "../components/Home/Banner.vue";
import { Movie } from "../service/repository";
</script>

<template>
  <main class="w-full h-full">
    <SearchBar></SearchBar>
    <ContentWrap>
      <LibraryFrame :movies1="movies1" :movies2="movies1"></LibraryFrame>
      <Banner></Banner>
      <RecommendComment></RecommendComment>
      <MovieSlider
        v-if="movies1"
        title="오늘의 인기 영화"
        :movies="movies1"
      ></MovieSlider>
      <MovieSlider title="따끈한 신작 영화" :movies="movies2"></MovieSlider>

      <div class="flex justify-center">더 많은 영화 찾으러 가기!</div>
    </ContentWrap>
  </main>
</template>

<script>
export default {
  data() {
    return {
      movies1: null,
      movies2: [{}, {}, {}, {}, {}, {}],
    };
  },

  mounted() {
    this.getTop10Movie();
  },

  methods: {
    async getTop10Movie() {
      const result = await Movie.GetTop10();
      console.log(result.data);
      this.movies1 = result.data;
    },
  },

  components: {
    SearchBar,
    LibraryFrame,
    RecommendComment,
    ContentWrap,
    MovieSlider,
    Banner,
  },
};
</script>