import axios from "axios";
import { getToken, setToken, removeToken } from "./useToken";
import { Toast } from "antd-mobile";
import { userRefreshApi } from "@/apis/user"

const httpRequset = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 10000,
})

//判断是否需要携带token的headers 还是refreshToken的headers
let isRefreshToken = true

httpRequset.interceptors.request.use(
  (config) => {
    const token = getToken("userToken")
    if (token && isRefreshToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  , (error) => {
    return Promise.reject(error);
  }
)

httpRequset.interceptors.response.use(
  (response) => {
    return response;
  }
  , async (error) => {
    // if (error.response.status === 401) {
    //   // 跳转到登录页面
    //   window.location.href = "#/login";
    // }
    if (!error.response) {
      Toast.show({
        content: '服务器繁忙',
      })
      return Promise.reject(error)
    }

    //  ----------------------- 401情况--------------------------------
    if (error.response.status === 401) {
      const token = getToken("userToken")
      const refreshToken = getToken("refreshToken")
      // ----------------有token-------------------------
      if (token) {
        isRefreshToken = false
        try {
          // const res = await axios.put('http://geek.itheima.net/v1_0/' + 'authorizations', '', {
          //   headers: { Authorization: 'Bearer ' + refreshToken },
          // })
          const res = await userRefreshApi(refreshToken)
          isRefreshToken = true
          setToken('userToken', res.data.data.token)
          // --------------------根据新token重新发送请求获取数据--------------------
          return httpRequset(error.config)
        } catch (e) {
          // --------------------------token刷新失败-------------------------------
          // 携带现在的地址跳回登录页
          window.location.href = "#/login";
          Toast.show('登录过期,请重新登录')
          // 清空token
          removeToken('userToken')
          removeToken('refreshToken')
          // console.log(e)
          return Promise.reject(error)
        }
      } else {
        // ------------------------------没有token---------------------------------
        window.location.href = "#/login";
        Toast.show('未登录,请先登录')
        return Promise.reject(error)
      }
    }
    // ------------------------普通错误提示-------------------------
    Toast.show(error.response.data.message)

    return Promise.reject(error);
  }
)
export { httpRequset };