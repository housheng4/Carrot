import axios from "axios";
import router from "@/router";
// import qs from "qs";
import { Notification } from "element-ui";

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
});

// http request 拦截器
// service.interceptors.request.use(
//   config => {
//     config.headers["Content-Type"] = "application/json;charset=UTF-8";
//     // 在post请求发送出去之前，对其进行编码
//     if (config.method === "post") {
//       config.headers["Content-Type"] =
//         "application/x-www-form-urlencoded;charset=UTF-8";
//       config.data = qs.stringify(config.data);
//     }

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// http response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.data.code;
    if (code === "500") {
      router.push("/");
    } else if (code === "401") {
      router.push("/");
    }
    return response;
  },
  error => {
    Notification.error({
      title: "提示",
      message: "服务器连接错误",
      duration: 3000
    });
    return Promise.reject(error);
  }
);

/**
 * 封装axios请求
 * @param options 请求参数
 * @return promise
 */
const request = options => {
  return new Promise((resolve, reject) => {
    service(options)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default request;
