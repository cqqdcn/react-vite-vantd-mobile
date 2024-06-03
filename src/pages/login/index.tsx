import { NavBar } from "antd-mobile"
import { useNavigate } from "react-router-dom";
import { type UserLoginParams } from "@/apis/user";
import {
  Form,
  Input,
  Button,
} from 'antd-mobile'
import './index.scss'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/modules/userInfo";
import { Toast } from 'antd-mobile'
import { AppDispatch } from "@/store"

const Login = () => {
  const navigate = useNavigate()
  const back = () => {
    navigate('/')
  }
  //表单验证成功后
  const dispacth: AppDispatch = useDispatch()
  const onFormSubmit = async (val: UserLoginParams) => {
    try {
      await dispacth(login(val))
      Toast.show({ icon: 'success', content: '登录成功', })
      navigate('/')
    }
    catch (error) {
      console.log(error);
      
      Toast.show('手机号或验证码错误')
    }
  }

  const [count, setCount] = useState(60)
  const [isStart, setIsStart] = useState(false)
  //发送验证码
  const onSendinfo = () => {
    console.log('发送验证码');
    setIsStart(true)
  }
  useEffect(() => {
    if (isStart) {
      const timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
      if (count === 0) {
        clearInterval(timer)
        setIsStart(false)
        setCount(4)
      }
      return () => {
        clearInterval(timer)
      }
    }
  }, [isStart, count])

  return (
    <div>
      <div className="login_comBack">
        <NavBar onBack={back}></NavBar>
      </div>
      <div className="login_main">
        <h1>短信登录</h1>
        <Form onFinish={(e) => onFormSubmit(e)}>
          <Form.Item
            name='mobile'
            rules={[{ required: true, message: '手机号不正确', pattern: /^1[3-9]\d{9}$/ }]}
          >
            <Input placeholder='请输入手机号' />
          </Form.Item>
          <Form.Item
            name='code'
            extra={isStart ? <a>{count}秒后获取</a> : <a onClick={onSendinfo}>发送验证码</a>}
            rules={[{ required: true, message: '验证码不能为空' }]}
          >
            <Input placeholder='请输入验证码' />
          </Form.Item>
          <Button className="button" block type='submit' color='primary' size='large'>
            提交
          </Button>
        </Form>
      </div>
    </div>
  )
}
export default Login