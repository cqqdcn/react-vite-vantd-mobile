import { SearchBar, Toast, List } from 'antd-mobile'
import { LeftOutline } from 'antd-mobile-icons'
import './index.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteOutline, CloseOutline } from 'antd-mobile-icons'

const Search = () => {
  const [value, setValue] = useState<string>()
  const navigate = useNavigate()
  const changeSearch = async () => {
    // 获取现有的 localStorage 值
    const search_history = localStorage.getItem('search_history');
    if (value) {
      // 如果 localStorage 中没有值，则直接存储
      const parsedData = search_history !== null ? JSON.parse(search_history) : []
      parsedData.push(value)
      localStorage.setItem('search_history', JSON.stringify(parsedData));
      navigate(`/searchList?text=${value}`)
      return
    }
    Toast.show({
      content: '请输入内容',
    })
  }

  const [historyList, setHistoryList] = useState([])
  // 清除单个历史记录
  const clearHistoryItem = (item: string) => {
    const parsedData = JSON.parse(localStorage.getItem('search_history') || '[]')
    const newData = parsedData.filter((i: string) => i !== item)
    localStorage.setItem('search_history', JSON.stringify(newData))
    setHistoryList(newData)
  }
  useEffect(() => {
    // 获取 localStorage 中的搜索历史
    const search_history = localStorage.getItem('search_history');
    if (search_history) {
      const parsedData = JSON.parse(search_history);
      setHistoryList(parsedData)
    }
  }, [])

  //清除全部历史记录
  const clearHistory = () => {
    localStorage.removeItem('search_history')
    setHistoryList([])
  }
  return (
    <>
      <div className="search">
        <LeftOutline fontSize={18} onClick={() => navigate(-1)} />
        <SearchBar onChange={(e) => setValue(e)} placeholder='请输入内容' style={{ "--border-radius": "20px", "width": "80%" }} />
        <div onClick={changeSearch}>搜索</div>
      </div>
      <div className="history_text">
        <List>
          <List.Item>
            <div className="history_text_item">
              <span>历史记录</span>
              <DeleteOutline onClick={() => clearHistory()}/>
            </div>
          </List.Item>
          {historyList.map((item, index) => (
            <List.Item key={index}>
              <div className="history_text_item">
                <span>{item}</span>
                <CloseOutline fontSize={14} onClick={() => clearHistoryItem(item)} />
              </div>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  )
}
export default Search