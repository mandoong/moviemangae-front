<template>
  <div class="w-full p-2 text-subText">
    <div class="w-full h-12 flex gap-2">
      <div
        class="flex-1 h-full flex justify-center gap-2 items-center bg-sub rounded-md"
      >
        <FaceFrownIcon class="h-6 w-6 text-gray-500" />
        <div>별로에요</div>
      </div>
      <div
        class="flex-1 h-full flex justify-center gap-2 items-center bg-sub rounded-md"
      >
        <FaceSmileIcon class="h-6 w-6 text-gray-500" />
        <div>좋아요</div>
      </div>
    </div>
    <div class="w-full h-16 flex mt-4 pb-4 border-b border-[#25304a]">
      <div class="w-10"></div>
      <div class="flex-1 flex justify-between px-10 text-xs">
        <div class="flex flex-col justify-center items-center gap-2">
          <BookmarkIcon class="h-6 w-6 text-gray-500" />
          <div>찜하기</div>
        </div>
        <div class="flex flex-col justify-center items-center gap-2">
          <CheckIcon class="h-6 w-6 text-gray-500" />
          <div>봤어요</div>
        </div>
        <div class="flex flex-col justify-center items-center gap-2">
          <PencilIcon class="h-6 w-6 text-gray-500" />
          <div>리뷰쓰기</div>
        </div>
      </div>
      <EllipsisVerticalIcon class="h-6 w-6 text-gray-500" />
    </div>
  </div>
</template>

<script>
import {
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
} from "@heroicons/vue/24/outline";
import { BookmarkIcon, CheckIcon, PencilIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    BookmarkIcon,
    BookmarkIcon,
    CheckIcon,
    PencilIcon,
    FaceFrownIcon,
    FaceSmileIcon,
    EllipsisVerticalIcon,
  },
};
</script>
