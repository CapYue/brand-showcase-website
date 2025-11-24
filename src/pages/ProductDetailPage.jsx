import { useParams, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateMetaTags } from '../utils/seo'
import { apiClient } from '../utils/apiClient'
import '../styles/products.css'

function ProductDetailPage() {
    const { id } = useParams()
    const { language } = useOutletContext()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadProduct()
    }, [id])

    const loadProduct = async () => {
        try {
            setLoading(true)
            const data = await apiClient.getProducts()
            const p = data.find(prod => prod.id == id)
            setProduct(p)
        } catch (error) {
            console.error('Failed to load product:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>{language === 'zh' ? '加载中...' : 'Loading...'}</div>
    if (!product) return <div>{language === 'zh' ? '产品不存在' : 'Product not found'}</div>

    return (
        <div className="product-detail-page page-container">
            <h1>{product.name}</h1>
            <div className="detail-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="detail-info">
                <p>{product.description}</p>
                <div className="price">{product.price}</div>
            </div>
        </div>
    )
}

export default ProductDetailPage