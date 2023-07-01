<template>
  <main>
    <div class="text-[#efefef] mt-4 text-lg font-bold flex justify-between">
      오늘의 넷플릭스 랭킹
      <button @click="this.$router.push('/movie/list?type=top10')">
        <ChevronRightIcon class="h-6 w-6 text-gray-500" />
      </button>
    </div>
    <div v-if="movie" class="w-full text-[#efefef]">
      <div
        class="w-full mt-4 h-24 relative overflow-hidden"
        @click="$router.push(`/movie/${movie[0].id}`)"
      >
        <div
          class="absolute p-2 text-sm px-2 text-[#efefef] flex items-end justify-between w-full h-full bg-black"
        >
          <div class="flex gap-2">
            <div></div>
            <div class="z-20">{{ movie[0].title }}</div>
          </div>
          <div></div>
        </div>
        <div class="flex h-24 justify-center">
          <div
            class="h-full aspect-[32/10] bg-black bg-cover bg-top shadow-lg z-10"
            :style="{ 'background-image': `url(${onErrorImg})` }"
          >
            <div
              class="w-full h-full bg-gradient-to-r to-black from-black via-transparent"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="w-full h-12 my-2 px-2 text-sm rounded-lg font-bold flex items-center bg-[#25304B] text-[#efefef]"
        v-for="(movie, index) in movie"
        @click="$router.push(`/movie/${movie.id}`)"
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
            rank(index, movie.id) > 0 ||
              (rank(index, movie.id) === 'new' && 'text-red-400'),
            rank(index, movie.id) === 0 && 'text-subText',
          ]"
        >
          {{
            Math.abs(rank(index, movie.id)) === 0
              ? "-"
              : Math.abs(rank(index, movie.id)) === "new"
              ? "New"
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
    <!-- skeleton -->
    <div v-if="!movie">
      <div class="w-full mt-4 h-24 relative overflow-hidden bg-skeleton"></div>
      <div class="w-full h-12 my-2 rounded-lg bg-skeleton"></div>
      <div class="w-full h-12 my-2 rounded-lg bg-skeleton"></div>
      <div class="w-full h-12 my-2 rounded-lg bg-skeleton"></div>
    </div>
    <!-- skeleton -->
  </main>
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
      movieImg: null,
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
      if (rank === null) {
        return "new";
      }
      return index - rank;
    },

    onErrorImg() {
      fetch(this.movie[0].cover_imgUrl)
        .then()
        .catch((e) => {
          return this.movie[1].cover_imgUrl;
        });
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
