import { httpRequset } from "@/utils";
import type { ResType } from "./resType";

// 注册登录
export type UserLoginItem = {
  token: string;
  refresh_token: string;
}
export type UserLoginParams = {
  mobile: string;
  code: string;
}

export const userLoginApi = (params: UserLoginParams) => {
  return httpRequset.post<ResType<UserLoginItem>>("/authorizations", params);
}
//刷新token
export type UserRefreshItem = {
  token: string;
}
export const userRefreshApi = (refresh_token: string) => {
  return httpRequset({
    method: 'put',
    url: '/authorizations',
    headers: { Authorization: 'Bearer ' + refresh_token }
  })
}
//获取-用户基本资料
export type UserItem = {
  /**
    * 用户发布文章数量
    */
  art_count: number;
  /**
   * 用户粉丝数量
   */
  fans_count: number;
  /**
   * 用户关注他人数量
   */
  follow_count: number;
  /**
   * 用户id
   */
  id: string;
  /**
   * 用户简介
   */
  intro: null;
  /**
   * 用户被点赞数
   */
  like_count: number;
  /**
   * 用户名
   */
  name: string;
  /**
   * 用户头像
   */
  photo: string;
}
export const userApi = () => {
  return httpRequset.get<ResType<UserItem>>("/user");
}

//获取-用户个人简介
export type UserProfileItem = {
  /**
   * 用户生日，格式'2000-01-01'
   */
  birthday: string;
  /**
   * 用户性别，0男1女
   */
  gender: number;
  /**
   * 用户id
   */
  id: string;
  /**
   * 用户手机号
   */
  mobile: string;
  /**
   * 用户名
   */
  name: string;
  /**
   * 用户头像
   */
  photo: string;
  intro: string;
}
export const userProfileApi = () => {
  return httpRequset.get<ResType<UserProfileItem>>("/user/profile");
}

//更新-用户头像
type UserAvatarItem = {
  photo: string;
}
export const userPictureApi = (params: FormData) => {
  return httpRequset.patch<ResType<UserAvatarItem>>("/user/photo", params);
}

//更新-用户个人简介
export type UserUpdateprofileItem = {
  /**
   * 用户生日，格式'2000-01-01'
   */
  birthday?: string;
  /**
   * 用户性别，0男1女
   */
  gender?: number;
  /**
   * 用户个人介绍
   */
  intro?: string;
  /**
   * 用户昵称
   */
  name?: string;
  /**
   * 用户真实姓名
   */
  real_name?: string;
}
export const userUpdateprofileApi = (params: UserUpdateprofileItem) => {
  return httpRequset.patch<ResType<UserUpdateprofileItem>>("/user/profile", params);
}










