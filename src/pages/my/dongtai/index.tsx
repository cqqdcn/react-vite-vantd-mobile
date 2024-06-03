
// import { useState } from "react"
import TabsCenter from "@/components/tabsCenter"

const Dongtai = () => {
  const tabValue = [{ title: '作品' }, { title: '公告' }, { title: '数据' }]
  return (
    <>
      <TabsCenter tabValue={tabValue}>
        <div className="zuopin">
          123
        </div>
        <div className="gonggao">
          456
        </div>
        <div className="shuju">
          789
        </div>
      </TabsCenter>
    </>
  )
}
export default Dongtai