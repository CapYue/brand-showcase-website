import { useOutletContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { updateMetaTags } from '../utils/seo'
import { apiClient } from '../utils/apiClient'
import '../styles/news.css'

function NewsPage() {
    const { language } = useOutletContext()
    const [news, setNews] = useState([])
    const [selectedType, setSelectedType] = useState('all')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        updateMetaTags({
            title: language === 'zh' ? '新闻动态' : 'News',
        })
        loadNews()
    }, [language, selectedType, page])

    const loadNews = async () => {
        try {
            setLoading(true)
            const data = await apiClient.getNews(selectedType === 'all' ? 'all' : selectedType, page)
            setNews(data.data || [])
        } catch (error) {
            console.error('Failed to load news:', error)
        } finally {
            setLoading(false)
        }
    }

    const newsTypes = ['all', '企业新闻', '行业资讯']

    return (
        <div className="news-page page-container">
            <div className="page-header">
                <h1>{language === 'zh' ? '新闻动态' : 'News'}</h1>
            </div>
            <div className="news-filter">
                {newsTypes.map(type => (
                    <button key={type} className={`news-type-btn ${selectedType === type ? 'active' : ''}`} onClick={() => setSelectedType(type)}>
                        {type === 'all' ? (language === 'zh' ? '全部' : 'All') : type}
                    </button>
                ))}
            </div>
            {loading ? <div>{language === 'zh' ? '加载中...' : 'Loading...'}</div> : (
                <div className="news-list">
                    {news.map(item => (
                        <div key={item.id} className="news-card">
                            <h3>{item.title}</h3>
                            <p>{item.summary}</p>
                            <div className="news-meta">{item.date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NewsPage