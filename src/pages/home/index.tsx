import { useEffect, useState } from "react"
import "./index.scss"
import { Tabs } from 'antd-mobile'
import { SearchOutline, AppstoreOutline } from 'antd-mobile-icons'
import ChanneList from "./components/channeList"
import { useNavigate } from "react-router-dom"
import HomePopup from "./components/homePopup"
import { useSelector, useDispatch } from "react-redux"
import { channelsList } from "@/store/modules/channelsList"
// redux仓库类型引入
import { RootState, AppDispatch } from '@/store'

const Home = () => {
  const { channelsMy } = useSelector((state: RootState) => state.channelsList)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(channelsList())
  }, [dispatch])
  const navigate = useNavigate()
  //弹出框
  const [popup, setPopup] = useState(false)
  const setPopupFn = (val: boolean) => {
    setPopup(val)
  }
  //判断首次进入是否有值
  const whd = !JSON.parse(localStorage.getItem('channelsMy') as string) ? 0 : JSON.parse(localStorage.getItem('channelsMy') as string)[0].id
  //tabs切换获取ID
  const [gettabid, Setgettabid] = useState(whd + '')
  const onChangeGetid = (val: string) => {
    Setgettabid(val)
    setPopup(false)
  }
  //子传父，改变删除后默认第一个id
  const onFirstId = (val: string) => {
    Setgettabid(val)
  }
  return (
    <div className="home">
      <Tabs onChange={val => onChangeGetid(val)} activeKey={gettabid + ''} defaultActiveKey={gettabid + ''} style={{ "--content-padding": "0 50px 0 0", "--title-font-size": "15px" }}>
        {channelsMy.map((item) =>
          <Tabs.Tab title={item.name} key={item.id}>
            {/* 频道内容 */}
            <div className="contentMain"><ChanneList id={gettabid + ''} /></div>
          </Tabs.Tab>
        )}
      </Tabs>
      <div className="tab_top">
        <div className="search" onClick={() => navigate("/search")}><SearchOutline fontSize={20} /></div>
        <div className="tab_nav" onClick={() => setPopup(true)}><AppstoreOutline fontSize={20} /></div>
      </div>
      <HomePopup popup={popup} setPopupFn={setPopupFn} tabID={gettabid} onChangeGetid={onChangeGetid} onFirstId={onFirstId}></HomePopup>
    </div>
  )
}
export default Home