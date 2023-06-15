<template>
  <div class="text-main py-4">
    <div class="pb-6 border-b border-sub">
      <div class="font-bold">리뷰</div>
      <div>
        <div class="text-sm mt-2">내가 쓴 리뷰</div>
        <div
          class="flex flex-col justify-center items-center text-sm gap-4 py-10"
          v-if="!myReview"
        >
          <div class="flex flex-col justify-center items-center">
            <div>✍️</div>
            <div>짧게라도 좋으니</div>
            <div>작품에 대해 감상을 기록해보세요.</div>
          </div>
          <button
            class="p-2 bg-[#4263eb] rounded-md"
            @click="$router.push(`/movie/${$route.params.id}/comment`)"
          >
            리뷰 작성하기
          </button>
        </div>
      </div>
      <MovieComments
        v-if="myReview"
        :user="user"
        :comment="myReview"
        :isMe="true"
        @fetch="$emit('fetch')"
      ></MovieComments>
    </div>

    <div class="w-full h-8 mt-4 text-sm text-main flex justify-between">
      <div>모든 리뷰</div>
      <div class="w-28 text-sm relative flex">
        <div
          class="w-full flex justify-end gap-1"
          @click.stop="onSortOption = !onSortOption"
        >
          <div>{{ sortName }}</div>
          <QueueListIcon class="h-5 w-5 pt-1" />
        </div>
        <Transition name="option">
          <div
            class="absolute w-28 px-2 py-1 top-6 -left-2 font-bold rounded-md border border-[#e5e7eb] text-sm text-subText shadow-2xl bg-sub2"
            v-if="onSortOption"
          >
            <div
              v-for="option in sortOption"
              :key="option"
              @click="onClickSortOption(option)"
            >
              {{ option.tag }}
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div v-for="comment in allReview" :key="comment">
      <MovieComments
        :comment="comment"
        :user="user"
        @fetch="$emit('fetch')"
      ></MovieComments>
    </div>
  </div>
</template>

<script>
import { QueueListIcon } from "@heroicons/vue/20/solid";
import CommentInfo from "../Comment/CommentInfo.vue";
import MovieComments from "../Comment/movieComments.vue";

export default {
  props: {
    myReview: { type: Array },
    allReview: { type: Array },
    user: { type: Array },
  },
  data() {
    return {
      onSortOption: false,
      sortName: "좋아요 순",
      sortOption: [
        { option: "like", tag: "좋아요 순" },
        { option: "created_at", tag: "최신 순" },
      ],
    };
  },
  mounted() {
    window.addEventListener("click", () => {
      this.onSortOption = false;
    });
  },
  components: { QueueListIcon, CommentInfo, MovieComments },

  methods: {
    onClickSortOption(e) {
      this.sortName = e.tag;
      if (e.option === "like") {
        this.allReview.sort((a, b) => b.like - a.like);
      } else if (e.option === "created_at") {
        this.allReview.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      }
    },
  },
};
</script>
