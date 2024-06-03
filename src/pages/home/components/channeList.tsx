import { InfiniteScroll, List } from 'antd-mobile'
import { getArticleListApi, type GetListParams, type RticleListRes } from "@/apis/article"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TimeSet from "@/components/timeSet"

const ChanneList = ({ id }: { id: string }) => {
  const [articleList, setArticleList] = useState<RticleListRes>({
    results: [],
    pre_timestamp: ''
  })
  // 获取文章列表
  useEffect(() => {
    const param: GetListParams = {
      channel_id: id,
      timestamp: new Date().getTime() + ''
    }
    const getArticleList = async () => {
      const res = await getArticleListApi(param)
      setArticleList({
        results: res.data.data.results,
        pre_timestamp: res.data.data.pre_timestamp
      })
    }
    getArticleList()
  }, [id])
  // 加载更多
  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
    if (!articleList.pre_timestamp) {
      return
    }
    try {
      const param: GetListParams = {
        channel_id: id,
        timestamp: articleList.pre_timestamp
      }
      const res = await getArticleListApi(param)
      setArticleList({
        results: [...articleList.results, ...res.data.data.results],
        pre_timestamp: res.data.data.pre_timestamp
      })
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
    navigate(`detail?art_id=${id}`)// 传递参数
  }

  return (
    <>
      <List>
        {articleList.results.map(item =>
          <List.Item arrow={false} className="channel_list" key={item.art_id} onClick={() => toDetail(item.art_id)}>
            <div className={item.cover.type === 1 ? 'channel_list_item list_on' : 'channel_list_item'}>
              <h3 className={item.cover.type !== 1 ? 'list_wid' : ''}>{item.title}</h3>
              <div className={item.cover.type === 1 ? 'channel_list_img one_pic' : 'channel_list_img'} style={{ display: item.cover.type === 0 ? 'none' : '' }}>
                {item.cover.images?.map(itempic => (
                  <div className={item.cover.type !== 1 ? 'list_pic' : ''} key={itempic}><img src={itempic} alt="" /></div>
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
    </>
  )
}
export default ChanneList