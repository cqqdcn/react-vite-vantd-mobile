import { httpRequset } from "@/utils";
import type { ResType } from "./resType";

// 获取频道列表
export type ChannelsItem = {
  id: number;
  name: string;
}

type ChannelsRes = {
  channels: ChannelsItem[];
}

export const getChannelsApi = () => {
  return httpRequset.get<ResType<ChannelsRes>>("/channels");
}