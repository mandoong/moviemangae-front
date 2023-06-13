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
        <img class="w-56" src="../../assets/Logo.png" />
        <div class="text-main mb-6">로그인 시도 중 입니다.</div>
      </div>
    </div>
  </main>
</template>

<script>
import { Movie } from "../../service/repository";
import Cookies from "js-cookie";
import axios from "axios";

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

      const query = this.$route.query;
      console.log(query);
      const accessToken = await axios.get(
        `https://oqwc40fv0b.execute-api.ap-northeast-2.amazonaws.com/dev/auth/login/google-login?code=${query.code}&authuser=${query.authuser}&prompt=${query.prompt}&scope=${query.scope}`
      );
      if (accessToken.status === 200) {
        window.localStorage.setItem("accessToken", accessToken.data);
        this.$router.push("/my");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
