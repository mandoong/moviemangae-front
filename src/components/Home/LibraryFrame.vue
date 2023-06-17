<template>
  <div class="w-full py-4">
    <div class="text-lg font-extrabold mb-2">오늘의 추천 영화</div>
    <div
      class="w-full bg-gradient-to-t from-yellow-50 to-pink-200 h-96 relative overflow-hidden shadow-md"
    >
      <img class="absolute -bottom-5 w-full z-20" :src="flower1" />
      <img class="absolute top-0 w-full z-0" :src="flower2" />
      <div v-if="movies1 && movies2">
        <div class="absolute h-48 top-10 left-0">
          <ul class="w-full flex justify-start p-4 slider-left-50">
            <li class="w-40" v-for="movie in movies1" :key="movie">
              <div
                class="w-14 h-18 border-4 border-white shadow-xl rounded-md overflow-hidden"
              >
                <img :src="movie.main_imageUrl" />
              </div>
              <div class="border-t-2 text-xs truncate border-gray-300">
                <div class="w-28 truncate">{{ movie.title }}</div>
              </div>
            </li>

            <li class="w-40" v-for="movie in movies1" :key="movie">
              <div
                class="w-14 h-18 border-4 border-white shadow-xl rounded-md overflow-hidden"
              >
                <img :src="movie.main_imageUrl" />
              </div>
              <div class="border-t-2 text-xs border-gray-300">
                {{ movie.title }}
              </div>
            </li>
          </ul>
        </div>
        <div class="absolute h-48 bottom-10 slider-left-100">
          <ul class="w-full flex justify-start p-4">
            <li class="w-96 h-40" v-for="movie in movies2" :key="movie">
              <div
                class="w-28 h-38 border-4 border-white shadow-xl rounded-md overflow-hidden"
              >
                <img :src="movie.main_imageUrl" />
              </div>
              <div class="border-t-2 shadow-inner">{{ movie.title }}</div>
            </li>
            <li class="w-96 h-40" v-for="movie in movies2" :key="movie">
              <div
                class="w-28 h-38 border-4 border-white shadow-xl rounded-md overflow-hidden"
              >
                <img :src="movie.main_imageUrl" />
              </div>
              <div class="border-t-2 shadow-inner">{{ movie.title }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flower1 from "../../assets/001.png";
import Flower2 from "../../assets/002.png";

export default {
  props: {
    movies1: null,
    movies2: null,
  },
  data() {
    return {
      flower1: Flower1,
      flower2: Flower2,
      movies: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    };
  },

  methods: {
    isHover(e) {
      return false;
    },
  },

  components: {
    Flower1,
    Flower2,
  },
};
</script>

<style>
.slider-left-50 {
  animation: slide-l 100s linear infinite;
}

.slider-left-100 {
  animation: slide-l 40s linear infinite;
}

@keyframes slide-l {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-49.8%);
  }
}
</style>
