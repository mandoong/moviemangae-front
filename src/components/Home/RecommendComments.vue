<template>
  <div
    class="w-52 h-36 text-xs text-[#efefef] bg-[#172036] rounded-lg p-4"
    @mouseup="onClick"
  >
    <div class="text-xs text-[#98A4B7]">
      {{ comments.comment_movie.title }}
    </div>
    <div class="h-14 py-2 text-base font-bold box">
      {{ comments.content }}
    </div>
    <div></div>
    <div class="text-xs text-[#98A4B7] mt-4 flex justify-between items-center">
      <div class="w-full flex items-center gap-2">
        <div
          class="w-4 h-4 bg-cover"
          :style="{
            'background-image':
              'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIxQzE2Ljk3MDYgMjEgMjEgMTYuOTcwNiAyMSAxMkMyMSA3LjAyOTQ0IDE2Ljk3MDYgMyAxMiAzQzcuMDI5NDQgMyAzIDcuMDI5NDQgMyAxMkMzIDE2Ljk3MDYgNy4wMjk0NCAyMSAxMiAyMVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xOTk1XzEzNjAyKSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzE5OTVfMTM2MDIiIHgxPSIyLjI2NzM5IiB5MT0iLTMuMzExMjYiIHgyPSIyLjI2NzM5IiB5Mj0iMTYuMTU0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM4QkZGNzUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMENBNjc4Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==)',
          }"
        ></div>
        <div class="flex-1">
          <span class="truncate">{{ comments.user.name }}</span> 님의 평가
        </div>
        <div class="w-8 flex justify-end gap-2">
          <HeartIcon class="h-4" />
          {{ comments.like }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EllipsisVerticalIcon } from "@heroicons/vue/24/outline";
import { HeartIcon } from "@heroicons/vue/20/solid";

export default {
  props: {
    comments: { type: Array },
  },
  methods: {
    onClick() {
      this.$emit("onClick", `/comment/${this.comments.id}`);
    },
  },
  components: { EllipsisVerticalIcon, HeartIcon },
};
</script>

<style scoped>
.box {
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
