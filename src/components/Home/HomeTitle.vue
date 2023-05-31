<template>
  <div class="text-[#efefef] mt-10 text-lg font-bold flex justify-between">
    <slot></slot>
    <button @click="this.$router.push(href)">
      <ChevronRightIcon class="h-6 w-6 text-gray-500" />
    </button>
  </div>
</template>

<script>
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

export default {
  props: {
    href: { type: String },
  },
  components: { ChevronRightIcon },
};
</script>
