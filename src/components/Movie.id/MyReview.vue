<template>
  <div class="text-main py-4">
    <div class="font-bold">리뷰</div>
    <div>
      <div class="text-sm mt-2">내가 쓴 리뷰</div>
      <div
        class="flex flex-col justify-center items-center text-sm gap-4 py-10"
      >
        <div class="flex flex-col justify-center items-center">
          <div>✍️</div>
          <div>짧게라도 좋으니</div>
          <div>작품에 대해 감상을 기록해보세요.</div>
        </div>
        <button
          class="p-2 bg-[#4263eb] rounded-md"
          @click="$router.push(`/movie/${$route.params.id}/comment`)"
        >
          리뷰 작성하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { QueueListIcon } from "@heroicons/vue/20/solid";

export default {
  props: {
    myReview: { type: Array },
    allReview: { type: Array },
  },
  data() {
    return {};
  },
  components: { QueueListIcon },
};
</script>
