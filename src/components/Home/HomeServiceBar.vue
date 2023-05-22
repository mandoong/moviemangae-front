<template>
  <div class="w-full flex my-12 gap-4">
    <div
      class="flex-1 h-28 bg-[#25304a] rounded-md p-2"
      v-for="item in items"
      :key="item"
    >
      <div class="h-14">{{ item.icon }}</div>
      <div class="text-xs font-bold text-[#efefef]">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { icon: "", text: "뉴스레터 보러갈래요?" },
        { icon: "", text: " 7000월에 영화 보는 법" },
        { icon: "", text: "이벤트 참여 하러 갈래요?" },
        { icon: "", text: "소중한 기록을 안전하게!" },
        { icon: "", text: "인증회원을 모십니다" },
        { icon: "", text: "문의사항 있으신가요?" },
      ],
    };
  },
};
</script>
