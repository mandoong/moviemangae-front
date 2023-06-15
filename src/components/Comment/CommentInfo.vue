<template>
  <div class="w-full flex gap-2 my-2">
    <button
      class="w-28 aspect-[10/14] bg-center bg-cover bg-sub2 rounded-lg"
      :style="{ backgroundImage: `url(${comment.comment_movie.imageUrl})` }"
      @click="$router.push(`/movie/${comment.comment_movie.id}`)"
    ></button>
    <div
      v-if="comment"
      class="w-full flex flex-col justify-between flex-1 p-2 bg-sub2 rounded-lg text-main"
      @click="onClickGotoComment"
    >
      <div class="w-full flex justify-between text-subText">
        <div class="flex">
          <UserCircleIcon class="h-8 w-8 text-gray-500 mr-2" />
          <div class="flex items-center text-sm">{{ comment.user.name }}</div>
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

      <div class="text-main h-20 text-sm py-8 px-2">
        {{ comment.content }}
      </div>

      <div class="flex justify-start text-sm gap-4 text-subText">
        <div class="flex justify-center gap-2">
          <HeartIcon class="h-5 w-5" />
          <div>{{ comment.like }} 개</div>
        </div>
        <div class="flex justify-center gap-2">
          <ChatBubbleLeftIcon class="h-5 w-5" />
          <div>{{ comment.children.length }} 개</div>
        </div>
      </div>
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

export default {
  props: {
    comment: { type: Array },
    isMe: { type: Boolean },
  },

  data() {
    return {
      date: null,
      movie: null,
    };
  },

  mounted() {
    this.geaCreateDate();
  },

  methods: {
    async fetch() {},
    geaCreateDate() {
      const now = new Date();
      const date = new Date(this.comment.created_at);
      const timeDiff = now.getTime() - date.getTime();
      this.date = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    },

    onClickGotoComment() {
      if (this.comment.depth === 0) {
        this.$router.push(`/comment/${this.comment.id}`);
      } else {
        this.$router.push(`/comment/${this.comment.parent.id}`);
      }
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
