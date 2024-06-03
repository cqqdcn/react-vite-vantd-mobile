import ComeBack from "@/components/comeBack"
import { List } from 'antd-mobile'
import styles from '../index.module.scss'
import Photo from "./components/photo"
import UserName from "./components/userName"
import Sex from "./components/sex"
import { userProfileApi, type UserProfileItem, type UserUpdateprofileItem } from "@/apis/user"
import { useEffect, useState, } from "react"
import Birthday from "./components/birthday"

const Profile = () => {
  const [userProfileinfo, setUserProfileinfo] = useState<UserProfileItem>()
  useEffect(() => {
    const userProfile = async () => {
      const res = await userProfileApi()
      setUserProfileinfo(res.data.data)
      console.log(res.data.data);
    }
    userProfile()
  }, [])
  const childenFun = (val: UserUpdateprofileItem) => {
    setUserProfileinfo({ ...userProfileinfo, ...val })
  }
  return (
    <div>
      <ComeBack title="个人信息" />
      <div>
        <List>
          <Photo pic={userProfileinfo?.photo as string}></Photo>
        </List>
        <List>
          <UserName onChildenFun={childenFun} titleName={'name'} title={'昵称'} value={userProfileinfo?.name as string}></UserName>
        </List>
        <List>
          <UserName onChildenFun={childenFun} titleName={'intro'} title={'简介'} value={userProfileinfo?.intro as string}></UserName>
        </List>
        <div className={styles.bg}></div>
        <List>
          <Sex gender={userProfileinfo?.gender as number}></Sex>
        </List>
        <List>
          <Birthday birthdayTime={userProfileinfo?.birthday as string}></Birthday>
        </List>
      </div>
    </div>
  )
}
export default Profile