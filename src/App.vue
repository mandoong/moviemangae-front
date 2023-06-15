<script setup>
import Head from "./components/Global/Head.vue";
import MainWrap from "./components/Global/MainWrap.vue";
import NavigationTapBar from "./components/Global/NavigationTapBar.vue";
</script>

<template>
  <MainWrap>
    <div class="h-full bg-prime">
      <RouterView />
    </div>
  </MainWrap>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: { MainWrap, NavigationTapBar, Head },
};
</script>

<style>
.bg-skeleton {
  background: linear-gradient(-75deg, #172036 15%, #25304a 25%, #172036 35%);
  background-size: 200%;
  animation: shimmer 2s ease-out infinite;
}

@keyframes shimmer {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -200% 100%;
  }
}
</style>
