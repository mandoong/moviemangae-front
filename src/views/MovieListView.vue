<template>
  <main
    ref="scroll"
    class="w-full h-screen overflow-y-scroll bg-prime scrollbar-hide"
    @click="(onOption = ''), (onSortOption = false)"
  >
    <div
      class="fixed w-full z-20 transition-all duration-300"
      :class="yPosition > 500 ? '-top-10' : 'top-0'"
    >
      <div
        class="max-w-[700px] bg-prime text-main flex justify-center flex-col items-center px-4"
      >
        <div class="text py-4">작품 탐색</div>

        <div class="w-full flex gap-2">
          <div class="w-12 h-12" v-for="item in platform" :key="item">
            <button
              class="w-12 h-12 bg-cover bg-center"
              :class="
                selectBox.platform.some((e) => e === item.name) ||
                selectBox.platform.length === 0
                  ? ''
                  : 'brightness-[20%]'
              "
              :style="{ 'background-image': `url(${item.img})` }"
              @click.stop="setPlatform(item.name)"
            ></button>
          </div>
        </div>

        <div class="w-full flex items-center">
          <div class="flex-1 flex pt-4 gap-2">
            <div
              class="px-2 h-6 text-xs font-bold flex items-center relative rounded-md bg-sub"
              v-for="option in options"
              :key="option"
            >
              <button
                class="flex gap-2 justify-center items-center"
                @click.stop="
                  onOption === option.name
                    ? (onOption = '')
                    : (onOption = option.name)
                "
              >
                <div>{{ option.name }}</div>
                <ChevronDownIcon class="h-4 w-4 text-main" />
              </button>
              <transition name="option">
                <div
                  v-show="onOption === option.name"
                  class="absolute top-8 left-0 py-1 flex gap-1 flex-col rounded-md border text-sm shadow-2xl bg-sub2 px-2 text-subText"
                >
                  <div v-if="option.boxName !== 'scoring'">
                    <button
                      v-for="item in option.option"
                      :key="item"
                      @click.stop="setOption(option.boxName, item)"
                      :class="
                        Array.isArray(selectBox[option.boxName])
                          ? selectBox[option.boxName].some(
                              (e) => e === item.class
                            )
                            ? ''
                            : 'brightness-50'
                          : selectBox[option.boxName] === item.class
                          ? ''
                          : 'brightness-50'
                      "
                    >
                      <div class="w-32">
                        {{ item.tag }}
                      </div>
                    </button>
                  </div>

                  <div
                    class="w-64 flex justify-center flex-col items-center"
                    v-if="option.boxName === 'scoring'"
                    @click.stop
                  >
                    <div>IMDB 점수</div>
                    <div class="relative w-full mt-4 flex items-center">
                      <div
                        ref="bar"
                        class="w-full h-2 my-2 bg-sub rounded-full flex items-start"
                      ></div>
                      <div
                        class="absolute w-4 h-14 z-20"
                        :style="{ transform: `translateX(${dot1Position}px)` }"
                      >
                        <div class="text-center">
                          {{ selectBox.scoring[0] }}
                        </div>
                        <button
                          ref="dot1"
                          class="bg-white rounded-full w-4 h-4 z-20"
                          @mousedown.stop="onClickDot1"
                          @mouseup.stop="endMoveDot1"
                          @click.stop
                        ></button>
                      </div>

                      <div
                        class="absolute w-4 h-14 z-20"
                        :style="{ transform: `translateX(${dot2Position}px)` }"
                      >
                        <div class="text-center">
                          {{ selectBox.scoring[1] }}
                        </div>
                        <button
                          ref="dot2"
                          class="bg-white rounded-full w-4 h-4 z-20"
                          @mousedown="onClickDot2"
                          @mouseup.stop="endMoveDot2"
                        ></button>
                      </div>
                      <div
                        class="h-2 bg-blue-400 absolute rounded-full z-10"
                        :style="{
                          width: `${
                            Math.abs(dot1Position - dot2Position) + 4
                          }px`,
                          left: `${
                            dot1Position > dot2Position
                              ? dot2Position
                              : dot1Position
                          }px`,
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- 정렬 옵션 -->
        </div>
        <div class="w-full flex justify-end py-1">
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
                  @click="
                    (sortName = option.tag), (onSortOption = false);
                    setTimeout(() => {
                      selectBox.sort = option.option;
                    });
                  "
                >
                  {{ option.tag }}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 토스터 -->
    <transition name="fadeDown">
      <div
        v-if="onMovieMenu"
        class="fixed w-full flex flex-col justify-end bottom-0 h-screen text-main z-30"
      >
        <div
          class="flex-1 max-w-[700px] bg-black opacity-60"
          @click="onMovieMenu = false"
        ></div>
        <div
          class="h-72 py-2 px-4 rounded-t-xl max-w-[700px] bg-sub text-subText"
        >
          <div class="w-full flex items-center mb-4 text-center font-extrabold">
            <div class="w-6"></div>
            <div class="flex-1">{{ movieMenuItem.title }}</div>
            <XMarkIcon
              class="h-6 w-6 text-subText"
              @click="onMovieMenu = false"
            />
          </div>
          <div
            class="mb-3 flex items-center gap-2"
            @click="
              user
                ? $router.push(`movie/${movieMenuItem.id}`)
                : $router.push('/login')
            "
          >
            <FaceSmileIcon class="h-5 w-5 text-subText" /> 좋아요
          </div>
          <div
            class="mb-3 flex items-center gap-2"
            @click="
              user
                ? $router.push(`movie/${movieMenuItem.id}`)
                : $router.push('/login')
            "
          >
            <FaceFrownIcon class="h-5 w-5 text-subText" /> 별로에요
          </div>
          <div
            class="mb-3 flex items-center gap-2"
            @click="onClickCreateComment"
          >
            <ChatBubbleLeftIcon class="h-5 w-5 text-subText" /> 리뷰 작성하기
          </div>
          <div
            class="mb-3 flex items-center gap-2"
            @click="onClickAddBestMovie"
          >
            <HandThumbUpIcon
              class="h-5 w-5"
              :class="bestStatus ? 'text-green-400' : 'text-subText'"
            />
            {{
              bestStatus ? "나의 베스트 목록에서 제외" : "나의 베스트 영화 등록"
            }}
          </div>
        </div>
      </div>
    </transition>

    <!-- 현재 선택한 옵션 목록 -->
    <div
      v-if="selectBoxDefault"
      class="w-full bg-prime sticky top-0 pt-44 flex text-subText gap-2 px-4 text-sm justify-start flex-wrap pb-4 transition-all duration-300 z-10"
      :class="yPosition > 500 ? '-translate-y-10' : ''"
    >
      <transition-group name="fadeDown">
        <div
          class="bg-sub2 h-6 flex items-center gap-1 rounded-2xl px-2"
          v-for="item in selectBox.platform"
          :key="item"
        >
          {{ item
          }}<XCircleIcon
            class="h-4 w-4"
            @click="
              setTimeout(() => {
                selectBox.platform = selectBox.platform.filter(
                  (e) => e !== item
                );
              })
            "
          />
        </div>
        <div
          class="bg-sub2 h-6 flex items-center gap-1 rounded-2xl px-2"
          v-for="item in selectBox.genre"
          :key="item"
        >
          {{ item
          }}<XCircleIcon
            class="h-4 w-4"
            @click="
              setTimeout(() => {
                selectBox.genre = selectBox.genre.filter((e) => e !== item);
              })
            "
          />
        </div>

        <!-- <div class="bg-sub2 h-6 flex items-center gap-2 px-2 rounded-lg"></div> -->

        <div
          v-if="selectBox.scoring[0] !== 0 || selectBox.scoring[1] !== 10"
          class="bg-sub2 h-6 flex items-center gap-2 px-2 rounded-lg"
        >
          평점 {{ selectBox.scoring[0] }} ~ {{ selectBox.scoring[1] }}
          <XCircleIcon
            class="h-4 w-4"
            @click="
              setTimeout(() => {
                selectBox.scoring = [0, 10];
                dot1Position = 0;
                dot2Position = 240;
              })
            "
          />
        </div>
        <div
          v-if="duration"
          class="bg-sub2 h-6 flex items-center gap-2 px-2 rounded-lg"
        >
          {{ duration }}
          <XCircleIcon
            class="h-5 w-5"
            @click="
              setTimeout(() => {
                duration = null;
                selectBox.duration = null;
              })
            "
          />
        </div>
        <div
          class="bg-sub2 h-6 flex items-center gap-1 rounded-2xl px-2"
          v-for="item in selectBox.presentationType"
          :key="item"
        >
          {{ item
          }}<XCircleIcon
            class="h-4 w-4"
            @click="
              setTimeout(() => {
                selectBox.presentationType = selectBox.presentationType.filter(
                  (e) => e !== item
                );
              })
            "
          />
        </div>
      </transition-group>
    </div>

    <div
      class="w-full px-4 grid grid-cols-3 md:grid-cols-5 gap-2"
      :class="selectBoxDefault ? '' : 'pt-44'"
      ref="movieList"
    >
      <transition-group name="fade">
        <div
          v-for="(movie, index) in movies"
          :key="movie"
          :style="{ 'transition-delay': `${(index * 0.04) % 2.4}s` }"
        >
          <div class="flex justify-center h-42 overflow-hidden">
            <MovieList
              :movie="movie"
              @onClick="goto"
              @onMovieMenu="onClickMovieMenu"
            ></MovieList>
          </div>
        </div>
      </transition-group>
      <div ref="observer" class="h-20"></div>
    </div>
  </main>
