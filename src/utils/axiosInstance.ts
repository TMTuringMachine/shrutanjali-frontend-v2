import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  import { store } from "../redux/store";
  import { isDevelopment } from "./helper";
  
  const requestConfig: AxiosRequestConfig = {
    baseURL: isDevelopment
      ? process.env.REACT_APP_BACKEND_URL
      : window.location.origin,
  };
  
  const axiosInstance = axios.create(requestConfig);
  
  const errorHandler = (err: any) => {
    if (isDevelopment) console.log(err);
    const error = "Something went wrong";
    store.dispatch({ type: "control/stopLoading" });
    store.dispatch({
      type: "control/showSnackbar",
      payload: { text: error, type: "error" },
    });
    return null;
  };
  
  axiosInstance.interceptors.request.use((config) => {
    if (!config.params.background)
      store.dispatch({ type: "control/startLoading" });
    return config;
  }, errorHandler);
  
  axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    if (isDevelopment) console.log(response.data);
    if (response.data.status) return response.data?.data || "Success";
  
    store.dispatch({ type: "control/stopLoading" });
    const error = response.data?.msg || "Something went wrong";
    store.dispatch({
      type: "control/showSnackbar",
      payload: { text: error, type: "error" },
    });
    return null;
  }, errorHandler);
  
  export default axiosInstance;
  