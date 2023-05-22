<template>
  <header class="w-full fixed h-12 z-50">
    <div
      class="max-w-[700px] h-full bg-prime flex justify-between items-center px-2 overflow-hidden"
    >
      <div class="w-24 pt-4">
        <img class="w-24 object-cover" :src="img" />
      </div>
      <div class="flex h-full justify-between items-center gap-1">
        <Point :border="true" />
        <div>
          <BellIcon class="w-5 h-5 text-[#EFEFEF]"></BellIcon>
        </div>
        <!-- <button
        class="w-16 flex text-xs text-mainText justify-center py-1 px-4 rounded-md"
        @click="googleLogin()"
      >
        {{ isToken() ? "Logout" : "Login" }}
      </button> -->
      </div>
    </div>
  </header>
</template>

<script>
import { BellIcon } from "@heroicons/vue/24/solid";
import Logo from "../../assets/Logo.png";
import { User } from "../../service/repository";
import { MMAPI } from "../../service/MMAPI";
import Cookies from "js-cookie";
import Point from "../point.vue";

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

  components: { BellIcon, Logo, Point },
};
</script>
