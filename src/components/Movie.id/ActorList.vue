<template>
  <div>
    <div
      v-if="actors"
      class="w-full py-4 transition-all overflow-hidden duration-300"
      :class="onBoard ? 'h-96' : ' h-36'"
    >
      <div class="text-main font-bold">감독 출연</div>
      <div class="grid grid-cols-5 my-4 gap-4">
        <div class="flex flex-col justify-center items-center">
          <UserCircleIcon class="h-12 w-12 text-gray-500" />
          <div class="text-main text-xs">{{ director }}</div>
          <div class="text-subText text-xxs">Director</div>
        </div>
        <div
          class="w-full flex flex-col px-2 justify-center items-center"
          v-for="actor in actors"
          :key="actor"
        >
          <UserCircleIcon class="h-12 w-12 text-gray-500" />
          <div class="w-full text-center text-main text-xs truncate">
            {{ actor.actor.name }}
          </div>
          <div class="w-full text-center text-subText text-xxs truncate">
            {{ actor.character }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full border-b border-sub text-subText py-2 flex justify-center"
    >
      <button @click="onBoard = !onBoard" class="flex gap-1 text-sm">
        모두 보기

        <ChevronDownIcon v-if="!onBoard" class="h-6 w-6 text-gray-500" />
        <ChevronUpIcon v-if="onBoard" class="h-6 w-6 text-gray-500" />
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import { unescape } from "html-escaper";

export default {
  props: {
    actors: { type: Array },
    director: { type: Array },
  },

  data() {
    return {
      onBoard: false,
    };
  },

  components: { UserCircleIcon, unescape, ChevronDownIcon, ChevronUpIcon },
};
</script>

<style scoped>
.slide-enter-active {
  transition: all 0.5s;
}

.slide-enter-from {
  opacity: 0;
}
</style>
