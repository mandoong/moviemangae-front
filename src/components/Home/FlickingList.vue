<template>
  <div class="w-52 rounded-md bg-[#172036] overflow-hidden">
    <div
      class="w-full h-40 bg-cover bg-center"
      :style="{ 'background-image': `url(${movie.cover_imageUrl})` }"
    ></div>
    <div class="p-4">
      <div class="w-full text-[#637dea] text-xxs h-4">{{ movie.title }}</div>
      <div class="w-full h-12 mt-2 text-[#efefef] font-bold text-xs">
        {{ movie.description.slice(0, 35) }}...
      </div>
      <div class="text-subText text-xs w-full h-4">궁금하다면</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: { type: Array },
  },
  data() {
    return {
      data: [],
    };
  },
};
</script>
