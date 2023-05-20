<template>
  <div v-if="movies" class="w-full text-[#efefef]">
    <div class="flex w-full justify-between">
      <div class="text-xl font-bold my-2">오늘의 넷플릭스 랭킹</div>
      <div>o</div>
    </div>
    <div class="w-full h-20 relative">
      <div
        class="absolute p-2 text-sm px-2 text-[#efefef] flex items-end justify-between w-full h-full bg-gradient-to-r to-black from-black via-transparent"
      >
        <div class="flex gap-2">
          <div>aa</div>
          <div>박하경 여행기</div>
        </div>
        <div>aa</div>
      </div>
      <div
        class="flex h-20 items-end justify-between bg-cover bg-center"
        :style="{ 'background-image': `url(${movies[0].cover_imageUrl})` }"
      ></div>
    </div>
    <div>
      <div
        class="w-full h-12 my-2 px-2 text-sm rounded-lg font-bold flex items-center bg-[#25304B] text-[#efefef]"
        v-for="(movie, index) in movies"
        :key="movie"
      >
        <div class="w-10 h-10 flex items-center">
          <div
            class="w-6 aspect-[10/16] bg-cover bg-center rounded-sm"
            :style="{ 'background-image': `url(${movie.main_imageUrl})` }"
          ></div>
        </div>
        <div class="ml-2 w-8">{{ index + 1 }}</div>
        <div class="flex-1">{{ movie.title }}</div>
        <div class="w-10">-</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: { type: Array },
  },
  data() {
    return {};
  },
};
</script>
