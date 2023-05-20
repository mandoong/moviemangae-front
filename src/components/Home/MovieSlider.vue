<template>
  <div class="bg-gray-200 w-36 rounded-lg">
    <div
      class="bg-slate-500 w-full aspect-[10/16] w- bg-cover rounded-xl object-cover overflow-hidden scrollbar-hide"
      :style="{ 'background-image': `url(${movie.main_imageUrl})` }"
    ></div>
    <div class="flex w-full justify-center flex-col items-center p-2">
      <div class="w-full text-center truncate">{{ movie.title }}</div>
      <div class="w-full h-6 flex justify-between px-4 mt-2">
        <div class="flex items-center gap-1">
          <HandThumbUpIcon class="w-4" />
          <div>
            {{
              movie.like_count / (movie.like_count + movie.unlike_count) || 0
            }}
          </div>
        </div>
        <div class="flex items-center gap-1">
          <ChatBubbleLeftEllipsisIcon class="w-4" />
          <div class="text-lg">5</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  user-select: none;
}
</style>

<script>
import {
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/outline";

export default {
  props: { movie: { type: Array } },

  components: {
    HandThumbUpIcon,
    ChatBubbleLeftEllipsisIcon,
  },
};
</script>
