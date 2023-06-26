<template>
  <div v-if="movie" class="w-full h-screen">
    <div
      class="relative w-full flex flex-col pb-28 justify-between text-main h-full bg-sub2 z-10"
    >
      <div
        class="absolute w-full h-56 bg-top bg-cover -z-10 brightness-50"
        :style="{ backgroundImage: `url(${movie.cover_imageUrl})` }"
      ></div>
      <div
        class="w-full h-56 text-main bg-gradient-to-t to-transparent from-sub2 flex flex-col items-center justify-between px-4"
      >
        <div class="flex w-full py-4">
          <button class="w-10"></button>
          <div class="flex-1 text-center text-lg font-bold">
            회원님의 소감을 작성해주세요!
          </div>
          <div class="w-10"></div>
        </div>

        <div class="flex w-full justify-start gap-4">
          <div
            class="w-20 aspect-[10/14] bg-cover bg-center rounded-lg"
            :style="{ backgroundImage: `url(${movie.imageUrl})` }"
          ></div>
          <div>
            <div>{{ movie.title }}</div>
            <div class="text-sm text-subText">
              {{ movie.genre.join(" · ") }}
            </div>
            <div class="text-sm text-subText">{{ movie.dateCreated }}</div>
          </div>
        </div>
      </div>

      <div class="w-full flex-1 px-4 bg-sub2">
        <div class="mt-8 flex justify-between">
          <div>리뷰 작성하기</div>
          <div class="text-subText">( {{ textLength }} / 100 )</div>
        </div>
        <textarea
          type="text"
          @input="inputText"
          v-model="textContent"
          class="w-full h-64 p-2 mt-4 bg-sub rounded-xl align-top resize-none"
          placeholder="감상평이나 간단한 리뷰를 작성해주세요!"
        />
        <transition appear name="fade">
          <div v-if="textValidate" class="text-subText mt-4">
            * 5자 이상 입력해주세요!
          </div>
        </transition>
      </div>

      <div class="w-full flex gap-4 px-4 mt-20">
        <button
          class="flex-1 flex justify-center items-center bg-sub rounded-lg h-12 font-bold"
          @click="$router.back()"
        >
          취소
        </button>
        <button
          class="flex-1 flex justify-center items-center bg-blue-500 rounded-lg h-12 font-bold"
          @click="createComment"
        >
          리뷰 올리기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Comment, Movie, User } from "../service/repository";

export default {
  props: {
    parent: { type: Number },
  },
  data() {
    return {
      movie: null,
      textContent: "",
      textLength: 0,
      textValidate: false,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.$route.params.id;

      const movie = await Movie.GetMovieById(id);
      const user = await User.Profile();

      if (user.status !== 200) {
        window.localStorage.setItem("redirect", window.location.href);
        return this.$router.push("/login");
      }
      this.movie = movie.data;
      if (user.data.comments.some((e) => e.movie_id === Number(id))) {
        this.$router.push(`/movie/${id}`);
      }
    },

    async createComment() {
      const post = {
        movie_id: Number(this.$route.params.id),
        depth: 0,
        parent_id: 0,
        content: this.textContent,
      };

      if (this.textContent.length < 5) {
        this.textValidate = true;
        return;
      }

      const result = await Comment.CreateComment(post);
      this.$router.push(`/movie/${this.$route.params.id}`);
    },

    inputText(e) {
      this.textValidate = false;
      const text = e.target.value;

      this.textLength = text.length;
      if (this.textContent.length > 99) {
        this.textContent = this.textContent.substring(0, 99);
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s;
}
</style>
