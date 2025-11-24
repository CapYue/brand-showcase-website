/**
 * 模拟数据 - 用于 API 不可用时返回
 * 这确保在 Vercel 等环境中即使没有后端也能显示内容
 */

export const mockData = {
    banners: [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
            title: '创新科技 启未来',
            subtitle: '专业、可靠、领先的品牌形象'
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
            title: '数字转型 赋能业务',
            subtitle: '全方位的解决方案和专业服务'
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=600&fit=crop',
            title: '品质保证 值得信赖',
            subtitle: '行业领先的技术实力和研发能力'
        }
    ],
    products: [
        {
            id: 1,
            category: '硬件',
            name: '旗舰智能设备 X1',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            description: '搭载最新AI芯片，性能领先业界',
            price: '$999',
            features: ['AI芯片', '8GB RAM', '128GB存储', '5G连接']
        },
        {
            id: 2,
            category: '硬件',
            name: '高端商务平板 Pro',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
            description: '轻薄便携，专为商务设计',
            price: '$799',
            features: ['12.9英寸屏幕', '轻薄设计', '长续航', '4K摄像头']
        },
        {
            id: 3,
            category: '软件',
            name: '企业管理系统 ERP',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop',
            description: '全流程数字化管理，效率提升50%',
            price: '定制价格',
            features: ['模块化设计', '可扩展性强', '数据安全', '24h支持']
        },
        {
            id: 4,
            category: '云服务',
            name: '云存储解决方案',
            image: 'https://images.unsplash.com/photo-1520925961795-85288078b74b?w=500&h=500&fit=crop',
            description: '99.99% 可用性保证',
            price: '按需计费',
            features: ['无限扩展', '数据备份', '全球加速', '权限管理']
        }
    ],
    certifications: [
        {
            id: 1,
            name: 'ISO 9001 质量管理体系认证',
            category: '国际认证',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop',
            year: 2020
        },
        {
            id: 2,
            name: 'ISO 27001 信息安全管理体系',
            category: '安全认证',
            image: 'https://images.unsplash.com/photo-1516534775068-bb57100162b4?w=400&h=400&fit=crop',
            year: 2021
        },
        {
            id: 3,
            name: '国家高新技术企业认证',
            category: '政府认证',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
            year: 2019
        }
    ],
    news: [
        {
            id: 1,
            type: '企业新闻',
            title: '公司荣获2024年最佳创新企业奖',
            date: '2024-11-15',
            summary: '在2024年行业年会上，我公司因在技术创新方面的卓越表现，荣获最佳创新企业奖。',
            content: '在2024年行业年会上，我公司因在技术创新方面的卓越表现，荣获最佳创新企业奖。这是对我们多年来持续创新的认可。'
        },
        {
            id: 2,
            type: '企业新闻',
            title: '第五代产品正式发布',
            date: '2024-10-20',
            summary: '经过两年的研发，我们的第五代旗舰产品今日正式发布，性能提升50%。',
            content: '经过两年的研发，我们的第五代旗舰产品今日正式发布，性能提升50%，续航时间加倍。'
        },
        {
            id: 3,
            type: '行业资讯',
            title: 'AI技术突破重大进展',
            date: '2024-11-10',
            summary: '行业报道：人工智能新算法在识别精度上取得突破性进展。',
            content: '行业报道：人工智能新算法在识别精度上取得突破性进展，准确率提高至99.8%。'
        }
    ]
}

export default mockData
