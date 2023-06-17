<template>
  <div v-if="comment" class="w-full p-4 mt-4 bg-sub2 rounded-lg text-main">
    <div class="w-full flex justify-between">
      <div class="flex">
        <UserCircleIcon class="h-8 w-8 text-gray-500 mr-2" />
        <div class="flex items-center">{{ comment.user.name }}</div>
      </div>
      <div class="text-subText text-sm">
        {{
          date > 30
            ? date > 365
              ? parseInt(date / 365) + "년 전"
              : parseInt(date / 30) + "달 전"
            : date === 0
            ? "오늘"
            : date + "일 전"
        }}
      </div>
    </div>
    <div
      class="w-20 mt-2 flex justify-center items-center gap-2 text-center rounded-md p-1 border border-[#3b4869]"
    >
      <FaceSmileIcon class="h-4 w-4 text-gray-500" />

      <div class="text-xs">좋아요</div>
    </div>
    <div class="text-subText text-sm py-8 px-2 font-bold">
      {{ comment.content }}
    </div>

    <div class="flex justify-start text-sm gap-4 pb-2 text-subText">
      <button class="flex justify-center gap-2">
        <HeartIcon class="h-5 w-5" />
        <div>{{ comment.like }} 개</div>
      </button>
      <button
        class="flex justify-center gap-2"
        @click="$router.push(`/comment/${comment.id}`)"
      >
        <ChatBubbleLeftIcon class="h-5 w-5" />
        <div>{{ comment.children.length }} 개</div>
      </button>
    </div>

    <div class="pt-4 flex justify-around border-t border-subText">
      <button
        class="flex justify-center gap-2 flex-1"
        @click="onClickCommentLike"
      >
        <HeartIcon
          class="h-6 w-6"
          :class="
            this.comment.liked_user.some((e) => e.user.id === this.user.id)
              ? 'text-red-500'
              : 'text-gray-500'
          "
        />
        좋아요
      </button>
      <button
        class="flex justify-center gap-2 flex-1"
        @click="$router.push(`/comment/${comment.id}`)"
      >
        <ChatBubbleLeftIcon class="h-6 w-6 text-gray-500" />
        댓글 달기
      </button>
      <button
        v-if="isMe"
        class="flex justify-center gap-2 flex-1"
        @click="onClickDeleteComment"
      >
        <XMarkIcon class="h-6 w-6 text-gray-500" />

        지우기
      </button>
    </div>
  </div>
</template>

<script>
import {
  FaceSmileIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/vue/20/solid";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/solid";
import { Comment } from "../../service/repository";
import { User } from "../../service/repository";

export default {
  props: {
    comment: { type: Array },
    isMe: { type: Boolean },
    user: { type: Object },
  },

  data() {
    return {
      date: null,
    };
  },

  mounted() {
    this.geaCreateDate();
  },

  methods: {
    geaCreateDate() {
      const now = new Date();
      const date = new Date(this.comment.created_at);
      const timeDiff = now.getTime() - date.getTime();
      this.date = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    },

    async onClickDeleteComment() {
      const result = await Comment.DeleteComment(this.comment.id);
      this.$emit("fetch");
    },

    async onClickCommentLike() {
      if (this.comment.liked_user.some((e) => e.user.id === this.user.id)) {
        await Comment.CancelLikeComment(this.comment.id);
      } else {
        await Comment.LikeComment(this.comment.id);
      }
      this.$emit("fetch");
    },
  },

  components: {
    UserCircleIcon,
    HeartIcon,
    FaceSmileIcon,
    ChatBubbleLeftIcon,
    XMarkIcon,
  },
};
</script>
