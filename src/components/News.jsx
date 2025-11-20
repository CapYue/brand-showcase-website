import { useState } from 'react'
import '../styles/news.css'

const News = ({ language }) => {
    const [activeTab, setActiveTab] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const newsData = {
        0: [
            {
                id: 1,
                title: language === 'zh' ? '公司荣获2024年最佳创新企业奖' : 'Company Wins 2024 Best Innovation Award',
                date: '2024-11-15',
                excerpt: language === 'zh' ? '在2024年行业年会上，我公司因在技术创新方面的卓越表现，荣获最佳创新企业奖。' : 'At the 2024 industry conference, our company received the Best Innovation Award for outstanding technological innovation.',
                content: language === 'zh' ? '详细内容：我们的创新团队在人工智能和大数据领域取得了重大突破...' : 'Detailed content: Our innovation team has made significant breakthroughs in AI and big data...'
            },
            {
                id: 2,
                title: language === 'zh' ? '第五代产品正式发布' : 'Fifth Generation Product Official Launch',
                date: '2024-10-20',
                excerpt: language === 'zh' ? '经过两年的研发，我们的第五代旗舰产品今日正式发布，性能提升50%。' : 'After two years of R&D, our fifth-generation flagship product is officially launched with 50% performance improvement.',
                content: language === 'zh' ? '该产品集成了最新的芯片技术和优化的软件算法...' : 'The product integrates the latest chip technology and optimized software algorithms...'
            },
            {
                id: 3,
                title: language === 'zh' ? '签署全球战略合作协议' : 'Sign Global Strategic Cooperation Agreement',
                date: '2024-09-15',
                excerpt: language === 'zh' ? '与国际知名科技公司签署战略合作协议，共同推动行业发展。' : 'Signed a strategic cooperation agreement with a renowned international tech company to advance the industry together.',
                content: language === 'zh' ? '合作内容包括技术交流、市场开拓等多个方面...' : 'Cooperation includes technology exchange, market expansion and other areas...'
            },
            {
                id: 4,
                title: language === 'zh' ? '建立新研发中心' : 'Establish New R&D Center',
                date: '2024-08-10',
                excerpt: language === 'zh' ? '公司在硅谷建立新的研发中心，专注于下一代技术开发。' : 'The company established a new R&D center in Silicon Valley, focusing on next-generation technology development.',
                content: language === 'zh' ? '该中心将招聘500名高级技术人员...' : 'The center will recruit 500 senior technical personnel...'
            },
            {
                id: 5,
                title: language === 'zh' ? '发布企业社会责任报告' : 'Release Corporate Social Responsibility Report',
                date: '2024-07-05',
                excerpt: language === 'zh' ? '2023年度企业社会责任报告发布，展示公司在环保和教育等领域的贡献。' : '2023 Corporate Social Responsibility Report released, showcasing the company\'s contributions to environmental protection and education.',
                content: language === 'zh' ? '报告显示公司在社会责任方面的投入翻倍增长...' : 'The report shows that the company\'s investment in social responsibility has doubled...'
            }
        ],
        1: [
            {
                id: 6,
                title: language === 'zh' ? 'AI技术突破重大进展' : 'Major Breakthrough in AI Technology',
                date: '2024-11-10',
                excerpt: language === 'zh' ? '行业报道：人工智能新算法在识别精度上取得突破性进展。' : 'Industry report: New AI algorithm achieves breakthrough in recognition accuracy.',
                content: language === 'zh' ? '研究显示该算法性能超越现有方案...' : 'Research shows the algorithm outperforms existing solutions...'
            },
            {
                id: 7,
                title: language === 'zh' ? '云计算市场持续增长' : 'Cloud Computing Market Continues to Grow',
                date: '2024-10-25',
                excerpt: language === 'zh' ? '行业分析：2024年云计算市场规模增长30%，企业数字化加速。' : 'Industry analysis: 2024 cloud computing market grew by 30%, enterprise digitalization accelerates.',
                content: language === 'zh' ? '专家预测2025年增长率将进一步加快...' : 'Experts predict growth rate will accelerate further in 2025...'
            },
            {
                id: 8,
                title: language === 'zh' ? '信息安全标准更新' : 'Information Security Standards Updated',
                date: '2024-09-20',
                excerpt: language === 'zh' ? '新的国际信息安全标准发布，对行业规范产生深远影响。' : 'New international information security standards released, with far-reaching impact on industry compliance.',
                content: language === 'zh' ? '各企业需在明年底前完成合规...' : 'Companies need to complete compliance by the end of next year...'
            },
            {
                id: 9,
                title: language === 'zh' ? '物联网应用场景拓展' : 'IoT Application Scenarios Expanded',
                date: '2024-08-15',
                excerpt: language === 'zh' ? '物联网技术在智慧城市建设中得到广泛应用，市场前景广阔。' : 'IoT technology is widely used in smart city construction with broad market prospects.',
                content: language === 'zh' ? '多个城市已启动相关项目建设...' : 'Several cities have launched related projects...'
            },
            {
                id: 10,
                title: language === 'zh' ? '区块链技术发展趋势' : 'Blockchain Technology Development Trends',
                date: '2024-07-10',
                excerpt: language === 'zh' ? '区块链技术在供应链和金融领域应用加速，合规框架逐步完善。' : 'Blockchain technology accelerates application in supply chain and finance with improved regulatory frameworks.',
                content: language === 'zh' ? '预计将成为未来重点发展方向...' : 'Expected to become a key development direction in the future...'
            }
        ]
    }

    const tabs = [
        { name: language === 'zh' ? '企业新闻' : 'Company News', index: 0 },
        { name: language === 'zh' ? '行业资讯' : 'Industry News', index: 1 }
    ]

    const itemsPerPage = 5
    const news = newsData[activeTab]
    const totalPages = Math.ceil(news.length / itemsPerPage)
    const startIdx = currentPage * itemsPerPage
    const visibleNews = news.slice(startIdx, startIdx + itemsPerPage)

    return (
        <section className="news" id="news">
            <div className="container">
                <div className="section-title">
                    <h2>{language === 'zh' ? '新闻动态' : 'News & Updates'}</h2>
                    <p>{language === 'zh' ? '及时掌握公司动态和行业资讯' : 'Stay updated with company news and industry information'}</p>
                </div>

                {/* 新闻分类标签 */}
                <div className="news-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.index}
                            className={`news-tab ${activeTab === tab.index ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab(tab.index)
                                setCurrentPage(0)
                            }}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* 新闻列表 */}
                <div className="news-list">
                    {visibleNews.map((item) => (
                        <article key={item.id} className="news-item">
                            <div className="news-date">{item.date}</div>
                            <div className="news-content">
                                <h3>{item.title}</h3>
                                <p className="news-excerpt">{item.excerpt}</p>
                                <a href="#" className="news-link">
                                    {language === 'zh' ? '查看详情 →' : 'Read More →'}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* 分页控制 */}
                <div className="pagination">
                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                    >
                        ← {language === 'zh' ? '上一页' : 'Previous'}
                    </button>
                    <div className="page-info">
                        {language === 'zh' ? `第 ${currentPage + 1} / ${totalPages} 页` : `Page ${currentPage + 1} / ${totalPages}`}
                    </div>
                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                        disabled={currentPage === totalPages - 1}
                    >
                        {language === 'zh' ? '下一页' : 'Next'} →
                    </button>
                </div>
            </div>
        </section>
    )
}

export default News
