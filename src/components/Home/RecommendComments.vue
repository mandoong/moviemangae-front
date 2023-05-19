<template>
  <div class="my-4">
    <div class="text-lg font-extrabold my-4">지금 최신 댓글</div>
    <swiper
      :slidesPerView="3"
      :spaceBetween="20"
      :navigation="true"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="w-full h-40"
    >
      <swiper-slide
        v-for="comment in comments"
        :key="comment"
        class="bg-slate-100 rounded-lg shadow-inner p-4 text-sm"
      >
        <div class="text-xs">영화 제목</div>
        <div class="h-20 py-4 font-bold box">
          코멘트 내용(너무 재미 있었어요^^) 안녕하세요
        </div>
        <div></div>
        <div class="text-xs flex justify-between items-center">
          <div>
            <div>23-02-03</div>
            <div>oo 님</div>
          </div>
          <EllipsisVerticalIcon class="w-6 h-6"></EllipsisVerticalIcon>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
// import "swiper/css/navigation";
import { Navigation } from "swiper";
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";

export default {
  setup() {
    return {
      modules: [Navigation],
    };
  },
  data() {
    return {
      comments: [{}, {}, {}, {}, {}, {}, {}],
    };
  },

  components: { Swiper, SwiperSlide, Navigation, EllipsisVerticalIcon },
};
</script>

<style>
.box {
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
