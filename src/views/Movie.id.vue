<template>
  <div v-if="movie" class="w-full">
    <div class="fixed w-w_main top-0 h-full bg-pink-50 -z-10">
      <div class="relative w-full h-96">
        <img
          class="w-full h-full object-cover object-t"
          :src="movie.cover_imageUrl"
        />
      </div>
    </div>

    <ContentWrap
      class="bg-gradient-to-b from-transparent to-pink-50 via-pink-50 via-10%"
    >
      <div class="mt-60 pt-10">
        <div class="w-full flex">
          <div class="w-64 text-gray-950">
            <div class="text-xs">{{ movie.platform }}</div>
            <div class="text-xl font-extrabold">{{ movie.title }}</div>
            <div class="text-xs">{{ movie.dateCreated }}</div>
          </div>
          <div class="text-sm pt-4">
            <div class="flex items-center gap-4">
              <div class="w-6 text-center">
                <HandThumbUpIcon class="w-4" />
              </div>
              <div class="text-green-600">56%</div>
            </div>
            <div class="flex items-center gap-4">
              <img class="w-6 h-6" :src="img" />
              <div>
                {{ movie.scoring.imdbScore.toFixed(1) }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex w-full mt-4">
          <div class="w-48 p-2">
            <div class="w-full rounded-xl overflow-hidden">
              <img class="w-full object-cover" :src="movie.imageUrl" />
            </div>

            <div class="text-xxs mt-2">
              <div class="flex mb-2">
                <div class="w-14">장르</div>
                <div class="grid grid-cols-3 gap-1">
                  <div
                    class="text-xxs"
                    v-for="(genre, i) in movie.genre"
                    :key="genre"
                  >
                    {{ genre }}{{ i + 1 === movie.genre.length ? "" : ", " }}
                  </div>
                </div>
              </div>
              <div class="flex mb-2">
                <div class="w-14">재생 시간</div>
                <div>{{ movie.duration }}</div>
              </div>
              <div class="flex mb-2">
                <div class="w-14">감독</div>
                <div></div>
              </div>
            </div>
          </div>

          <div class="flex-1 p-2 text-xs text-black">
            <div class="w-full h-8 flex gap-4">
              <button
                class="flex-1 border-2 border-pink-300 rounded-lg bg-yellow-50"
              >
                별로에요
              </button>
              <button
                class="flex-1 border-2 border-pink-300 rounded-lg bg-pink-200"
              >
                좋아요
              </button>
            </div>

            <div class="w-full h-52 mt-4">
              <div class="font-extrabold">작품 정보</div>
              <div class="h-32 mt-2">{{ movie.description }}</div>
            </div>
            <div>
              <div>출연진</div>
              <div class="w-full grid grid-cols-4 gap-4 mt-2">
                <div v-for="actor in movie.actors" :key="actor">
                  <div class="text-xxs text-blue-800">
                    {{ actor.character }}
                  </div>
                  <div class="text-xxs">{{ actor.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="w-full my-4">내가 쓴 댓글</div>
          <Comment :comment="{}" :movie="movie" :user="user"></Comment>
        </div>

        <CreateComment :onCreateComment="onCreateComment"></CreateComment>
        <div>
          <div class="w-full my-4">모든 댓글</div>
          <Comment :comment="{}" :movie="movie"></Comment>
        </div>
      </div>
    </ContentWrap>
  </div>
</template>

<script>
import ContentWrap from "../components/Global/ContentWrap.vue";
import { Movie, User, Comment } from "../service/repository";
import ImdbLogo from "../assets/imdb-logo.png";
import {
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/outline";
import CreateComment from "../components/Movie.id/CreateComment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      movie: null,
      img: ImdbLogo,
      onCreateComment: true,
      comments: [],
    };
  },

  mounted() {
    this.setup();
  },

  methods: {
    async setup() {
      const id = this.id;
      const movie = await Movie.GetMovieById(id);
      const user = await User.Profile();
      const movieComment = await Comment.MovieComment(movie.data.id);

      if (movie.status === 200) {
        this.movie = movie.data;

        this.movie.scoring = JSON.parse(this.movie.scoring);
        this.movie.genre = JSON.parse(this.movie.genre);
        this.movie.actors = this.movie.actors.reverse();
        this.comment = movieComment.data;
        console.log(movie.data);
      }
    },
  },

  components: {
    ContentWrap,
    ImdbLogo,
    HandThumbUpIcon,
    Comment,
    CreateComment,
  },
};
</script>
