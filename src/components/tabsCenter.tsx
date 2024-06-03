import ComeBack from "@/components/comeBack"
import { Tabs } from 'antd-mobile'
import { useEffect, useState } from "react"
type Tab = {
  title: string
}
type Props = {
  tabValue: Tab[],
  children: JSX.Element[]
}
const TabsCenter = (props: Props) => {
  const [tabList, setTabList] = useState<Tab[]>([])
  useEffect(() => {
    setTabList(props.tabValue)
  }, [props.tabValue])
  return (
    <>
      <ComeBack title={"我的动态"}></ComeBack>
      <Tabs defaultActiveKey='0' style={{ '--title-font-size': '16px' }}>
        {tabList.map((item, index) =>
          <Tabs.Tab title={item.title} key={index} style={{ flex: 'none' }}>
            {props.children[index]}
          </Tabs.Tab>
        )}
      </Tabs>
    </>
  )
}
export default TabsCenter