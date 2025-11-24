/**
 * 后端服务器 - Node.js + Express
 * 提供网站数据 API 和文件上传功能
 * 
 * 使用说明:
 * 1. npm install express cors dotenv multer
 * 2. node server/server.js
 * 3. 访问 http://localhost:5000/api
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==================== 中间件 ====================

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 静态文件服务 - 图片存储目录
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// ==================== 文件上传配置 ====================

const uploadDir = path.join(__dirname, '../public/uploads');

// 创建上传目录
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        const ext = path.extname(file.originalname);
        cb(null, `${timestamp}-${random}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 限制
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('仅支持图片文件'));
        }
    }
});

// ==================== 模拟数据库 ====================

// 这里可以连接真实数据库（MySQL, MongoDB 等）
// 现在使用内存对象模拟，生产环境应使用真实数据库

const websiteData = {
    navbar: {
        logo: 'BRAND',
        links: ['#home', '#about', '#products', '#tech', '#news', '#contact'],
        labels: ['首页', '关于我们', '产品中心', '技术实力', '新闻动态', '联系我们']
    },

    banner: [
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
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop',
            title: '携手共赢 创造价值',
            subtitle: '与全球合作伙伴共创美好未来'
        }
    ],

    about: {
        description: '我们坚持以客户为中心，以技术创新为驱动，以人才培养为基础，致力于打造行业标杆企业。凭借十余年的行业经验和专业团队，我们为全球数千家企业提供优质的产品和服务。',
        values: [
            { title: '专业', description: '行业领先的专业实力' },
            { title: '创新', description: '不断追求技术突破' },
            { title: '信任', description: '用户信任是我们的资本' },
            { title: '成长', description: '与客户共同成长发展' }
        ],
        timeline: [
            { year: 2010, event: '公司成立' },
            { year: 2013, event: '获得行业认证' },
            { year: 2016, event: '发布核心产品' },
            { year: 2019, event: '全球扩展' },
            { year: 2022, event: '技术突破' },
            { year: 2024, event: '行业领先' }
        ],
        team: [
            { name: '张三', position: 'CEO & 联合创始人', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
            { name: '李四', position: '首席技术官', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
            { name: '王五', position: '运营总监', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' }
        ],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },

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
            category: '硬件',
            name: '无线降噪耳机 Plus',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            description: '顶级降噪技术，音质卓越',
            price: '$399',
            features: ['主动降噪', '40小时续航', '蓝牙5.0', '舒适佩戴']
        },
        {
            id: 4,
            category: '软件',
            name: '企业管理系统 ERP',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop',
            description: '全流程数字化管理，效率提升50%',
            price: '定制价格',
            features: ['模块化设计', '可扩展性强', '数据安全', '24h支持']
        },
        {
            id: 5,
            category: '云服务',
            name: '云存储解决方案',
            image: 'https://images.unsplash.com/photo-1520925961795-85288078b74b?w=500&h=500&fit=crop',
            description: '99.99% 可用性保证',
            price: '按需计费',
            features: ['无限扩展', '数据备份', '全球加速', '权限管理']
        }
    ],

    certifications: [
        { id: 1, name: 'ISO 9001 质量管理体系认证', category: '国际认证', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop', importance: 10, year: 2020 },
        { id: 2, name: 'ISO 27001 信息安全管理体系', category: '安全认证', image: 'https://images.unsplash.com/photo-1516534775068-bb57100162b4?w=400&h=400&fit=crop', importance: 9, year: 2021 },
        { id: 3, name: '国家高新技术企业认证', category: '政府认证', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop', importance: 10, year: 2019 },
        { id: 4, name: '发明专利授权证书', category: '专利', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop', importance: 8, year: 2022 },
        { id: 5, name: '行业创新奖', category: '奖项', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop', importance: 7, year: 2023 }
    ],

    news: [
        { id: 1, type: '企业新闻', title: '公司荣获2024年最佳创新企业奖', date: '2024-11-15', summary: '在2024年行业年会上，我公司因在技术创新方面的卓越表现，荣获最佳创新企业奖。' },
        { id: 2, type: '企业新闻', title: '第五代产品正式发布', date: '2024-10-20', summary: '经过两年的研发，我们的第五代旗舰产品今日正式发布，性能提升50%。' },
        { id: 3, type: '行业资讯', title: 'AI技术突破重大进展', date: '2024-11-10', summary: '行业报道：人工智能新算法在识别精度上取得突破性进展。' },
        { id: 4, type: '行业资讯', title: '云计算市场持续增长', date: '2024-10-25', summary: '行业分析：2024年云计算市场规模增长30%，企业数字化加速。' },
        { id: 5, type: '企业新闻', title: '签署全球战略合作协议', date: '2024-09-15', summary: '与国际知名科技公司签署战略合作协议，共同推动行业发展。' }
    ],

    contact: {
        address: '北京市朝阳区科技园路1号',
        zipcode: '100000',
        phone: '+86 10-1234-5678',
        workTime: '周一至周五 9:00-18:00',
        email: 'contact@brand.com',
        serviceEmail: 'service@brand.com',
        mapUrl: 'https://www.google.com/maps/embed?pb=...'
    },

    footer: {
        logo: 'BRAND',
        description: '致力于为全球客户提供专业、可靠、创新的解决方案',
        social: {
            wechat: '#',
            weibo: '#',
            douyin: '#',
            linkedin: '#'
        },
        links: {
            privacy: '#',
            terms: '#',
            sitemap: '#',
            cookies: '#'
        },
        company: {
            address: '北京市朝阳区科技园路1号',
            phone: '+86 10-1234-5678',
            email: 'contact@brand.com'
        },
        icp: '京ICP备20003721号-1',
        year: 2024
    },

    config: {
        title: '品牌展示官网 - 专业、科技、创新',
        description: '致力于为全球客户提供专业、可靠、创新的解决方案',
        keywords: '品牌,产品,解决方案,科技,创新',
        colors: {
            primary: '#2c3e50',
            secondary: '#3498db',
            accent: '#e74c3c'
        }
    }
};

// ==================== API 路由 ====================

// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: '服务器运行正常' });
});

// ========== 公共 API v1 ==========

// 获取轮播数据
app.get('/api/v1/banners', (req, res) => {
    res.json({
        code: 200,
        message: 'success',
        data: websiteData.banner
    });
});

// 获取企业信息
app.get('/api/v1/company/info', (req, res) => {
    res.json({
        code: 200,
        message: 'success',
        data: {
            about: websiteData.about,
            contact: websiteData.contact,
            config: websiteData.config
        }
    });
});

// 获取产品列表（支持分类筛选）
app.get('/api/v1/products', (req, res) => {
    const { category } = req.query;
    let products = websiteData.products;

    if (category) {
        products = products.filter(p => p.category === category);
    }

    res.json({
        code: 200,
        message: 'success',
        data: products
    });
});

// 获取单个产品
app.get('/api/v1/products/:id', (req, res) => {
    const product = websiteData.products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json({
            code: 200,
            message: 'success',
            data: product
        });
    } else {
        res.status(404).json({
            code: 404,
            message: '产品不存在',
            data: null
        });
    }
});

// 获取资质荣誉列表
app.get('/api/v1/honors', (req, res) => {
    res.json({
        code: 200,
        message: 'success',
        data: websiteData.certifications
    });
});

// 获取新闻列表（支持分类、分页）
app.get('/api/v1/news', (req, res) => {
    const { type = 'all', page = 1, pageSize = 10 } = req.query;
    let news = websiteData.news;

    if (type && type !== 'all') {
        news = news.filter(n => n.type === type);
    }

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginated = news.slice(start, end);

    res.json({
        code: 200,
        message: 'success',
        data: {
            data: paginated,
            total: news.length,
            page: parseInt(page),
            pageSize: parseInt(pageSize),
            totalPages: Math.ceil(news.length / pageSize)
        }
    });
});

// 获取单个新闻详情
app.get('/api/v1/news/:id', (req, res) => {
    const article = websiteData.news.find(n => n.id === parseInt(req.params.id));
    if (article) {
        res.json({
            code: 200,
            message: 'success',
            data: article
        });
    } else {
        res.status(404).json({
            code: 404,
            message: '新闻不存在',
            data: null
        });
    }
});

// 提交联系表单
app.post('/api/v1/contact', (req, res) => {
    const { name, email, subject, message, phone } = req.body;

    // 验证必填字段
    if (!name || !email || !message) {
        return res.status(400).json({
            code: 400,
            message: '缺少必填字段',
            data: null
        });
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            code: 400,
            message: '邮箱格式错误',
            data: null
        });
    }

    // 这里可以保存到数据库或发送邮件
    console.log('新的联系表单提交:', { name, email, subject, message, phone, timestamp: new Date() });

    res.json({
        code: 200,
        message: 'success',
        data: {
            success: true,
            message: '表单提交成功，我们会尽快联系您'
        }
    });
});

// 上传文件
app.post('/api/admin/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            code: 400,
            message: '没有上传文件',
            data: null
        });
    }

    res.json({
        code: 200,
        message: 'success',
        data: {
            filename: req.file.filename,
            url: `/uploads/${req.file.filename}`,
            size: req.file.size
        }
    });
});

// ========== 管理员 API ==========

// 更新产品
app.put('/api/admin/products/:id', (req, res) => {
    const productIndex = websiteData.products.findIndex(p => p.id === parseInt(req.params.id));

    if (productIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: '产品不存在',
            data: null
        });
    }

    websiteData.products[productIndex] = {
        ...websiteData.products[productIndex],
        ...req.body
    };

    res.json({
        code: 200,
        message: 'success',
        data: websiteData.products[productIndex]
    });
});

// 创建产品
app.post('/api/admin/products', (req, res) => {
    const newProduct = {
        id: Math.max(...websiteData.products.map(p => p.id), 0) + 1,
        ...req.body
    };

    websiteData.products.push(newProduct);
    res.json({
        code: 200,
        message: 'success',
        data: newProduct
    });
});

// 删除产品
app.delete('/api/admin/products/:id', (req, res) => {
    const index = websiteData.products.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            code: 404,
            message: '产品不存在',
            data: null
        });
    }

    websiteData.products.splice(index, 1);
    res.json({
        code: 200,
        message: 'success',
        data: { success: true }
    });
});

// 更新新闻
app.put('/api/admin/news/:id', (req, res) => {
    const newsIndex = websiteData.news.findIndex(n => n.id === parseInt(req.params.id));

    if (newsIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: '新闻不存在',
            data: null
        });
    }

    websiteData.news[newsIndex] = {
        ...websiteData.news[newsIndex],
        ...req.body
    };

    res.json({
        code: 200,
        message: 'success',
        data: websiteData.news[newsIndex]
    });
});

// 创建新闻
app.post('/api/admin/news', (req, res) => {
    const newNews = {
        id: Math.max(...websiteData.news.map(n => n.id), 0) + 1,
        ...req.body,
        date: new Date().toISOString().split('T')[0]
    };

    websiteData.news.push(newNews);
    res.json({
        code: 200,
        message: 'success',
        data: newNews
    });
});

// 删除新闻
app.delete('/api/admin/news/:id', (req, res) => {
    const index = websiteData.news.findIndex(n => n.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            code: 404,
            message: '新闻不存在',
            data: null
        });
    }

    websiteData.news.splice(index, 1);
    res.json({
        code: 200,
        message: 'success',
        data: { success: true }
    });
});

// 更新资质
app.put('/api/admin/honors/:id', (req, res) => {
    const honorIndex = websiteData.certifications.findIndex(h => h.id === parseInt(req.params.id));

    if (honorIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: '资质不存在',
            data: null
        });
    }

    websiteData.certifications[honorIndex] = {
        ...websiteData.certifications[honorIndex],
        ...req.body
    };

    res.json({
        code: 200,
        message: 'success',
        data: websiteData.certifications[honorIndex]
    });
});

// 创建资质
app.post('/api/admin/honors', (req, res) => {
    const newHonor = {
        id: Math.max(...websiteData.certifications.map(h => h.id), 0) + 1,
        ...req.body
    };

    websiteData.certifications.push(newHonor);
    res.json({
        code: 200,
        message: 'success',
        data: newHonor
    });
});

// 删除资质
app.delete('/api/admin/honors/:id', (req, res) => {
    const index = websiteData.certifications.findIndex(h => h.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            code: 404,
            message: '资质不存在',
            data: null
        });
    }

    websiteData.certifications.splice(index, 1);
    res.json({
        code: 200,
        message: 'success',
        data: { success: true }
    });
});

// 更新轮播
app.put('/api/admin/banners/:id', (req, res) => {
    const bannerIndex = websiteData.banner.findIndex(b => b.id === parseInt(req.params.id));

    if (bannerIndex === -1) {
        return res.status(404).json({
            code: 404,
            message: '轮播图不存在',
            data: null
        });
    }

    websiteData.banner[bannerIndex] = {
        ...websiteData.banner[bannerIndex],
        ...req.body
    };

    res.json({
        code: 200,
        message: 'success',
        data: websiteData.banner[bannerIndex]
    });
});

// 创建轮播
app.post('/api/admin/banners', (req, res) => {
    const newBanner = {
        id: Math.max(...websiteData.banner.map(b => b.id), 0) + 1,
        ...req.body
    };

    websiteData.banner.push(newBanner);
    res.json({
        code: 200,
        message: 'success',
        data: newBanner
    });
});

// 删除轮播
app.delete('/api/admin/banners/:id', (req, res) => {
    const index = websiteData.banner.findIndex(b => b.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            code: 404,
            message: '轮播图不存在',
            data: null
        });
    }

    websiteData.banner.splice(index, 1);
    res.json({
        code: 200,
        message: 'success',
        data: { success: true }
    });
});

// ==================== 错误处理 ====================

app.use((err, req, res, next) => {
    console.error('错误:', err);
    res.status(err.status || 500).json({
        error: err.message || '服务器内部错误'
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`\n✅ 品牌展示官网 - API 服务器启动成功！`);
    console.log(`\n📡 服务器地址: http://localhost:${PORT}`);
    console.log(`\n📚 API 文档:`);
    console.log(`\n【公共 API - 获取数据】`);
    console.log(`  GET  /api/v1/banners                - 获取轮播数据`);
    console.log(`  GET  /api/v1/company/info           - 获取企业信息`);
    console.log(`  GET  /api/v1/products               - 获取产品列表`);
    console.log(`  GET  /api/v1/products/:id           - 获取产品详情`);
    console.log(`  GET  /api/v1/honors                 - 获取资质荣誉`);
    console.log(`  GET  /api/v1/news                   - 获取新闻列表`);
    console.log(`  GET  /api/v1/news/:id               - 获取新闻详情`);
    console.log(`  POST /api/v1/contact                - 提交联系表单`);
    console.log(`  POST /api/admin/upload              - 上传文件`);
    console.log(`\n【管理员 API - 数据管理】`);
    console.log(`  POST   /api/admin/products          - 创建产品`);
    console.log(`  PUT    /api/admin/products/:id      - 更新产品`);
    console.log(`  DELETE /api/admin/products/:id      - 删除产品`);
    console.log(`  POST   /api/admin/news              - 创建新闻`);
    console.log(`  PUT    /api/admin/news/:id          - 更新新闻`);
    console.log(`  DELETE /api/admin/news/:id          - 删除新闻`);
    console.log(`  POST   /api/admin/honors            - 创建资质`);
    console.log(`  PUT    /api/admin/honors/:id        - 更新资质`);
    console.log(`  DELETE /api/admin/honors/:id        - 删除资质`);
    console.log(`  POST   /api/admin/banners           - 创建轮播`);
    console.log(`  PUT    /api/admin/banners/:id       - 更新轮播`);
    console.log(`  DELETE /api/admin/banners/:id       - 删除轮播`);
    console.log(`\n🔧 前端地址: http://localhost:5173`);
    console.log(`\n💡 提示: 请在前端运行 npm run dev:both 同时启动前后端\n`);
});
