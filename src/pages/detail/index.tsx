import ComeBack from "@/components/comeBack"
import { getArticleMainApi, type ArticleDetailRes } from "@/apis/article"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
const Detail = () => {
  const [detail, setDetail] = useState<ArticleDetailRes>()
  const [params] = useSearchParams()
  const article_id = params.get('art_id')
  useEffect(() => {
    const articleApi = async () => {
      const res = await getArticleMainApi(article_id!)
      setDetail(res.data.data)
    }
    articleApi()
  }, [article_id])
  return (
    <div>
      <ComeBack title={detail?.title as string}></ComeBack>
      <h1>{detail?.title}</h1>
    </div>
  )
}
export default Detail