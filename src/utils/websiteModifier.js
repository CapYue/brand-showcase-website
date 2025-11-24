import Papa from 'papaparse';

/**
 * 网站内容修改器 - 根据CSV文件修改网站内容
 */
export class WebsiteModifier {

    /**
     * 解析CSV文件并应用修改
     * @param {File} csvFile - 上传的CSV文件
     * @param {Function} onUpdate - 更新回调函数
     */
    static async modifyFromCSV(csvFile, onUpdate) {
        return new Promise((resolve, reject) => {
            Papa.parse(csvFile, {
                header: false,
                complete: (results) => {
                    try {
                        const modifications = this.parseCSVData(results.data);
                        this.applyModifications(modifications, onUpdate);
                        resolve(modifications);
                    } catch (error) {
                        reject(error);
                    }
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    /**
     * 解析CSV数据并提取修改信息
     * @param {Array} csvData - CSV解析后的数据
     */
    static parseCSVData(csvData) {
        const modifications = {
            basicInfo: {},
            navigation: {},
            banners: {},
            about: {},
            products: {},
            contact: {}
        };

        let currentSection = '';

        for (let i = 0; i < csvData.length; i++) {
            const row = csvData[i];
            if (!row || row.length === 0) continue;

            const firstCell = row[0]?.trim() || '';

            // 检测章节标题
            if (firstCell.includes('基本信息表') || firstCell.includes('基本信息')) {
                currentSection = 'basicInfo';
                continue;
            } else if (firstCell.includes('导航菜单信息')) {
                currentSection = 'navigation';
                continue;
            } else if (firstCell.includes('Banner轮播图信息')) {
                currentSection = 'banners';
                continue;
            } else if (firstCell.includes('关于我们信息')) {
                currentSection = 'about';
                continue;
            } else if (firstCell.includes('产品信息')) {
                currentSection = 'products';
                continue;
            } else if (firstCell.includes('联系信息')) {
                currentSection = 'contact';
                continue;
            }

            // 跳过标题行和空行
            if (firstCell.includes('字段名称') || firstCell.includes('字段分类') ||
                firstCell.includes('网站信息') || row.length < 3) {
                continue;
            }

            // 根据章节处理数据
            switch (currentSection) {
                case 'basicInfo':
                    if (row.length >= 4) {
                        const fieldName = row[0]?.trim();
                        const customerValue = row[2]?.trim();
                        if (fieldName && customerValue) {
                            modifications.basicInfo[fieldName] = customerValue;
                        }
                    }
                    break;

                case 'navigation':
                    if (row.length >= 6) {
                        const navItem = row[0]?.trim();
                        const customerValueZh = row[3]?.trim();
                        const customerValueEn = row[4]?.trim();
                        if (navItem && (customerValueZh || customerValueEn)) {
                            modifications.navigation[navItem] = {
                                zh: customerValueZh,
                                en: customerValueEn
                            };
                        }
                    }
                    break;

                case 'banners':
                    if (row.length >= 8) {
                        const slideNum = row[0]?.trim();
                        const customerTitle = row[4]?.trim();
                        const customerSubtitle = row[5]?.trim();
                        const customerImage = row[6]?.trim();
                        if (slideNum && (customerTitle || customerSubtitle || customerImage)) {
                            modifications.banners[`slide${slideNum}`] = {
                                title: customerTitle,
                                subtitle: customerSubtitle,
                                image: customerImage
                            };
                        }
                    }
                    break;

                case 'about':
                    if (row.length >= 7) {
                        const fieldType = row[0]?.trim();
                        const fieldName = row[1]?.trim();
                        const customerValueZh = row[4]?.trim();
                        const customerValueEn = row[5]?.trim();
                        if (fieldType && fieldName && (customerValueZh || customerValueEn)) {
                            if (!modifications.about[fieldType]) {
                                modifications.about[fieldType] = {};
                            }
                            modifications.about[fieldType][fieldName] = {
                                zh: customerValueZh,
                                en: customerValueEn
                            };
                        }
                    }
                    break;

                case 'products':
                    if (row.length >= 18) {
                        const productId = row[1]?.trim();
                        const customerNameZh = row[12]?.trim();
                        const customerNameEn = row[13]?.trim();
                        const customerDescZh = row[14]?.trim();
                        const customerDescEn = row[15]?.trim();
                        const customerPrice = row[16]?.trim();
                        const customerImage = row[17]?.trim();
                        if (productId && (customerNameZh || customerNameEn || customerDescZh || customerDescEn || customerPrice || customerImage)) {
                            modifications.products[`product${productId}`] = {
                                nameZh: customerNameZh,
                                nameEn: customerNameEn,
                                descZh: customerDescZh,
                                descEn: customerDescEn,
                                price: customerPrice,
                                image: customerImage
                            };
                        }
                    }
                    break;

                case 'contact':
                    if (row.length >= 4) {
                        const fieldName = row[0]?.trim();
                        const customerValue = row[2]?.trim();
                        if (fieldName && customerValue) {
                            modifications.contact[fieldName] = customerValue;
                        }
                    }
                    break;
            }
        }

        return modifications;
    }

    /**
     * 应用修改到网站
     * @param {Object} modifications - 修改数据
     * @param {Function} onUpdate - 更新回调
     */
    static applyModifications(modifications, onUpdate) {
        const updates = [];

        // 应用基本信息修改
        if (modifications.basicInfo) {
            Object.entries(modifications.basicInfo).forEach(([field, value]) => {
                if (value) {
                    updates.push({
                        type: 'basicInfo',
                        field: field,
                        value: value,
                        action: () => this.updateBasicInfo(field, value)
                    });
                }
            });
        }

        // 应用导航菜单修改
        if (modifications.navigation) {
            Object.entries(modifications.navigation).forEach(([navItem, values]) => {
                if (values.zh || values.en) {
                    updates.push({
                        type: 'navigation',
                        item: navItem,
                        values: values,
                        action: () => this.updateNavigation(navItem, values)
                    });
                }
            });
        }

        // 应用Banner修改
        if (modifications.banners) {
            Object.entries(modifications.banners).forEach(([slide, data]) => {
                if (data.title || data.subtitle || data.image) {
                    updates.push({
                        type: 'banner',
                        slide: slide,
                        data: data,
                        action: () => this.updateBanner(slide, data)
                    });
                }
            });
        }

        // 应用关于我们修改
        if (modifications.about) {
            Object.entries(modifications.about).forEach(([fieldType, fields]) => {
                Object.entries(fields).forEach(([fieldName, values]) => {
                    if (values.zh || values.en) {
                        updates.push({
                            type: 'about',
                            fieldType: fieldType,
                            fieldName: fieldName,
                            values: values,
                            action: () => this.updateAbout(fieldType, fieldName, values)
                        });
                    }
                });
            });
        }

        // 应用产品信息修改
        if (modifications.products) {
            Object.entries(modifications.products).forEach(([product, data]) => {
                if (data.nameZh || data.nameEn || data.descZh || data.descEn || data.price || data.image) {
                    updates.push({
                        type: 'product',
                        product: product,
                        data: data,
                        action: () => this.updateProduct(product, data)
                    });
                }
            });
        }

        // 应用联系信息修改
        if (modifications.contact) {
            Object.entries(modifications.contact).forEach(([field, value]) => {
                if (value) {
                    updates.push({
                        type: 'contact',
                        field: field,
                        value: value,
                        action: () => this.updateContact(field, value)
                    });
                }
            });
        }

        // 执行所有更新
        updates.forEach((update, index) => {
            setTimeout(() => {
                try {
                    update.action();
                    if (onUpdate) {
                        onUpdate({
                            type: update.type,
                            item: update.item || update.field || update.product,
                            success: true,
                            message: `${update.type} 更新成功`
                        });
                    }
                } catch (error) {
                    if (onUpdate) {
                        onUpdate({
                            type: update.type,
                            item: update.item || update.field || update.product,
                            success: false,
                            message: `更新失败: ${error.message}`
                        });
                    }
                }
            }, index * 100); // 间隔执行，避免同时修改DOM
        });

        return updates.length;
    }

    /**
     * 更新基本信息
     */
    static updateBasicInfo(field, value) {
        // 更新页面的基本信息
        // 支持多个选择器以核查各软会内容
        const selectors = {
            '公司名称': ['.company-name', '[data-name="company"]', '.navbar-logo'],
            '品牌名称': ['.brand-name', '[data-name="brand"]', '.brand-logo'],
            '网站标题': [],
            '联系电话': ['.phone-number', '.contact-phone', '[data-contact="phone"]'],
            '邮箱地址': ['.email-address', '.contact-email', '[data-contact="email"]'],
            '公司地址': ['.company-address', '.contact-address', '[data-contact="address"]']
        };

        if (field === '网站标题') {
            document.title = value;
            return;
        }

        const selectorList = selectors[field] || [];

        // 优先使用一些更简化的整体更新方案
        selectorList.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                el.textContent = value;
            });
        });

        // 如果没找到，会去检查整个页面找布门
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.textContent && el.textContent.trim() === field) {
                el.textContent = value;
            }
        });
    }

    /**
     * 更新导航菜单
     */
    static updateNavigation(navItem, values) {
        // 根据导航项更新对应的文本
        const selector = `.nav-item-${navItem.toLowerCase()}`;
        if (values.zh) {
            this.updateTextContent(`${selector} .zh`, values.zh);
        }
        if (values.en) {
            this.updateTextContent(`${selector} .en`, values.en);
        }
    }

    /**
     * 更新Banner内容
     */
    static updateBanner(slide, data) {
        const slideIndex = slide.replace('slide', '');
        const selector = `.banner-slide-${slideIndex}`;

        if (data.title) {
            this.updateTextContent(`${selector} .title`, data.title);
        }
        if (data.subtitle) {
            this.updateTextContent(`${selector} .subtitle`, data.subtitle);
        }
        if (data.image) {
            this.updateImageSource(`${selector} img`, data.image);
        }
    }

    /**
     * 更新关于我们内容
     */
    static updateAbout(fieldType, fieldName, values) {
        const selector = `.about-${fieldType.toLowerCase()}-${fieldName.toLowerCase()}`;
        if (values.zh) {
            this.updateTextContent(`${selector} .zh`, values.zh);
        }
        if (values.en) {
            this.updateTextContent(`${selector} .en`, values.en);
        }
    }

    /**
     * 更新产品信息
     */
    static updateProduct(product, data) {
        const productIndex = product.replace('product', '');
        const selector = `.product-item-${productIndex}`;

        if (data.nameZh) {
            this.updateTextContent(`${selector} .name-zh`, data.nameZh);
        }
        if (data.nameEn) {
            this.updateTextContent(`${selector} .name-en`, data.nameEn);
        }
        if (data.descZh) {
            this.updateTextContent(`${selector} .desc-zh`, data.descZh);
        }
        if (data.descEn) {
            this.updateTextContent(`${selector} .desc-en`, data.descEn);
        }
        if (data.price) {
            this.updateTextContent(`${selector} .price`, data.price);
        }
        if (data.image) {
            this.updateImageSource(`${selector} img`, data.image);
        }
    }

    /**
     * 更新联系信息
     */
    static updateContact(field, value) {
        const selector = `.contact-${field.toLowerCase()}`;
        this.updateTextContent(selector, value);
    }

    /**
     * 通用文本内容更新方法 - 增强版本
     */
    static updateTextContent(selector, text) {
        if (!text) return;

        // 优先使用选择器查找
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach(el => {
                el.textContent = text;
            });
            return;
        }

        // 如果选择器没有找到，则尝试全页面搜索
        const allElements = document.querySelectorAll('*');
        for (let el of allElements) {
            // 检查是不是内容元素
            if (el.childNodes.length > 0) continue; // 跳过有子的元素
            if (el.textContent && el.textContent.length < 200) {
                el.textContent = text;
                break;
            }
        }
    }

    /**
     * 通用图片源更新方法
     */
    static updateImageSource(selector, src) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.src = src;
        });
    }

    /**
     * 生成修改报告
     */
    static generateModificationReport(modifications) {
        const report = {
            timestamp: new Date().toISOString(),
            totalModifications: 0,
            sections: {}
        };

        Object.entries(modifications).forEach(([section, data]) => {
            const count = Object.keys(data).length;
            report.sections[section] = count;
            report.totalModifications += count;
        });

        return report;
    }
}

export default WebsiteModifier;