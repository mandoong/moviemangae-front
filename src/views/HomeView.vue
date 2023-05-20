<script setup>
import SearchBar from "../components/Home/SearchBar.vue";
import LibraryFrame from "../components/Home/LibraryFrame.vue";
import RecommendComment from "../components/Home/RecommendComments.vue";
import ContentWrap from "../components/Global/ContentWrap.vue";
import MovieSlider from "../components/Home/MovieSlider.vue";
import Banner from "../components/Home/Banner.vue";
import { Movie } from "../service/repository";
import Slider from "../components/Global/slider.vue";
import RankBar from "../components/Home/RankBar.vue";
</script>

<template>
  <main class="w-full h-full">
    <SearchBar></SearchBar>

    <ContentWrap>
      <RankBar :movies="movies1 && movies1.slice(0, 3)"></RankBar>
      <!-- <LibraryFrame :movies1="movies1" :movies2="movies1"></LibraryFrame> -->
      <Banner></Banner>
      <div class="text-[#efefef] mt-6 text-lg">최신 리뷰 한줄평</div>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <RecommendComment :comments="data" />
        </template>
      </Slider>
      <div class="text-[#efefef] mt-6 text-lg">오늘은 이거 볼까요?</div>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <MovieSlider :movie="data" />
        </template>
      </Slider>
      <div class="text-[#efefef] mt-6 text-lg">키노 회원 들이 보고 있어요!</div>
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
    Slider,
    RankBar,
  },
};
</script>
