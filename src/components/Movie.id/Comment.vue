<template>
  <div v-if="movie" class="w-full bg-pink-100 rounded-xl p-2">
    <div class="w-full flex gap-4">
      <div class="w-12 h-16 bg-slate-600 rounded-md overflow-hidden">
        <img :src="movie.imageUrl" />
      </div>

      <div class="flex-1 h-20 text-xxs">
        <div class="w-full h-6 flex justify-between">
          <div class="text-lg">{{ movie.title }}</div>
          <div>상대시간</div>
        </div>
        <div class="mt-2 flex">
          <div>00 님의 평가</div>
          <div>좋아요? 싫어요?</div>
        </div>
      </div>
    </div>

    <div class="text-sm">내용</div>

    <div class="w-full flex border-t text-sm border-gray-300 pt-2">
      <div class="flex-1 text-center">좋아요</div>
      <div class="flex-1 text-center">답글 달기</div>
    </div>
  </div>
</template>

<script>
export default {
  props: { comment: null, movie: null, user: null },
};
</script>
