<template>
  <main
    class="w-full px-4 h-screen pb-40 overflow-y-scroll bg-prime scrollbar-hide"
  >
    <div class="text py-4 h-14 text-center bg-prime text-main sticky top-0">
      리뷰 모아보기
    </div>

    <div class="mb-2 border-b border-subText pb-8">
      <div class="text-main text-lg">지금 핫한 리뷰 🔥</div>
      <Slider :rows="bestComments">
        <template #item="{ data, onClick }">
          <RecommendComments :comments="data" @onClick="onClick" />
        </template>
      </Slider>
    </div>

    <div
      class="text-main text-lg py-4 bg-gradient-to-t from-transparent to-prime via-prime via-10% sticky top-10"
    >
      최신 리뷰 한눈에 보기
    </div>
    <div class="w-full">
      <div class="flex" v-for="comment in comments" :key="comment">
        <CommentInfo :comment="comment" />
      </div>
    </div>
    <div v-if="!comments" class="w-full">
      <div class="flex" v-for="item in Array(5)" :key="item">
        <div class="w-full h-40 rounded-md bg-skeleton mb-4"></div>
      </div>
    </div>
  </main>
</template>

<script>
import CommentInfo from "../components/Comment/CommentInfo.vue";
import Slider from "../components/Global/Slider.vue";
import HomeTitle from "../components/Home/HomeTitle.vue";
import RecommendComments from "../components/Home/RecommendComments.vue";
import { Comment } from "../service/repository";

export default {
  data() {
    return {
      comments: null,
      bestComments: null,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const comment = await Comment.GetAllComment();
      const bestComments = await Comment.GetBestComment();
      if (comment.status === 200 && bestComments.status === 200) {
        this.comments = comment.data;
        this.bestComments = bestComments.data;
      }
    },
  },
  components: { CommentInfo, Slider, RecommendComments, HomeTitle },
};
</script>
