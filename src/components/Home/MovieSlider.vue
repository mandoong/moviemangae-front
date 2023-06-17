<template>
  <div class="bg-[#172036] text-[#98A4B7] w-36 rounded-lg">
    <div @mouseup="onClick">
      <div
        class="bg-slate-500 w-full aspect-[10/14] bg-cover rounded-xl overflow-hidden"
        :style="{ 'background-image': `url(${movie.imageUrl})` }"
      ></div>
      <div class="flex w-full justify-center flex-col items-center p-2">
        <div class="w-full text-[#efefef] text-center truncate">
          {{ movie.title }}
        </div>
        <div class="w-full h-6 flex justify-between mt-2">
          <div class="flex items-center">
            <img
              src="https://static.kinolights.com/icon/light-green.svg"
              class="w-4"
            />
            <div class="mt-1 font-bold text-[#0ca678]">
              57.8%
              <!-- {{
              movie.like_count / (movie.like_count + movie.unlike_count) || 0
            }} -->
            </div>
          </div>
          <EllipsisVerticalIcon
            @click="this.$router.push(`/movie/${movie.id}`)"
            class="w-6 h-6"
          ></EllipsisVerticalIcon>
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
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline";

export default {
  props: {
    movie: { type: Array },
    click: { type: Boolean },
  },

  methods: {
    onClick() {
      this.$emit("onClick", `/movie/${this.movie.id}`);
    },
  },

  components: {
    HandThumbUpIcon,
    ChatBubbleLeftEllipsisIcon,
    EllipsisVerticalIcon,
  },
};
</script>
