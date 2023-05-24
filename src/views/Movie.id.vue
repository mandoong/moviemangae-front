<template>
  <div v-if="movie" class="w-full h-screen relative overflow-hidden">
    <div class="fixed w-full h-80 -z-10">
      <div
        class="max-w-[700px] h-full bg-cover bg-center"
        :style="{ 'background-image': `url(${movie.cover_imageUrl})` }"
      ></div>
    </div>
    <div class="w-full h-full overflow-y-scroll scrollbar-hide">
      <div
        class="w-full h-96 p-4 flex items-end justify-between bg-gradient-to-t from-prime via-prime via-20%"
      >
        <div>
          <div class="text-primeText font-bold text-xl">{{ movie.title }}</div>
          <div class="text-subText">{{ movie.dateCreated }}</div>
          <div class="flex gap-2 mt-2">
            <img
              class="w-6 h-8"
              src="https://static.kinolights.com/icon/light-green.svg"
            />
            <div class="text-xl pt-1 font-bold text-[#0ca678]">82.2%</div>
            <div></div>
          </div>
          <div class="flex gap-4 mt-1 text-primeText">
            <div class="flex gap-1">
              <img
                class="w-6 h-6"
                src="https://m.kinolights.com/_nuxt/img/ic_rotten.aa4de87.png"
              />
              <div>74.4%</div>
            </div>
            <div class="flex gap-2">
              <img class="w-6 h-6" src="../assets/imdbLogo.png" />
              <div>{{ movie.scoring || "-" }}</div>
            </div>
          </div>
        </div>
        <div
          class="w-28 aspect-[10/14] bg-cover bg-center rounded-lg"
          :style="{ 'background-image': `url(${movie.main_imageUrl})` }"
        ></div>
      </div>

      <ContentWrap class="bg-prime pb-20">
        <LikeButton></LikeButton>
        <ViewSiteList
          :platform="movie.platform"
          :movie-url="movie.standardWebURL"
        ></ViewSiteList>

        <div class="w-full my-6">
          <div class="w-full text-main font-bold my-4">작품 정보</div>
          <div class="w-full text-subText text-sm">
            {{ movie.description }}
          </div>
        </div>

        <CommunityList />

        <ActorList :actors="movie.actors" :director="movie.director" />

        <RateWrap></RateWrap>

        <MyReview />
      </ContentWrap>
    </div>
  </div>
</template>

<script>
import ContentWrap from "../components/Global/ContentWrap.vue";
import { Movie, User, Comment } from "../service/repository";
import ImdbLogo from "../assets/imdbLogo.png";
import {
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/outline";
import CreateComment from "../components/Movie.id/CreateComment.vue";
import LikeButton from "../components/Movie.id/likeButton.vue";
import ViewSiteList from "../components/Movie.id/ViewSiteList.vue";
import CommunityList from "../components/Movie.id/communityList.vue";
import ActorList from "../components/Movie.id/ActorList.vue";
import RateWrap from "../components/Movie.id/RateWrap.vue";
import MyReview from "../components/Movie.id/MyReview.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      movie: null,

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
        const parser = new DOMParser();

        const scoring = JSON.parse(this.movie.scoring);
        this.movie.scoring = scoring.imdbScore;
        this.movie.genre = JSON.parse(this.movie.genre);
        this.movie.director = JSON.parse(this.movie.director);
        this.movie.actors = this.movie.actors.reverse();
        this.movie.actors = this.movie.actors.map((v) => {
          v.character = v.character.replace(/&#x27;/g, "'");
          v.name = v.name.replace(/&#x27;/g, "'");

          return v;
        });

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
    LikeButton,
    ViewSiteList,
    CommunityList,
    ActorList,
    RateWrap,
    MyReview,
  },
};
</script>
