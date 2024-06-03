import { configureStore } from "@reduxjs/toolkit";
import channelsListStore from "./modules/channelsList";
import userInfoStore from "./modules/userInfo";

const store = configureStore({
  reducer: {
    channelsList: channelsListStore,
    //用户信息仓库
    userInfo: userInfoStore
  },
})
// 后续使用useSelector时参数state的类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;