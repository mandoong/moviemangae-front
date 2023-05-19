import axios from "axios";
import Cookies from "js-cookie";

const MMAPI = axios.create({
  baseURL: "http://localhost:3002/", // API의 기본 URL을 설정합니다.
});

const Token = Cookies.get("accessToken") || null;

if (Token) {
  MMAPI.defaults.headers.Authorization = "Bearer " + Token;
}

MMAPI.defaults.headers.common["Access-Control-Allow-Origin"] =
  "http://localhost:5173";

MMAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.request) {
    } else if (error.response) {
      if (error.response.status === 401) {
        Cookies.remove("auth_token");
        location.href = "/";
      }
    } else {
    }

    return Promise.reject(error);
  }
);

export { MMAPI };
