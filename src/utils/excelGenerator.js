import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Excel模板生成器 - 用于汇总网站所有信息
 */
export class ExcelTemplateGenerator {
    
    /**
     * 生成网站信息汇总Excel模板
     */
    static generateWebsiteTemplate() {
        // 创建工作簿
        const wb = XLSX.utils.book_new();
        
        // 1. 网站基本信息表
        const basicInfoSheet = XLSX.utils.aoa_to_sheet([
            ['网站信息汇总表 - 客户填写模板'],
            ['请在各表格中填写相应的信息，所有字段均为必填项'],
            [''],
            ['基本信息表'],
            ['字段名称', '当前值', '客户填写值', '说明'],
            ['公司名称', '元途', '', '请输入您的公司名称'],
            ['品牌名称', 'BRAND', '', '请输入您的品牌名称'],
            ['网站标题', '品牌展示官网', '', '网站浏览器标签显示的标题'],
            ['网站描述', '致力于为全球客户提供专业、可靠、创新的解决方案', '', '网站简短描述'],
            ['联系电话', '+86 10-1234-5678', '', '客户服务电话'],
            ['邮箱地址', 'contact@brand.com', '', '主要联系邮箱'],
            ['公司地址', '北京市朝阳区科技园路1号', '', '详细办公地址'],
            ['备案号', '京ICP备20003721号-1', '', '网站备案信息']
        ]);
        
        // 2. 导航菜单信息表
        const navSheet = XLSX.utils.aoa_to_sheet([
            ['导航菜单信息'],
            ['字段名称', '当前值(中文)', '当前值(英文)', '客户填写值(中文)', '客户填写值(英文)', '说明'],
            ['首页', '首页', 'Home', '', '', ''],
            ['关于我们', '关于我们', 'About', '', '', ''],
            ['产品中心', '产品中心', 'Products', '', '', ''],
            ['技术实力', '技术实力', 'Technology', '', '', ''],
            ['新闻动态', '新闻动态', 'News', '', '', ''],
            ['联系我们', '联系我们', 'Contact', '', '', '']
        ]);
        
        // 3. Banner轮播图信息表
        const bannerSheet = XLSX.utils.aoa_to_sheet([
            ['Banner轮播图信息'],
            ['幻灯片', '标题', '副标题', '图片URL', '客户填写标题', '客户填写副标题', '客户图片URL', '说明'],
            ['1', '创新科技 启未来', '专业、可靠、领先的品牌形象', 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop', '', '', '', '第一张轮播图'],
            ['2', '数字转型 赋能业务', '全方位的解决方案和专业服务', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop', '', '', '', '第二张轮播图'],
            ['3', '品质保证 值得信赖', '行业领先的技术实力和研发能力', 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=600&fit=crop', '', '', '', '第三张轮播图'],
            ['4', '携手共赢 创造价值', '与全球合作伙伴共创美好未来', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop', '', '', '', '第四张轮播图']
        ]);
        
        // 4. 关于我们信息表
        const aboutSheet = XLSX.utils.aoa_to_sheet([
            ['关于我们信息'],
            ['字段类型', '字段名称', '当前值(中文)', '当前值(英文)', '客户填写值(中文)', '客户填写值(英文)', '说明'],
            ['标题', '关于我们', '关于我们', 'About Us', '', '', ''],
            ['描述', '核心描述', '致力于为全球客户提供专业、可靠、创新的解决方案', 'Committed to providing professional, reliable and innovative solutions to global customers', '', '', ''],
            ['内容', '核心价值观', '我们坚持以客户为中心，以技术创新为驱动，以人才培养为基础，致力于打造行业标杆企业。凭借十余年的行业经验和专业团队，我们为全球数千家企业提供优质的产品和服务。', 'We adhere to customer-centric approach, technology innovation as driving force, and talent cultivation as foundation. With over a decade of industry experience and professional teams, we provide quality products and services to thousands of enterprises globally.', '', '', ''],
            ['价值观', '专业', '行业领先的专业实力', 'Industry-leading expertise', '', '', ''],
            ['价值观', '创新', '不断追求技术突破', 'Continuous technological breakthroughs', '', '', ''],
            ['价值观', '信任', '用户信任是我们的资本', 'User trust is our capital', '', '', ''],
            ['价值观', '成长', '与客户共同成长发展', 'Growing together with customers', '', '', '']
        ]);
        
        // 5. 发展历程表
        const milestoneSheet = XLSX.utils.aoa_to_sheet([
            ['发展历程信息'],
            ['年份', '事件(中文)', '事件(英文)', '客户填写事件(中文)', '客户填写事件(英文)', '说明'],
            ['2010', '公司成立', 'Company Founded', '', '', ''],
            ['2013', '获得行业认证', 'Industry Certification', '', '', ''],
            ['2016', '发布核心产品', 'Core Product Launch', '', '', ''],
            ['2019', '全球扩展', 'Global Expansion', '', '', ''],
            ['2022', '技术突破', 'Technology Breakthrough', '', '', ''],
            ['2024', '行业领先', 'Industry Leader', '', '', '']
        ]);
        
        // 6. 团队信息表
        const teamSheet = XLSX.utils.aoa_to_sheet([
            ['团队信息'],
            ['成员', '姓名', '职位(中文)', '职位(英文)', '图片URL', '客户填写姓名', '客户填写职位(中文)', '客户填写职位(英文)', '客户图片URL', '说明'],
            ['1', '张三', 'CEO & 联合创始人', 'CEO & Co-founder', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', '', '', '', '', '团队成员1'],
            ['2', '李四', '首席技术官', 'CTO', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', '', '', '', '', '团队成员2'],
            ['3', '王五', '运营总监', 'COO', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', '', '', '', '', '团队成员3']
        ]);
        
        // 7. 产品信息表
        const productsSheet = XLSX.utils.aoa_to_sheet([
            ['产品信息'],
            ['分类', '产品ID', '产品名称(中文)', '产品名称(英文)', '描述(中文)', '描述(英文)', '价格', '特性1', '特性2', '特性3', '特性4', '图片URL', '客户填写名称(中文)', '客户填写名称(英文)', '客户填写描述(中文)', '客户填写描述(英文)', '客户价格', '客户图片URL'],
            ['硬件产品', '1', '旗舰智能设备 X1', 'Flagship Smart Device X1', '搭载最新AI芯片，性能领先业界', 'Powered by latest AI chip, leading performance', '$999', 'AI芯片', '8GB RAM', '128GB存储', '5G连接', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', '', '', '', '', '', ''],
            ['硬件产品', '2', '高端商务平板 Pro', 'Premium Business Tablet Pro', '轻薄便携，专为商务设计', 'Ultra-thin and portable, designed for business', '$799', '12.9英寸屏幕', '轻薄设计', '长续航', '4K摄像头', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop', '', '', '', '', '', ''],
            ['硬件产品', '3', '无线降噪耳机 Plus', 'Wireless Noise Canceling Headphones Plus', '顶级降噪技术，音质卓越', 'Top noise cancellation, superior sound quality', '$399', '主动降噪', '40小时续航', '蓝牙5.0', '舒适佩戴', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', '', '', '', '', '', ''],
            ['软件解决方案', '4', '企业管理系统 ERP', 'Enterprise Management System ERP', '全流程数字化管理，效率提升50%', 'Full-process digitalization, 50% efficiency boost', '定制价格', '模块化设计', '可扩展性强', '数据安全', '24h支持', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop', '', '', '', '', '', ''],
            ['软件解决方案', '5', '数据分析平台 Analytics', 'Data Analysis Platform Analytics', '实时数据洞察，决策更智能', 'Real-time insights, smarter decisions', '按年订阅', 'AI分析', '实时监控', '定制报表', '多数据源', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop', '', '', '', '', '', '']
        ]);
        
        // 8. 新闻动态表
        const newsSheet = XLSX.utils.aoa_to_sheet([
            ['新闻动态信息'],
            ['分类', '新闻ID', '标题(中文)', '标题(英文)', '日期', '摘要(中文)', '摘要(英文)', '客户填写标题(中文)', '客户填写标题(英文)', '客户填写日期', '客户填写摘要(中文)', '客户填写摘要(英文)', '说明'],
            ['企业新闻', '1', '公司荣获2024年最佳创新企业奖', 'Company Wins 2024 Best Innovation Award', '2024-11-15', '在2024年行业年会上，我公司因在技术创新方面的卓越表现，荣获最佳创新企业奖。', 'At the 2024 industry conference, our company received the Best Innovation Award for outstanding technological innovation.', '', '', '', '', '', ''],
            ['企业新闻', '2', '第五代产品正式发布', 'Fifth Generation Product Official Launch', '2024-10-20', '经过两年的研发，我们的第五代旗舰产品今日正式发布，性能提升50%。', 'After two years of R&D, our fifth-generation flagship product is officially launched with 50% performance improvement.', '', '', '', '', '', ''],
            ['行业资讯', '3', 'AI技术突破重大进展', 'Major Breakthrough in AI Technology', '2024-11-10', '行业报道：人工智能新算法在识别精度上取得突破性进展。', 'Industry report: New AI algorithm achieves breakthrough in recognition accuracy.', '', '', '', '', '', '']
        ]);
        
        // 9. 资质荣誉表
        const certificationsSheet = XLSX.utils.aoa_to_sheet([
            ['资质荣誉信息'],
            ['证书ID', '证书名称(中文)', '证书名称(英文)', '分类', '重要程度', '年份', '图片URL', '客户填写名称(中文)', '客户填写名称(英文)', '客户填写分类', '客户图片URL', '说明'],
            ['1', 'ISO 9001 质量管理体系认证', 'ISO 9001 Quality Management Certification', '国际认证', '10', '2020', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=400&fit=crop', '', '', '', '', ''],
            ['2', 'ISO 27001 信息安全管理体系', 'ISO 27001 Information Security Management', '安全认证', '9', '2021', 'https://images.unsplash.com/photo-1516534775068-bb57100162b4?w=400&h=400&fit=crop', '', '', '', '', ''],
            ['3', '国家高新技术企业认证', 'National High-Tech Enterprise Certificate', '政府认证', '10', '2019', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop', '', '', '', '', '']
        ]);
        
        // 10. 联系信息表
        const contactSheet = XLSX.utils.aoa_to_sheet([
            ['联系信息'],
            ['字段名称', '当前值', '客户填写值', '说明'],
            ['联系标题', '联系我们', '', ''],
            ['联系描述', '有任何问题，我们随时准备好为您服务', '', ''],
            ['地址标题', '公司地址', '', ''],
            ['地址内容', '北京市朝阳区科技园路1号', '', ''],
            ['邮编', '100000', '', ''],
            ['电话标题', '联系电话', '', ''],
            ['电话号码', '+86 10-1234-5678', '', ''],
            ['工作时间', '周一至周五 9:00-18:00', '', ''],
            ['邮箱标题', '电子邮箱', '', ''],
            ['邮箱地址1', 'contact@brand.com', '', ''],
            ['邮箱地址2', 'service@brand.com', '', ''],
            ['在线咨询标题', '在线咨询', '', ''],
            ['在线咨询描述', '实时客服支持', '', '']
        ]);
        
        // 11. 页脚信息表
        const footerSheet = XLSX.utils.aoa_to_sheet([
            ['页脚信息'],
            ['链接分类', '链接名称(中文)', '链接名称(英文)', 'URL', '客户填写名称(中文)', '客户填写名称(英文)', '说明'],
            ['公司', '关于我们', 'About Us', '#about', '', '', ''],
            ['公司', '企业文化', 'Culture', '#', '', '', ''],
            ['公司', '招聘信息', 'Careers', '#', '', '', ''],
            ['公司', '新闻中心', 'News', '#news', '', '', ''],
            ['产品', '产品中心', 'Products', '#products', '', '', ''],
            ['产品', '解决方案', 'Solutions', '#products', '', '', ''],
            ['产品', '服务支持', 'Support', '#', '', '', ''],
            ['资源', '在线文档', 'Documentation', '#', '', '', ''],
            ['资源', '教程', 'Tutorials', '#', '', '', ''],
            ['资源', '常见问题', 'FAQ', '#', '', '', ''],
            ['资源', '联系我们', 'Contact', '#contact', '', '', '']
        ]);
        
        // 添加所有工作表到工作簿
        XLSX.utils.book_append_sheet(wb, basicInfoSheet, '基本信息');
        XLSX.utils.book_append_sheet(wb, navSheet, '导航菜单');
        XLSX.utils.book_append_sheet(wb, bannerSheet, 'Banner轮播');
        XLSX.utils.book_append_sheet(wb, aboutSheet, '关于我们');
        XLSX.utils.book_append_sheet(wb, milestoneSheet, '发展历程');
        XLSX.utils.book_append_sheet(wb, teamSheet, '团队信息');
        XLSX.utils.book_append_sheet(wb, productsSheet, '产品信息');
        XLSX.utils.book_append_sheet(wb, newsSheet, '新闻动态');
        XLSX.utils.book_append_sheet(wb, certificationsSheet, '资质荣誉');
        XLSX.utils.book_append_sheet(wb, contactSheet, '联系信息');
        XLSX.utils.book_append_sheet(wb, footerSheet, '页脚信息');
        
        // 生成Excel文件
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // 保存文件
        saveAs(blob, '网站信息汇总模板.xlsx');
    }
    
    /**
     * 从当前网站数据生成Excel模板
     */
    static generateFromCurrentData() {
        // 这里可以添加从当前网站组件提取数据的逻辑
        // 目前先使用静态模板
        this.generateWebsiteTemplate();
    }
}

export default ExcelTemplateGenerator;