<template>
  <header
    class="fixed w-w_main bottom-0 h-14 rounded-t-3xl shadow-2xl bg-main z-10"
  >
    <ul class="w-full h-full flex items-center">
      <il v-for="menu in menus" :key="menu" class="flex-1">
        <div
          class="flex flex-col justify-center items-center py-2"
          :class="menu.name === isMenu ? 'bg-pink-200 rounded-2xl' : ''"
          @click="tabMenu(menu)"
        >
          <Component class="w-6 h-6 text-mainText" :is="menu.img" />
          <div
            class="text-sm text-mainText"
            :class="menu.name === isMenu ? 'text-black font-bold' : ''"
          >
            {{ menu.name }}
          </div>
        </div>
      </il>
    </ul>
  </header>
</template>

<script>
import { HomeIcon } from "@heroicons/vue/24/outline";
import { FilmIcon } from "@heroicons/vue/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/vue/24/outline";
import { UserIcon } from "@heroicons/vue/24/outline";

export default {
  data() {
    return {
      isMenu: null,
      menus: [
        { name: "홈", href: "/", img: HomeIcon },
        { name: "영화", href: "/movie", img: FilmIcon },
        { name: "댓글", href: "/comment", img: ChatBubbleLeftRightIcon },
        { name: "마이페이지", href: "/my", img: UserIcon },
      ],
    };
  },

  methods: {
    tabMenu(v) {
      this.$router.push(v.href);
      this.isMenu = v.name;
    },
  },

  components: { HomeIcon },
};
</script>
