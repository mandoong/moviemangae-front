<template>
  <main class="w-full h-screen scrollbar-hide relative">
    <div class="w-[700px] h-full z-0">
      <div class="grid w-full grid-cols-7 gap-2 bg-black px-2">
        <div
          class="w-full z-0 h-40 bg-cover rounded-md bg-center brightness-[12%] hover:scale-110 duration-300 hover:brightness-[35%]"
          :class="
            lightNumber.some((e) => e === index) && 'brightness-[35%] scale-110'
          "
          v-for="(movie, index) in movieList"
          :key="movie"
          :style="{ 'background-image': `url(${movie.imageUrl})` }"
          @click="onClickLogin(index)"
        ></div>
      </div>
    </div>
    <div
      class="absolute top-[calc(50%)] w-96 left-[calc(50%-192px)] z-20 flex items-center flex-col"
    >
      <div class="text-main text-xl">요청하신 페이지를 찾을 수 없습니다.</div>
    </div>
  </main>
</template>

<script>
import { Movie } from "../service/repository";

export default {
  data() {
    return {
      movieList: null,
      lightNumber: [0, 10, 20],

      loginUrl:
        "https://oqwc40fv0b.execute-api.ap-northeast-2.amazonaws.com/dev",
    };
  },

  mounted() {
    this.fetch();
    setInterval(() => {
      this.lightNumber = this.lightNumber.map((e, i) => {
        e = parseInt(Math.random() * 14) + i * 14;
        return e;
      });
    }, 2000);
  },

  methods: {
    async fetch() {
      const movies = await Movie.GetAllMovie();

      this.movieList = movies.data;
    },

    onClickAuth(auth) {
      location.href = `${this.loginUrl}/auth/login/${auth}`;
    },

    onClickLogin(index) {
      if (index === 2) {
        this.$router.push("/login/local");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
</style>
