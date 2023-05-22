<template>
  <div class="w-full mt-4">
    <div class="w-full bg-[#172036] text-[#efefef] p-4 rounded-lg">
      <div class="w-full h-10 flex">
        <div class="w-12 h-10">
          <img
            class="w-10 h-10 rounded-full"
            src="https://nujhrcqkiwag1408085.cdn.ntruss.com/static/upload/user_profile_images/user_20089_1682834076.jpg"
          />
        </div>
        <div class="flex-1">
          <div>영화춘</div>
          <div class="text-[#98a4b7] text-xs">본 작품 1066</div>
        </div>
        <div
          class="w-16 h-8 text-sm font-bold flex justify-center items-center rounded-lg bg-[#3b4869]"
        >
          팔로우
        </div>
      </div>
      <div>
        <Slider :rows="movie">
          <template #item="{ data }">
            <div
              class="bg-slate-500 w-28 aspect-[10/16] bg-cover rounded-xl object-cover overflow-hidden scrollbar-hide"
              :style="{ 'background-image': `url(${data.main_imageUrl})` }"
            ></div>
          </template>
        </Slider>
      </div>
    </div>
    <div
      class="w-full flex justify-between text-sm font-bold mt-4 px-4 bg-[#172036] text-[#efefef] py-2 rounded-lg"
    >
      <div>
        다른 <span class="text-[#637dea]">인증회원</span>의 인색작이
        궁금하다면?!
      </div>
      <ArrowPathIcon class="h-6 w-6" />
    </div>
  </div>
</template>

<script>
import Slider from "../Global/slider.vue";
import MovieSlider from "./MovieSlider.vue";
import { Movie } from "../../service/repository";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

export default {
  data() {
    return {
      movie: [],
    };
  },

  mounted() {
    this.getMovie();
  },

  methods: {
    async getMovie() {
      const movie = await Movie.GetTop10();

      this.movie = movie.data;
    },
  },
  components: { Slider, MovieSlider, ArrowPathIcon },
};
</script>
