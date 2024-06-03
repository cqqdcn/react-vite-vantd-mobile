
// 设置
export function setToken(tokenKey: string, token: string) {
  return localStorage.setItem(tokenKey, JSON.stringify(token))
}
// 获取
export function getToken(tokenKey: string) {
  return JSON.parse(localStorage.getItem(tokenKey) as string)
}
// 删除
export function removeToken(tokenKey: string) {
  return localStorage.removeItem(tokenKey)
}

