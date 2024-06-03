//封装高阶组件
//核心逻辑 有token 返回组件 没有token 返回登录页面

import { Navigate } from "react-router-dom"
import { getToken } from "../utils/useToken"
export function AutoRoute({ children }: { children: React.ReactNode }) {
  const islogin = getToken('userToken')
  if (islogin) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}