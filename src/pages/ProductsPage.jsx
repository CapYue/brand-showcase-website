import { useOutletContext, useState, useEffect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { updateMetaTags } from '../utils/seo'
import { apiClient } from '../utils/apiClient'
import '../styles/products.css'

function ProductsPage() {
    const { language } = useOutletContext()
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        updateMetaTags({
            title: language === 'zh' ? '产品中心' : 'Products',
            description: language === 'zh' ? '浏覨我们的完整产品矩阵' : 'Browse our complete product matrix'
        })
        loadProducts()
    }, [language])

    const loadProducts = async () => {
        try {
            setLoading(true)
            const data = await apiClient.getProducts()
            setProducts(data)
        } catch (error) {
            console.error('Failed to load products:', error)
            setProducts([])  // 使用默认会返回模拟数据
        } finally {
            setLoading(false)
        }
    }

    const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory)

    return (
        <div className="products-page page-container">
            <div className="page-header">
                <h1>{language === 'zh' ? '产品中心' : 'Products'}</h1>
            </div>
            {loading ? <div>{language === 'zh' ? '加载中...' : 'Loading...'}</div> : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductsPage