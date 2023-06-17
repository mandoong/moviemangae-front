<template>
  <div class="overflow-y-scroll scrollbar-hide h-screen bg-prime">
    <div
      class="flex sticky top-0 py-4 bg-prime justify-between items-center px-4"
    >
      <button class="w-6 h-6" @click="$router.back()">
        <ChevronLeftIcon class="w-6 h-6 text-[#EFEFEF]" />
      </button>
      <div class="text-[#EFEFEF] text-base">설정</div>
      <div class="opacity-0"><ChevronLeftIcon class="w-6 h-6" /></div>
    </div>

    <div class="bg-[#182037] text-xs text-[#98a4b7] px-4 pt-3 pb-2">
      활동로그
    </div>
    <div class="px-4 gap-1 flex flex-col">
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 내가 좋아요한 리뷰 </a>
      </div>
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 리뷰 댓글 관리 </a>
      </div>
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 푸시알림 설정 </a>
      </div>
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 활동 내역 초기화 </a>
      </div>
    </div>

    <div class="bg-[#182037] text-xs text-[#98a4b7] px-4 mt-4 pt-3 pb-2">
      계정설정
    </div>
    <div class="px-4 gap-1 flex flex-col">
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 개인정보 수정 </a>
      </div>
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 인증회원 신청 </a>
      </div>
    </div>

    <div class="bg-[#182037] text-xs text-[#98a4b7] px-4 mt-4 pt-3 pb-2">
      문의하기
    </div>
    <div class="px-4 gap-1 flex flex-col">
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 사용가이드 </a>
      </div>
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 고객센터 </a>
      </div>
    </div>

    <div class="bg-[#182037] text-xs text-[#98a4b7] px-4 mt-4 pt-3 pb-2">
      약관 및 정책
    </div>
    <div class="px-4 gap-1 flex flex-col">
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 개인정보 처리방침 </a>
      </div>
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 이용약관 </a>
      </div>
    </div>

    <div class="relative pt-6 pb-6">
      <div
        class="absolute h-[1px] bg-[#25304B]"
        :style="{ width: 'calc(100% - 32px)' }"
      ></div>
    </div>

    <div class="px-4 gap-1 flex flex-col pb-32">
      <div class="py-3" @click="onClickLogout">
        <a class="text-[#efefef] text-sm font-light"> 로그아웃 </a>
      </div>
      <div class="py-3">
        <a class="text-[#efefef] text-sm font-light"> 회원탈퇴 </a>
      </div>
    </div>
  </div>
</template>
<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";

export default {
  data() {
    return {};
  },

  methods: {
    onClickLogout() {
      window.localStorage.removeItem("accessToken");
      this.$router.push("/home");
    },
  },
  components: {
    ChevronLeftIcon,
  },
};
</script>
