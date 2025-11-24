import { useParams, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMetaTags } from '../utils/seo'
import { apiClient } from '../utils/apiClient'
import '../styles/news.css'

function NewsDetailPage() {
    const { id } = useParams()
    const { language } = useOutletContext()
    const navigate = useNavigate()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadNews()
    }, [id])

    const loadNews = async () => {
        try {
            setLoading(true)
            const data = await apiClient.getNews()
            const news = data.data?.find(n => n.id == id) || data.find(n => n.id == id)
            setArticle(news)
        } catch (error) {
            console.error('Failed to load news:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>{language === 'zh' ? '加载中...' : 'Loading...'}</div>
    if (!article) return <div>{language === 'zh' ? '新闻不存在' : 'News not found'}</div>

    return (
        <div className="news-detail-page page-container">
            <article className="news-detail">
                <header>
                    <h1>{article.title}</h1>
                    <div className="article-meta">
                        <span className="type">{article.type}</span>
                        <span className="date">{article.date}</span>
                    </div>
                </header>
                <div className="article-content">
                    <p>{article.content || article.summary}</p>
                </div>
            </article>
        </div>
    )
}

export default NewsDetailPage