</template>

<script>
import {
  ChevronDownIcon,
  QueueListIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import Slider from "../components/Global/Slider.vue";
import { Movie, User } from "../service/repository";
import MovieList from "../components/Global/MovieList.vue";
import {
  XCircleIcon,
  HandThumbUpIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/vue/20/solid";
import { nextTick } from "vue";

export default {
  data() {
    return {
      user: null,
      bestStatus: false,
      yPosition: 0,
      onOption: "",
      searchTimer: null,
      platform: [
        {
          name: "Netflix",
          img: "https://static.kinolights.com/icon/btn_squircle_netflix.png",
        },
        {
          name: "Disney Plus",
          img: "https://static.kinolights.com/icon/btn_squircle_disneyplus.png",
        },
        {
          name: "Watcha",
          img: "https://static.kinolights.com/icon/btn_squircle_watcha.png",
        },
      ],

      options: [
        {
          name: "장르",
          boxName: "genre",
          option: [
            {
              tag: "액션",
              class: "액션",
            },
            {
              tag: "애니메이션",
              class: "애니메이션",
            },
            {
              tag: "코미디",
              class: "코미디",
            },
            {
              tag: "범죄",
              class: "범죄",
            },
            {
              tag: "다큐멘터리",
              class: "다큐멘터리",
            },
            {
              tag: "판타지",
              class: "판타지",
            },
            {
              tag: "가족",
              class: "가족",
            },
            {
              tag: "공포",
              class: "공포",
            },
            {
              tag: "역사",
              class: "역사",
            },
            {
              tag: "음악",
              class: "음악",
            },
            {
              tag: "로맨스",
              class: "로맨스",
            },
            {
              tag: "SF",
              class: "SF",
            },
            {
              tag: "스포츠",
              class: "스포츠",
            },
            {
              tag: "스릴러",
              class: "스릴러",
            },
            {
              tag: "전쟁",
              class: "전쟁",
            },
            {
              tag: "서부",
              class: "서부",
            },
          ],
        },
        // { name: "연대", boxName: "dataCreated", option: [] },
        {
          name: "해외평점",
          boxName: "scoring",
          option: [
            "9점 이상",
            "8점 이상",
            "7점 이상",
            "6점 이상",
            "5점 이상",
            "4점 이상",
          ],
        },
        {
          name: "러닝타임",
          boxName: "duration",
          option: [
            {
              tag: "120분 이상",
              class: "04:00:00",
            },
            {
              tag: "120분 이내",
              class: "02:00:00",
            },
            {
              tag: "90분 이내",
              class: "01:30:00",
            },
            {
              tag: "60분 이내",
              class: "01:00:00",
            },
          ],
        },
        {
          name: "화질",
          boxName: "presentationType",
          option: [
            {
              tag: "4K",
              class: "4K",
            },
            {
              tag: "HD",
              class: "HD",
            },
            {
              tag: "SD",
              class: "SD",
            },
          ],
        },
      ],

      movies: null,
      selectBox: {
        page: 0,
        platform: [],
        like: null,
        genre: [],
        dataCreated: null,
        scoring: [0, 10],
        duration: null,
        presentationType: [],
        sort: "dateCreated",
      },
      dot1Position: 0,
      dot2Position: 240,
      currentDotPosition: 0,
      onDragging1: false,
      onDragging2: false,
      duration: null,
      onSortOption: false,
      sortName: "최신 순",
      sortOption: [
        { option: "like_count", tag: "좋아요 순" },
        { option: "scoring", tag: "해외 평가 순" },
        { option: "dateCreated", tag: "최신 순" },
      ],

      onMovieMenu: false,
      movieMenuItem: null,
    };
  },

  computed: {
    selectBoxDefault() {
      const box = this.selectBox;
      if (
        box.platform.length === 0 &&
        box.genre.length === 0 &&
        box.dataCreated === null &&
        box.scoring[0] === 0 &&
        box.scoring[1] === 10 &&
        box.duration === null &&
        box.presentationType.length === 0
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.fetch();
    this.observeMovies();

    this.$refs.scroll.addEventListener("scroll", this.onScroll);
    this.$refs.scroll.addEventListener("mousemove", this.moveDot1);
    this.$refs.scroll.addEventListener("mouseup", this.endMoveDot1);
    this.$refs.scroll.addEventListener("mousemove", this.moveDot2);
    this.$refs.scroll.addEventListener("mouseup", this.endMoveDot2);
  },

  destroyed() {},

  methods: {
    async fetch() {
      this.selectBox.page = 0;
      const movies = await Movie.GetSelectMovie(this.selectBox);
      const user = await User.Profile();
      this.movies = movies.data;
      if (user.status === 200) {
        this.user = user.data;
      }
    },

    async startTimer() {
      this.searchTimer = setTimeout(async () => {
        this.selectBox.page = 0;
        const movies = await Movie.GetSelectMovie(this.selectBox);
        this.movies = movies.data;
      }, 1000);
    },

    observeMovies() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.addMovies();
            }
          });
        },
        {
          threshold: 0,
        }
      );

      observer.observe(this.$refs.observer);
    },

    async addMovies() {
      if (this.movies) {
        this.selectBox.page++;
        const movies = await Movie.GetSelectMovie(this.selectBox);
        this.movies.push(...movies.data);
      }
    },

    onClickMovieMenu(movie) {
      this.onMovieMenu = true;
      this.movieMenuItem = movie;

      if (
        this.user &&
        this.user.best_movies.some((e) => e.movie.id === movie.id)
      ) {
        this.bestStatus = true;
      } else {
        this.bestStatus = false;
      }
    },

    onClickCreateComment() {
      const { id } = this.movieMenuItem;
      if (!this.user) {
        this.$router.push("/login");
      }

      if (this.user.comments.some((e) => e.movie_id === id)) {
        this.$router.push(`/movie/${id}`);
      } else {
        this.$router.push(`/movie/${id}/comment`);
      }
    },

    async onClickAddBestMovie() {
      const { id } = this.movieMenuItem;
      if (!this.user) {
        this.$router.push("/login");
      } else if (!this.bestStatus) {
        await Movie.addMyMovieList(id, "bestMovie");
        this.bestStatus = true;
      } else {
        await Movie.removeMyMovieList(id, "bestMovie");
        this.bestStatus = false;
      }
    },

    setPlatform(platform) {
      clearTimeout(this.searchTimer);

      this.onOption = "";
      if (!this.selectBox.platform.some((e) => e === platform)) {
        this.selectBox.platform.push(platform);
      } else {
        this.selectBox.platform = this.selectBox.platform.filter(
          (e) => e !== platform
        );
      }

      if (this.selectBox.platform.length === this.platform.length) {
        this.selectBox.platform = [];
      }
      this.startTimer();
    },

    setOption(name, option) {
      clearTimeout(this.searchTimer);
      switch (name) {
        case "genre":
          if (!this.selectBox.genre.some((e) => e === option.tag)) {
            this.selectBox.genre.push(option.tag);
          } else {
            this.selectBox.genre = this.selectBox.genre.filter(
              (e) => e !== option.tag
            );
          }
          break;

        case "duration":
          if (option.class === this.selectBox.duration) {
            this.selectBox.duration = null;
            break;
          }
          switch (option.tag) {
            case "120분 이상":
              this.selectBox.duration = "04:00:00";
              this.duration = option.tag;
              break;
            case "120분 이내":
              this.selectBox.duration = "02:00:00";
              this.duration = option.tag;
              break;
            case "90분 이내":
              this.selectBox.duration = "01:30:00";
              this.duration = option.tag;
              break;
            case "60분 이내":
              this.selectBox.duration = "01:00:00";
              this.duration = option.tag;
              break;
          }
          break;

        case "presentationType":
          if (!this.selectBox.presentationType.some((e) => e === option.tag)) {
            this.selectBox.presentationType.push(option.tag);
          } else {
            this.selectBox.presentationType =
              this.selectBox.presentationType.filter((e) => e !== option.tag);
          }
          break;
      }
      this.startTimer();
    },

    onScroll() {
      this.yPosition = this.$refs.scroll.scrollTop;
      if (this.onOption || this.onSortOption) {
        this.onOption = null;
        this.onSortOption = false;
      }
    },

    onClickDot1(e) {
      clearTimeout(this.searchTimer);
      this.currentDotPosition = e.clientX - this.dot1Position;
      this.onDragging1 = true;
    },

    moveDot1(e) {
      e.stopPropagation();

      const barWidth = this.$refs.bar[0].clientWidth - 16;

      if (
        this.onDragging1 &&
        this.dot1Position >= 0 &&
        this.dot1Position <= barWidth
      ) {
        const movePosition = e.clientX - this.currentDotPosition;
        this.dot1Position = movePosition;
        if (this.dot1Position < 0) {
          this.dot1Position = 0;
        }
        if (this.dot1Position > barWidth) {
          this.dot1Position = barWidth;
        }

        this.selectBox.scoring[0] = (this.dot1Position / 24).toFixed(1);
      }
    },

    endMoveDot1(e) {
      e.stopPropagation();
      this.dot1Position = this.dot1Position - (this.dot1Position % 2.4);

      if (this.onDragging1) {
        this.searchTimer = setTimeout(() => {
          this.fetch();
        }, 1000);
      }

      this.onDragging1 = false;
    },

    onClickDot2(e) {
      clearTimeout(this.searchTimer);
      e.stopPropagation();
      this.currentDotPosition = e.clientX - this.dot2Position;
      this.onDragging2 = true;
    },

    moveDot2(e) {
      e.stopPropagation();
      const barWidth = this.$refs.bar[0].clientWidth - 16;

      if (
        this.onDragging2 &&
        this.dot2Position >= 0 &&
        this.dot2Position <= barWidth
      ) {
        const movePosition = e.clientX - this.currentDotPosition;
        this.dot2Position = movePosition;
        if (this.dot2Position < 0) {
          this.dot2Position = 0;
        }
        if (this.dot2Position > barWidth) {
          this.dot2Position = barWidth;
        }
        this.selectBox.scoring[1] = (this.dot2Position / 24).toFixed(1);
      }
    },

    endMoveDot2(e) {
      e.stopPropagation();
      this.dot2Position = this.dot2Position - (this.dot2Position % 2.4);

      if (this.onDragging2) {
        this.searchTimer = setTimeout(() => {
          this.fetch();
        }, 1000);
      }

      this.onDragging2 = false;
    },

    setTimeout(e = () => {}) {
      clearTimeout(this.searchTimer);
      e();
      this.startTimer();
    },

    goto(page) {
      this.$router.push(page);
    },
  },
  components: {
    Slider,
    ChevronDownIcon,
    MovieList,
    XCircleIcon,
    QueueListIcon,
    XMarkIcon,
    HandThumbUpIcon,
    FaceSmileIcon,
    FaceFrownIcon,
    ChatBubbleLeftIcon,
  },
};
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-enter-active {
  transition: all 1s ease;
}

.fade-leave-active {
  display: none;
}

.fadeDown-enter-active,
.fadeDown-leave-active,
.fadeDown-move {
  transition: all 0.2s ease-in;
}

.fadeDown-enter-from,
.fadeDown-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.option-enter-from,
.option-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.option-enter-active,
.option-leave-active {
  transition: all 0.3s ease;
}
</style>
