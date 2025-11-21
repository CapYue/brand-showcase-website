import { saveAs } from 'file-saver';

/**
 * CSV模板生成器 - 用于生成客户填写的CSV模板
 */
export class CSVTemplateGenerator {
    
    /**
     * 生成网站信息汇总CSV模板
     */
    static generateWebsiteCSVTemplate() {
        // 创建CSV内容
        const csvContent = [];
        
        // 1. 基本信息表
        csvContent.push('基本信息表');
        csvContent.push('字段名称,当前值,客户填写值,说明');
        csvContent.push('公司名称,元途,,请输入您的公司名称');
        csvContent.push('品牌名称,BRAND,,请输入您的品牌名称');
        csvContent.push('网站标题,品牌展示官网,,网站浏览器标签显示的标题');
        csvContent.push('网站描述,致力于为全球客户提供专业、可靠、创新的解决方案,,网站简短描述');
        csvContent.push('联系电话,+86 10-1234-5678,,客户服务电话');
        csvContent.push('邮箱地址,contact@brand.com,,主要联系邮箱');
        csvContent.push('公司地址,北京市朝阳区科技园路1号,,详细办公地址');
        csvContent.push('备案号,京ICP备20003721号-1,,网站备案信息');
        csvContent.push('');
        
        // 2. 导航菜单信息
        csvContent.push('导航菜单信息');
        csvContent.push('字段名称,当前值(中文),当前值(英文),客户填写值(中文),客户填写值(英文),说明');
        csvContent.push('首页,首页,Home,,,');
        csvContent.push('关于我们,关于我们,About,,,');
        csvContent.push('产品中心,产品中心,Products,,,');
        csvContent.push('技术实力,技术实力,Technology,,,');
        csvContent.push('新闻动态,新闻动态,News,,,');
        csvContent.push('联系我们,联系我们,Contact,,,');
        csvContent.push('');
        
        // 3. Banner轮播图信息
        csvContent.push('Banner轮播图信息');
        csvContent.push('幻灯片,标题,副标题,图片URL,客户填写标题,客户填写副标题,客户图片URL,说明');
        csvContent.push('1,创新科技 启未来,专业、可靠、领先的品牌形象,https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop,,,,第一张轮播图');
        csvContent.push('2,数字转型 赋能业务,全方位的解决方案和专业服务,https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop,,,,第二张轮播图');
        csvContent.push('3,品质保证 值得信赖,行业领先的技术实力和研发能力,https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=600&fit=crop,,,,第三张轮播图');
        csvContent.push('4,携手共赢 创造价值,与全球合作伙伴共创美好未来,https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop,,,,第四张轮播图');
        csvContent.push('');
        
        // 4. 关于我们信息
        csvContent.push('关于我们信息');
        csvContent.push('字段类型,字段名称,当前值(中文),当前值(英文),客户填写值(中文),客户填写值(英文),说明');
        csvContent.push('标题,关于我们,关于我们,About Us,,,');
        csvContent.push('描述,核心描述,致力于为全球客户提供专业、可靠、创新的解决方案,Committed to providing professional, reliable and innovative solutions to global customers,,,');
        csvContent.push('内容,核心价值观,我们坚持以客户为中心，以技术创新为驱动，以人才培养为基础，致力于打造行业标杆企业。凭借十余年的行业经验和专业团队，我们为全球数千家企业提供优质的产品和服务。,We adhere to customer-centric approach, technology innovation as driving force, and talent cultivation as foundation. With over a decade of industry experience and professional teams, we provide quality products and services to thousands of enterprises globally.,,,');
        csvContent.push('价值观,专业,行业领先的专业实力,Industry-leading expertise,,,');
        csvContent.push('价值观,创新,不断追求技术突破,Continuous technological breakthroughs,,,');
        csvContent.push('价值观,信任,用户信任是我们的资本,User trust is our capital,,,');
        csvContent.push('价值观,成长,与客户共同成长发展,Growing together with customers,,,');
        csvContent.push('');
        
        // 5. 产品信息
        csvContent.push('产品信息');
        csvContent.push('分类,产品ID,产品名称(中文),产品名称(英文),描述(中文),描述(英文),价格,特性1,特性2,特性3,特性4,图片URL,客户填写名称(中文),客户填写名称(英文),客户填写描述(中文),客户填写描述(英文),客户价格,客户图片URL');
        csvContent.push('硬件产品,1,旗舰智能设备 X1,Flagship Smart Device X1,搭载最新AI芯片，性能领先业界,Powered by latest AI chip, leading performance,$999,AI芯片,8GB RAM,128GB存储,5G连接,https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop,,,,,,');
        csvContent.push('硬件产品,2,高端商务平板 Pro,Premium Business Tablet Pro,轻薄便携，专为商务设计,Ultra-thin and portable, designed for business,$799,12.9英寸屏幕,轻薄设计,长续航,4K摄像头,https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop,,,,,,');
        csvContent.push('硬件产品,3,无线降噪耳机 Plus,Wireless Noise Canceling Headphones Plus,顶级降噪技术，音质卓越,Top noise cancellation, superior sound quality,$399,主动降噪,40小时续航,蓝牙5.0,舒适佩戴,https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop,,,,,,');
        csvContent.push('软件解决方案,4,企业管理系统 ERP,Enterprise Management System ERP,全流程数字化管理，效率提升50%,Full-process digitalization, 50% efficiency boost,定制价格,模块化设计,可扩展性强,数据安全,24h支持,https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop,,,,,,');
        csvContent.push('软件解决方案,5,数据分析平台 Analytics,Data Analysis Platform Analytics,实时数据洞察，决策更智能,Real-time insights, smarter decisions,按年订阅,AI分析,实时监控,定制报表,多数据源,https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop,,,,,,');
        csvContent.push('');
        
        // 6. 联系信息
        csvContent.push('联系信息');
        csvContent.push('字段名称,当前值,客户填写值,说明');
        csvContent.push('联系标题,联系我们,,');
        csvContent.push('联系描述,有任何问题，我们随时准备好为您服务,,');
        csvContent.push('地址标题,公司地址,,');
        csvContent.push('地址内容,北京市朝阳区科技园路1号,,');
        csvContent.push('邮编,100000,,');
        csvContent.push('电话标题,联系电话,,');
        csvContent.push('电话号码,+86 10-1234-5678,,');
        csvContent.push('工作时间,周一至周五 9:00-18:00,,');
        csvContent.push('邮箱标题,电子邮箱,,');
        csvContent.push('邮箱地址1,contact@brand.com,,');
        csvContent.push('邮箱地址2,service@brand.com,,');
        csvContent.push('在线咨询标题,在线咨询,,');
        csvContent.push('在线咨询描述,实时客服支持,,');
        
        // 转换为CSV字符串，添加BOM头解决Excel乱码问题
        const csvString = csvContent.join('\n');
        const bom = '\uFEFF'; // UTF-8 BOM
        
        // 创建Blob并保存
        const blob = new Blob([bom + csvString], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, '网站信息汇总模板.csv');
    }
    
