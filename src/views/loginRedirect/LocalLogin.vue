<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center text-main"
  >
    <div>Email</div>
    <input class="bg-sub" v-model="email" />
    <div>Nickname</div>
    <input class="bg-sub" v-model="nickname" />

    <div class="mt-4 px-2 py-1 bg-blue-600 rounded-md" @click="onClickLogin">
      Login
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      nickname: "",
    };
  },
  methods: {
    async onClickLogin() {
      const accessToken = await axios.post(
        "https://oqwc40fv0b.execute-api.ap-northeast-2.amazonaws.com/dev/auth/login/local",
        // "http://localhost:3000/dev/auth/login/local",
        { email: this.email, name: this.nickname }
      );

      if (accessToken.status === 201) {
        window.localStorage.setItem("accessToken", accessToken.data);
        this.$router.push("/home");
      }
    },
  },
};
</script>
