<template>
  <div
    ref="container"
    class="w-full gap-4 flex justify-start overflow-x-scroll scrollbar-hide"
    @mousedown.stop="slideStart"
    @mouseup.stop="slideEnd"
  >
    <div v-for="(row, index) in rows" :key="index">
      <slot name="item" :data="row" />
    </div>
  </div>
</template>

<style scoped>
* {
  user-select: none;
}
</style>

<script>
export default {
  props: {
    rows: { type: Array },
  },
  data() {
    return {
      mouseDragging: false,
      startPosition: 0,
    };
  },

  mounted() {
    window.addEventListener("mousemove", this.onSlide);
  },

  destroyed() {
    window.removeEventListener("mousemove", this.onSlide);
  },

  methods: {
    slideStart(event) {
      this.mouseDragging = true;
      const scroll = this.$refs.container.scrollLeft;
      this.startPosition = event.clientX + scroll;
    },

    onSlide(event) {
      event.stopPropagation();
      if (this.mouseDragging) {
        const movePoint = this.startPosition - event.clientX;
        this.$refs.container.scrollTo(movePoint, 0);
      }
    },

    slideEnd() {
      this.mouseDragging = false;
    },
  },
};
</script>
