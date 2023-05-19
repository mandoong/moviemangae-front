<template>
  <div class="w-full my-4">
    <swiper
      :spaceBetween="30"
      :centeredSlides="true"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="w-full h-24"
    >
      <swiper-slide v-for="i in imgs" :key="i"
        ><img class="h-full w-full object-cover object-center" :src="i"
      /></swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay } from "swiper";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

export default {
  data() {
    return {
      imgs: [banner1, banner1, banner1],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    banner1,
    banner2,
    banner3,
  },

  setup() {
    return {
      modules: [Autoplay],
    };
  },
};
</script>
