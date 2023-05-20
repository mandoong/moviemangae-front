<template>
  <header
    class="fixed top-0 w-w_main h-12 bg-gradient-to-t from-pink-50 to-white flex justify-between items-center p-2 z-50"
  >
    <div class="pt-4">
      <img class="w-24 h-24" :src="img" />
    </div>
    <div class="flex w-32 h-full justify-between items-center">
      <div></div>
      <div>
        <BellIcon class="w-4 h-4 text-subText"></BellIcon>
      </div>
      <button
        class="w-16 flex text-xs text-mainText justify-center bg-gray-400 py-1 px-4 rounded-md"
        @click="googleLogin()"
      >
        {{ isToken() ? "Logout" : "Login" }}
      </button>
    </div>
  </header>
</template>

<script>
import { BellIcon } from "@heroicons/vue/24/outline";
import Logo from "../../assets/Logo.png";
import { User } from "../../service/repository";
import { MMAPI } from "../../service/MMAPI";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      img: Logo,
    };
  },

  methods: {
    getProfile() {
      const profile = "";
    },

    async googleLogin() {
      Cookies.set("redirect", this.$route.fullPath);
      location.href = `http://localhost:3002/auth/login/google`;
    },

    isToken() {
      const token = Cookies.get("accessToken");
      if (token) {
        return true;
      } else {
        return false;
      }
    },
  },

  components: { BellIcon, Logo },
};
</script>
