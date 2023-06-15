<template>
  <div v-if="movie" class="w-full h-screen relative overflow-hidden">
    <div class="w-full h-80 -z-10">
      <div
        class="max-w-[700px] h-full bg-cover bg-center"
        :style="{ 'background-image': `url(${movie.cover_imageUrl})` }"
      ></div>
    </div>
    <Transition appear name="fade">
      <div
        v-if="modalActive"
        class="fixed flex justify-center text-sm items-center text-main w-72 h-10 left-[calc(50%-144px)] top-20 bg-sub rounded-full shadow-2xl z-30"
      >
        <div>{{ modalMassage }}</div>
      </div>
    </Transition>

    <div class="absolute top-0 w-full h-full overflow-y-scroll scrollbar-hide">
      <button
        class="w-12 h-16 flex justify-center items-center"
        @click="$router.back()"
      >
        <ChevronLeftIcon class="h-8 w-8 text-main" />
      </button>
      <div
        class="w-full h-80 p-4 flex items-end justify-between bg-gradient-to-t from-prime via-prime via-20%"
      >
        <div>
          <div class="text-primeText font-bold text-xl">{{ movie.title }}</div>
          <div class="text-subText">{{ movie.genre.join(" · ") }}</div>
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
              <div>{{ movie.scoring ? movie.scoring.toFixed(1) : "-" }}</div>
            </div>
          </div>
        </div>
        <div
          class="w-28 aspect-[10/14] bg-cover bg-center rounded-lg"
          :style="{ 'background-image': `url(${movie.main_imageUrl})` }"
          @click="onTitleImg = true"
        ></div>
      </div>
      <Transition name="title">
        <div
          class="fixed top-0 left-0 w-screen h-screen bg-black/[0.5] flex justify-center items-center z-50"
          v-if="onTitleImg"
          @click="onTitleImg = false"
        >
          <div
            class="w-full max-w-[500px] aspect-[10/14] bg-white bg-cover bg-center"
            :style="{ backgroundImage: `url(${movie.main_imageUrl})` }"
          ></div>
        </div>
      </Transition>

      <ContentWrap class="bg-prime pb-20">
        <LikeButton
          v-if="user"
          :movie="movie"
          :user="user"
          :comment="myComment[0]"
          @scrollView="scrollView"
          @onModal="onModal"
        ></LikeButton>
        <ViewSiteList
          :platform="movie.platform"
          :movie-url="movie.standardWebURL"
        ></ViewSiteList>

        <div class="w-full py-6 border-b border-sub">
          <div class="w-full text-main font-bold mb-4">작품 정보</div>
          <div class="w-full text-subText text-sm">
            {{ movie.description }}
          </div>
          <!-- <CommunityList /> -->
        </div>

        <ActorList :actors="movie.actors" :director="movie.director" />

        <RateWrap></RateWrap>

        <div ref="myComment">
          <MyReview
            :user="user"
            :myReview="myComment[0]"
            :allReview="comments"
            @fetch="fetch"
          />
        </div>
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
  ChevronLeftIcon,
} from "@heroicons/vue/24/outline";
import CreateComment from "../components/Movie.id/CreateComment.vue";
import LikeButton from "../components/Movie.id/LikeButton.vue";
import ViewSiteList from "../components/Movie.id/ViewSiteList.vue";
import CommunityList from "../components/Movie.id/CommunityList.vue";
import ActorList from "../components/Movie.id/ActorList.vue";
import RateWrap from "../components/Movie.id/RateWrap.vue";
import MyReview from "../components/Movie.id/MyReview.vue";
import { QueueListIcon } from "@heroicons/vue/20/solid";
import CommentInfo from "../components/Comment/CommentInfo.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      movie: null,
      user: { type: Object },
      onCreateComment: true,
      comments: [],
      myComment: [],
      isLikedMovie: false,
      modalActive: false,
      modalMassage: "",
      modalTimer: null,
      onTitleImg: false,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const id = this.id;
      const movie = await Movie.GetMovieById(id);
      const user = await User.Profile();

      if (movie.status === 200) {
        this.movie = movie.data;

        this.comments = this.movie.comments.filter(
          (e) => e.user.id !== user.data.id
        );
        this.myComment = this.movie.comments.filter(
          (e) => e.user.id === user.data.id
        );

        this.user = user.data;
      }
    },

    scrollView() {
      if (this.myComment[0]) {
        const target = this.$refs.myComment;
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          this.onModal("이미 작성한 리뷰가 있습니다.");
        }
      } else {
        this.$router.push(`/movie/${this.movie.id}/comment`);
      }
    },

    onModal(text) {
      clearTimeout(this.modalTimer);
      this.modalActive = true;
      this.modalMassage = text;
      this.modalTimer = setTimeout(() => {
        this.modalActive = false;
      }, 2000);
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
    QueueListIcon,
    CommentInfo,
    ChevronLeftIcon,
  },
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease-in;
}

.title-enter-from,
.title-leave-to {
  opacity: 0;
}

.title-enter-active,
.title-leave-active {
  transition: all 0.1s ease-in;
}
</style>
