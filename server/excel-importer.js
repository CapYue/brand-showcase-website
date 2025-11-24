#!/usr/bin/env node

/**
 * Excel 导入工具 - 命令行脚本
 * 用于导入 Excel 文件并更新网站配置和数据
 * 
 * 使用方法:
 * node server/excel-importer.js <excel文件路径>
 * 
 * 例如:
 * node server/excel-importer.js ./website-data.xlsx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取命令行参数
const excelFilePath = process.argv[2];

if (!excelFilePath) {
    console.error('❌ 错误：请提供 Excel 文件路径');
    console.error('用法: node server/excel-importer.js <excel文件路径>');
    console.error('\n示例: node server/excel-importer.js ./website-data.xlsx');
    process.exit(1);
}

// 检查文件是否存在
if (!fs.existsSync(excelFilePath)) {
    console.error(`❌ 错误：文件不存在 - ${excelFilePath}`);
    process.exit(1);
}

console.log('📊 Excel 导入工具');
console.log('=====================================');
console.log(`\n📁 读取文件: ${excelFilePath}\n`);

try {
    // 导入 xlsx 库
    const XLSX = await import('xlsx');
    
    // 读取 Excel 文件
    const workbook = XLSX.readFile(excelFilePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet);

    if (data.length === 0) {
        console.error('❌ 错误：Excel 文件为空');
        process.exit(1);
    }

    console.log(`✅ 成功读取 ${data.length} 行数据\n`);

    // 处理数据
    const modifications = processExcelData(data);
    
    // 应用修改
    applyModifications(modifications);
    
    console.log('\n✅ 导入完成！');
    process.exit(0);

} catch (error) {
    console.error('❌ 处理失败:', error.message);
    process.exit(1);
}

/**
 * 处理 Excel 数据
 */
function processExcelData(data) {
    const modifications = {
        navbar: {},
        banner: [],
        about: {},
        products: [],
        certifications: [],
        news: [],
        contact: {},
        footer: {},
        config: {}
    };

    data.forEach((row, index) => {
        const category = row['分类'] || row['Category'];
        const field = row['字段'] || row['Field'];
        const value = row['值'] || row['Value'];
        const description = row['说明'] || row['Description'] || '';

        if (!category || !field || !value) return;

        console.log(`  行 ${index + 1}: ${category} - ${field}`);

        // 根据分类处理数据
        switch (category.toLowerCase()) {
            case '导航':
            case 'navbar':
                modifications.navbar[field] = value;
                break;
            case '轮播':
            case 'banner':
                modifications.banner.push({ field, value, description });
                break;
            case '企业简介':
            case 'about':
                modifications.about[field] = value;
                break;
            case '产品':
            case 'products':
                modifications.products.push({ field, value, description });
                break;
            case '资质':
            case 'certifications':
                modifications.certifications.push({ field, value, description });
                break;
            case '新闻':
            case 'news':
                modifications.news.push({ field, value, description });
                break;
            case '联系':
            case 'contact':
                modifications.contact[field] = value;
                break;
            case '页脚':
            case 'footer':
                modifications.footer[field] = value;
                break;
            case '配置':
            case 'config':
                modifications.config[field] = value;
                break;
        }
    });

    return modifications;
}

/**
 * 应用修改到配置文件
 */
function applyModifications(modifications) {
    console.log('\n📝 应用修改...\n');

    // 获取配置文件路径
    const publicDir = path.join(__dirname, '../public');
    const configPath = path.join(publicDir, 'config.json');
    const configDevPath = path.join(publicDir, 'config-dev.json');

    // 读取现有配置
    let config = {};
    if (fs.existsSync(configPath)) {
        const content = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(content);
    }

    // 合并修改
    if (modifications.navbar && Object.keys(modifications.navbar).length > 0) {
        config.navbar = config.navbar || {};
        Object.assign(config.navbar, modifications.navbar);
        console.log('  ✅ 导航栏已更新');
    }

    if (modifications.banner && modifications.banner.length > 0) {
        config.banner = modifications.banner;
        console.log('  ✅ 轮播图已更新');
    }

    if (modifications.about && Object.keys(modifications.about).length > 0) {
        config.about = config.about || {};
        Object.assign(config.about, modifications.about);
        console.log('  ✅ 企业简介已更新');
    }

    if (modifications.products && modifications.products.length > 0) {
        config.products = modifications.products;
        console.log('  ✅ 产品信息已更新');
    }

    if (modifications.certifications && modifications.certifications.length > 0) {
        config.certifications = modifications.certifications;
        console.log('  ✅ 资质荣誉已更新');
    }

    if (modifications.news && modifications.news.length > 0) {
        config.news = modifications.news;
        console.log('  ✅ 新闻动态已更新');
    }

    if (modifications.contact && Object.keys(modifications.contact).length > 0) {
        config.contact = config.contact || {};
        Object.assign(config.contact, modifications.contact);
        console.log('  ✅ 联系信息已更新');
    }

    if (modifications.footer && Object.keys(modifications.footer).length > 0) {
        config.footer = config.footer || {};
        Object.assign(config.footer, modifications.footer);
        console.log('  ✅ 页脚已更新');
    }

    if (modifications.config && Object.keys(modifications.config).length > 0) {
        Object.assign(config, modifications.config);
        console.log('  ✅ 配置已更新');
    }

    // 保存配置文件
    const jsonContent = JSON.stringify(config, null, 2);
    fs.writeFileSync(configPath, jsonContent, 'utf-8');
    console.log(`\n💾 配置已保存到: ${configPath}`);

    // 同时更新开发配置
    if (fs.existsSync(configDevPath)) {
        fs.writeFileSync(configDevPath, jsonContent, 'utf-8');
        console.log(`💾 开发配置已更新: ${configDevPath}`);
    }

    // 生成导入报告
    generateReport(modifications, configPath);
}

/**
 * 生成导入报告
 */
function generateReport(modifications, configPath) {
    const report = {
        timestamp: new Date().toISOString(),
        configFile: configPath,
        summary: {
            navbar: Object.keys(modifications.navbar || {}).length,
            banner: (modifications.banner || []).length,
            about: Object.keys(modifications.about || {}).length,
            products: (modifications.products || []).length,
            certifications: (modifications.certifications || []).length,
            news: (modifications.news || []).length,
            contact: Object.keys(modifications.contact || {}).length,
            footer: Object.keys(modifications.footer || {}).length,
            config: Object.keys(modifications.config || {}).length
        }
    };

    console.log('\n📊 导入报告:');
    console.log('  导航栏:    ' + report.summary.navbar + ' 项');
    console.log('  轮播图:    ' + report.summary.banner + ' 项');
    console.log('  企业简介:  ' + report.summary.about + ' 项');
    console.log('  产品信息:  ' + report.summary.products + ' 项');
    console.log('  资质荣誉:  ' + report.summary.certifications + ' 项');
    console.log('  新闻动态:  ' + report.summary.news + ' 项');
    console.log('  联系信息:  ' + report.summary.contact + ' 项');
    console.log('  页脚:      ' + report.summary.footer + ' 项');
    console.log('  其他配置:  ' + report.summary.config + ' 项');

    // 保存报告
    const reportPath = path.join(path.dirname(configPath), 'import-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`\n📋 报告已保存: ${reportPath}`);
}
