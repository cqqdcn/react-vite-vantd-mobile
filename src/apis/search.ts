import { httpRequset } from "@/utils";
import type { ResType } from "./resType";

//获取-搜索结果
export type ParamsType = {
  page?: string,
  per_page?: string,
  q: string
}
export type SearchListItem = {
  art_id: string,
  aut_id: string,
  aut_name: string,
  collect_count: number,
  comm_count: number
  cover: {
    type:number,
    images:string[]
  },
  like_count: number,
  pubdate: string,
  title: string
}
type searchResType = {
  page: number,
  per_page: number,
  results: SearchListItem[],
  total_count: number
}
export const getSearchResApi = (params: ParamsType) => {
  return httpRequset.get<ResType<searchResType>>("/search", { params })
}