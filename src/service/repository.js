import { MMAPI } from "./MMAPI";

export const User = {
  Profile: async () => {
    return MMAPI.get("/user/profile/")
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
  GetAllMovie: async () => {
    return MMAPI.get("/movie/")
      .then((res) => res)
      .catch((err) => err);
  },

  GetMovieById: async (id) => {
    return MMAPI.get(`/movie/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  GetTop10: async () => {
    return MMAPI.get("/top10/today/")
      .then((res) => res)
      .catch((err) => err);
  },

  GetMoviePlatform: async (id) => {
    return MMAPI.get(`/movie/platform/${id}`)
      .then((res) => res)
      .catch((err) => err);
  },

  LikeMovie: async (id, userId) => {
    return MMAPI.get(`/${id}/movie/${userId}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  UnlikeMovie: async (id, userId) => {
    return MMAPI.delete(`/${id}/movie/${userId}/`)
      .then((res) => res)
      .catch((err) => err);
  },
};

export const Comment = {
  MovieComment: async (id) => {
    return MMAPI.get(`/comment/movie/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  CreateComment: async (post) => {
    return MMAPI.post(`/comment/`, post)
      .then((res) => res)
      .catch((err) => err);
  },

  DeleteComment: async (id) => {
    return MMAPI.delete(`/comment/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  MyComment: async () => {
    return MMAPI.get(`/comment/my/`)
      .then((res) => res)
      .catch((err) => err);
  },

  LikeComment: async (id) => {
    return MMAPI.get(`/comment/like/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },

  CancelLikeComment: async (id) => {
    return MMAPI.delete(`/comment/like/${id}/`)
      .then((res) => res)
      .catch((err) => err);
  },
};