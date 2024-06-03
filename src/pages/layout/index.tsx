import { Outlet, useNavigate } from "react-router-dom"
import { Badge, TabBar } from 'antd-mobile'
import "./index.scss"
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const Layout = () => {
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('')
  const location = useLocation()
  useEffect(() => {
    setActiveKey(location.pathname)
  }, [location.pathname])
  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: '/CallList',
      title: '问答',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: '/video',
      title: '视频',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: '/my',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const currentTab = (value: string) => {
    console.log(value);
    navigate(value)
  }

  return (
    <div>
      <div className="container">
        <Outlet />
      </div>
      <div className="bottom_tabbar">
        <TabBar activeKey={activeKey} onChange={value => currentTab(value)}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
export default Layout