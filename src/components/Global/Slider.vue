<template>
  <div
    ref="container"
    class="w-full mt-4 flex justify-start overflow-x-scroll scrollbar-hide scroll-smooth'"
    :class="mouseDragging ? '' : 'scroll-smooth'"
    @mousedown.stop="slideStart"
    @mouseup.stop="slideEnd"
  >
    <div class="item px-2" v-for="(row, index) in rows" :key="index">
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
      itemSnapPoint: 0,
    };
  },

  mounted() {
    window.addEventListener("mousemove", this.onSlide);
    window.addEventListener("mouseup", this.slideEnd);
  },

  destroyed() {
    window.removeEventListener("mousemove", this.onSlide);
    window.removeEventListener("mouseup", this.slideEnd);
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

    slideEnd(event) {
      if (this.mouseDragging) {
        const items = this.$refs.container.querySelector(".item");
        const point =
          this.$refs.container.scrollLeft -
          (this.$refs.container.scrollLeft % items.clientWidth);
        this.$refs.container.scrollTo({ left: point, behavior: "smooth" });
      }
      event.stopPropagation();

      this.mouseDragging = false;
    },
  },
};
</script>
