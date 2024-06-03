//// @ts-nochec
import { Popup, Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { addChoiceName, removeMychannelsval } from "@/store/modules/channelsList"
import { CloseCircleFill } from 'antd-mobile-icons'
import { useState } from 'react'

const HomePopup = ({ popup, setPopupFn, tabID, onChangeGetid, onFirstId }:
  { popup: boolean, setPopupFn: (value: boolean) => void, tabID: string, onChangeGetid: (value: string) => void, onFirstId: (value: string) => void }) => {
  const { channelsMy, channelsChoice } = useSelector((state: RootState) => state.channelsList)
  const dispatch = useDispatch()
  type channelsMyType = {
    id: number,
    name: string
  }
  //点击删除可选频道列表项
  const addChoiceNamere = (id: number) => {
    //拿到首页可选频道最新列表
    const newChannelsChoice: channelsMyType[] = [...channelsChoice]
    //获取首页可选频道列表中删除的项的下标
    const indexId = newChannelsChoice.findIndex(item => item.id === id)
    //得到删除的项
    const removeVal: channelsMyType[] = newChannelsChoice.splice(indexId, 1)
    //通过dispatch派发action触发
    dispatch(addChoiceName(newChannelsChoice, removeVal))
    Toast.show({
      icon: 'success',
      content: '添加成功',
    })
  }

  //取消某个添加的频道
  const removeChoiceNamere = async (id: number, event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    await dispatch(removeMychannelsval(id))
    onFirstId(JSON.parse(localStorage.getItem('channelsMy') as string)[0].id)
  }

  //控制显示完成/编辑
  const [show, setshow] = useState(false)
  return (
    <div>
      <Popup
        position='left'
        visible={popup}
        showCloseButton
        onClose={() => {
          setPopupFn(false)
        }}
        bodyStyle={{ "width": "100%" }}
      >
        <div className="popup">
          <div className="popup_1">
            <h3>我的频道：</h3>
            <div>
              <span>点击进入频道</span>
              <p onClick={() => setshow(!show)} className={show ? 'show_active' : ''}>{show ? '完成' : '编辑'}</p>
            </div>
          </div>
          <div className="popup_2">
            {channelsMy.map(item => (
              <p key={item.id} className={Number(tabID) === item.id ? 'popup_active' : ''}
                onClick={() => onChangeGetid(item.id + '')}
              >{item.name}{show ? <span onClick={(e) => removeChoiceNamere(item.id, e)}><CloseCircleFill fontSize={18} color='#CFD1D8' /></span> : ''}</p>
            ))}
          </div>
          <div className="popup_1">
            <h3>可选频道：</h3>
          </div>
          <div className="popup_2">
            {channelsChoice.map(item => (
              <p key={item.id} onClick={() => addChoiceNamere(item.id)}>+{item.name}</p>
            ))}
          </div>
        </div>
      </Popup>
    </div>
  )
}
export default HomePopup