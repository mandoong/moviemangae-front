<template>
  <div v-if="movie" class="w-full text-[#efefef]">
    <div class="text-[#efefef] mt-4 text-lg font-bold flex justify-between">
      오늘의 넷플릭스 랭킹
      <button @click="this.$router.push(href)">
        <ChevronRightIcon class="h-6 w-6 text-gray-500" />
      </button>
    </div>
    <div class="w-full mt-4 h-20 relative">
      <div
        class="absolute p-2 text-sm px-2 text-[#efefef] flex items-end justify-between w-full h-full bg-gradient-to-r to-black from-black via-transparent"
      >
        <div class="flex gap-2">
          <div></div>
          <div>{{ movie[0].title }}</div>
        </div>
        <div></div>
      </div>
      <div
        class="flex h-20 items-end justify-between bg-cover bg-center"
        :style="{ 'background-image': `url(${movie[0].cover_imageUrl})` }"
      ></div>
    </div>
    <div>
      <div
        class="w-full h-12 my-2 px-2 text-sm rounded-lg font-bold flex items-center bg-[#25304B] text-[#efefef]"
        v-for="(movie, index) in movie"
        :key="movie"
      >
        <div class="w-10 h-10 flex items-center">
          <div
            class="w-6 aspect-[10/14] bg-cover bg-center rounded-sm"
            :style="{ 'background-image': `url(${movie.imageUrl})` }"
          ></div>
        </div>
        <div class="ml-2 w-8 font-extrabold text-xl">
          {{ index + 1 }}
        </div>
        <div class="flex-1">{{ movie.title }}</div>
        <div
          class="w-14 flex items-center justify-center"
          :class="[
            rank(index, movie.id) < 0 && 'text-green-400',
            rank(index, movie.id) > 0 && 'text-red-400',
            rank(index, movie.id) === 0 && 'text-subText',
          ]"
        >
          {{
            Math.abs(rank(index, movie.id)) === 0
              ? "-"
              : Math.abs(rank(index, movie.id))
          }}
          <div v-if="rank(index, movie.id) === 0" class="w-4"></div>
          <ArrowLongDownIcon
            v-if="rank(index, movie.id) > 0"
            class="h-4 w-4 text-red-400"
          />
          <ArrowLongUpIcon
            v-if="rank(index, movie.id) < 0"
            class="h-4 w-4 text-green-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import HomeTitle from "./HomeTitle.vue";
import { Movie } from "../../service/repository";

export default {
  props: {
    movie: { type: Array },
  },
  data() {
    return {
      yesterdayRank: [],
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const movies = await Movie.GetTop10("yesterday");
      this.yesterdayRank = movies.data;
    },

    rank(index, id) {
      const rank = this.yesterdayRank.findIndex((e) => e.id === id);
      return index - rank;
    },
  },

  components: {
    HomeTitle,
    ChevronRightIcon,
    ArrowLongDownIcon,
    ArrowLongUpIcon,
  },
};
</script>
