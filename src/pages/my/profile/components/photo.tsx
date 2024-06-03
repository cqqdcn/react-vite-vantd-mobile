import { ActionSheet, Toast } from 'antd-mobile'
import { ChangeEvent, useRef, useState } from "react"
import { List } from 'antd-mobile'
import styles from '../../index.module.scss'
import { userPictureApi } from '@/apis/user'

const Photo = ({ pic }: { pic: string }) => {
  const [visible, setVisible] = useState(false)

  const input = useRef<HTMLInputElement>(null)
  const actions = [
    {
      text: '拍照', key: 'photo', onClick: () => {
        input.current?.click()
      }
    },
    {
      text: '本地选择', key: 'Local', onClick: () => {
        input.current?.click()
      }
    },
  ]
  const [photoPic, setPhotoPic] = useState('')
  const getInputFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      Toast.show({
        icon: "success",
        content: "请选择头像",
        duration: 600,
      });
      return
    }
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('photo', file)
    console.log(formData);
    const res = await userPictureApi(formData)
    setPhotoPic(res.data.data.photo)
    Toast.show({
      icon: "success",
      content: "头像上传成功",
      duration: 600,
    });
    setVisible(false)
  }

  return (
    <>
      <List.Item
        extra={<img src={!photoPic ? pic : photoPic}
          className={styles.avatar} />} clickable onClick={() => setVisible(true)}>
        头像
      </List.Item>
      <ActionSheet
        cancelText='取消'
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
      />
      <input onChange={e => getInputFile(e)} ref={input} type="file" style={{ display: 'none' }} />
    </>
  )
}
export default Photo