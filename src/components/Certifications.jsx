import { useState } from 'react'
import '../styles/certifications.css'

const Certifications = ({ language }) => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [sortBy, setSortBy] = useState('important')

    const certifications = [
        {
            id: 1,
            title: language === 'zh' ? 'ISO 9001 质量管理体系认证' : 'ISO 9001 Quality Management Certification',
            category: language === 'zh' ? '国际认证' : 'International',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop',
            importance: 10,
            year: 2020
        },
        {
            id: 2,
            title: language === 'zh' ? 'ISO 27001 信息安全管理体系' : 'ISO 27001 Information Security Management',
            category: language === 'zh' ? '安全认证' : 'Security',
            image: 'https://images.unsplash.com/photo-1516534775068-bb57100162b4?w=400&h=400&fit=crop',
            importance: 9,
            year: 2021
        },
        {
            id: 3,
            title: language === 'zh' ? '国家高新技术企业认证' : 'National High-Tech Enterprise Certificate',
            category: language === 'zh' ? '政府认证' : 'Government',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
            importance: 10,
            year: 2019
        },
        {
            id: 4,
            title: language === 'zh' ? '发明专利授权证书' : 'Invention Patent Certificate',
            category: language === 'zh' ? '专利' : 'Patent',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop',
            importance: 8,
            year: 2022
        },
        {
            id: 5,
            title: language === 'zh' ? '行业创新奖' : 'Industry Innovation Award',
            category: language === 'zh' ? '奖项' : 'Award',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop',
            importance: 7,
            year: 2023
        },
        {
            id: 6,
            title: language === 'zh' ? '产品设计奖' : 'Product Design Award',
            category: language === 'zh' ? '奖项' : 'Award',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
            importance: 6,
            year: 2023
        }
    ]

    const sortedCerts = [...certifications].sort((a, b) => {
        if (sortBy === 'important') {
            return b.importance - a.importance
        } else if (sortBy === 'latest') {
            return b.year - a.year
        }
        return 0
    })

    return (
        <section className="certifications" id="tech">
            <div className="container">
                <div className="section-title">
                    <h2>{language === 'zh' ? '资质荣誉' : 'Certifications & Awards'}</h2>
                    <p>{language === 'zh' ? '行业认可，品质保证' : 'Industry recognition, quality guaranteed'}</p>
                </div>

                {/* 排序按钮 */}
                <div className="sort-controls">
                    <button
                        className={`sort-btn ${sortBy === 'important' ? 'active' : ''}`}
                        onClick={() => setSortBy('important')}
                    >
                        {language === 'zh' ? '按重要程度' : 'By Importance'}
                    </button>
                    <button
                        className={`sort-btn ${sortBy === 'latest' ? 'active' : ''}`}
                        onClick={() => setSortBy('latest')}
                    >
                        {language === 'zh' ? '按时间最新' : 'By Latest'}
                    </button>
                </div>

                {/* 认证展示网格 */}
                <div className="certs-grid">
                    {sortedCerts.map((cert) => (
                        <div
                            key={cert.id}
                            className="cert-card"
                            onClick={() => setSelectedImage(cert)}
                        >
                            <div className="cert-image">
                                <img src={cert.image} alt={cert.title} loading="lazy" />
                                <div className="cert-overlay">
                                    <button className="zoom-btn">
                                        {language === 'zh' ? '查看大图' : 'View Large'}
                                    </button>
                                </div>
                            </div>
                            <div className="cert-info">
                                <h4>{cert.title}</h4>
                                <p className="cert-category">{cert.category}</p>
                                <p className="cert-year">{cert.year}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 图片放大Modal */}
                {selectedImage && (
                    <div className="image-modal" onClick={() => setSelectedImage(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
                            <img src={selectedImage.image} alt={selectedImage.title} />
                            <div className="modal-desc">
                                <h3>{selectedImage.title}</h3>
                                <p>{selectedImage.category} - {selectedImage.year}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Certifications
