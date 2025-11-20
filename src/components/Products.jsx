import { useState } from 'react'
import '../styles/products.css'

const Products = ({ language }) => {
    const [activeCategory, setActiveCategory] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const categories = [
        { id: 0, name: language === 'zh' ? '硬件产品' : 'Hardware', icon: '📱' },
        { id: 1, name: language === 'zh' ? '软件解决方案' : 'Software', icon: '💻' },
        { id: 2, name: language === 'zh' ? '云服务' : 'Cloud Services', icon: '☁️' },
        { id: 3, name: language === 'zh' ? '行业解决方案' : 'Solutions', icon: '🎯' }
    ]

    const products = {
        0: [
            {
                id: 1,
                name: language === 'zh' ? '旗舰智能设备 X1' : 'Flagship Smart Device X1',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
                description: language === 'zh' ? '搭载最新AI芯片，性能领先业界' : 'Powered by latest AI chip, leading performance',
                price: '$999',
                specs: ['AI芯片', '8GB RAM', '128GB存储', '5G连接']
            },
            {
                id: 2,
                name: language === 'zh' ? '高端商务平板 Pro' : 'Premium Business Tablet Pro',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
                description: language === 'zh' ? '轻薄便携，专为商务设计' : 'Ultra-thin and portable, designed for business',
                price: '$799',
                specs: ['12.9英寸屏幕', '轻薄设计', '长续航', '4K摄像头']
            },
            {
                id: 3,
                name: language === 'zh' ? '无线降噪耳机 Plus' : 'Wireless Noise Canceling Headphones Plus',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
                description: language === 'zh' ? '顶级降噪技术，音质卓越' : 'Top noise cancellation, superior sound quality',
                price: '$399',
                specs: ['主动降噪', '40小时续航', '蓝牙5.0', '舒适佩戴']
            }
        ],
        1: [
            {
                id: 4,
                name: language === 'zh' ? '企业管理系统 ERP' : 'Enterprise Management System ERP',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop',
                description: language === 'zh' ? '全流程数字化管理，效率提升50%' : 'Full-process digitalization, 50% efficiency boost',
                price: language === 'zh' ? '定制价格' : 'Custom Pricing',
                specs: ['模块化设计', '可扩展性强', '数据安全', '24h支持']
            },
            {
                id: 5,
                name: language === 'zh' ? '数据分析平台 Analytics' : 'Data Analysis Platform Analytics',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop',
                description: language === 'zh' ? '实时数据洞察，决策更智能' : 'Real-time insights, smarter decisions',
                price: language === 'zh' ? '按年订阅' : 'Annual Subscription',
                specs: ['AI分析', '实时监控', '定制报表', '多数据源']
            }
        ],
        2: [
            {
                id: 6,
                name: language === 'zh' ? '云存储解决方案' : 'Cloud Storage Solution',
                image: 'https://images.unsplash.com/photo-1520925961795-85288078b74b?w=500&h=500&fit=crop',
                description: language === 'zh' ? '99.99% 可用性保证' : '99.99% availability guarantee',
                price: language === 'zh' ? '按需计费' : 'Pay-As-You-Go',
                specs: ['无限扩展', '数据备份', '全球加速', '权限管理']
            },
            {
                id: 7,
                name: language === 'zh' ? '容器编排服务' : 'Container Orchestration Service',
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
                description: language === 'zh' ? '简化容器部署和管理' : 'Simplify container deployment and management',
                price: language === 'zh' ? '按量付费' : 'Usage-based Pricing',
                specs: ['自动扩容', '负载均衡', '日志监控', 'API接口']
            }
        ],
        3: [
            {
                id: 8,
                name: language === 'zh' ? '智能制造解决方案' : 'Intelligent Manufacturing Solution',
                image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=500&fit=crop',
                description: language === 'zh' ? '工业4.0完整方案' : 'Complete Industry 4.0 solution',
                price: language === 'zh' ? '定制方案' : 'Custom Solution',
                specs: ['MES系统', '设备互联', '实时监控', '预测维护']
            },
            {
                id: 9,
                name: language === 'zh' ? '零售数字化转型' : 'Retail Digitalization',
                image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
                description: language === 'zh' ? '全渠道零售管理' : 'Omni-channel retail management',
                price: language === 'zh' ? '定制方案' : 'Custom Solution',
                specs: ['POS系统', '会员管理', '库存控制', '数据分析']
            }
        ]
    }

    const currentProducts = products[activeCategory]

    return (
        <section className="products" id="products">
            <div className="container">
                <div className="section-title">
                    <h2>{language === 'zh' ? '产品中心' : 'Products Center'}</h2>
                    <p>{language === 'zh' ? '丰富的产品线，满足不同行业需求' : 'Rich product lines to meet diverse industry needs'}</p>
                </div>

                {/* 产品分类 */}
                <div className="category-tabs">
                    {categories.map((cat, index) => (
                        <button
                            key={cat.id}
                            className={`category-btn ${activeCategory === index ? 'active' : ''}`}
                            onClick={() => setActiveCategory(index)}
                        >
                            <span className="cat-icon">{cat.icon}</span>
                            <span className="cat-name">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* 产品卡片网格 */}
                <div className="products-grid">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="product-image">
                                <img src={product.image} alt={product.name} loading="lazy" />
                                <div className="product-overlay">
                                    <button className="btn btn-primary">
                                        {language === 'zh' ? '查看详情' : 'View Details'}
                                    </button>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="product-desc">{product.description}</p>
                                <div className="product-specs">
                                    {product.specs.slice(0, 2).map((spec, idx) => (
                                        <span key={idx} className="spec-tag">{spec}</span>
                                    ))}
                                </div>
                                <div className="product-footer">
                                    <span className="product-price">{product.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 产品详情Modal */}
                {selectedProduct && (
                    <div className="product-modal" onClick={() => setSelectedProduct(null)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
                            <div className="modal-body">
                                <div className="modal-image">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                                </div>
                                <div className="modal-info">
                                    <h2>{selectedProduct.name}</h2>
                                    <p className="modal-desc">{selectedProduct.description}</p>
                                    <div className="modal-specs">
                                        <h4>{language === 'zh' ? '主要特性' : 'Key Features'}</h4>
                                        <ul>
                                            {selectedProduct.specs.map((spec, idx) => (
                                                <li key={idx}>✓ {spec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="modal-actions">
                                        <span className="modal-price">{selectedProduct.price}</span>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setSelectedProduct(null)
                                                const contactElement = document.getElementById('contact')
                                                if (contactElement) {
                                                    contactElement.scrollIntoView({ behavior: 'smooth' })
                                                }
                                            }}
                                        >
                                            {language === 'zh' ? '立即咨询' : 'Consult Now'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Products
