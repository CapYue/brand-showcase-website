# ⚡ 后端快速启动指南

## 🚀 5分钟快速开始

### 第1步：安装后端依赖

```bash
cd e:\网站项目\产品展示官网
npm install
```

### 第2步：启动后端服务

**方式 A：启动后端（在新终端窗口）**
```bash
npm run dev:backend
```

**方式 B：同时启动前后端（推荐）**
```bash
npm run dev:both
```

### 第3步：验证服务

访问以下地址，应该能看到 JSON 数据：

```
http://localhost:5000/health
http://localhost:5000/api/website/products
http://localhost:5000/api/website/banner
```

### 第4步：访问网站

```
http://localhost:5173
```

---

## 📊 数据流向

```
用户访问前端 → 前端加载时调用 API → 后端返回数据 → 前端显示
```

### 实际例子

1. **获取产品列表**
   - 请求：`GET http://localhost:5000/api/website/products`
   - 响应：产品 JSON 数组

2. **上传产品图片**
   - 请求：`POST http://localhost:5000/api/upload/image`
   - 响应：`{ url: "/uploads/xxx.jpg" }`

3. **提交联系表单**
   - 请求：`POST http://localhost:5000/api/website/contact/submit`
   - 响应：`{ success: true }`

---

## 🛠️ 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动前端（Vite） |
| `npm run dev:backend` | 启动后端（Express） |
| `npm run dev:both` | 同时启动前后端 |
| `npm run build` | 构建前端 |
| `npm run db:init` | 初始化 MySQL 数据库 |

---

## 📂 后端文件结构

```
server/
├── server.js          # 主服务器文件
├── db-init.js         # 数据库初始化脚本
└── .env              # 环境配置文件
```

---

## 🔧 配置说明

### `.env` 文件

```ini
PORT=5000                    # 后端端口
NODE_ENV=development        # 环境（development/production）
FRONTEND_URL=http://localhost:5173  # 前端地址
```

---

## ✨ 功能演示

### 1. 查看所有产品

```bash
curl http://localhost:5000/api/website/products
```

### 2. 按分类查看产品

```bash
curl "http://localhost:5000/api/website/products?category=硬件"
```

### 3. 获取新闻列表

```bash
curl "http://localhost:5000/api/website/news?type=企业新闻&page=1"
```

### 4. 提交联系表单

```bash
curl -X POST http://localhost:5000/api/website/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "email": "zhang@example.com",
    "phone": "13800138000",
    "subject": "产品咨询",
    "message": "请问如何购买？"
  }'
```

---

## 🎯 下一步

- 📖 [完整后端指南](./BACKEND_GUIDE.md)
- 🗄️ [MySQL 数据库设置](./BACKEND_GUIDE.md#方案-2mysql-数据库推荐)
- 🔐 [安全配置](./BACKEND_GUIDE.md#-安全建议)
- 🚢 [部署到生产](./BACKEND_GUIDE.md#-部署到生产环境)

---

## 🐛 故障排查

### 问题：后端无法启动

```
错误：listen EADDRINUSE: address already in use :::5000
```

**解决**：端口被占用，改用其他端口
```bash
PORT=5001 npm run dev:backend
```

### 问题：CORS 错误

```
Access to XMLHttpRequest blocked by CORS policy
```

**解决**：检查 `.env` 中 `FRONTEND_URL` 是否正确

### 问题：图片上传失败

**解决**：确保 `public/uploads` 目录存在
```bash
mkdir -p public/uploads
```

---

**准备好了吗？开始使用吧！** 🎉
