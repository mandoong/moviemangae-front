<template>
  <main class="w-full">
    <div
      ref="container"
      class="w-full mt-4 flex justify-start overflow-x-scroll scrollbar-hide scroll-smooth'"
      :class="mouseDragging ? '' : 'scroll-smooth'"
      @mousedown="slideStart"
      @mouseup="slideEnd"
    >
      <div class="item px-2" v-for="(row, index) in rows" :key="index">
        <slot name="item" :data="row" :onClick="onClick" />
      </div>
    </div>

    <!-- skeleton -->
    <div v-if="!rows" class="text-main w-full flex gap-2">
      <div class="w-36 aspect-[10/14] rounded-lg bg-skeleton"></div>
      <div class="w-36 aspect-[10/14] rounded-lg bg-skeleton"></div>
      <div class="w-36 aspect-[10/14] rounded-lg bg-skeleton"></div>
    </div>
    <!-- skeleton -->
  </main>
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
      onSliding: true,
      href: null,
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
      event.stopPropagation();
      this.mouseDragging = true;
      const scroll = this.$refs.container.scrollLeft;
      this.startPosition = event.clientX + scroll;
    },

    onSlide(event) {
      event.stopPropagation();
      if (this.mouseDragging) {
        this.onSliding = false;
        const movePoint = this.startPosition - event.clientX;
        if (this.$refs.container) {
          this.$refs.container.scrollTo(movePoint, 0);
        }
      }
    },

    slideEnd(event) {
      event.stopPropagation();
      if (this.mouseDragging && this.$refs.container) {
        const items = this.$refs.container.querySelector(".item");

        const left = this.$refs.container.scrollLeft;
        const width = items.clientWidth;
        let point;

        if (left % width < width / 2) {
          point = left - (left % width);
        } else {
          point = left + (width - (left % width));
        }

        this.$refs.container.scrollTo({ left: point, behavior: "smooth" });
      }
      this.mouseDragging = false;
      this.onSliding = true;
    },

    onClick(row) {
      if (this.onSliding) {
        this.mouseDragging = false;
        window.removeEventListener("mousemove", this.onSlide);
        window.removeEventListener("mouseup", this.slideEnd);
        this.$router.push(row);
      }
    },
  },
};
</script>
