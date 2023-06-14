<template>
  <main class="w-full h-screen scrollbar-hide relative">
    <div class="w-[700px] h-full z-0">
      <div class="grid w-full grid-cols-7 gap-2 bg-black px-2">
        <div
          class="w-full z-0 h-40 bg-cover rounded-md bg-center brightness-[12%] hover:scale-110 duration-150 hover:brightness-[35%]"
          v-for="movie in movieList"
          :key="movie"
          :style="{ 'background-image': `url(${movie.imageUrl})` }"
        ></div>
      </div>
    </div>

    <div
      class="absolute top-[calc(50%-192px)] w-96 left-[calc(50%-192px)] z-20 flex items-center flex-col"
    >
      <div>
        <img class="w-56" src="../assets/Logo.png" />
      </div>
      <div class="text-subText mb-6">
        로그인을 하고
        <span class="text-main">서비스</span>
        를 자유롭게 이용해보세요!
      </div>
      <button
        class="w-[300px] flex px-1 items-center rounded-md h-12 text-base text-[#444444] font-bold bg-white"
        @click="onClickAuth('google')"
      >
        <img
          class="w-10"
          src="https://developers.google.com/identity/sign-in/g-normal.png"
        />
        <div
          class="flex-1 text-center"
          style="font-family: 'Roboto', sans-serif"
        >
          Sign with Google
        </div>
        <div class="w-10"></div>
      </button>
      <button class="mt-2" @click="onClickAuth('kakao')">
        <img src="../assets/kakao_login_medium_wide.png" />
      </button>
      <button
        class="w-[300px] h-12 flex px-1 mt-2 items-center font-bold text-sm rounded-md text-white bg-[#03C75A]"
        @click="onClickAuth('naver')"
      >
        <img class="w-10" src="../assets/btnG_아이콘사각.png" />
        <div class="flex-1 text-center">네이버로 시작하기</div>
        <div class="w-10"></div>
      </button>
    </div>
  </main>
</template>

<script>
import { Movie } from "../service/repository";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      movieList: null,

      loginUrl:
        "https://oqwc40fv0b.execute-api.ap-northeast-2.amazonaws.com/dev",
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const movies = await Movie.GetAllMovie();

      this.movieList = movies.data;
    },

    onClickAuth(auth) {
      location.href = `${this.loginUrl}/auth/login/${auth}`;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
