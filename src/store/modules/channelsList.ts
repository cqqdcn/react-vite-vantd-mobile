import { createSlice, UnknownAction } from "@reduxjs/toolkit"
import { getChannelsApi } from "@/apis/channels"
import { Toast } from 'antd-mobile'

// 定义state中数据的类型
type channelsMyType = {
  id: number,
  name: string
}
type CounterState = {
  channelsMy: channelsMyType[],
  channelsChoice: channelsMyType[]
}

// 初始化state
const initialState: CounterState = {
  //我的频道列表
  channelsMy: JSON.parse(localStorage.getItem("channelsMy") as string) || [],
  //可选列表
  channelsChoice: []
}

const channelsListStore = createSlice({
  name: "channelsList",
  initialState,
  reducers: {
    //首页我的频道列表
    setChannelsMy(state, action) {
      state.channelsMy = action.payload
    },
    //首页可选频道列表
    setChannelsChoice(state, action) {
      state.channelsChoice = action.payload
    },
    //首页移除可选频道方法
    removeChannelsChoice(state, action) {
      state.channelsChoice = action.payload
    }
  }
})
const { setChannelsMy, setChannelsChoice, removeChannelsChoice } = channelsListStore.actions
type Ctype = {
  id: number,
  name: string
}
const getLocachannels = JSON.parse(localStorage.getItem("channelsMy") as string)
const channelsList = () => {
  return async (dispatch: (value: { payload: [] }) => void) => {
    const res = await getChannelsApi()
    const AllChannels = res.data.data.channels
    const channelsMylist = AllChannels.slice(0, 10)
    if (!getLocachannels) {
      localStorage.setItem("channelsMy", JSON.stringify(channelsMylist))
      dispatch(setChannelsMy(channelsMylist))
      const ChoiceList = AllChannels.filter((item) => {
        return !channelsMylist.includes(item)
      })
      dispatch(setChannelsChoice(ChoiceList))
    } else {
      dispatch(setChannelsMy(getLocachannels))
      const ChoiceListwhd = AllChannels.filter((item) => {
        return getLocachannels.findIndex((item2: Ctype) => item.id === item2.id) === -1
      })
      dispatch(setChannelsChoice(ChoiceListwhd))
    }
  }
}

// 添加频道
const addChoiceName = (newVal: channelsMyType[], removeVal: channelsMyType[]) => {
  return (dispatch: (value: UnknownAction) => void) => {
    dispatch(removeChannelsChoice(newVal))
    const newMychannels = JSON.parse(localStorage.getItem("channelsMy") as string)
    const contentArr = [...newMychannels, ...removeVal]
    // 更新本地存储
    localStorage.setItem("channelsMy", JSON.stringify(contentArr))
    dispatch(setChannelsMy(contentArr))
  }
}

//删除我的频道某个值
const removeMychannelsval = (id: number) => {
  const getLocachannels = JSON.parse(localStorage.getItem("channelsMy") as string)
  Toast.show({
    icon: 'success',
    content: '删除成功',
  })
  return (dispatch: (value: UnknownAction) => void) => {
    const newMychannelsval = getLocachannels.filter((item: channelsMyType) => {
      return item.id !== id
    })
    localStorage.setItem("channelsMy", JSON.stringify(newMychannelsval))
    dispatch(setChannelsMy(newMychannelsval))
  }
}

export {
  channelsList,
  addChoiceName,
  removeMychannelsval
}

export default channelsListStore.reducer