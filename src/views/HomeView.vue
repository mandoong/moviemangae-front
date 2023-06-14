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

      <HomeTitle href="/comment"> 최신 리뷰 한줄평 ✍🏻 </HomeTitle>
      <Slider :rows="recommendComment">
        <template #item="{ data }">
          <RecommendComment :comments="data" />
        </template>
      </Slider>

      <HomeTitle href="/movie/list?type=top10">
        오늘은 이거 볼까요? 👀
      </HomeTitle>
      <Slider :rows="movies1">
        <template #item="{ data, onClick }">
          <MovieSlider :movie="data" @onClick="onClick" />
        </template>
      </Slider>

      <HomeTitle href="/movie/list?type=favorite">
        지금 회원 들이 보고 있어요!
      </HomeTitle>
      <Slider :rows="favoriteMovies">
        <template #item="{ data, onClick }">
          <MovieSlider :movie="data" @onClick="onClick" />
        </template>
      </Slider>

      <HomeTitle href="/comment"> 인기있는 리뷰 🔥</HomeTitle>

      <Slider :rows="recommendComment">
        <template #item="{ data }">
          <RecommendComment :comments="data" />
        </template>
      </Slider>

      <HomeTitle href="/movie/1"> 인증회원의 인생작 엿보기 🎠</HomeTitle>
      <UserFavoriteList></UserFavoriteList>

      <HomeTitle href="/movie/list?type=deadline">
        {{ new Date().getMonth() + 1 }}월 넷플릭스 종료 예정작 ⏳
      </HomeTitle>
      <Slider :rows="deadlineMovies">
        <template #item="{ data, onClick }">
          <MovieSlider :movie="data" @onClick="onClick" />
        </template>
      </Slider>

      <HomeTitle href="/movie/list?type=top10">
        볼까말까 고민된다면?!</HomeTitle
      >
      <Slider :rows="movies1">
        <template #item="{ data, onClick }">
          <FlickingList :movie="data" @onClick="onClick"></FlickingList>
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
import { Comment, Movie } from "../service/repository";
import Slider from "../components/Global/Slider.vue";

import Head from "../components/Global/Head.vue";
import UserServiceBanner from "../components/Home/UserServiceBanner.vue";
import UserFavoriteList from "../components/Home/UserFavoriteList.vue";
import HomeTitle from "../components/Home/HomeTitle.vue";
import FlickingList from "../components/Home/FlickingList.vue";
import HomeServiceBar from "../components/Home/HomeServiceBar.vue";
import RankBar from "../components/Home/RankBar.vue";
import axios from "axios";
import { MMAPI } from "../service/MMAPI";

export default {
  data() {
    return {
      movies1: null,
      movies2: [{}, {}, {}, {}, {}, {}],
      deadlineMovies: null,
      favoriteMovies: null,
      searching: false,
      yPosition: 0,
      recommendComment: [],
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
    this.fetch();
    this.$refs.scroll.addEventListener("scroll", this.onScroll);
  },

  destroyed() {
    this.$refs.scroll.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    async fetch() {
      const top10Movies = await Movie.GetTop10();
      const deadlineMovies = await Movie.GetDeadlineMovie();
      const favoriteMovies = await Movie.GetFavoriteMovies();
      const comments = await Comment.GetAllComment();

      if (top10Movies.data.length === 0) {
        const result = await MMAPI.get("crawler/top10/");

        if (result.status === 200) {
          const top10 = await Movie.GetTop10();
          this.movies1 = top10.data;
          this.deadlineMovies = deadlineMovies.data;
          this.favoriteMovies = favoriteMovies.data;
        }
      } else {
        this.movies1 = top10Movies.data;
        this.deadlineMovies = deadlineMovies.data;
        this.favoriteMovies = favoriteMovies.data;
        this.recommendComment = comments.data;
      }
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
    RankBar,
  },
};
</script>
