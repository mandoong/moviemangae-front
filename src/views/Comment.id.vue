<template>
  <main class="relative">
    <div class="px-4">
      <div class="flex items-center">
        <button class="w-12" @click="$router.back()">
          <ChevronLeftIcon class="h-8 w-8 text-gray-500" />
        </button>
        <div class="flex-1 text py-4 h-14 text-center text-main sticky top-0">
          리뷰 자세히 보기
        </div>
        <div class="w-12"></div>
      </div>

      <div v-if="comment" class="w-full py-2 border-b border-subText">
        <div
          class="w-full flex flex-col justify-between flex-1 p-2 rounded-lg text-main"
        >
          <div class="flex gap-4">
            <button
              class="w-20 aspect-[10/14] bg-center bg-cover bg-sub2 rounded-lg"
              :style="{
                backgroundImage: `url(${comment.comment_movie.imageUrl})`,
              }"
              @click="$router.push(`/movie/${comment.comment_movie.id}`)"
            ></button>
            <div>
              <div class="font-bold">{{ comment.comment_movie.title }}</div>
              <div class="text-subText text-xs">
                {{ JSON.parse(comment.comment_movie.genre).join(" · ") }}
              </div>
              <div class="text-subText text-xs">
                {{ comment.comment_movie.dateCreated }}
              </div>
            </div>
          </div>
          <div class="bg-sub rounded-lg mt-4 p-2">
            <div class="w-full flex justify-between">
              <div class="flex items-center gap-2 text-subText">
                <div class="flex">
                  <UserCircleIcon class="h-7 w-7 text-gray-500 mr-2" />
                  <div class="flex text-main items-center text-sm">
                    {{ comment.user.name }}
                  </div>
                </div>
                ·
                <div class="text-subText text-sm">
                  {{ geaCreateDate(comment.created_at) }}
                </div>
              </div>

              <EllipsisVerticalIcon class="h-6 w-6 text-gray-500" />
            </div>

            <div class="text-subText text-sm py-4 px-2 font-bold">
              {{ comment.content }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="comment">
        <div v-for="children in comment.children" :key="children">
          <div class="w-full mt-4 flex justify-between">
            <div class="flex items-center gap-2 text-subText">
              <div class="flex">
                <UserCircleIcon class="h-7 w-7 text-gray-500 mr-2" />
                <div class="flex text-main items-center text-sm">
                  {{ children.user.name }}
                </div>
              </div>
              ·
              <div class="text-subText text-sm">
                {{ geaCreateDate(children.created_at) }}
              </div>
            </div>

            <EllipsisVerticalIcon class="h-6 w-6 text-gray-500" />
          </div>

          <div class="text-subText text-sm py-2 px-2 font-bold">
            {{ children.content }}
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 text-main w-full">
      <div class="max-w-[700px] pb-20 bg-sub2 px-4 pt-4">
        <div class="w-full flex gap-2">
          <textarea
            type="text"
            @input="onInputTextareaHeight"
            v-model="textContent"
            ref="textarea"
            class="flex-1 h-8 px-2 py-1 bg-sub overflow-hidden resize-none rounded-lg"
          ></textarea>
          <button
            class="w-16 rounded-lg flex justify-center items-center b bg-blue-600"
            @click="onClickAddComment"
          >
            작성
          </button>
        </div>
        <div class="flex justify-between text-subText text-sm mr-20 ml-2 mt-1">
          <div class="flex-1">
            <transition name="fade">
              <div v-if="textValidate">5자 이상 작성해주세요</div>
            </transition>
          </div>
          <div class="flex-1 text-right">{{ textLength }} / 100</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {
  FaceSmileIcon,
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/vue/20/solid";
import { XMarkIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";
import {
  ChatBubbleLeftIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/solid";
import { Comment } from "../service/repository";

export default {
  data() {
    return {
      date: null,
      comment: null,
      textValidate: false,
      textContent: "",
      textLength: 0,
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      const { id } = this.$route.params;
      const comment = await Comment.GetCommentById(id);
      if (comment.status === 200) {
        this.comment = comment.data;
      }
    },
    geaCreateDate(date) {
      const now = new Date();
      const thisDate = new Date(date);
      const timeDiff = now.getTime() - thisDate.getTime();
      const day = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return day > 30
        ? day > 365
          ? parseInt(day / 365) + "년 전"
          : parseInt(day / 30) + "달 전"
        : day === 0
        ? "오늘"
        : day + "일 전";
    },

    onInputTextareaHeight(e) {
      this.textValidate = false;
      const text = e.target.value;

      this.textLength = text.length;
      if (this.textContent.length > 99) {
        this.textContent = this.textContent.substring(0, 99);
      }

      this.$refs.textarea.style.height = "32px";
      const textarea = this.$refs.textarea;
      this.$refs.textarea.style.height = `${textarea.scrollHeight}px`;
      console.log(this.$refs.textarea.style.height);
    },

    async onClickAddComment() {
      const post = {
        movie_id: this.comment.comment_movie.id,
        depth: 1,
        parent_id: this.comment.id,
        content: this.textContent,
      };

      if (this.textContent.length < 5) {
        this.textValidate = true;
        return;
      }

      const result = await Comment.CreateComment(post);
      if (result.status === 201) {
        this.fetch();
      }
    },
  },

  components: {
    UserCircleIcon,
    HeartIcon,
    FaceSmileIcon,
    ChatBubbleLeftIcon,
    XMarkIcon,
    ChevronLeftIcon,
    EllipsisVerticalIcon,
  },
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s;
}
</style>
