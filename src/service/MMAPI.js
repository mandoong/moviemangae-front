import axios from "axios";
import Cookies from "js-cookie";

const MMAPI = axios.create({
  // baseURL: "http://localhost:3000/dev/", // API의 기본 URL을 설정합니다.
  baseURL: "https://oqwc40fv0b.execute-api.ap-northeast-2.amazonaws.com/dev/", // API의 기본 URL을 설정합니다.
});

const Token = window.localStorage.getItem("accessToken") || null;

if (Token) {
  MMAPI.defaults.headers.Authorization = "Bearer " + Token;
}

MMAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove("accessToken");
        location.href = "/login";
      }
    } else {
    }

    return Promise.reject(error.response);
  }
);

export { MMAPI };
