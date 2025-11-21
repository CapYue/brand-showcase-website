import React, { useState, useEffect } from 'react';
import { apiClient } from '../utils/apiClient';
import '../styles/admin.css';

/**
 * 管理后台组件
 * 用于编辑和管理网站所有内容
 */

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const [news, setNews] = useState([]);
    const [banner, setBanner] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');

    // 加载数据
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [productsData, certificationsData, newsData, bannerData] = await Promise.all([
                apiClient.getProducts(),
                apiClient.getCertifications(),
                apiClient.getNews(),
                apiClient.getBannerData()
            ]);

            setProducts(productsData);
            setCertifications(certificationsData);
            setNews(newsData);
            setBanner(bannerData);
        } catch (error) {
            setMessage('加载数据失败: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // ==================== 产品管理 ====================

    const handleEditProduct = (product) => {
        setEditingId(product.id);
        setFormData(product);
        setActiveTab('products');
    };

    const handleSaveProduct = async () => {
        try {
            setLoading(true);
            const url = `http://localhost:5000/api/admin/products/${editingId}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('保存失败');

            setMessage('✅ 产品已保存');
            setEditingId(null);
            setFormData({});
            loadData();
        } catch (error) {
            setMessage('❌ 保存失败: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!confirm('确定要删除这个产品吗？')) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('删除失败');

            setMessage('✅ 产品已删除');
            loadData();
        } catch (error) {
            setMessage('❌ 删除失败: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            const imageUrl = await apiClient.uploadImage(file);
            setFormData({ ...formData, image: imageUrl.url });
            setMessage('✅ 图片上传成功');
        } catch (error) {
            setMessage('❌ 图片上传失败: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // ==================== 产品表单 ====================

    const ProductForm = () => (
        <div className="admin-form">
            <h3>{editingId ? '编辑产品' : '新增产品'}</h3>

            <div className="form-group">
                <label>产品名称</label>
                <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="如：旗舰智能设备 X1"
                />
            </div>

            <div className="form-group">
                <label>分类</label>
                <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="">选择分类</option>
                    <option value="硬件">硬件</option>
                    <option value="软件">软件</option>
                    <option value="云服务">云服务</option>
                    <option value="行业解决方案">行业解决方案</option>
                </select>
            </div>

            <div className="form-group">
                <label>产品描述</label>
                <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="30字以内"
                    rows="2"
                />
            </div>

            <div className="form-group">
                <label>价格</label>
                <input
                    type="text"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="如：$999"
                />
            </div>

            <div className="form-group">
                <label>产品图片</label>
                <div className="image-upload">
                    {formData.image && (
                        <img src={formData.image} alt="产品图片" style={{ maxWidth: '200px', marginBottom: '10px' }} />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>产品特性（用逗号分隔）</label>
                <textarea
                    value={(formData.features || []).join(', ')}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()) })}
                    placeholder="如：AI芯片, 8GB RAM, 128GB存储"
                    rows="2"
                />
            </div>

            <div className="form-actions">
                <button onClick={handleSaveProduct} className="btn btn-primary" disabled={loading}>
                    {loading ? '保存中...' : '保存'}
                </button>
                <button onClick={() => { setEditingId(null); setFormData({}); }} className="btn btn-secondary">
                    取消
                </button>
            </div>
        </div>
    );

    // ==================== 产品列表 ====================

    const ProductsList = () => (
        <div className="admin-list">
            <h3>产品管理</h3>
            <button onClick={() => { setEditingId('new'); setFormData({}); }} className="btn btn-primary" style={{ marginBottom: '20px' }}>
                + 新增产品
            </button>

            {editingId && <ProductForm />}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>产品名称</th>
                        <th>分类</th>
                        <th>价格</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleEditProduct(product)} className="btn-small btn-edit">编辑</button>
                                <button onClick={() => handleDeleteProduct(product.id)} className="btn-small btn-delete">删除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // ==================== 渲染 ====================

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>🛠️ 网站管理后台</h1>
                <div className="admin-info">
                    {message && <div className="message">{message}</div>}
                </div>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    📦 产品管理
                </button>
                <button
                    className={`tab-button ${activeTab === 'certifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('certifications')}
                >
                    🏆 资质荣誉
                </button>
                <button
                    className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
                    onClick={() => setActiveTab('news')}
                >
                    📰 新闻动态
                </button>
                <button
                    className={`tab-button ${activeTab === 'banner' ? 'active' : ''}`}
                    onClick={() => setActiveTab('banner')}
                >
                    🎨 轮播图
                </button>
            </div>

            <div className="admin-content">
                {loading && <div className="loading">加载中...</div>}

                {!loading && activeTab === 'products' && <ProductsList />}

                {!loading && activeTab === 'certifications' && (
                    <div className="admin-list">
                        <h3>资质荣誉</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>名称</th>
                                    <th>分类</th>
                                    <th>年份</th>
                                    <th>重要程度</th>
                                </tr>
                            </thead>
                            <tbody>
                                {certifications.map((cert) => (
                                    <tr key={cert.id}>
                                        <td>{cert.id}</td>
                                        <td>{cert.name}</td>
                                        <td>{cert.category}</td>
                                        <td>{cert.year}</td>
                                        <td>{cert.importance}/10</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && activeTab === 'news' && (
                    <div className="admin-list">
                        <h3>新闻动态</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>类型</th>
                                    <th>标题</th>
                                    <th>日期</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.data && news.data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.type}</td>
                                        <td>{item.title}</td>
                                        <td>{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && activeTab === 'banner' && (
                    <div className="admin-list">
                        <h3>轮播图</h3>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>标题</th>
                                    <th>副标题</th>
                                </tr>
                            </thead>
                            <tbody>
                                {banner.map((slide) => (
                                    <tr key={slide.id}>
                                        <td>{slide.id}</td>
                                        <td>{slide.title}</td>
                                        <td>{slide.subtitle}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
