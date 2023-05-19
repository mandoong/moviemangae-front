<script setup>
import Head from "./components/Global/Head.vue";
import MainWrap from "./components/Global/MainWrap.vue";
import NavigationTapBar from "./components/Global/NavigationTapBar.vue";
</script>

<template>
  <MainWrap>
    <Head />
    <div class="h-full">
      <RouterView />
    </div>
    <NavigationTapBar />
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
