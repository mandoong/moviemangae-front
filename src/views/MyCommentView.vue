<template>
  <main
    class="w-full px-4 h-screen pb-40 overflow-y-scroll bg-prime scrollbar-hide"
  >
    <div class="flex items-center w-full h-14">
      <button class="w-12" @click="$router.back()">
        <ChevronLeftIcon class="h-8 w-8 text-gray-500" />
      </button>
      <div
        class="flex-1 text py-4 h-14 text-center bg-prime text-main sticky top-0"
      >
        내가 작성한 리뷰
      </div>
      <div class="w-12"></div>
    </div>
    <div class="w-full">
      <div class="flex" v-for="comment in user" :key="comment">
        <CommentInfo :comment="comment" />
      </div>
    </div>
  </main>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import CommentInfo from "../components/Comment/CommentInfo.vue";
import { Comment, User } from "../service/repository";

export default {
  data() {
    return { user: null };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const user = await Comment.MyComment();
      this.user = user.data;
    },
  },
  components: { CommentInfo, ChevronLeftIcon },
};
</script>
