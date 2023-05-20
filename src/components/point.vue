<template>
  <div
    class="bg-[#182037] flex items-center px-2 py-0.5 rounded-2xl gap-1"
    :class="props.border ? 'border border-[#25304B]' : ''"
  >
    <CurrencyDollarIcon class="w-4 h-4 text-[#FFE860]" />
    <span class="text-white text-sm">0</span>
  </div>
</template>
<script lang="ts" setup>
import { CurrencyDollarIcon } from "@heroicons/vue/24/solid";

interface Props {
  border?: boolean;
}

const props: Props = defineProps({
  border: {
    type: Boolean,
    default: false,
  },
});
</script>
