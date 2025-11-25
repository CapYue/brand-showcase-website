# 🏗️ 系统架构文档

## 目录
1. [系统总体架构](#系统总体架构)
2. [前端架构](#前端架构)
3. [后端架构](#后端架构)
4. [数据流与交互](#数据流与交互)
5. [模块详解](#模块详解)
6. [技术栈总览](#技术栈总览)

---

## 系统总体架构

### 系统分层图

```
┌─────────────────────────────────────────────────────────────┐
│                     用户浏览器客户端                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   前端应用 (React + Vite)                 │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │   路由层     │  │  组件层      │  │   样式层     │  │ │
│  │  │  Router     │  │ Component    │  │    CSS       │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │   工具层     │  │   状态管理   │  │  SEO 优化    │  │ │
│  │  │   Utils      │  │   Hooks      │  │             │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              API 客户端 (apiClient.js)                    │ │
│  │     HTTP 通信 + 错误处理 + Mock 数据降级                  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                  (HTTP REST API)
                            │
┌─────────────────────────────────────────────────────────────┐
│                   后端应用 (Node.js + Express)               │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    路由层 (Express Routes)                 │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │ │
│  │  │GET /api/ │ │POST /api/│ │PUT /api/ │ │DEL /api/ │   │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │               业务逻辑层 (Controller + Service)            │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │ │
│  │  │产品管理  │ │新闻管理  │ │用户管理  │ │文件管理  │   │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │ │
│  └──────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                 数据持久化层 (Data Layer)                  │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │  JSON 文件   │  │  文件上传     │  │  配置文件    │  │ │
│  │  │  (Mock DB)   │  │  (uploads)    │  │  (config)    │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 架构特点

| 特性 | 说明 |
|------|------|
| **前后端分离** | 前端 (SPA) + 后端 (REST API) 完全独立 |
| **模块化设计** | 每个功能独立成模块，易于维护扩展 |
| **渐进式降级** | API 不可用时自动使用 Mock 数据 |
| **响应式架构** | 支持多设备多屏幕适配 |
| **可部署性** | 支持多平台部署 (Vercel、Docker、Nginx) |

---

## 前端架构

### 前端总体结构

```
src/
├── App.jsx                          # 应用根组件
├── main.jsx                         # 应用入口
├── components/                      # 可复用组件
│   ├── Navbar.jsx                  # 导航栏
│   ├── Banner.jsx                  # 轮播区
│   ├── About.jsx                   # 企业简介
│   ├── Products.jsx                # 产品展示
│   ├── Certifications.jsx          # 资质荣誉
│   ├── News.jsx                    # 新闻动态
│   ├── Contact.jsx                 # 联系表单
│   ├── Footer.jsx                  # 页脚
│   ├── AdminDashboard.jsx          # 管理后台
│   └── CSVModifier.jsx             # CSV 修改工具
├── layouts/                        # 布局组件
│   └── MainLayout.jsx              # 主布局 (导航+出口+页脚)
├── pages/                          # 页面组件 (对应路由)
│   ├── HomePage.jsx                # 首页
│   ├── AboutPage.jsx               # 关于页面
│   ├── ProductsPage.jsx            # 产品列表页
│   ├── ProductDetailPage.jsx       # 产品详情页
│   ├── TechnologyPage.jsx          # 技术实力页
│   ├── NewsPage.jsx                # 新闻列表页
│   ├── NewsDetailPage.jsx          # 新闻详情页
│   └── ContactPage.jsx             # 联系页面
├── routes/                         # 路由管理
│   └── index.jsx                   # 路由配置 (React Router)
├── styles/                         # 样式文件
│   ├── global.css                  # 全局样式
│   ├── pages.css                   # 页面样式
│   ├── navbar.css                  # 导航栏样式
│   ├── banner.css                  # 轮播样式
│   ├── products.css                # 产品样式
│   ├── news.css                    # 新闻样式
│   ├── contact.css                 # 联系表单样式
│   └── ...                         # 其他样式
└── utils/                          # 工具函数库
    ├── apiClient.js                # API 客户端
    ├── mockData.js                 # 模拟数据
    ├── seo.js                      # SEO 优化
    ├── hooks.js                    # 自定义 Hooks
    ├── configReader.js             # 配置读取
    ├── csvGenerator.js             # CSV 生成
    ├── excelGenerator.js           # Excel 生成
    ├── excelReader.js              # Excel 读取
    └── websiteModifier.js          # DOM 修改
```

### 前端分层设计

#### 1. 路由层 (Route Layer)

**文件:** `src/routes/index.jsx`

**责任:**
- 定义应用路由结构
- 管理路由与页面的映射关系
- 支持嵌套路由和动态参数

**路由配置:**
```javascript
// 主路由
/ → MainLayout (包含子路由)
  ├── (首页)
  ├── /about → AboutPage
  ├── /products → ProductsPage
  ├── /products/:id → ProductDetailPage
  ├── /technology → TechnologyPage
  ├── /news → NewsPage
  ├── /news/:id → NewsDetailPage
  └── /contact → ContactPage

// 独立路由
/admin → AdminDashboard
```

#### 2. 页面层 (Page Layer)

**文件:** `src/pages/*.jsx`

**核心页面:**

| 页面 | 文件 | 功能说明 |
|------|------|--------|
| 首页 | HomePage.jsx | 整合所有核心展示模块 (轮播、简介、产品、新闻等) |
| 关于 | AboutPage.jsx | 企业详细信息、发展历程、团队介绍、企业文化 |
| 产品列表 | ProductsPage.jsx | 产品分类展示、搜索筛选、分页展示 |
| 产品详情 | ProductDetailPage.jsx | 单个产品完整信息、特性说明、对比分析 |
| 技术实力 | TechnologyPage.jsx | 资质荣誉展示、专利证书、行业认证 |
| 新闻列表 | NewsPage.jsx | 新闻分页、日期筛选、搜索功能 |
| 新闻详情 | NewsDetailPage.jsx | 新闻全文、发布日期、相关推荐 |
| 联系我们 | ContactPage.jsx | 联系表单、地图、企业信息 |

**页面共性特征:**
- 使用 `useOutletContext` 获取全局状态 (语言、主题等)
- 在 `useEffect` 中更新 Meta 标签 (SEO)
- 从 API 获取数据，支持 Mock 数据降级
- 展示加载状态和错误提示

#### 3. 组件层 (Component Layer)

**文件:** `src/components/*.jsx`

**核心组件:**

| 组件 | 文件 | 功能说明 |
|------|------|--------|
| 导航栏 | Navbar.jsx | 顶部导航、菜单、语言切换、响应式菜单 |
| 轮播 | Banner.jsx | 图片轮播、自动播放、标题文案展示 |
| 企业简介 | About.jsx | 企业描述、核心价值、发展历程 |
| 产品展示 | Products.jsx | 产品卡片网格、分类筛选、排序 |
| 资质荣誉 | Certifications.jsx | 认证卡片、等级标签、时间轴 |
| 新闻动态 | News.jsx | 新闻列表、日期显示、分类标签 |
| 联系表单 | Contact.jsx | 表单输入、验证、提交处理 |
| 页脚 | Footer.jsx | 链接导航、版权信息、社交媒体 |
| 管理后台 | AdminDashboard.jsx | 数据管理界面、增删改查功能、表单编辑 |
| CSV 修改 | CSVModifier.jsx | CSV 文件上传、解析、修改、导出 |

**组件分类:**
- **展示组件** - Navbar、Banner、Footer
- **模块组件** - About、Products、News、Contact (可嵌入页面或首页)
- **功能组件** - AdminDashboard、CSVModifier (独立功能)

#### 4. 布局层 (Layout Layer)

**文件:** `src/layouts/MainLayout.jsx`

**责任:**
- 提供统一的页面布局结构
- 包含 Navbar 和 Footer
- 通过 `<Outlet>` 渲染子页面
- 管理全局状态 (语言、主题)

**结构:**
```
MainLayout
  ├── Navbar (顶部)
  ├── Outlet (页面内容)
  └── Footer (底部)
```

#### 5. 样式层 (Style Layer)

**文件:** `src/styles/*.css`

**样式管理:**
```
global.css          # 全局重置、字体、颜色变量
pages.css           # 页面公共样式
navbar.css          # 导航栏
banner.css          # 轮播
products.css        # 产品
news.css            # 新闻
contact.css         # 联系表单
...                 # 其他组件
```

**响应式设计:**
- PC (>1200px): 完整布局、3列网格
- Tablet (768-1200px): 2列网格、调整间距
- Mobile (<768px): 1列布局、响应式菜单

#### 6. 工具层 (Utility Layer)

**API 通信:**
- `apiClient.js` - HTTP 请求封装、错误处理、Mock 降级

**数据处理:**
- `mockData.js` - 本地模拟数据、API 失败降级
- `csvGenerator.js` - CSV 文件生成和导出
- `excelGenerator.js` - Excel 文件生成和导出
- `excelReader.js` - Excel 文件读取和解析

**功能工具:**
- `seo.js` - Meta 标签管理、SEO 优化
- `hooks.js` - 自定义 React Hooks
- `configReader.js` - 配置文件读取
- `websiteModifier.js` - DOM 修改和 HTML 编辑

### 前端数据流

```
用户操作
    ↓
页面组件 (Page)
    ↓
apiClient.request()
    ↓
┌────────────────────┐
│  后端 API 可用？    │
└────────────────────┘
    ├─ YES → HTTP 请求后端 → API 响应 → 更新状态 → 渲染页面
    └─ NO  → 返回 mockData → 更新状态 → 渲染页面
```

---

## 后端架构

### 后端总体结构

```
server/
├── server.js                       # Express 服务器主文件
├── db-init.js                      # 数据库初始化脚本
└── excel-importer.js               # Excel 导入工具脚本

public/
├── config.json                     # 生产环境配置
├── config-dev.json                 # 开发环境配置
├── robots.txt                      # SEO 爬虫配置
└── uploads/                        # 文件上传目录
```

### 后端分层设计

#### 1. 中间件层 (Middleware Layer)

**CORS 配置:**
```javascript
// 允许跨域请求
origin: ['http://localhost:3000', 'http://localhost:5173', process.env.FRONTEND_URL]
credentials: true
```

**请求处理:**
```javascript
express.json({ limit: '10mb' })              // JSON 解析
express.urlencoded({ extended: true })      // URL 编码
express.static('/uploads')                  // 静态文件服务
```

**文件上传:**
```javascript
multer 配置:
  - 存储路径: public/uploads/
  - 文件重命名: timestamp + random + ext
  - 文件大小限制: 5MB
  - 允许类型: jpeg|jpg|png|gif|webp
```

#### 2. 路由层 (Route Layer)

**API 端点分类:**

**公开 API (无认证):**
```
GET  /api/v1/banners              # 获取轮播数据
GET  /api/v1/company/info         # 获取企业信息
GET  /api/v1/products             # 获取产品列表
GET  /api/v1/products/:id         # 获取单个产品
GET  /api/v1/certifications       # 获取资质荣誉
GET  /api/v1/news                 # 获取新闻列表
GET  /api/v1/news/:id             # 获取新闻详情
POST /api/v1/contact              # 提交联系表单
```

**管理 API (需认证):**
```
POST   /api/admin/products        # 创建产品
PUT    /api/admin/products/:id    # 更新产品
DELETE /api/admin/products/:id    # 删除产品
POST   /api/admin/news            # 创建新闻
PUT    /api/admin/news/:id        # 更新新闻
DELETE /api/admin/news/:id        # 删除新闻
POST   /api/admin/upload          # 文件上传
GET    /api/admin/certifications  # 获取资质列表
POST   /api/admin/certifications  # 创建资质
PUT    /api/admin/certifications/:id # 更新资质
DELETE /api/admin/certifications/:id # 删除资质
```

#### 3. 数据模型 (Data Model)

**产品 (Product):**
```javascript
{
  id: number,
  category: string,        // 硬件、软件、云服务
  name: string,
  image: string,           // 图片 URL
  description: string,     // 产品描述
  price: string,           // 价格
  features: string[]       // 特性列表
}
```

**新闻 (News):**
```javascript
{
  id: number,
  type: string,            // 企业新闻、行业动态
  title: string,
  date: string,            // YYYY-MM-DD 格式
  summary: string,         // 摘要
  content: string,         // 完整内容 (可选)
  image: string            // 特征图 (可选)
}
```

**资质 (Certification):**
```javascript
{
  id: number,
  name: string,            // 资质名称
  category: string,        // 国际认证、安全认证、政府认证
  image: string,           // 证书图片
  importance: number,      // 1-10 重要程度
  year: number             // 获得年份
}
```

**企业信息 (Company):**
```javascript
{
  description: string,     // 企业简介
  values: [
    { title: string, description: string }  // 核心价值观
  ],
  timeline: [
    { year: number, event: string }         // 发展历程
  ],
  team: [
    { name: string, position: string, avatar: string }  // 团队成员
  ]
}
```

**轮播 (Banner):**
```javascript
{
  id: number,
  image: string,           // 轮播图 URL
  title: string,           // 标题
  subtitle: string         // 副标题
}
```

#### 4. 业务逻辑层 (Business Logic)

**产品管理:**
- 获取所有产品、按分类筛选
- 获取单个产品详情
- 创建、编辑、删除产品

**新闻管理:**
- 获取新闻列表 (分页、排序)
- 按类型筛选新闻
- 获取单个新闻详情
- 创建、编辑、删除新闻

**资质管理:**
- 获取资质列表
- 按重要程度排序
- 创建、编辑、删除资质

**企业信息:**
- 获取企业详细信息
- 编辑企业信息
- 管理团队成员

**文件上传:**
- 上传图片到 public/uploads/
- 返回访问 URL
- 图片验证和大小限制

#### 5. 数据持久化层 (Persistence Layer)

**存储方式:**
- 使用 JSON 文件 (当前) - 快速开发验证
- 可扩展为 MySQL、MongoDB 等真实数据库

**文件位置:**
```
public/
├── config.json          # 网站配置
├── config-dev.json      # 开发环境配置
└── uploads/             # 上传的图片
```

---

## 数据流与交互

### 前后端通信流程

#### 1. 获取数据流程

```
前端请求:
  用户打开页面
    ↓
  页面加载时调用 useEffect
    ↓
  apiClient.getProducts()
    ↓
  发送 GET /api/v1/products
    ↓
后端处理:
  Express 路由接收请求
    ↓
  读取 websiteData.products
    ↓
  返回 JSON 响应
    ↓
前端接收:
  API 成功 → 更新组件状态 → 渲染产品列表
  API 失败 → 返回 mockData.products → 渲染产品列表
```

#### 2. 提交数据流程 (表单)

```
前端:
  用户填写联系表单
    ↓
  验证表单数据
    ↓
  调用 apiClient.submitContact(formData)
    ↓
  发送 POST /api/v1/contact
    ↓
后端:
  Express 接收 POST 请求
    ↓
  验证请求数据
    ↓
  保存到数据库 (或日志)
    ↓
  返回成功响应
    ↓
前端:
  显示提交成功提示
  重置表单
  跳转或滚动
```

#### 3. 管理员操作流程

```
管理员登录
    ↓
进入 /admin 管理后台
    ↓
查看数据列表 (GET /api/admin/products)
    ↓
编辑数据 (PUT /api/admin/products/1)
    ↓
后端更新数据
    ↓
前端显示成功提示
    ↓
列表刷新显示最新数据
```

### API 响应格式

**成功响应:**
```javascript
{
  code: 200,
  message: "成功",
  data: {
    // 具体数据
  }
}
```

**错误响应:**
```javascript
{
  code: 400/500,
  message: "错误信息",
  data: null
}
```

### 数据库初始化流程

```
npm run db:init
    ↓
执行 server/db-init.js
    ↓
创建初始数据结构
    ↓
保存到 public/config.json
    ↓
后续请求使用该数据
```

### Excel 导入流程

```
npm run import:excel <file.xlsx>
    ↓
执行 server/excel-importer.js
    ↓
解析 Excel 文件
    ↓
转换数据格式
    ↓
更新到 public/config.json
    ↓
后端重新加载数据
```

---

## 模块详解

### 模块 1: 导航栏 (Navbar)

**文件:** `src/components/Navbar.jsx`

**功能:**
- 显示企业 LOGO
- 菜单导航链接
- 响应式汉堡菜单 (移动端)
- 语言切换 (中英文)
- 菜单高亮

**交互:**
```
用户点击菜单项
  ↓
React Router 跳转
  ↓
页面加载，导航高亮更新
```

### 模块 2: 轮播区 (Banner)

**文件:** `src/components/Banner.jsx`

**功能:**
- 自动轮播图片
- 支持手动切换
- 显示标题和副标题
- 响应式图片

**数据来源:** `/api/v1/banners`

### 模块 3: 产品管理 (Products)

**前端:**
- `src/components/Products.jsx` - 产品列表展示
- `src/pages/ProductsPage.jsx` - 产品列表页面
- `src/pages/ProductDetailPage.jsx` - 产品详情页面

**功能:**
- 获取产品列表
- 按分类筛选
- 搜索产品
- 显示产品详情
- 跳转产品详情页

**后端:**
- GET `/api/v1/products` - 获取所有产品
- GET `/api/v1/products/:id` - 获取单个产品
- POST `/api/admin/products` - 创建产品
- PUT `/api/admin/products/:id` - 更新产品
- DELETE `/api/admin/products/:id` - 删除产品

### 模块 4: 新闻管理 (News)

**前端:**
- `src/components/News.jsx` - 新闻列表展示
- `src/pages/NewsPage.jsx` - 新闻列表页面
- `src/pages/NewsDetailPage.jsx` - 新闻详情页面

**功能:**
- 获取新闻列表 (分页)
- 按类型筛选
- 按日期排序
- 显示新闻摘要和详情
- 跳转新闻详情页

**后端:**
- GET `/api/v1/news` - 获取新闻列表
- GET `/api/v1/news/:id` - 获取新闻详情
- POST `/api/admin/news` - 创建新闻
- PUT `/api/admin/news/:id` - 更新新闻
- DELETE `/api/admin/news/:id` - 删除新闻

### 模块 5: 资质荣誉 (Certifications)

**文件:** `src/components/Certifications.jsx`

**功能:**
- 显示企业资质和认证
- 按重要程度排序
- 显示获得年份
- 响应式卡片布局

**后端:**
- GET `/api/v1/certifications` - 获取资质列表
- POST `/api/admin/certifications` - 创建资质
- PUT `/api/admin/certifications/:id` - 更新资质
- DELETE `/api/admin/certifications/:id` - 删除资质

### 模块 6: 联系表单 (Contact)

**文件:**
- `src/components/Contact.jsx` - 表单组件
- `src/pages/ContactPage.jsx` - 联系页面

**功能:**
- 表单输入验证
- 提交表单数据
- 显示成功/错误提示
- 表单重置

**后端:**
- POST `/api/v1/contact` - 提交联系信息

### 模块 7: 管理后台 (AdminDashboard)

**文件:** `src/components/AdminDashboard.jsx`

**功能:**
- 显示数据管理界面
- 产品管理 (增删改查)
- 新闻管理 (增删改查)
- 资质管理 (增删改查)
- 表单编辑和验证

**特点:**
- 完整的 CRUD 操作
- 实时数据预览
- 错误提示和确认

### 模块 8: CSV/Excel 工具

**文件:**
- `src/utils/csvGenerator.js` - CSV 生成
- `src/utils/excelGenerator.js` - Excel 生成
- `src/utils/excelReader.js` - Excel 读取
- `src/components/CSVModifier.jsx` - CSV 修改工具

**功能:**
- 解析 CSV 和 Excel 文件
- 修改文件内容
- 导出为 CSV 或 Excel 格式
- 批量操作数据

---

## 技术栈总览

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 18.2.0 | 前端框架 |
| **React Router** | 7.9.6 | 路由管理 |
| **Vite** | 5.4.21 | 构建工具 |
| **CSS3** | 最新 | 样式和动画 |
| **ES6+** | 最新 | JavaScript 标准 |

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Node.js** | 18+ | 运行环境 |
| **Express** | 4.18.2 | 后端框架 |
| **Multer** | 1.4.5 | 文件上传 |
| **CORS** | 2.8.5 | 跨域配置 |
| **dotenv** | 16.0.3 | 环境变量 |

### 工具和库

| 库 | 用途 |
|----|------|
| **PapaParse** | CSV 解析和生成 |
| **XLSX (SheetJS)** | Excel 文件处理 |
| **Axios (可选)** | HTTP 请求库 |

---

## 安全性考虑

### 前端安全
- ✅ 环境变量隐密 (API 地址不硬编码)
- ✅ 表单数据验证
- ✅ XSS 防护 (React 自动转义)
- ✅ CSRF Token 支持

### 后端安全
- ✅ CORS 验证 (限制来源)
- ✅ 请求体大小限制 (10MB)
- ✅ 文件类型检查 (仅允许图片)
- ✅ 文件大小限制 (5MB)
- ✅ 输入验证 (数据校验)
- ✅ 错误信息脱敏 (不暴露系统细节)

---

## 扩展性设计

### 如何添加新功能

#### 添加新页面
1. 在 `src/pages/` 创建新页面组件
2. 在 `src/routes/index.jsx` 添加路由
3. 在 `src/components/Navbar.jsx` 添加导航链接
4. 创建相应的 CSS 样式

#### 添加新 API
1. 在 `server/server.js` 添加新路由
2. 在 `src/utils/apiClient.js` 添加方法
3. 在 `src/utils/mockData.js` 添加 Mock 数据
4. 在页面中调用新 API

#### 切换数据库
1. 用数据库驱动替换 `websiteData` 对象
2. 使用 ORM 如 Sequelize、TypeORM
3. 更新数据库连接配置
4. 迁移现有数据

---

## 性能优化建议

### 前端优化
- 启用 Gzip 压缩
- 图片懒加载
- 代码分割 (路由级别)
- CDN 加速
- 缓存策略

### 后端优化
- 数据库索引
- Redis 缓存
- 分页查询
- API 响应缓存
- 连接池管理

---

## 监控和维护

### 日志记录
- 前端: 使用浏览器开发工具调试
- 后端: 使用 Winston、Morgan 记录日志

### 性能监控
- Lighthouse 评分
- Core Web Vitals
- API 响应时间
- 页面加载时间

### 错误追踪
- Sentry 或类似服务
- 浏览器错误报告
- API 错误日志

