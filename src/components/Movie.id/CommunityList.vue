<template>
  <div class="w-full text-main py-4">
    <div class="flex justify-between">
      <div class="font-bold">커뮤니티 글</div>
      <ChevronRightIcon class="h-6 w-6 text-gray-500" />
    </div>
    <div
      class="bg-[#172036] px-4 h-20 flex justify-between items-center rounded-md mt-4"
    >
      <div class="w-40 h-12">
        <div class="text-sm">좋아하는 영화 OST 1편</div>
        <div class="text-subText text-xs mt-2">잉어빵 vs 붕어빵</div>
      </div>
      <div
        class="h-10 rounded-md aspect-[16/10] bg-cover bg-center"
        :style="{
          'background-image': `url(https://file.kinolights.com/original/post_detail/202301/28/3fc07c12-3129-458f-9828-bee458d5f21b.jpeg)`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

export default {
  components: { ChevronRightIcon },
};
</script>