    /**
     * 生成简化的CSV模板（仅包含关键信息）
     */
    static generateSimpleCSVTemplate() {
        const csvContent = [];
        
        csvContent.push('网站信息快速填写模板');
        csvContent.push('字段分类,字段名称,当前值,客户填写值,说明');
        csvContent.push('基本信息,公司名称,元途,,请输入您的公司名称');
        csvContent.push('基本信息,品牌名称,BRAND,,请输入您的品牌名称');
        csvContent.push('基本信息,联系电话,+86 10-1234-5678,,客户服务电话');
        csvContent.push('基本信息,邮箱地址,contact@brand.com,,主要联系邮箱');
        csvContent.push('基本信息,公司地址,北京市朝阳区科技园路1号,,详细办公地址');
        csvContent.push('Banner,第一张标题,创新科技 启未来,,首页第一张轮播图标题');
        csvContent.push('Banner,第一张副标题,专业、可靠、领先的品牌形象,,首页第一张轮播图副标题');
        csvContent.push('Banner,第二张标题,数字转型 赋能业务,,首页第二张轮播图标题');
        csvContent.push('Banner,第二张副标题,全方位的解决方案和专业服务,,首页第二张轮播图副标题');
        csvContent.push('产品,产品1名称,旗舰智能设备 X1,,第一个产品名称');
        csvContent.push('产品,产品1描述,搭载最新AI芯片，性能领先业界,,第一个产品描述');
        csvContent.push('产品,产品1价格,$999,,第一个产品价格');
        csvContent.push('产品,产品2名称,高端商务平板 Pro,,第二个产品名称');
        csvContent.push('产品,产品2描述,轻薄便携，专为商务设计,,第二个产品描述');
        csvContent.push('产品,产品2价格,$799,,第二个产品价格');
        csvContent.push('联系信息,联系标题,联系我们,,');
        csvContent.push('联系信息,联系描述,有任何问题，我们随时准备好为您服务,,');
        csvContent.push('联系信息,详细地址,北京市朝阳区科技园路1号,,');
        csvContent.push('联系信息,联系电话,+86 10-1234-5678,,');
        csvContent.push('联系信息,联系邮箱,contact@brand.com,,');
        
        const csvString = csvContent.join('\n');
        const bom = '\uFEFF'; // UTF-8 BOM
        const blob = new Blob([bom + csvString], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, '网站信息快速填写模板.csv');
    }
}

export default CSVTemplateGenerator;