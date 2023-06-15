<template>
  <div class="w-full p-2 text-subText">
    <div class="w-full h-12 flex gap-2">
      <button
        class="flex-1 h-full flex justify-center gap-2 items-center bg-sub rounded-md"
        :class="likeStatus === 'dislikeMovie' ? 'text-red-500' : ''"
        @click="onClickLikeMovie('dislikeMovie')"
      >
        <FaceFrownIcon v-if="likeStatus !== 'dislike'" class="h-6 w-6" />
        <SolidFaceFrownIcon v-if="likeStatus === 'dislike'" class="h-6 w-6" />
        <div>별로에요</div>
      </button>
      <button
        class="flex-1 h-full flex justify-center gap-2 items-center bg-sub rounded-md"
        :class="likeStatus === 'likeMovie' ? 'text-green-500' : ''"
        @click="onClickLikeMovie('likeMovie')"
      >
        <FaceSmileIcon v-if="likeStatus !== 'like'" class="h-6 w-6" />
        <SolidFaceSmileIcon v-if="likeStatus === 'like'" class="h-6 w-6" />
        <div>좋아요</div>
      </button>
    </div>
    <div class="w-full h-16 flex mt-4 pb-4 border-b border-[#25304a]">
      <div class="w-10"></div>
      <div class="flex-1 flex justify-between px-10 text-xs">
        <button
          class="flex flex-1 flex-col justify-center items-center gap-2"
          :class="bestStatus ? 'text-blue-600' : ''"
          @click="onClickAddBestMovie"
        >
          <BookmarkIcon class="h-6 w-6" />
          <div>나의 베스트 등록</div>
        </button>
        <button
          class="flex flex-1 flex-col justify-center items-center gap-2"
          :class="viewStatus ? 'text-blue-600' : ''"
          @click="onClickAddViewMovie"
        >
          <CheckIcon class="h-6 w-6" />
          <div>봤어요</div>
        </button>
        <button
          class="flex flex-1 flex-col justify-center items-center gap-2"
          :class="comment ? 'text-blue-600' : ''"
          @click="$emit('scrollView')"
        >
          <PencilIcon class="h-6 w-6" />
          <div>리뷰쓰기</div>
        </button>
      </div>
      <EllipsisVerticalIcon class="h-6 w-10 text-gray-500" />
    </div>
  </div>
</template>

<script>
import {
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
} from "@heroicons/vue/24/outline";
import {
  FaceFrownIcon as SolidFaceFrownIcon,
  FaceSmileIcon as SolidFaceSmileIcon,
} from "@heroicons/vue/24/solid";
import { BookmarkIcon, CheckIcon, PencilIcon } from "@heroicons/vue/24/solid";
import { Movie } from "../../service/repository";

export default {
  props: {
    movie: { type: Object },
    user: { type: Object },
    comment: null,
  },

  data() {
    return {
      likeStatus: null,
      bestStatus: false,
      viewStatus: false,
    };
  },

  mounted() {
    this.isStatus();
  },

  methods: {
    async onClickLikeMovie(type = "likeMovie") {
      const { id } = this.movie;

      if (!this.likeStatus) {
        await Movie.addMyMovieList(id, type);
        this.likeStatus = type;
        this.$emit("onModal", "영화에 의견을 반영하였습니다. ");
      } else if (this.likeStatus === type) {
        await Movie.removeMyMovieList(id, type);
        this.likeStatus = null;
      } else {
        const isLike = type === "likeMovie" ? "dislikeMovie" : "likeMovie";
        console.log(isLike);
        await Movie.removeMyMovieList(id, isLike);
        await Movie.addMyMovieList(id, type);
        this.likeStatus = type;
        this.$emit("onModal", "영화에 의견을 반영하였습니다. ");
      }
    },

    async onClickAddBestMovie() {
      const { id } = this.movie;

      if (!this.bestStatus) {
        await Movie.addMyMovieList(id, "bestMovie");
        this.bestStatus = true;
        this.$emit("onModal", "베스트 영화에 등록하였습니다. ");
      } else {
        await Movie.removeMyMovieList(id, "bestMovie");
        this.bestStatus = false;
      }
    },

    async onClickAddViewMovie() {
      const { id } = this.movie;

      if (!this.viewStatus) {
        await Movie.addMyMovieList(id, "viewMovie");
        this.viewStatus = true;
        this.$emit("onModal", " 내가 본 영화에 등록하였습니다. ");
      } else {
        await Movie.removeMyMovieList(id, "viewMovie");
        this.viewStatus = false;
      }
    },

    isStatus() {
      if (
        this.user.liked_movie.some(
          (e) => e.movie.id === Number(this.$route.params.id)
        )
      ) {
        this.likeStatus = "likeMovie";
      } else if (
        this.user.disliked_movie.some(
          (e) => e.movie.id === Number(this.$route.params.id)
        )
      ) {
        this.likeStatus = "dislikeMovie";
      } else {
        this.likeStatus = null;
      }

      if (
        this.user.best_movies.some(
          (e) => e.movie.id === Number(this.$route.params.id)
        )
      ) {
        this.bestStatus = true;
      }

      if (
        this.user.view_movies.some(
          (e) => e.movie.id === Number(this.$route.params.id)
        )
      ) {
        this.viewStatus = true;
      }
    },
  },
  components: {
    BookmarkIcon,
    BookmarkIcon,
    CheckIcon,
    PencilIcon,
    FaceFrownIcon,
    FaceSmileIcon,
    EllipsisVerticalIcon,
    SolidFaceFrownIcon,
    SolidFaceSmileIcon,
  },
};
</script>
