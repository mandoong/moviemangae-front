<template>
  <main class="w-full px-4 h-screen overflow-y-scroll bg-prime scrollbar-hide">
    <div v-for="comment in comments" :key="comment">
      <CommentInfo :comment="comment" />
    </div>
  </main>
</template>

<script>
import CommentInfo from "../components/Comment/CommentInfo.vue";
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
      const comment = await Comment.MyComment();
      this.comments = comment.data;
      console.log(this.comments);
    },
  },
  components: { CommentInfo },
};
</script>
