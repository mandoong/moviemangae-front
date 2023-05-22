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

    <SearchBar @focus="searching = true" @close="searching = false"></SearchBar>

    <ContentWrap v-if="searching === false">
      <RankBar :movie="movies1 && movies1.slice(0, 3)"></RankBar>
      <!-- <LibraryFrame :movies1="movies1" :movies2="movies1"></LibraryFrame> -->
      <UserServiceBanner />
      <Banner></Banner>

      <HomeTitle href="/movie/1"> 최신 리뷰 한줄평 ✍🏻 </HomeTitle>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <RecommendComment :comments="data" />
        </template>
      </Slider>

      <HomeTitle href="/movie/1"> 오늘은 이거 볼까요? 👀 </HomeTitle>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <MovieSlider :movie="data" />
        </template>
      </Slider>

      <HomeTitle href="/movie/1"> 키노 회원 들이 보고 있어요! </HomeTitle>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <MovieSlider :movie="data" />
        </template>
      </Slider>

      <HomeTitle href="/movie/1"> 커뮤니티 인기글 🔥</HomeTitle>

      <Slider :rows="movies1">
        <template #item="{ data }">
          <RecommendComment :comments="data" />
        </template>
      </Slider>

      <HomeTitle href="/movie/1"> 인증회원의 인생작 엿보기 🎠</HomeTitle>
      <UserFavoriteList></UserFavoriteList>

      <HomeTitle href="/movie/1"> 5월 넷플릭스 종료 예정작 ⏳ </HomeTitle>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <MovieSlider :movie="data" />
        </template>
      </Slider>

      <HomeTitle href="/movie/1"> 볼까말까 고민된다면?!</HomeTitle>
      <Slider :rows="movies1">
        <template #item="{ data }">
          <FlickingList :movie="data"></FlickingList>
        </template>
      </Slider>

      <HomeServiceBar></HomeServiceBar>
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
import RankBar from "../components/Home/RankBar.vue";

import Head from "../components/Global/Head.vue";
import UserServiceBanner from "../components/Home/UserServiceBanner.vue";
import UserFavoriteList from "../components/Home/UserFavoriteList.vue";
import HomeTitle from "../components/Home/HomeTitle.vue";
import FlickingList from "../components/Home/FlickingList.vue";
import HomeServiceBar from "../components/Home/HomeServiceBar.vue";
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
    RankBar,
    Head,
    UserServiceBanner,
    UserFavoriteList,
    HomeTitle,
    FlickingList,
    HomeServiceBar,
  },
};
</script>
