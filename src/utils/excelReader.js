import * as XLSX from 'xlsx';

/**
 * Excel读取器 - 用于读取客户填写的Excel并更新网站内容
 */
export class ExcelReader {
    
    /**
     * 读取Excel文件并解析数据
     * @param {File} file - Excel文件
     * @returns {Promise<Object>} 解析后的数据对象
     */
    static async readExcelFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const parsedData = this.parseWorkbook(workbook);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error(`Excel文件读取失败: ${error.message}`));
                }
            };
            
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsArrayBuffer(file);
        });
    }
    
    /**
     * 解析工作簿数据
     * @param {Object} workbook - XLSX工作簿对象
     * @returns {Object} 解析后的数据结构
     */
    static parseWorkbook(workbook) {
        const result = {
            basicInfo: {},
            navigation: {},
            banner: [],
            about: {},
            milestones: [],
            team: [],
            products: {},
            news: {},
            certifications: [],
            contact: {},
            footer: {}
        };
        
        // 解析基本信息表
        if (workbook.Sheets['基本信息']) {
            const basicSheet = XLSX.utils.sheet_to_json(workbook.Sheets['基本信息'], { header: 1 });
            result.basicInfo = this.parseBasicInfo(basicSheet);
        }
        
        // 解析导航菜单表
        if (workbook.Sheets['导航菜单']) {
            const navSheet = XLSX.utils.sheet_to_json(workbook.Sheets['导航菜单'], { header: 1 });
            result.navigation = this.parseNavigation(navSheet);
        }
        
        // 解析Banner轮播表
        if (workbook.Sheets['Banner轮播']) {
            const bannerSheet = XLSX.utils.sheet_to_json(workbook.Sheets['Banner轮播'], { header: 1 });
            result.banner = this.parseBanner(bannerSheet);
        }
        
        // 解析关于我们表
        if (workbook.Sheets['关于我们']) {
            const aboutSheet = XLSX.utils.sheet_to_json(workbook.Sheets['关于我们'], { header: 1 });
            result.about = this.parseAbout(aboutSheet);
        }
        
        // 解析发展历程表
        if (workbook.Sheets['发展历程']) {
            const milestoneSheet = XLSX.utils.sheet_to_json(workbook.Sheets['发展历程'], { header: 1 });
            result.milestones = this.parseMilestones(milestoneSheet);
        }
        
        // 解析团队信息表
        if (workbook.Sheets['团队信息']) {
            const teamSheet = XLSX.utils.sheet_to_json(workbook.Sheets['团队信息'], { header: 1 });
            result.team = this.parseTeam(teamSheet);
        }
        
        // 解析产品信息表
        if (workbook.Sheets['产品信息']) {
            const productsSheet = XLSX.utils.sheet_to_json(workbook.Sheets['产品信息'], { header: 1 });
            result.products = this.parseProducts(productsSheet);
        }
        
        // 解析新闻动态表
        if (workbook.Sheets['新闻动态']) {
            const newsSheet = XLSX.utils.sheet_to_json(workbook.Sheets['新闻动态'], { header: 1 });
            result.news = this.parseNews(newsSheet);
        }
        
        // 解析资质荣誉表
        if (workbook.Sheets['资质荣誉']) {
            const certsSheet = XLSX.utils.sheet_to_json(workbook.Sheets['资质荣誉'], { header: 1 });
            result.certifications = this.parseCertifications(certsSheet);
        }
        
        // 解析联系信息表
        if (workbook.Sheets['联系信息']) {
            const contactSheet = XLSX.utils.sheet_to_json(workbook.Sheets['联系信息'], { header: 1 });
            result.contact = this.parseContact(contactSheet);
        }
        
        // 解析页脚信息表
        if (workbook.Sheets['页脚信息']) {
            const footerSheet = XLSX.utils.sheet_to_json(workbook.Sheets['页脚信息'], { header: 1 });
            result.footer = this.parseFooter(footerSheet);
        }
        
        return result;
    }
    
    /**
     * 解析基本信息
     */
    static parseBasicInfo(sheetData) {
        const info = {};
        // 跳过表头
        for (let i = 4; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 3) {
                const fieldName = row[0];
                const customerValue = row[2];
                if (fieldName && customerValue) {
                    info[fieldName] = customerValue;
                }
            }
        }
        return info;
    }
    
    /**
     * 解析导航菜单
     */
    static parseNavigation(sheetData) {
        const navItems = [];
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 5) {
                const zhValue = row[3] || row[1];
                const enValue = row[4] || row[2];
                if (zhValue && enValue) {
                    navItems.push({
                        labelZh: zhValue,
                        labelEn: enValue,
                        href: row[0] ? `#${row[0].toLowerCase()}` : '#'
                    });
                }
            }
        }
        return navItems;
    }
    
    /**
     * 解析Banner轮播
     */
    static parseBanner(sheetData) {
        const banners = [];
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 7) {
                const title = row[4] || row[1];
                const subtitle = row[5] || row[2];
                const image = row[6] || row[3];
                if (title) {
                    banners.push({
                        id: i - 1,
                        title,
                        subtitle,
                        image
                    });
                }
            }
        }
        return banners;
    }
    
    /**
     * 解析关于我们信息
     */
    static parseAbout(sheetData) {
        const about = {
            title: {},
            description: {},
            values: []
        };
        
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 6) {
                const fieldType = row[0];
                const fieldName = row[1];
                const zhValue = row[4] || row[2];
                const enValue = row[5] || row[3];
                
                if (fieldType === '标题') {
                    about.title = { zh: zhValue, en: enValue };
                } else if (fieldType === '描述') {
                    about.description = { zh: zhValue, en: enValue };
                } else if (fieldType === '价值观' && zhValue) {
                    about.values.push({
                        name: fieldName,
                        zh: zhValue,
                        en: enValue
                    });
                }
            }
        }
        return about;
    }
    
    /**
     * 解析发展历程
     */
    static parseMilestones(sheetData) {
        const milestones = [];
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 5) {
                const year = row[0];
                const zhEvent = row[3] || row[1];
                const enEvent = row[4] || row[2];
                if (year && zhEvent) {
                    milestones.push({
                        year: parseInt(year),
                        eventZh: zhEvent,
                        eventEn: enEvent
                    });
                }
            }
        }
        return milestones;
    }
    
    /**
     * 解析团队信息
     */
    static parseTeam(sheetData) {
        const team = [];
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 9) {
                const name = row[5] || row[1];
                const positionZh = row[6] || row[2];
                const positionEn = row[7] || row[3];
                const image = row[8] || row[4];
                if (name) {
                    team.push({
                        name,
                        positionZh,
                        positionEn,
                        image
                    });
                }
            }
        }
        return team;
    }
    
    /**
     * 解析产品信息
     */
    static parseProducts(sheetData) {
        const products = {
            categories: [],
            products: []
        };
        
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 17) {
                const category = row[0];
                const nameZh = row[12] || row[2];
                const nameEn = row[13] || row[3];
                const descZh = row[14] || row[4];
                const descEn = row[15] || row[5];
                const price = row[16] || row[6];
                const image = row[17] || row[11];
                
                if (nameZh) {
                    products.products.push({
                        category,
                        nameZh,
                        nameEn,
                        descriptionZh: descZh,
                        descriptionEn: descEn,
                        price,
                        image,
                        specs: [row[7], row[8], row[9], row[10]].filter(Boolean)
                    });
                }
            }
        }
        return products;
    }
    
    /**
     * 解析新闻动态
     */
    static parseNews(sheetData) {
        const news = {
            company: [],
            industry: []
        };
        
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 12) {
                const category = row[0];
                const titleZh = row[7] || row[2];
                const titleEn = row[8] || row[3];
                const date = row[9] || row[4];
                const excerptZh = row[10] || row[5];
                const excerptEn = row[11] || row[6];
                
                if (titleZh) {
                    const newsItem = {
                        titleZh,
                        titleEn,
                        date,
                        excerptZh,
                        excerptEn
                    };
                    
                    if (category === '企业新闻') {
                        news.company.push(newsItem);
                    } else {
                        news.industry.push(newsItem);
                    }
                }
            }
        }
        return news;
    }
    
    /**
     * 解析资质荣誉
     */
    static parseCertifications(sheetData) {
        const certifications = [];
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 11) {
                const nameZh = row[7] || row[1];
                const nameEn = row[8] || row[2];
                const category = row[9] || row[3];
                const image = row[10] || row[6];
                const year = row[5] || row[4];
                
                if (nameZh) {
                    certifications.push({
                        nameZh,
                        nameEn,
                        category,
                        image,
                        year: parseInt(year),
                        importance: parseInt(row[4]) || 5
                    });
                }
            }
        }
        return certifications;
    }
    
    /**
     * 解析联系信息
     */
    static parseContact(sheetData) {
        const contact = {};
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 3) {
                const fieldName = row[0];
                const value = row[2] || row[1];
                if (fieldName && value) {
                    contact[fieldName] = value;
                }
            }
        }
        return contact;
    }
    
    /**
     * 解析页脚信息
     */
    static parseFooter(sheetData) {
        const footer = {
            company: [],
            products: [],
            resources: []
        };
        
        for (let i = 2; i < sheetData.length; i++) {
            const row = sheetData[i];
            if (row && row.length >= 6) {
                const category = row[0];
                const labelZh = row[4] || row[1];
                const labelEn = row[5] || row[2];
                const href = row[3];
                
                if (labelZh) {
                    const link = {
                        labelZh,
                        labelEn,
                        href
                    };
                    
                    if (category === '公司') {
                        footer.company.push(link);
                    } else if (category === '产品') {
                        footer.products.push(link);
                    } else {
                        footer.resources.push(link);
                    }
                }
            }
        }
        return footer;
    }
    
    /**
     * 验证Excel数据格式
     * @param {Object} data - 解析后的数据
     * @returns {Object} 验证结果
     */
    static validateData(data) {
        const errors = [];
        const warnings = [];
        
        // 验证基本信息
        if (!data.basicInfo || Object.keys(data.basicInfo).length === 0) {
            errors.push('基本信息表数据为空');
        }
        
        // 验证必要字段
        const requiredFields = ['公司名称', '品牌名称', '联系电话'];
        requiredFields.forEach(field => {
            if (!data.basicInfo[field]) {
                errors.push(`基本信息中缺少必要字段: ${field}`);
            }
        });
        
        // 验证Banner数据
        if (!data.banner || data.banner.length === 0) {
            warnings.push('Banner轮播图数据为空，将使用默认数据');
        }
        
        // 验证产品数据
        if (!data.products || data.products.products.length === 0) {
            warnings.push('产品信息数据为空，将使用默认数据');
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
}

export default ExcelReader;