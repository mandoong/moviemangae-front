<template>
  <main class="w-full h-screen scrollbar-hide relative">
    <div class="fixed w-[700px] h-full -z-10">
      <div class="grid w-full grid-cols-7 gap-2 bg-black px-2">
        <div
          class="w-full h-40 bg-cover rounded-md bg-center brightness-[12%] hover:scale-110 duration-150 hover:brightness-[35%]"
          v-for="movie in movieList"
          :key="movie"
          :style="{ 'background-image': `url(${movie.imageUrl})` }"
        ></div>
      </div>
    </div>

    <div class="w-full h-full pt-64 z-20 flex items-center flex-col">
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
        @click="onClickGoogle"
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
      <button class="mt-2" @click="onClickKakao">
        <img src="../assets/kakao_login_medium_wide.png" />
      </button>
      <button
        class="w-[300px] h-12 flex px-1 mt-2 items-center font-bold text-sm rounded-md text-white bg-[#03C75A]"
        @click="onClickNaver"
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

export default {
  data() {
    return {
      movieList: null,
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

    onClickGoogle() {
      location.href = "http://localhost:3002/auth/login/google";
    },
    onClickKakao() {
      location.href = "http://localhost:3002/auth/login/kakao";
    },
    onClickNaver() {
      location.href = "http://localhost:3002/auth/login/naver";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
