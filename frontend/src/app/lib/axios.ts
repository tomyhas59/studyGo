import axios from "axios";
import { useLoadingStore } from "store/useLoadingState";

const instance = axios.create({
  baseURL: "/api",
});

// 요청 인터셉터
instance.interceptors.request.use((config) => {
  const setLoading = useLoadingStore.getState().setLoading;
  setLoading(true); // 요청 시작 시 로딩 true
  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    const setLoading = useLoadingStore.getState().setLoading;
    setLoading(false); // 응답 받으면 로딩 false
    return response;
  },
  (error) => {
    const setLoading = useLoadingStore.getState().setLoading;
    setLoading(false); // 에러 발생해도 로딩 false
    return Promise.reject(error);
  }
);

export default instance;
