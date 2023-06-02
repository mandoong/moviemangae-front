<template>
  <div
    v-if="comment"
    class="w-full px-4 py-2 mt-4 bg-sub2 rounded-md text-main"
  >
    <div class="w-full flex justify-between">
      <div class="flex">
        <UserCircleIcon class="h-8 w-8 text-gray-500 mr-2" />
        <div class="flex items-center">{{ comment.user.name }}</div>
      </div>
      <div class="text-subText text-sm">0 일전</div>
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
      <div class="flex justify-center gap-2">
        <HeartIcon class="h-5 w-5" />
        <div>{{ comment.like_count || 0 }} 개</div>
      </div>
      <div class="flex justify-center gap-2">
        <ChatBubbleLeftIcon class="h-5 w-5" />
        <div>0 개</div>
      </div>
    </div>

    <div class="pt-2 flex justify-around border-t border-subText">
      <div class="flex justify-center gap-2 flex-1">
        <HeartIcon class="h-6 w-6 text-gray-500" />
        좋아요
      </div>
      <div class="flex justify-center gap-2 flex-1">
        <ChatBubbleLeftIcon class="h-6 w-6 text-gray-500" />
        댓글 달기
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
import { ChatBubbleLeftIcon } from "@heroicons/vue/24/solid";

export default {
  props: {
    comment: { type: Array },
  },
  components: { UserCircleIcon, HeartIcon, FaceSmileIcon, ChatBubbleLeftIcon },
};
</script>
