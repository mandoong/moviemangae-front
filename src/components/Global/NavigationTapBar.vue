<template>
  <div class="fixed w-full bottom-0 flex justify-center h-14 z-10">
    <ul
      class="w-[700px] h-full flex items-center rounded-t-3xl bg-prime shadow-[0_-20px_10px_0_rgba(0,0,0,0.3)]"
    >
      <il v-for="menu in menus" :key="menu" class="flex-1">
        <button
          class="w-full flex flex-col justify-center items-center rounded-t-3xl py-2"
          :class="
            menu.href === isMenu ? 'text-[#efefef] bg-sub' : 'text-subText'
          "
          @click="tabMenu(menu)"
        >
          <Component class="w-6 h-6" :is="menu.img" />
          <div>
            {{ menu.name }}
          </div>
        </button>
      </il>
    </ul>
  </div>
</template>

<script>
import { HomeIcon } from "@heroicons/vue/24/outline";
import { FilmIcon } from "@heroicons/vue/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";

export default {
  data() {
    return {
      isMenu: "/",
      menus: [
        { name: "홈", href: "/", img: HomeIcon },
        { name: "영화", href: "/movie", img: FilmIcon },
        { name: "리뷰", href: "/comment", img: ChatBubbleLeftRightIcon },
        { name: "마이페이지", href: "/my", img: UserIcon },
      ],
    };
  },

  mounted() {
    this.isMenu = window.location.pathname;
  },

  methods: {
    tabMenu(v) {
      this.isMenu = v.href;
      this.$router.push(v.href);
    },
  },

  components: { HomeIcon },
};
</script>
