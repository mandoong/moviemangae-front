<template>
  <header class="w-screen h-screen bg-prime">
    <div class="fixed bg-pink-50 w-full h-full -z-10"></div>
    <div class="flex w-full h-full justify-center">
      <div
        class="w-w_main h-full bg-white shadow-2xl text-mainText z-10 scroll overflow-hidden"
      >
        <slot></slot>
      </div>
    </div>
    <NavigationTapBar />
  </header>
</template>

<script>
import NavigationTapBar from "./NavigationTapBar.vue";

export default {
  components: { NavigationTapBar },
};
</script>

<style>
/* .scroll::-webkit-scrollbar {
  display: none;
} */
</style>
