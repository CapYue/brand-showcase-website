import { useState } from 'react'
import '../styles/about.css'

const About = ({ language }) => {
    const [selectedYear, setSelectedYear] = useState(0)

    const milestone = [
        { year: 2010, event: language === 'zh' ? '公司成立' : 'Company Founded' },
        { year: 2013, event: language === 'zh' ? '获得行业认证' : 'Industry Certification' },
        { year: 2016, event: language === 'zh' ? '发布核心产品' : 'Core Product Launch' },
        { year: 2019, event: language === 'zh' ? '全球扩展' : 'Global Expansion' },
        { year: 2022, event: language === 'zh' ? '技术突破' : 'Technology Breakthrough' },
        { year: 2024, event: language === 'zh' ? '行业领先' : 'Industry Leader' }
    ]

    const team = [
        {
            name: '张三',
            position: language === 'zh' ? 'CEO & 联合创始人' : 'CEO & Co-founder',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
        },
        {
            name: '李四',
            position: language === 'zh' ? '首席技术官' : 'CTO',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
        },
        {
            name: '王五',
            position: language === 'zh' ? '运营总监' : 'COO',
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
        }
    ]

    return (
        <section className="about" id="about">
            <div className="container">
                {/* 核心定位 */}
                <div className="section-title">
                    <h2>{language === 'zh' ? '关于我们' : 'About Us'}</h2>
                    <p>{language === 'zh' ? '致力于为全球客户提供专业、可靠、创新的解决方案' : 'Committed to providing professional, reliable and innovative solutions to global customers'}</p>
                </div>

                <div className="about-intro">
                    <div className="intro-content">
                        <h3>{language === 'zh' ? '核心价值观' : 'Core Values'}</h3>
                        <p>
                            {language === 'zh'
                                ? '我们坚持以客户为中心，以技术创新为驱动，以人才培养为基础，致力于打造行业标杆企业。凭借十余年的行业经验和专业团队，我们为全球数千家企业提供优质的产品和服务。'
                                : 'We adhere to customer-centric approach, technology innovation as driving force, and talent cultivation as foundation. With over a decade of industry experience and professional teams, we provide quality products and services to thousands of enterprises globally.'}
                        </p>
                        <div className="values-grid">
                            <div className="value-item">
                                <span className="value-icon">🎯</span>
                                <h4>{language === 'zh' ? '专业' : 'Professional'}</h4>
                                <p>{language === 'zh' ? '行业领先的专业实力' : 'Industry-leading expertise'}</p>
                            </div>
                            <div className="value-item">
                                <span className="value-icon">💡</span>
                                <h4>{language === 'zh' ? '创新' : 'Innovation'}</h4>
                                <p>{language === 'zh' ? '不断追求技术突破' : 'Continuous technological breakthroughs'}</p>
                            </div>
                            <div className="value-item">
                                <span className="value-icon">🤝</span>
                                <h4>{language === 'zh' ? '信任' : 'Trust'}</h4>
                                <p>{language === 'zh' ? '用户信任是我们的资本' : 'User trust is our capital'}</p>
                            </div>
                            <div className="value-item">
                                <span className="value-icon">🚀</span>
                                <h4>{language === 'zh' ? '成长' : 'Growth'}</h4>
                                <p>{language === 'zh' ? '与客户共同成长发展' : 'Growing together with customers'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 发展历程时间轴 */}
                <div className="section-divider"></div>

                <div className="milestone-section">
                    <h3 className="milestone-title">{language === 'zh' ? '发展历程' : 'Development Timeline'}</h3>
                    <div className="timeline">
                        {milestone.map((item, index) => (
                            <div
                                key={index}
                                className={`timeline-item ${selectedYear === index ? 'active' : ''}`}
                                onClick={() => setSelectedYear(index)}
                            >
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <h4>{item.year}</h4>
                                    <p>{item.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 核心团队 */}
                <div className="section-divider"></div>

                <div className="team-section">
                    <h3 className="team-title">{language === 'zh' ? '核心团队' : 'Core Team'}</h3>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-member">
                                <div className="member-image">
                                    <img src={member.image} alt={member.name} loading="lazy" />
                                </div>
                                <div className="member-info">
                                    <h4>{member.name}</h4>
                                    <p>{member.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 品牌宣传视频 */}
                <div className="section-divider"></div>

                <div className="video-section">
                    <h3 className="video-title">{language === 'zh' ? '品牌宣传视频' : 'Brand Video'}</h3>
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="600"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Brand Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
