<template>
  <div v-if="actors" class="w-full py-4 border-b border-sub">
    <div class="text-main font-bold">감독 출연</div>
    <div class="grid grid-cols-5 my-4 gap-4">
      <div class="flex flex-col justify-center items-center">
        <UserCircleIcon class="h-12 w-12 text-gray-500" />
        <div class="text-main text-xs">{{ director.name }}</div>
        <div class="text-subText text-xxs">Director</div>
      </div>
      <div
        class="w-full flex flex-col px-2 justify-center items-center"
        v-for="actor in actors"
        :key="actor"
      >
        <UserCircleIcon class="h-12 w-12 text-gray-500" />
        <div class="w-full text-center text-main text-xs truncate">
          {{ actor.name }}
        </div>
        <div class="w-full text-center text-subText text-xxs truncate">
          {{ actor.character }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import { unescape } from "html-escaper";

export default {
  props: {
    actors: { type: Array },
    director: { type: Array },
  },

  components: { UserCircleIcon, unescape },
};
</script>
