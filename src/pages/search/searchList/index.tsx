import ComeBack from "@/components/comeBack"
import { List, InfiniteScroll } from 'antd-mobile'
import { getSearchResApi, type SearchListItem, type ParamsType } from "@/apis/search"
import TimeSet from "@/components/timeSet"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useActivate, useUnactivate } from 'react-activation'

const SearchList = () => {
  const [searchList, setSearchList] = useState<SearchListItem[]>([])
  const [params] = useSearchParams()
  const text = params.get("text")

  // 加载更多
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(2)
  const loadMore = async () => {
    if (searchList.length === 0) {
      return
    }
    setPage(page + 1)
    try {
      const params: ParamsType = {
        page: page + '',
        per_page: 10 + '',
        q: text + ''
      }
      const res = await getSearchResApi(params)
      setSearchList([...searchList, ...res.data.data.results])
      if (res.data.data.results.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      throw new Error('fetch list error')
    }
  }

  // 跳转详情
  const navigate = useNavigate()
  const toDetail = (id: string) => {
    navigate(`/detail?art_id=${id}`)// 传递参数
  }

  useEffect(() => {
    const getSearchRes = async () => {
      const params: ParamsType = {
        page: 1 + '',
        per_page: 10 + '',
        q: text + ''
      }
      const res = await getSearchResApi(params)
      setSearchList(res.data.data.results)
    }
    getSearchRes()
  }, [text])

  useActivate(() => {
    console.log('TestFunction: didActivate');
  })

  useUnactivate(() => {
    console.log('TestFunction: willUnactivate')
  })

  return (
    <>
      <div>
        <ComeBack title="搜索结果" />
      </div>
      <div>
        <div className="">
          <List>
            {searchList.map(item =>
              <List.Item arrow={false} className="channel_list" key={item.art_id} onClick={() => toDetail(item.art_id)}>
                <div className={item.cover.type === 1 ? 'channel_list_item list_on' : 'channel_list_item'}>
                  <h3 className={item.cover.type !== 1 ? 'list_wid' : ''}>{item.title}</h3>
                  <div className={item.cover.type === 1 ? 'channel_list_img one_pic' : 'channel_list_img'} style={{ display: item.cover.type === 0 ? 'none' : '' }}>
                    {item.cover.images?.map((itempic, index) => (
                      <div className={item.cover.type !== 1 ? 'list_pic' : ''} key={index}><img src={itempic} alt="" /></div>
                    ))}
                  </div>
                </div>
                <div className="channel_list_time">
                  <span>{item.pubdate}</span>
                  <span>{item.comm_count}评论</span>
                  <span><TimeSet date={new Date(item.pubdate)} /></span>
                </div>
              </List.Item>
            )}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
        </div>
      </div>
    </>
  )
}
export default SearchList