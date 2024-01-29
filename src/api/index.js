import axios from "axios";
import { requestLoadingOptions } from "../utils/loading";
import { Loading, Message } from "element-ui";
const instance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    /**
     * 处理传参逻辑
     * TODO
     * 。。。。。。
     */
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 接口相应拦截
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    let res = error.response;
    /**
     * 处理各种接口code情况
     * TODO
     * 。。。。。。
     */
    if (res.data.code == 401) {
      // 未登录
      return Promise.reject(res);
    }
    // 。。。。
    return Promise.reject(res);
  }
);
/**
 *
 * @param {*} option 需要对请求做特殊处理的参数
 *
 * @returns
 */
function service(options) {
  let { url, params, method, headers, loading, option } = options;
  let defaultParams = {}; //默认参数
  let defaultHeaders = {}; //默认请求头
  const _loading = loading ? Loading.service(requestLoadingOptions) : null;
  headers = {
    ...defaultHeaders,
    ...headers,
  };
  let paramsType = "data";
  if (method == "get" || method == "delete") {
    paramsType = "params";
  }
  return new Promise((res,rej)=>{
    instance({
      url,
      method,
      headers,
      [paramsType]: params,
    })
      .then((response) => {
        console.log(response)
        /**
         * 处理接口返回值逻辑
         * TODO
         * 。。。。。。
         */
  
        // 请求loading
        _loading && _loading.close();
        const { data = {} } = response;
        if (data.code != 200 && data.code != 0) {
          /**
           * 处理各种code的场景
           * TODO
           * 。。。。。
           */
  
          // 默认配置 请求失败消息提示
          const { showSErrorMessage, customErrorMessage } =
            option;
          if (showSErrorMessage) {
            Message({
              type: "error",
              message: customErrorMessage ? customErrorMessage : data.message ,
            });
          }
          // return rej(data);
        } else {
          //请求成功
          // 默认配置 请求成功消息提示
          const {
            showSuccessMessage,
            useSuccessResMessage,
            customSuccessMessage,
          } = option;
          if (showSuccessMessage) {
            Message({
              type: "success",
              message: useSuccessResMessage ? data.message : customSuccessMessage,
            });
          }
          res(data);
        }
      })
      .catch((err) => {
        console.log(err)
        _loading && _loading.close();
        Message({
          type: "error",
          message: err.data.message || "操作失败，请重试",
        });
        rej(err)
      });
  })
}
export default service;
