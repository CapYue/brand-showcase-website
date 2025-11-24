# 🌟 品牌展示官网

一个现代化的企业品牌展示官网，采用 React + Vite + Express 技术栈构建。

## ✨ 核心特性

- **完整的 SPA 应用** - React Router v7 路由管理，8+ 个独立页面
- **响应式设计** - 完美适配桌面、平板、手机
- **RESTful API** - 后端 Express 服务，支持数据管理
- **Mock 数据降级** - API 不可用时自动使用本地数据
- **SEO 优化** - Meta 标签、结构化数据、动态标题
- **多语言支持** - 中英文切换
- **管理后台** - 产品、新闻、资质等内容管理
- **一键部署** - 支持 Vercel、Docker、Nginx、阿里云等

## 🚀 快速启动

### 前提条件
- Node.js 18+
- npm 8+

### 启动命令

```bash
# 安装依赖
npm install

# 启动前后端
npm run dev:both

# 打开浏览器
# 前端: http://localhost:3002 (或其他可用端口)
# 后端: http://localhost:3001
```

### 构建生产版本

```bash
npm run build    # 生成 dist/ 目录
npm run preview  # 本地预览
```

## 📂 项目结构

```
品牌展示官网/
├── src/                    # 前端源代码
│   ├── components/        # React 组件 (导航、轮播、表单等)
│   ├── pages/            # 页面组件 (首页、产品、新闻等)
│   ├── routes/           # 路由配置
│   ├── styles/           # CSS 样式文件
│   ├── utils/            # 工具函数 (API、SEO、配置等)
│   ├── App.jsx           # 根组件
│   └── main.jsx          # 入口文件
├── server/               # 后端服务
│   ├── server.js         # Express 服务器
│   ├── db-init.js        # 数据库初始化
│   └── excel-importer.js # Excel 导入工具
├── public/               # 静态资源
├── package.json          # 依赖配置
├── vite.config.js        # Vite 构建配置
└── vercel.json           # Vercel 部署配置
```

**详见:** [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## 🌐 路由列表

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 整合所有核心模块 |
| `/about` | 关于我们 | 企业简介详情 |
| `/products` | 产品中心 | 产品列表展示 |
| `/products/:id` | 产品详情 | 单个产品完整信息 |
| `/technology` | 技术实力 | 资质荣誉展示 |
| `/news` | 新闻动态 | 新闻列表+分页 |
| `/news/:id` | 新闻详情 | 新闻文章详情 |
| `/contact` | 联系我们 | 联系表单 |
| `/admin` | 管理后台 | 数据管理界面 |

## 🔧 技术栈

| 层级 | 技术 | 版本 |
|------|------|------|
| **前端框架** | React | 18.2.0 |
| **构建工具** | Vite | 5.4.21 |
| **路由库** | React Router | 7.9.6 |
| **后端框架** | Express | 4.18.2 |
| **运行环境** | Node.js | 18+ |
| **包管理** | npm | 最新版 |

## 📦 主要依赖

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.9.6",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "papaparse": "^5.4.1",
    "xlsx": "^0.18.5"
  }
}
```

## 🚀 部署指南

### Vercel 部署 (推荐)

```bash
# 1. 推送到 GitHub
git push origin main

# 2. 在 Vercel.com 连接 GitHub 仓库
# 3. 自动构建和部署

# 4. 访问: https://your-project.vercel.app
```

### Docker 部署

```bash
# 构建镜像
docker build -t brand-showcase .

# 运行容器
docker run -p 80:80 brand-showcase
```

### 其他部署方案

- **Nginx** - 静态文件 + SPA 路由重写
- **阿里云 ECS** - 自建服务器部署
- **AWS / Azure** - 云平台部署

**详见:** [STARTUP_DEPLOYMENT_GUIDE.md](./STARTUP_DEPLOYMENT_GUIDE.md)

## 🔌 API 接口

### 公共 API

```
GET  /api/v1/banners          获取轮播数据
GET  /api/v1/company/info     获取企业信息
GET  /api/v1/products         获取产品列表
GET  /api/v1/products/:id     获取单个产品
GET  /api/v1/honors           获取资质荣誉
GET  /api/v1/news             获取新闻列表
GET  /api/v1/news/:id         获取新闻详情
POST /api/v1/contact          提交联系表单
```

### 管理 API

```
POST   /api/admin/products      创建产品
PUT    /api/admin/products/:id  更新产品
DELETE /api/admin/products/:id  删除产品
POST   /api/admin/news          创建新闻
PUT    /api/admin/news/:id      更新新闻
DELETE /api/admin/news/:id      删除新闻
# ... 更多管理接口
```

## 📝 常用命令

```bash
# 开发命令
npm run dev              # 启动前端开发服务器
npm run dev:backend      # 启动后端服务
npm run dev:both         # 同时启动前后端

# 构建命令
npm run build            # 构建生产版本
npm run preview          # 预览构建结果

# 工具命令
npm run db:init          # 初始化数据库
npm run import:excel     # 导入 Excel 数据
```

## 🎨 样式设计

- **颜色方案:**
  - 主色: `#2c3e50` (深蓝灰)
  - 副色: `#3498db` (清爽蓝)
  - 强调色: `#e74c3c` (活力红)

- **响应式断点:**
  - 桌面: > 1200px
  - 平板: 768px - 1200px
  - 手机: < 768px

## 📋 环境变量

### 本地开发 (.env.local)

```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_ADMIN_API_URL=http://localhost:3001/api/admin
```

### 生产环境 (Vercel 环境变量)

```env
VITE_API_URL=https://your-api.com/api/v1
VITE_ADMIN_API_URL=https://your-api.com/api/admin
```

## 🛡️ 安全特性

- ✅ HTTPS 支持
- ✅ CORS 防护
- ✅ 环境变量隐密
- ✅ API 请求超时
- ✅ 错误异常捕获
- ✅ 敏感信息脱敏

## 📊 性能指标

目标性能指标：

- 首屏加载时间 ≤ 2 秒
- API 响应时间 ≤ 500ms
- 移动端性能提升 30%+
- Lighthouse 得分 ≥ 90

## 🔄 开发工作流

```
1. 本地开发
   npm run dev:both

2. 代码变更
   修改 src/ 目录下的文件

3. 构建测试
   npm run build
   npm run preview

4. 版本提交
   git add .
   git commit -m "message"
   git push origin main

5. 自动部署
   Vercel 自动构建并部署
```

## 🐛 常见问题

### Q: 页面空白怎么办？
A: 检查浏览器控制台错误，确保后端正在运行 (`npm run dev:backend`)

### Q: API 调用失败？
A: 检查 `.env.local` 中的 API 地址是否正确

### Q: 路由 404？
A: 这是 SPA 应用的正常行为，刷新页面后 Vite 会自动重定向到首页

### Q: 构建失败？
A: 运行 `npm install` 重新安装依赖，检查 Node.js 版本 ≥ 18

## 📞 支持

遇到问题？

1. 查看浏览器 DevTools 控制台
2. 检查终端的错误日志
3. 确认所有依赖已安装: `npm install`
4. 尝试清缓存: `npm cache clean --force`

## 📄 许可

MIT License - 自由使用和修改

## 👤 作者

品牌展示官网 - React + Vite + Express 企业级解决方案

---

**上次更新:** 2025年11月24日

**官方仓库:** https://github.com/CapYue/brand-showcase-website
