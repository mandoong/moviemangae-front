<script setup>
import Head from "./components/Global/Head.vue";
import MainWrap from "./components/Global/MainWrap.vue";
import NavigationTapBar from "./components/Global/NavigationTapBar.vue";
</script>

<template>
  <MainWrap>
    <div class="h-full">
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
