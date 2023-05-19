<template>
  <div class="mt-12 w-full h-16 bg-purple-50 p-2 relative">
    <MagnifyingGlassIcon
      class="w-6 h-6 text-mainText absolute top-4 left-4"
    ></MagnifyingGlassIcon>
    <input
      class="w-full h-10 px-10 rounded-lg"
      placeholder="영화를 검색해보세요!"
    />
  </div>
</template>

<script>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    MagnifyingGlassIcon,
  },
};
</script>
