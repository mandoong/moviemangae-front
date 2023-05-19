<template>
  <div v-if="movies" class="my-10">
    <div class="text-lg font-extrabold my-2">{{ title }}</div>
    <swiper
      :slidesPerView="4"
      :spaceBetween="10"
      :freeMode="true"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="w-full h-68 rounded-xl"
    >
      <swiper-slide
        v-for="i in movies"
        :key="i"
        class="bg-slate-300 rounded-xl"
      >
        <div
          class="bg-slate-500 w-full h-48 rounded-xl object-cover overflow-hidden"
        >
          <img :src="i.main_imageUrl" />
        </div>
        <div class="flex justify-center flex-col items-center p-2">
          <div class="w-full text-center truncate">{{ i.title }}</div>
          <div class="w-full h-6 flex justify-between px-4 mt-2">
            <div class="flex items-center gap-1">
              <HandThumbUpIcon class="w-4" />
              <div>
                {{ i.like_count / (i.like_count + i.unlike_count) || 0 }}
              </div>
            </div>
            <div class="flex items-center gap-1">
              <ChatBubbleLeftEllipsisIcon class="w-4" />
              <div class="text-lg">5</div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import {
  HandThumbUpIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/outline";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper";

export default {
  props: { title: null, movies: null },
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperSlide,
    HandThumbUpIcon,
    ChatBubbleLeftEllipsisIcon,
  },
  setup() {
    return {
      modules: [FreeMode],
    };
  },
};
</script>
