import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "../redux/store";
import { isDevelopment } from "./helper";

const requestConfig: AxiosRequestConfig = {
  // baseURL: "http://localhost:5000/api",
  // baseURL: "http://192.168.0.105:5000/api",
  baseURL: "https://shrutanjali-api-ce3d.onrender.com/api",
};
// console.log(requestConfig)
const axiosInstance = axios.create(requestConfig);

const errorHandler = (err: any) => {
  if (isDevelopment) // console.log(err);
  const error = err?.response?.data?.message || "Something went wrong";
  store.dispatch({ type: "control/stopLoading" });
  store.dispatch({
    type: "control/showSnackbar",
    payload: { text: error, type: "error" },
  });
  return null;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config?.params?.background)
    store.dispatch({ type: "control/startLoading" });
  return config;
}, errorHandler);

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  if (isDevelopment) // console.log(response.data, "AXIOS RESPONSE");
  if (response.status == 200) return response.data || "Success";

  store.dispatch({ type: "control/stopLoading" });
  // const error = response.data?.msg || "Something went wrong";
  // store.dispatch({
  //   type: "control/showSnackbar",
  //   payload: { text: error, type: "error" },
  // });
  return null;
}, errorHandler);

export default axiosInstance;
