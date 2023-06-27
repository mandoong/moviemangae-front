<template>
  <div>
    <div
      class="pt-4 h-screen overflow-y-scroll scrollbar-hide bg-prime pb-40"
      v-if="user"
    >
      <div class="flex justify-end items-center gap-1 px-4">
        <button><UserIcon class="w-5 h-5 text-[#EFEFEF]" /></button>
        <button @click="$router.push('/my/setting')">
          <Cog8ToothIcon class="w-6 h-6 text-[#EFEFEF]" />
        </button>
      </div>

      <div class="flex px-4">
        <div
          class="w-16 h-16 rounded-full bg-[#3B4969] flex justify-center items-center font-bold text-2xl text-[#98A4B8]"
        >
          {{ user.name && user.name[0] }}
        </div>
        <div class="flex-1 flex justify-center items-start flex-col px-3">
          <div class="text-lg font-semibold text-[#EFEFEF]">
            {{ user.name }}
          </div>
          <div class="text-xs text-[#8A95A9]">
            {{ user.email }}
          </div>
        </div>
        <div>
          <Point class="mt-1" />
        </div>
      </div>

      <div class="px-4 mt-6">
        <div class="bg-[#182037] flex py-6 rounded-lg">
          <button
            class="flex-1 flex flex-col items-center justify-center relative"
            @click="$router.push('/my/movie')"
          >
            <div class="text-xl text-[#EFEFEF]">
              {{ user.liked_movie.length }}
            </div>
            <div class="text-sm text-subText">좋아하는 영화</div>
            <div class="absolute w-[1px] h-8 bg-[#25304B] right-0"></div>
          </button>

          <button
            class="flex-1 flex flex-col items-center justify-center relative"
            @click="$router.push('/my/movie?type=dislike')"
          >
            <div class="text-xl text-[#EFEFEF]">
              {{ user.disliked_movie.length }}
            </div>
            <div class="text-sm text-subText">별로인 영화</div>
            <div class="absolute w-[1px] h-8 bg-[#25304B] right-0"></div>
          </button>

          <button
            class="flex-1 flex flex-col items-center justify-center"
            @click="$router.push('/my/movie?type=view')"
          >
            <div class="text-xl text-[#EFEFEF]">
              {{ user.view_movies.length }}
            </div>
            <div class="text-sm text-subText">내가 본 영화</div>
          </button>
        </div>
      </div>

      <div class="px-4 mt-4">
        <div class="bg-[#182037] rounded-lg">
          <div
            class="py-4 px-4 flex justify-between relative"
            @click="$router.push(`/my/comment`)"
          >
            <div class="flex items-center gap-1">
              <div class="text-sm text-[#efefef]">작성한 리뷰</div>
              <div></div>
            </div>
            <button class="flex items-center gap-1">
              <div class="text-base text-[#d4d9e1]">
                {{ user.comments.length }}
              </div>
              <div><ChevronRightIcon class="text-[#586A85] w-4 h-4" /></div>
            </button>

            <div
              class="absolute h-[1px] bg-[#25304B] bottom-0"
              :style="{ width: 'calc(100% - 32px)' }"
            ></div>
          </div>

          <div class="py-4 px-4 flex justify-between relative">
            <div class="flex items-center gap-1">
              <div class="text-sm text-[#efefef]">작성한 댓글</div>
              <div></div>
            </div>
            <div class="flex items-center gap-1">
              <div class="text-base text-[#d4d9e1]">0</div>
              <div><ChevronRightIcon class="text-[#586A85] w-4 h-4" /></div>
            </div>

            <div
              class="absolute h-[1px] bg-[#25304B] bottom-0"
              :style="{ width: 'calc(100% - 32px)' }"
            ></div>
          </div>

          <div class="py-4 px-4 flex justify-between relative">
            <div class="flex items-center gap-1">
              <div class="text-sm text-[#efefef]">구독 중인 서비스</div>
              <div></div>
            </div>
            <div class="flex items-center gap-1">
              <div class="text-base text-[#d4d9e1]">0</div>
              <div><ChevronRightIcon class="text-[#586A85] w-4 h-4" /></div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-4 mt-8 relative">
        <div class="text-[#EFEFEF]">나의 베스트 리스트</div>
        <div class="w-full">
          <div
            class="flex flex-col overflow-hidden justify-center items-center gap-4 mt-6 pb-10"
          >
            <div v-if="!user.best_movies">
              <div class="text-sm text-[#98a4b7]">
                베스트 영화가 아직 없습니다.
              </div>
              <button
                class="text-[#EFEFEF] bg-[#4263eb] w-[140px] h-10 text-sm rounded-[4px]"
              >
                나의 영화 등록하기
              </button>
            </div>
            <Slider :rows="user.best_movies">
              <template #item="{ data, onClick }"
                ><button
                  class="bg-slate-500 w-32 aspect-[10/14] bg-cover rounded-xl overflow-hidden"
                  :style="{ 'background-image': `url(${data.movie.imageUrl})` }"
                  @mouseup="onClick(`/movie/${data.movie.id}`)"
                ></button>
              </template>
            </Slider>
          </div>
        </div>

        <div
          class="absolute h-[1px] bg-[#25304B]"
          :style="{ width: 'calc(100% - 32px)' }"
        ></div>
      </div>
    </div>
    <!-- skeleton -->
    <div v-if="!user" class="px-4">
      <div class="h-6"></div>
      <div class="px-4 mt-6">
        <div class="w-16 h-16 rounded-full bg-skeleton"></div>
      </div>
      <div class="h-24 mt-4 px-4 w-full rounded-lg bg-skeleton"></div>
      <div class="h-40 mt-4 px-4 bg-skeleton w-full rounded-lg"></div>
      <slider></slider>
    </div>
  </div>
</template>

<script>
import {
  Cog8ToothIcon,
  UserIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import Point from "../components/point.vue";
import Cookies from "js-cookie";
import { User } from "../service/repository";
import Slider from "../components/Global/Slider.vue";
import MovieSlider from "../components/Home/MovieSlider.vue";

export default {
  data() {
    return {
      user: null,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const user = await User.Profile();
      const token = window.localStorage.getItem("accessToken");
      if (!token || user.status === 401) {
        window.localStorage.setItem("redirect", window.location.href);
        this.$router.push("/login");
      }
      this.user = user.data;
    },
  },

  components: {
    Cog8ToothIcon,
    UserIcon,
    ChevronRightIcon,
    QuestionMarkCircleIcon,
    Slider,
    MovieSlider,
  },
};

const router = useRouter();
</script>
