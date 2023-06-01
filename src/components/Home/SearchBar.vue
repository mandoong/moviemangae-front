<style scoped>
.v-enter-active {
  transition: all 0.3s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(40px);
  opacity: 0;
}

.fade-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s ease-in;
}
</style>

<template>
  <div class="w-full h-16 relative z-40 bg-prime">
    <div
      class="absolute h-16 bg-prime p-2 transition-all z-40"
      :class="focused ? '-top-12' : 'top-0'"
      :style="{ width: 'calc(100% - 8px)' }"
    >
      <div
        class="border border-[#25304B] bg-[#182037] flex items-center rounded-lg px-4"
        :class="focused && 'border-[#83868E]'"
      >
        <MagnifyingGlassIcon class="w-4 h-4"></MagnifyingGlassIcon>
        <input
          @focus="focused = true"
          @input="searchMovie"
          :value="keyword"
          class="w-full h-10 px-2 relative bottom-[1px] text-[#EFEFEF] text-sm outline-none bg-transparent placeholder:text-[#556781] placeholder:font-light placeholder:text-sm"
          placeholder="영화를 검색해보세요!"
        />
      </div>
    </div>
    <Transition>
      <div v-show="focused" class="h-screen bg-prime z-20">
        <!-- 영화 목록 -->
        <Transition appear-active-class>
          <div v-if="focused" :style="{ transitionDelay: '250ms' }">
            <div class="pt-4 px-4 flex justify-between">
              <div class="text-[#efefef] text-base font-semibold">
                영화 {{ movies.length }}
              </div>
              <div>
                <ChevronRightIcon class="w-5 h-5 stroke-2 text-[#efefef]" />
              </div>
            </div>
            <div class="px-4 flex flex-col mt-4 gap-2">
              <transition-group name="fade" mode="in-out">
                <div
                  v-for="movie in movies.slice(0, 3)"
                  class="flex gap-2"
                  :key="movie"
                  @click="$router.push(`/movie/${movie.id}`)"
                >
                  <div class="flex-none">
                    <img class="w-10 aspect-[10/14]" :src="movie.imageUrl" />
                  </div>
                  <div class="flex flex-col">
                    <div class="text-[15px] font-thin text-[#efefef]">
                      {{ movie.title }}
                    </div>
                    <div class="text-[#98a4b7] text-xs font-thin">
                      {{ movie.genre }} · {{ movie.dateCreated }}
                    </div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </Transition>

        <!-- 커뮤니티 컨텐츠 목록 -->
        <Transition>
          <div v-if="focused" :style="{ transitionDelay: '500ms' }">
            <div class="mt-8 px-4 flex justify-between">
              <div class="text-[#efefef] text-base font-semibold">
                커뮤니티 게시글 3
              </div>
              <div>
                <ChevronRightIcon class="w-5 h-5 stroke-2 text-[#efefef]" />
              </div>
            </div>

            <div class="px-4 flex flex-col mt-4 gap-6">
              <div
                v-for="content in contents"
                class="flex gap-2"
                :key="content"
              >
                <div class="flex-none">
                  <img class="w-16 aspect-[16/10]" :src="content.url" />
                </div>
                <div>
                  <div
                    class="text-[15px] font-thin text-[#efefef] w-64 truncate"
                  >
                    {{ content.title }}
                  </div>
                  <div
                    class="text-[#98a4b7] w-64 truncate flex-none text-xs font-thin text-ellipsis overflow-hidden"
                  >
                    {{ content.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <button
          class="fixed w-10 h-10 flex justify-center items-center rounded-full bg-[#172036] bottom-20 right-[50%] translate-x-[50%]"
          @click="exit"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script>
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import axios from "axios";

export default {
  components: {
    MagnifyingGlassIcon,
    ChevronRightIcon,
    XMarkIcon,
  },
  data() {
    return {
      focused: false,
      keyword: "",
      movies: [],
      typingTimer: null,
      contents: [
        {
          url: "https://file.kinolights.com/original/post_detail/202301/27/2f372575-e5b7-4bf7-91cb-a1b92adbf6f1.jpeg",
          title: `현빈X황정민 '교섭', 120만 돌파→9일 연속 1위…韓 영화 자존심 지켰다`,
          description: `27일 영화진흥위원회 영화관입장권 통합전산망에 따르면 '교섭'(감독 임순례)은 지난 26일 하루 동안 3만 6622명의 관객을 불러들이며 누적관객수 123만 4442명을 기록, 120만 관객 돌파에 성공했다.     '교섭'은 지난 18일 개봉 후 9일 연속 박스오피스 1위를 기록하며 쟁쟁한 외화 경쟁 속에서도 한국 영화의 자존심을 굳건히 지키고 있다.`,
        },
        {
          url: "https://file.kinolights.com/original/post_detail/202304/24/292ff19e-6fda-411a-8296-c77ad335202f.jpeg",
          title: `‘존윅 4’ 국내 손익 분기점은 150만 관객`,
          description: `24일 영진위 영화관입장권통합전산망에 따르면 23일 ‘존 윅4’는 11만 3983명이 찾아 박스오피스 1위를 지켰다. 지난 12일 개봉한 ‘존 윅4’는 줄곧 1위를 지키면서 누적 관객 123만 2036명이 찾았다.   ‘존 윅’(2014)은 12만 2857명, ‘존 윅-리로드’(2016)는 28만 58명, ‘존 윅3: 파라벨룸’(2019)이 100만 776`,
        },
        {
          url: "https://file.kinolights.com/original/post_detail/202304/24/62e9b08b-7f45-4ccd-9cd8-b8208ce9cee1.jpeg",
          title: `<흐르다> 후기`,
          description: `27일 영화진흥위원회 영화관입장권 통합전산망에 따르면 '교섭'(감독 임순례)은 지난 26일 하루 동안 3만 6622명의 관객을 불러들이며 누적관객수 123만 4442명을 기록, 120만 관객 돌파에 성공했다.     '교섭'은 지난 18일 개봉 후 9일 연속 박스오피스 1위를 기록하며 쟁쟁한 외화 경쟁 속에서도 한국 영화의 자존심을 굳건히 지키고 있다.`,
        },
      ],
    };
  },
  watch: {
    focused() {
      this.$emit("focus");
      if (!this.focused) {
        this.$emit("close");
      }
    },
  },

  methods: {
    exit() {
      this.focused = false;
    },

    async searchMovie(e) {
      this.keyword = e.target.value;
      if (!this.keyword) {
        return;
      }

      clearTimeout(this.typingTimer);

      this.typingTimer = setTimeout(async () => {
        const movies = await axios.get(
          `http://localhost:3002/movie/search/movie?word=${this.keyword}`
        );

        if (movies.status === 200) {
          this.movies = movies.data;
          const genre = this.movies.genre;
          this.movies = this.movies.map((v) => {
            v.genre = JSON.parse(v.genre).join(" ");
            return v;
          });
        }
      }, 300);
    },
  },
};
</script>
