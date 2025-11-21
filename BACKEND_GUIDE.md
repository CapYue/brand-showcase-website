# 🚀 网站后端接入和运营指南

## 📋 项目概述

本网站采用**前后端分离架构**：
- **前端**：React + Vite（已完成）
- **后端**：Node.js + Express（新增）
- **数据存储**：支持本地JSON、MySQL、MongoDB等
- **文件存储**：本地或阿里云 OSS

---

## 🏗️ 系统架构

```
┌──────────────────────────────────────────────────────────┐
│          网站前端 (React + Vite)                         │
│  - 组件化架构（Navbar, Banner, Products 等）             │
│  - 通过 API 从后端加载所有数据                            │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP 请求
                       ↓
┌──────────────────────────────────────────────────────────┐
│       后端服务 (Node.js + Express)                       │
│  ├── GET /api/website/* - 获取网站数据                  │
│  ├── POST /api/website/contact/submit - 提交表单        │
│  ├── POST /api/upload/image - 上传图片                  │
│  └── PUT /api/admin/* - 更新数据（需认证）             │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
   ┌────────┐    ┌─────────┐    ┌─────────┐
   │数据库   │    │文件存储  │    │管理后台 │
   │MySQL   │    │阿里云OSS │    │前端界面 │
   └────────┘    └─────────┘    └─────────┘
```

---

## 📦 安装和启动

### 第一步：安装后端依赖

```bash
# 进入项目根目录
cd e:\网站项目\产品展示官网

# 安装全局依赖（如果未安装）
npm install

# 安装后端特定依赖
npm install express cors dotenv multer
```

### 第二步：配置环境变量

编辑 `server/.env` 文件：

```ini
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 第三步：启动后端服务

```bash
# 方法1：直接运行
node server/server.js

# 方法2：使用 nodemon（自动重启）
npm install -g nodemon
nodemon server/server.js
```

你会看到：
```
✅ API 服务器运行在: http://localhost:5000
📝 API 文档:
   - 轮播: GET /api/website/banner
   - 产品: GET /api/website/products
   - 新闻: GET /api/website/news
   - 联系: POST /api/website/contact/submit
   - 上传: POST /api/upload/image
```

### 第四步：启动前端服务

在新的终端窗口：

```bash
npm run dev
```

访问：`http://localhost:5173`

---

## 🔌 API 接口文档

### 获取数据接口（公开）

#### 1. 获取轮播图数据
```
GET /api/website/banner
```

响应：
```json
[
  {
    "id": 1,
    "image": "https://...",
    "title": "创新科技 启未来",
    "subtitle": "专业、可靠、领先的品牌形象"
  }
]
```

#### 2. 获取产品列表
```
GET /api/website/products
GET /api/website/products?category=硬件
```

响应：
```json
[
  {
    "id": 1,
    "category": "硬件",
    "name": "旗舰智能设备 X1",
    "image": "https://...",
    "description": "搭载最新AI芯片",
    "price": "$999",
    "features": ["AI芯片", "8GB RAM", "128GB存储"]
  }
]
```

#### 3. 获取单个产品
```
GET /api/website/products/:id
```

#### 4. 获取资质荣誉
```
GET /api/website/certifications
```

#### 5. 获取新闻列表
```
GET /api/website/news
GET /api/website/news?type=企业新闻&page=1&pageSize=5
```

#### 6. 获取企业信息
```
GET /api/website/about
GET /api/website/contact
GET /api/website/footer
GET /api/website/config
```

---

### 提交数据接口

#### 1. 提交联系表单
```
POST /api/website/contact/submit
Content-Type: application/json

{
  "name": "客户名称",
  "email": "customer@example.com",
  "phone": "13800138000",
  "subject": "咨询主题",
  "message": "留言内容"
}
```

响应：
```json
{
  "success": true,
  "message": "表单提交成功，我们会尽快联系您"
}
```

#### 2. 上传图片
```
POST /api/upload/image
Content-Type: multipart/form-data

file: <image file>
```

响应：
```json
{
  "success": true,
  "filename": "1234567890-abc123.jpg",
  "url": "/uploads/1234567890-abc123.jpg",
  "size": 102400
}
```

---

### 管理接口（需要认证）

#### 1. 更新产品
```
PUT /api/admin/products/:id
Content-Type: application/json

{
  "name": "新产品名称",
  "price": "$1999",
  "description": "新的描述"
}
```

#### 2. 新增产品
```
POST /api/admin/products
Content-Type: application/json

{
  "category": "硬件",
  "name": "新产品",
  "image": "...",
  "description": "描述",
  "price": "$999",
  "features": ["特性1", "特性2"]
}
```

#### 3. 删除产品
```
DELETE /api/admin/products/:id
```

---

## 💻 使用管理后台

### 访问管理后台

在前端添加管理路由（临时）：

编辑 `src/App.jsx`：

```javascript
import AdminDashboard from './components/AdminDashboard';

// 在路由中添加
<Route path="/admin" element={<AdminDashboard />} />
```

访问：`http://localhost:5173/admin`

### 管理后台功能

