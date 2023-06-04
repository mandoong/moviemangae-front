<template>
  <div class="pt-4 h-screen overflow-y-scroll scrollbar-hide bg-prime">
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
        고
      </div>
      <div class="flex-1 flex justify-center items-start flex-col px-3">
        <div class="text-lg font-semibold text-[#EFEFEF]">
          고고한_엠마스톤_51340102
        </div>
        <div class="text-xs text-[#8A95A9]">
          팔로워&nbsp;0&nbsp;&nbsp;팔로잉&nbsp;0
        </div>
      </div>
      <div>
        <Point class="mt-1" />
      </div>
    </div>

    <div class="px-4 mt-6">
      <div class="bg-[#182037] flex py-6 rounded-lg">
        <div class="flex-1 flex flex-col items-center justify-center relative">
          <div class="text-xl text-[#EFEFEF]">0</div>
          <div class="text-sm">찜했어요</div>
          <div class="absolute w-[1px] h-8 bg-[#25304B] right-0"></div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center relative">
          <div class="text-xl text-[#EFEFEF]">0</div>
          <div class="text-sm">보는중</div>
          <div class="absolute w-[1px] h-8 bg-[#25304B] right-0"></div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center">
          <div class="text-xl text-[#EFEFEF]">0</div>
          <div class="text-sm">봤어요</div>
        </div>
      </div>
    </div>

    <div class="px-4 mt-4">
      <div class="bg-[#182037]">
        <div class="py-4 px-4 flex justify-between relative">
          <div class="flex items-center gap-1">
            <div class="text-sm text-[#efefef]">작성한 리뷰</div>
            <div><QuestionMarkCircleIcon class="w-4 h-4 text-[#586A85]" /></div>
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
            <div class="text-sm text-[#efefef]">관심없어요</div>
            <div><QuestionMarkCircleIcon class="w-4 h-4 text-[#586A85]" /></div>
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
            <div><QuestionMarkCircleIcon class="w-4 h-4 text-[#586A85]" /></div>
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
      </div>
    </div>

    <div class="px-4 mt-8 relative">
      <div class="text-[#EFEFEF]">종아하는 영화</div>
      <div class="flex flex-col justify-center items-center gap-4 mt-6 pb-10">
        <div class="text-sm text-[#98a4b7]">좋아하는 영화가 아직 없습니다.</div>
        <button
          class="text-[#EFEFEF] bg-[#4263eb] w-[140px] h-10 text-sm rounded-[4px]"
        >
          나의 영화 등록하기
        </button>
      </div>

      <div
        class="absolute h-[1px] bg-[#25304B]"
        :style="{ width: 'calc(100% - 32px)' }"
      ></div>
    </div>

    <div class="px-4 mt-8 relative">
      <div class="text-[#EFEFEF]">인생작품</div>
      <div class="flex flex-col justify-center items-center gap-4 mt-6 pb-64">
        <div class="text-sm text-[#98a4b7]">
          등록한 인생작품이 아직 없습니다.
        </div>
        <button
          class="text-[#EFEFEF] bg-[#4263eb] w-[140px] h-10 text-sm rounded-[4px]"
        >
          인생작품 등록하기
        </button>
      </div>
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

export default {
  data() {
    return {
      user: { type: Object },
    };
  },

  mounted() {
    const token = Cookies.get("accessToken");

    if (!token) {
      this.$router.push("/login");
    } else {
      this.fetch();
    }
  },

  methods: {
    async fetch() {
      const user = await User.Profile();
      this.user = user.data;
      console.log(this.user);
    },
  },

  components: {
    Cog8ToothIcon,
    UserIcon,
    ChevronRightIcon,
    QuestionMarkCircleIcon,
  },
};

const router = useRouter();
</script>
