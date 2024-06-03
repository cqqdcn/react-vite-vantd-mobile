import { NavBar, Divider } from "antd-mobile"
import { useNavigate } from "react-router-dom";
const ComeBack = ({ title }: { title: string }) => {
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }
  return (
    <>
      <div className="comeBack">
        <NavBar back='返回' onBack={back}>
          {title}
        </NavBar>
        <Divider style={{ margin: 0 }} />
      </div>
      <div className="comeBack-line"></div>
    </>
  )
}
export default ComeBack