<template>
  <header class="w-screen h-screen">
    <div class="fixed bg-pink-50 w-full h-full -z-10"></div>
    <div class="flex w-full h-full justify-center">
      <div
        class="w-w_main h-full bg-white shadow-2xl overflow-y-scroll text-mainText z-10 scroll"
      >
        <slot></slot>
      </div>
    </div>
  </header>
</template>

<style>
/* .scroll::-webkit-scrollbar {
  display: none;
} */
</style>
