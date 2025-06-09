import axios from "axios";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
// import errorCodes from "@/util/errorCodes";

/**
 * Axios請求封裝
 *
 * @param {string} baseURL - 基礎URL
 * @param {number} requestTimeout - 請求超時時間
 */
class Axios {
  constructor(baseURL, requestTimeout = 10000) {
    this.baseURL = baseURL || "";
    this.requestTimeout = requestTimeout;
    this.axiosInstance = this.createInstance();
  }

  createInstance() {
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.requestTimeout,
      // withCredentials: true
    });

    this.setInterceptors(instance);
    return instance;
  }

  setInterceptors(instance) {
    // 請求攔截器
    instance.interceptors.request.use(
      async (config) => {
        // console.log(config)
        const userStore = useUserStore();
        const { getAccessToken } = storeToRefs(userStore);
        // const { getTokenRefreshTimestamp, getAccessToken } = storeToRefs(userStore)
        // const now = new Date().getTime()
        // if (
        //   typeof getTokenRefreshTimestamp === 'undefined' ||
        //   getTokenRefreshTimestamp.value <= now
        // ) {
        //   await userStore.refreshAccessToken()
        // }
        config.headers["Authorization"] = "Bearer " + getAccessToken.value;
        config.url = this.handleJsonSuffix(config.url);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 響應攔截器
    instance.interceptors.response.use(
      (response) => {
        // console.log(response);
        return response.data;
      },
      (error) => {
        // 統一報錯處理
        return this.handleResponseError(error);
      }
    );
  }

  handleResponseError(error) {
    // const error = errorCodes[code];
    // if (error) {
    //   console.error(`${code}: ${error.message} - ${error.description}`);
    // } else {
    //   console.error("未知錯誤");
    // }
    return Promise.reject(error);
  }

  handleJsonSuffix(url) {
    if (process.env.NODE_ENV !== "development" && url.includes(".json")) {
      return url.replace(".json", "");
    }
    return url;
  }

  // 處理請求取消
  cancelTokenSource() {
    return axios.CancelToken.source();
  }

  get(url, config = {}) {
    return this.axiosInstance.get(url, config);
  }

  post(url, data, config = {}) {
    return this.axiosInstance.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.axiosInstance.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.axiosInstance.delete(url, config);
  }
}

export default Axios;
