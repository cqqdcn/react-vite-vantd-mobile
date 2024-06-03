import { ActionSheet, Toast } from 'antd-mobile'
import { useEffect, useState } from "react"
import { List } from 'antd-mobile'
import { userUpdateprofileApi } from '@/apis/user'

const Photo = ({ gender }: { gender: number }) => {
  const [visible, setVisible] = useState(false)
  const actions = [
    {
      text: '男', key: 0
    },
    {
      text: '女', key: 1
    },
  ]
  const [genderNum, setGenderNum] = useState<number>()
  const getGenderNum = async (num: number) => {
    const res = await userUpdateprofileApi({ gender: num })
    if (res.data.message === "OK") {
      Toast.show({
        icon: 'success',
        content: '修改成功',
        duration: 1000,
      })
      setGenderNum(num)
      setVisible(false)
    }
  }
  useEffect(() => {
    setGenderNum(gender)
  }, [gender])

  return (
    <>
      <List.Item extra={genderNum === 0 ? '男' : '女'} clickable onClick={() => setVisible(true)}>
        性别
      </List.Item>
      <ActionSheet
        cancelText='取消'
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        onAction={action => {
          if (action.key === 0 || action.key === 1) {
            getGenderNum(action.key)
          }
        }}
      />
    </>
  )
}
export default Photo