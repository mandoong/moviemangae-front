<template>
  <div class="text-main py-4">
    <div class="font-bold">리뷰</div>
    <div>내가 쓴 리뷰</div>
    <div class="flex flex-col justify-center items-center text-sm gap-4 py-10">
      <div class="flex flex-col justify-center items-center">
        <div>✍️</div>
        <div>짧게라도 좋으니</div>
        <div>작품에 대해 감상을 기록해보세요.</div>
      </div>
      <div class="p-2 bg-[#4263eb] rounded-md">리뷰 작성하기</div>
    </div>
    <div class="text-sm w-full h-8 flex justify-between">
      <div>모든 리뷰</div>
      <div class="w-32 flex justify-end gap-1">
        <div>좋아요 순</div>
        <QueueListIcon class="h-5 w-5 pt-1" />
      </div>
    </div>
  </div>
</template>

<script>
import { QueueListIcon } from "@heroicons/vue/20/solid";

export default { components: { QueueListIcon } };
</script>
