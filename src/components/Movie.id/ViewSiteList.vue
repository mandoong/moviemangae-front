<template>
  <div class="w-full py-2">
    <div class="w-full flex justify-between">
      <div class="text-main font-bold">지금 여기서 감상</div>
      <div class="text-[#637dea] text-sm">오류 제보</div>
    </div>
    <div
      class="w-full h-16 px-2 mt-4 flex justify-between items-center bg-sub2 rounded-md"
    >
      <div class="w-full flex gap-2">
        <img class="w-6 h-6" :src="icon[platform]" />
        <div class="text-main font-bold">{{ platform }}</div>
      </div>
      <div class="w-28 flex items-center gap-2" @click="onClickUrl">
        <div class="text-[#637dea] text-sm">보러가기</div>
        <ChevronRightIcon class="h-4 w-4 text-subText" />
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

export default {
  props: {
    platform: { type: String },
    movieUrl: { type: String },
  },
  data() {
    return {
      icon: {
        "Disney Plus":
          "https://static.kinolights.com/icon/btn_squircle_disneyplus.png",
        Watcha: "https://static.kinolights.com/icon/btn_squircle_watcha.png",
        Netflix: "https://static.kinolights.com/icon/btn_squircle_netflix.png",
      },
    };
  },

  methods: {
    onClickUrl() {
      location.href = this.movieUrl;
    },
  },
  components: { ChevronRightIcon },
};
</script>
