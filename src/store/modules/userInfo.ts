import { createSlice } from "@reduxjs/toolkit";
import { userLoginApi, type UserLoginParams } from "@/apis/user";
// import { Toast } from 'antd-mobile'
import { setToken } from "@/utils/useToken";

//用户信息仓库
const userInfoStore = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: {}, // 用户信息
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    }
  }
})

// 导出action
export const { setUserInfo } = userInfoStore.actions

//异步方法
const login = (params: UserLoginParams) => {
  return async () => {
    const res = await userLoginApi(params)
    console.log(res);
    if (res.status === 201) {
      setToken('userToken', res.data.data.token)
      setToken('refreshToken', res.data.data.refresh_token)
      setUserInfo(res.data.data)
    }
  }
}


export {
  login
}

export default userInfoStore.reducer;