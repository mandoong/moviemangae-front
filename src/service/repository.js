import { MMAPI } from "./MMAPI";

export const User = {
  Profile: async () => {
    return MMAPI.get("/user/profile/")
      .then((res) => res)
      .catch((err) => err);
  },

  GetLikeMovies: async () => {
    return MMAPI.get("/user/like/movie")
      .then((res) => res)
      .catch((err) => err);
  },

  UserById: async (id) => {
    return MMAPI.get(`/user/find/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetAllUser: async () => {
    return MMAPI.get("/user/all/")
      .then((res) => res)
      .catch((err) => err);
  },
};

export const Movie = {
  GetAllMovie: async (page = 0) => {
    return MMAPI.get(`/movies/all?page=${page}`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetMovieById: async (id) => {
    return MMAPI.get(`/movies/find/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetSelectMovie: async (select) => {
    return MMAPI.post(`/movies/select/`, { dto: select })
      .then((res) => res)
      .catch((err) => err);
  },

  GetTop10: async (type) => {
    return MMAPI.get(`/top10/today?type=${type}`)
      .then((res) => res)
      .catch((err) => err);
  },

  addMyMovieList: async (id, type) => {
    return MMAPI.post(`/movies/${id}/like/`, { type })
      .then((res) => res)
      .catch((err) => err);
  },

  removeMyMovieList: async (id, type) => {
    return MMAPI.delete(`/movies/${id}/like/`, { data: { type: type } })
      .then((res) => res)
      .catch((err) => err);
  },

  GetDeadlineMovie: async () => {
    return MMAPI.get("/movies/deadline")
      .then((res) => res)
      .catch((err) => err);
  },

  GetFavoriteMovies: async () => {
    return MMAPI.get("/movies/favorite")
      .then((res) => res)
      .catch((err) => err);
  },

  GetSearchMovies: async (keyword) => {
    return MMAPI.get(`/movies/search?word=${keyword}`)
      .then((res) => res)
      .catch((err) => err);
  },
};

export const Comment = {
  GetCommentByMovieId: async (id) => {
    return MMAPI.get(`/comments/movie/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetAllComment: async () => {
    return MMAPI.get(`/comments/all/`)
      .then((res) => res)
      .catch((err) => err);
  },

  CreateComment: async (data) => {
    return MMAPI.post(`/comments/`, data)
      .then((res) => res)
      .catch((err) => err);
  },

  DeleteComment: async (id) => {
    return MMAPI.delete(`/comments/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  MyComment: async () => {
    return MMAPI.get(`/comments/my/`)
      .then((res) => res)
      .catch((err) => err);
  },

  LikeComment: async (id) => {
    return MMAPI.get(`/comments/${id}/like/`)
      .then((res) => res)
      .catch((err) => err);
  },

  CancelLikeComment: async (id) => {
    return MMAPI.delete(`/comments/${id}/like/`)
      .then((res) => res)
      .catch((err) => err);
  },
};
