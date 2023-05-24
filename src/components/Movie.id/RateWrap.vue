<template>
  <div class="w-full py-6 text-main border-b border-sub">
    <div class="font-bold">영화만개 지수</div>
    <div
      class="w-full my-2 flex justify-end rounded-lg h-8 bg-[#f03e3e] overflow-hidden"
    >
      <div class="bg-[#0ca678] h-full z-10" :style="{ width: `58%` }"></div>
    </div>
    <div class="flex justify-between text-sm">
      <div class="flex gap-2">
        <div>별로에요</div>
        <div>32%</div>
      </div>
      <div class="flex gap-2">
        <div>좋아요</div>
        <div>68%</div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeTitle from "../Home/HomeTitle.vue";

export default {
  components: { HomeTitle },
};
</script>
