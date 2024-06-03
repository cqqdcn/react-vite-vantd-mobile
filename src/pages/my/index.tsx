import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"
import { RightOutline, BellOutline, HeartOutline, FillinOutline, ShopbagOutline, QuestionCircleOutline, UserSetOutline } from 'antd-mobile-icons'
import { userApi, type UserItem } from "@/apis/user"
import { useEffect, useState } from "react"
const My = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState<UserItem>()
  useEffect(() => {
    const userProfile = async () => {
      const res = await userApi()
      setUserInfo(res.data.data)
    }
    userProfile()
  }, [])
  return (
    <div className={styles.My}>
      <div className={styles.my_top}>
        <div className={styles.my_top_info}>
          <div><img src={userInfo?.photo} alt="" /></div>
          <h3>{userInfo?.name}</h3>
          <p onClick={() => navigate('/my/profile')}>个人信息<RightOutline /></p>
        </div>
        <div className={styles.my_top_list}>
          <div onClick={() => navigate('/my/dongtai')}>
            <p>{userInfo?.art_count}</p>
            <p>动态</p>
          </div>
          <div onClick={() => navigate('/my/Fans?type=gz')}>
            <p>{userInfo?.follow_count}</p>
            <p>关注</p>
          </div>
          <div onClick={() => navigate('/my/Fans?type=fs')}>
            <p>{userInfo?.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div>
            <p>{userInfo?.like_count}</p>
            <p>被赞</p>
          </div>
        </div>
      </div>
      <div className={styles.my_main}>
        <div className={styles.my_main_item}>
          <BellOutline fontSize={25} />
          <p>消息通知</p>
        </div>
        <div className={styles.my_main_item}>
          <HeartOutline fontSize={25} />
          <p>我的收藏</p>
        </div>
        <div className={styles.my_main_item}>
          <FillinOutline fontSize={25} />
          <p>阅读历史</p>
        </div>
        <div className={styles.my_main_item}>
          <ShopbagOutline fontSize={25} />
          <p>我的作品</p>
        </div>
      </div>
      <div className={styles.my_main}>
        <div className={styles.my_main_item}>
          <QuestionCircleOutline fontSize={25} />
          <p>用户反馈</p>
        </div>
        <div className={styles.my_main_item}>
          <UserSetOutline fontSize={25} />
          <p>小智同学</p>
        </div>
        <div className={styles.my_main_item}></div>
        <div className={styles.my_main_item}></div>
      </div>
    </div>
  )
}
export default My