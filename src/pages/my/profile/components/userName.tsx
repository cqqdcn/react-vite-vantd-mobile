import { List, Popup, TextArea, Divider, Toast } from 'antd-mobile'
import { useState, useEffect } from 'react'
import { LeftOutline } from 'antd-mobile-icons'
import style from '../../index.module.scss'
import { userUpdateprofileApi,type UserUpdateprofileItem } from '@/apis/user'

const UserName = ({ title, value, titleName, onChildenFun }:
  {
    title: string, value: string, titleName: string,
    onChildenFun: (value: UserUpdateprofileItem) => void
  }) => {
  const [text, setText] = useState('')
  const [visibleCloseRight, setVisibleCloseRight] = useState(false)
  //提交修改
  const submitModify = async () => {
    const res = await userUpdateprofileApi({ [titleName]: textArea })
    if (res.data.message == 'OK') {
      onChildenFun({ [titleName]: textArea })
      Toast.show({
        icon: 'success',
        content: '修改成功',
        duration: 1000,
      })
      setVisibleCloseRight(false)
    }
  }
  const [textArea, setTextArea] = useState('')
  useEffect(() => {
    setText(value)
  }, [value])
  return (
    <>
      <List.Item extra={text} clickable onClick={() => setVisibleCloseRight(true)}>
        {title}
      </List.Item>
      <Popup
        position='right'
        visible={visibleCloseRight}
        onClose={() => {
          setVisibleCloseRight(false)
        }}
      >
        <div className={style.popup_title}>
          <LeftOutline onClick={() => setVisibleCloseRight(false)} />
          <h3>编辑{title}</h3>
          <div onClick={() => submitModify()}>提交</div>
        </div>
        <Divider style={{ margin: 0 }} />
        <div className={style.popup_content}>
          {title === '昵称' ?
            <TextArea
              defaultValue={text}
              id={style.textArea}
              style={{ backgroundColor: '#F7F8FA' }}
              onChange={e => setTextArea(e)}
            /> : <TextArea
              autoSize={true}
              defaultValue={text}
              showCount
              maxLength={200}
              id={style.textArea}
              style={{ backgroundColor: '#F7F8FA' }}
              onChange={e => setTextArea(e)}
            />
          }
        </div>
      </Popup>
    </>
  )
}
export default UserName