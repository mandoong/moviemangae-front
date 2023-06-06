<template>
  <main
    class="w-full px-4 h-screen pb-40 overflow-y-scroll bg-prime scrollbar-hide"
  >
    <div class="text py-4 h-14 text-center bg-prime text-main sticky top-0">
      리뷰 모아보기
    </div>

    <div class="mb-2 border-b border-subText pb-8">
      <div class="text-main text-lg">지금 핫한 리뷰 🔥</div>
      <Slider :rows="comments">
        <template #item="{ data }">
          <RecommendComments :comments="data" />
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
      comments: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const comment = await Comment.GetAllComment();
      this.comments = comment.data;
    },
  },
  components: { CommentInfo, Slider, RecommendComments, HomeTitle },
};
</script>
