import { useState, useCallback, useEffect } from 'react'
import { DatePicker, Toast, List } from 'antd-mobile'
import dayjs from "dayjs"
import { userUpdateprofileApi } from '@/apis/user'

const now = new Date()
const Birthday = ({ birthdayTime }: { birthdayTime: string }) => {
  const [visible, setVisible] = useState(false)
  const [dataTime, setDataTime] = useState('')
  const labelRenderer = useCallback((type: string, data: number) => {
    switch (type) {
      case 'year':
        return data + '年'
      case 'month':
        return data + '月'
      case 'day':
        return data + '日'
      case 'hour':
        return data + '时'
      case 'minute':
        return data + '分'
      case 'second':
        return data + '秒'
      default:
        return data
    }
  }, [])
  useEffect(() => {
    setDataTime(dayjs(birthdayTime).format("YYYY-MM-DD"))
  }, [birthdayTime])
  return (
    <>
      <List.Item extra={dataTime} clickable onClick={() => setVisible(true)}>
        生日
      </List.Item>
      <DatePicker
        title='时间选择'
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        defaultValue={now}
        max={now}
        onConfirm={async val => {
          const timeChoice = dayjs(val).format("YYYY-MM-DD")
          setDataTime(timeChoice)
          const res = await userUpdateprofileApi({ birthday: timeChoice })
          if (res.data.message === "OK") {
            Toast.show({
              content: '修改成功',
              icon: 'success',
              duration: 1000,
            })
          }
        }}
        renderLabel={labelRenderer}
      />
    </>
  )
}
export default Birthday