- 📦 **产品管理** - 添加、编辑、删除产品
- 🏆 **资质管理** - 管理荣誉和认证
- 📰 **新闻管理** - 发布和编辑新闻
- 🎨 **轮播管理** - 管理首页轮播图
- 📤 **图片上传** - 上传和管理产品图片

---

## 🗂️ 数据存储方案

### 方案 1：本地 JSON（开发环境）

**优点**：简单易用，无需数据库
**缺点**：不支持多并发，数据安全性低

**配置**：`server/server.js` 默认使用

```javascript
const websiteData = {
  banner: [...],
  products: [...],
  // ...
};
```

### 方案 2：MySQL 数据库（推荐）

**优点**：稳定可靠，支持复杂查询
**缺点**：需要部署数据库服务

**安装步骤**：

```bash
# 1. 安装 MySQL 驱动
npm install mysql2 sequelize

# 2. 创建数据库
CREATE DATABASE brand_showcase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 3. 创建表（示例）
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(50),
  name VARCHAR(100),
  image VARCHAR(255),
  description VARCHAR(200),
  price VARCHAR(50),
  features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**配置 `.env`**：

```ini
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=brand_showcase
```

### 方案 3：阿里云 OSS（图片存储）

**优点**：云端存储，CDN 加速，成本低
**缺点**：需要阿里云账号

**配置步骤**：

```bash
# 1. 安装 OSS 包
npm install ali-oss

# 2. 在 server/.env 中配置
ALI_REGION=oss-cn-beijing
ALI_BUCKET=your-bucket
ALI_ENDPOINT=https://oss-cn-beijing.aliyuncs.com
ALI_ACCESS_KEY=your_key
ALI_SECRET_KEY=your_secret
```

---

## 🔐 安全建议

### 1. 认证和授权

添加 JWT 认证：

```bash
npm install jsonwebtoken
```

```javascript
// 在 API 前添加认证中间件
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: '未授权' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: '令牌无效' });
    req.user = user;
    next();
  });
};

// 在管理接口前使用
app.put('/api/admin/products/:id', authenticateToken, (req, res) => {
  // ...
});
```

### 2. CORS 安全

```javascript
app.use(cors({
  origin: ['https://yourdomain.com'], // 生产环境明确设置
  credentials: true
}));
```

### 3. 输入验证

```bash
npm install joi
```

### 4. SQL 注入防护

使用 ORM（如 Sequelize）自动防护。

---

## 📊 运营流程

### 日常内容更新

1. **访问管理后台** → `http://localhost:5173/admin`
2. **选择要更新的模块**（产品、新闻等）
3. **编辑内容** → 输入信息、上传图片
4. **保存** → 前端实时生效

### 产品上架流程

```
新增产品 → 上传图片 → 填写信息 → 选择分类 → 保存
   ↓         ↓          ↓          ↓      ↓
  后台      API        数据库    分类   前端显示
```

### 新闻发布流程

```
创建新闻 → 编写内容 → 选择分类 → 设置日期 → 发布
  (标题)  (摘要内容) (企业新闻) (YYYY-MM-DD) (即时生效)
           (50字以内)  (或行业资讯)
```

---

## 🚢 部署到生产环境

### 阿里云 ECS 部署

```bash
# 1. 远程登录 ECS
ssh root@your_server_ip

# 2. 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. 克隆项目
git clone https://github.com/CapYue/brand-showcase-website.git
cd brand-showcase-website

# 4. 安装依赖
npm install

# 5. 配置环境变量
cp server/.env.example server/.env
# 编辑 server/.env，填入生产数据库信息

# 6. 使用 PM2 启动后端（保持后台运行）
npm install -g pm2
pm2 start server/server.js --name "brand-api"

# 7. 启用 Nginx 反向代理
# 配置 /etc/nginx/sites-available/brand
upstream api_backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# 8. 启用配置并重启 Nginx
sudo ln -s /etc/nginx/sites-available/brand /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 9. 前端部署（通过 Vercel 或阿里云 OSS）
npm run build
# 上传 dist 文件夹到阿里云 OSS 或 CDN
```

### Docker 部署（推荐）

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY server/ ./server/

EXPOSE 5000

CMD ["node", "server/server.js"]
```

```bash
# 构建镜像
docker build -t brand-showcase-api .

# 运行容器
docker run -p 5000:5000 \
  -e PORT=5000 \
  -e DB_HOST=db.example.com \
  brand-showcase-api
```

---

## 📞 技术支持

### 常见问题

**Q: 图片上传失败**
A: 检查 `public/uploads` 目录权限，或使用阿里云 OSS

**Q: 后端服务无法连接**
A: 确保后端正在运行，检查防火墙设置，CORS 配置

**Q: 数据库连接错误**
A: 检查 `.env` 配置，确保数据库服务已启动

### 获取帮助

- 📧 Email: support@brand.com
- 💬 微信: brand_support
- 🌐 文档: https://docs.brand.com

---

## 📝 更新日志

### v1.0.0 (2024-11-21)

- ✅ 实现前后端分离架构
- ✅ 完成 RESTful API 设计
- ✅ 实现管理后台界面
- ✅ 支持图片上传功能
- ✅ 完整的部署指南

---

**祝您使用愉快！** 🎉
