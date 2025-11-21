/**
 * 数据库初始化脚本 - MySQL 版本
 * 
 * 使用方法：
 * npm install mysql2
 * node server/db-init.js
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: 'server/.env' });

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'brand_showcase'
};

async function initDatabase() {
  let connection;

  try {
    console.log('📦 正在连接数据库...');

    // 第一次连接用于创建数据库
    connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password
    });

    console.log('✅ 已连接到 MySQL');

    // 创建数据库
    console.log(`📝 创建数据库: ${config.database}`);
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${config.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log('✅ 数据库已创建');

    // 连接到新数据库
    await connection.end();
    connection = await mysql.createConnection(config);

    // ==================== 创建表 ====================

    console.log('\n📋 创建数据库表...\n');

    // 1. 产品表
    console.log('创建 products 表...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category VARCHAR(50) NOT NULL,
        name VARCHAR(100) NOT NULL,
        image VARCHAR(255),
        description VARCHAR(200),
        price VARCHAR(50),
        features JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ products 表已创建\n');

    // 2. 资质荣誉表
    console.log('创建 certifications 表...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS certifications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50),
        image VARCHAR(255),
        importance INT DEFAULT 5,
        year INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_year (year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ certifications 表已创建\n');

    // 3. 新闻表
    console.log('创建 news 表...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS news (
        id INT PRIMARY KEY AUTO_INCREMENT,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(100) NOT NULL,
        summary VARCHAR(255),
        content LONGTEXT,
        image VARCHAR(255),
        author VARCHAR(50),
        published_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_type (type),
        INDEX idx_published_date (published_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ news 表已创建\n');

    // 4. 轮播图表
    console.log('创建 banner 表...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS banner (
        id INT PRIMARY KEY AUTO_INCREMENT,
        image VARCHAR(255) NOT NULL,
        title VARCHAR(100),
        subtitle VARCHAR(200),
        url VARCHAR(255),
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_display_order (display_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ banner 表已创建\n');

    // 5. 联系表单表
    console.log('创建 contact_submissions 表...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(100),
        message LONGTEXT NOT NULL,
        ip_address VARCHAR(50),
        is_read BOOLEAN DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at),
        INDEX idx_is_read (is_read)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ contact_submissions 表已创建\n');

    // 6. 文件记录表
    console.log('创建 uploads 表...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS uploads (
        id INT PRIMARY KEY AUTO_INCREMENT,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255),
        size INT,
        mimetype VARCHAR(100),
        path VARCHAR(255),
        uploaded_by VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_filename (filename),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ uploads 表已创建\n');

    // 7. 网站配置表
    console.log('创建 website_config 表...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS website_config (
        id INT PRIMARY KEY AUTO_INCREMENT,
        config_key VARCHAR(100) NOT NULL UNIQUE,
        config_value LONGTEXT,
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY unique_key (config_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log('✅ website_config 表已创建\n');

    // ==================== 插入示例数据 ====================

    console.log('📊 插入示例数据...\n');

    // 插入产品数据
    console.log('插入产品数据...');
    await connection.query(`
      INSERT INTO products (category, name, image, description, price, features)
      VALUES 
        ('硬件', '旗舰智能设备 X1', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', '搭载最新AI芯片，性能领先业界', '$999', JSON_ARRAY('AI芯片', '8GB RAM', '128GB存储', '5G连接')),
        ('硬件', '高端商务平板 Pro', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop', '轻薄便携，专为商务设计', '$799', JSON_ARRAY('12.9英寸屏幕', '轻薄设计', '长续航', '4K摄像头')),
        ('软件', '企业管理系统 ERP', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=500&fit=crop', '全流程数字化管理，效率提升50%', '定制价格', JSON_ARRAY('模块化设计', '可扩展性强', '数据安全', '24h支持')),
        ('云服务', '云存储解决方案', 'https://images.unsplash.com/photo-1520925961795-85288078b74b?w=500&h=500&fit=crop', '99.99% 可用性保证', '按需计费', JSON_ARRAY('无限扩展', '数据备份', '全球加速', '权限管理'))
      ON DUPLICATE KEY UPDATE updated_at = NOW()
    `);
    console.log('✅ 产品数据已插入\n');

    // 插入资质数据
    console.log('插入资质荣誉数据...');
    await connection.query(`
      INSERT INTO certifications (name, category, importance, year)
      VALUES
        ('ISO 9001 质量管理体系认证', '国际认证', 10, 2020),
        ('ISO 27001 信息安全管理体系', '安全认证', 9, 2021),
        ('国家高新技术企业认证', '政府认证', 10, 2019),
        ('发明专利授权证书', '专利', 8, 2022),
        ('行业创新奖', '奖项', 7, 2023)
      ON DUPLICATE KEY UPDATE updated_at = NOW()
    `);
    console.log('✅ 资质数据已插入\n');

    // 插入轮播数据
    console.log('插入轮播图数据...');
    await connection.query(`
      INSERT INTO banner (image, title, subtitle, display_order, is_active)
      VALUES
        ('https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop', '创新科技 启未来', '专业、可靠、领先的品牌形象', 1, 1),
        ('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop', '数字转型 赋能业务', '全方位的解决方案和专业服务', 2, 1),
        ('https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&h=600&fit=crop', '品质保证 值得信赖', '行业领先的技术实力和研发能力', 3, 1),
        ('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop', '携手共赢 创造价值', '与全球合作伙伴共创美好未来', 4, 1)
      ON DUPLICATE KEY UPDATE updated_at = NOW()
    `);
    console.log('✅ 轮播图数据已插入\n');

    // 插入新闻数据
    console.log('插入新闻数据...');
    await connection.query(`
      INSERT INTO news (type, title, summary, published_date)
      VALUES
        ('企业新闻', '公司荣获2024年最佳创新企业奖', '在2024年行业年会上荣获最佳创新企业奖', '2024-11-15'),
        ('企业新闻', '第五代产品正式发布', '经过两年研发，第五代旗舰产品今日正式发布', '2024-10-20'),
        ('行业资讯', 'AI技术突破重大进展', '人工智能新算法在识别精度上取得突破', '2024-11-10'),
        ('行业资讯', '云计算市场持续增长', '2024年云计算市场规模增长30%', '2024-10-25'),
        ('企业新闻', '签署全球战略合作协议', '与国际知名科技公司签署战略合作协议', '2024-09-15')
      ON DUPLICATE KEY UPDATE updated_at = NOW()
    `);
    console.log('✅ 新闻数据已插入\n');

    // 插入网站配置
    console.log('插入网站配置...');
    await connection.query(`
      INSERT INTO website_config (config_key, config_value, description)
      VALUES
        ('site_title', '品牌展示官网 - 专业、科技、创新', '网站标题'),
        ('site_description', '致力于为全球客户提供专业、可靠、创新的解决方案', '网站描述'),
        ('site_keywords', '品牌,产品,解决方案,科技,创新', '网站关键词'),
        ('primary_color', '#2c3e50', '主色'),
        ('secondary_color', '#3498db', '辅色'),
        ('accent_color', '#e74c3c', '强调色')
      ON DUPLICATE KEY UPDATE config_value = VALUES(config_value)
    `);
    console.log('✅ 网站配置已插入\n');

    console.log('✅ 数据库初始化完成！');
    console.log(`\n📊 数据库统计：`);

    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    const [certs] = await connection.query('SELECT COUNT(*) as count FROM certifications');
    const [news] = await connection.query('SELECT COUNT(*) as count FROM news');
    const [banner] = await connection.query('SELECT COUNT(*) as count FROM banner');

    console.log(`   产品: ${products[0].count} 个`);
    console.log(`   资质: ${certs[0].count} 个`);
    console.log(`   新闻: ${news[0].count} 条`);
    console.log(`   轮播: ${banner[0].count} 张`);

    console.log('\n✨ 所有操作完成！');

  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// 执行初始化
initDatabase();
