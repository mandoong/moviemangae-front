<template>
  <div class="w-52 h-28 text-xs text-[#efefef] bg-[#25304B] rounded-lg p-2">
    <div class="text-xxs text-[#98A4B7]">영화 제목</div>
    <div class="h-12 py-4 font-bold box">
      코멘트 내용(너무 재미 있었어요^^) 안녕하세요aaaaaaaaaaaaaaaaaaaaaaaaaaa
    </div>
    <div></div>
    <div class="text-xs text-[#98A4B7] mt-2 flex justify-between items-center">
      <div class="flex gap-2">
        <div>O</div>
        <div>oo 님의 평가</div>
      </div>

      <EllipsisVerticalIcon class="w-6 h-6"></EllipsisVerticalIcon>
    </div>
  </div>
</template>

<script>
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";

export default {
  props: {
    comments: { type: Array },
  },
  components: { EllipsisVerticalIcon },
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
