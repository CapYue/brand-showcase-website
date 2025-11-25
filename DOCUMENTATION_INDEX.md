# 📖 文档索引与快速导航

## 📚 项目文档体系

```
项目文档
├── 快速入门
│   ├── README.md (🌟 从这里开始)
│   └── STARTUP_DEPLOYMENT_GUIDE.md (快速启动和部署)
│
├── 系统设计
│   ├── ARCHITECTURE.md (🏗️ 系统架构详解)
│   ├── BUSINESS_PROCESS.md (📊 业务流程图解)
│   └── PROJECT_STRUCTURE.md (📁 项目结构说明)
│
└── 开发参考
    ├── 前端代码 (src/)
    ├── 后端代码 (server/)
    └── 配置文件 (vite.config.js, vercel.json 等)
```

---

## 📄 文档详细说明

### 1. README.md (🌟 项目概览)

**用途:** 项目总体介绍和快速参考

**包含内容:**
- 核心特性速览
- 快速启动命令
- 技术栈概览
- 路由列表
- 常用命令
- 常见问题

**适合人群:** 新开发者、项目管理者、团队成员

**快速导航:**
- ✓ 项目是什么？→ 核心特性
- ✓ 怎样快速启动？→ 快速启动
- ✓ 使用什么技术？→ 技术栈
- ✓ 有哪些页面？→ 路由列表
- ✓ 怎样命令？→ 常用命令

---

### 2. STARTUP_DEPLOYMENT_GUIDE.md (🚀 启动和部署)

**用途:** 项目启动、构建、部署详细指南

**包含内容:**
- 前置要求
- 第一次启动步骤
- 后续启动方式
- 4 种部署方案
  1. Vercel (推荐，自动化)
  2. Docker (容器化)
  3. Nginx (自建服务器)
  4. 云平台 (阿里云、AWS)
- 环境变量配置
- 运维指南
- 故障排查

**适合人群:** 运维工程师、部署负责人、DevOps

**快速导航:**
- ✓ 怎样本地启动？→ 快速启动
- ✓ 怎样部署到 Vercel？→ Vercel 部署
- ✓ 怎样用 Docker？→ Docker 部署
- ✓ 环境变量怎样配？→ 环境变量配置
- ✓ 出问题了怎样排查？→ 运维指南

---

### 3. PROJECT_STRUCTURE.md (📁 项目结构)

**用途:** 项目目录结构和文件说明

**包含内容:**
- 完整目录树
- 各文件/目录说明
- 核心模块对应表
- 路由配置清单
- API 接口列表
- 技术栈表
- 特性一览

**适合人群:** 开发者、架构师、新人入门

**快速导航:**
- ✓ 文件都在哪儿？→ 整体目录结构
- ✓ 各目录干什么用？→ 核心功能模块
- ✓ 有哪些页面？→ 路由配置
- ✓ API 怎样调用？→ API 接口
- ✓ 用的什么技术？→ 技术栈

---

### 4. ARCHITECTURE.md (🏗️ 系统架构)

**用途:** 系统分层架构和详细的模块设计

**包含内容:**
- 系统总体架构图
- 前端架构
  - 路由层
  - 页面层
  - 组件层
  - 布局层
  - 样式层
  - 工具层
  - 数据流
- 后端架构
  - 中间件层
  - 路由层
  - 数据模型
  - 业务逻辑层
  - 数据持久化层
- 数据流与交互
- 6 个核心模块详解
- 技术栈总览
- 安全性考虑
- 扩展性设计
- 性能优化建议

**适合人群:** 架构师、资深开发者、系统设计人员

**快速导航:**
- ✓ 系统怎样分层？→ 系统总体架构
- ✓ 前端怎样设计？→ 前端架构
- ✓ 后端怎样设计？→ 后端架构
- ✓ 数据怎样流动？→ 数据流与交互
- ✓ 各模块怎样工作？→ 模块详解
- ✓ 怎样扩展功能？→ 扩展性设计
- ✓ 怎样优化性能？→ 性能优化

---

### 5. BUSINESS_PROCESS.md (📊 业务流程)

**用途:** 详细的业务流程和用户交互流程

**包含内容:**
- 6 个核心业务流程
  1. 用户浏览官网
  2. 浏览产品列表和详情
  3. 阅读新闻
  4. 提交联系表单
  5. 查看企业信息
  6. 查看技术实力
- 普通访客使用流程
- 管理员操作流程
  1. 产品管理 (增删改查)
  2. 新闻管理 (增删改查)
  3. 资质管理 (增删改查)
  4. 文件上传
- 数据流向
- 异常处理流程 (4 种常见异常)
- 系统集成流程
- 流程图总结

**适合人群:** 产品经理、业务分析师、QA 测试、管理员

**快速导航:**
- ✓ 用户怎样使用系统？→ 核心业务流程
- ✓ 管理员怎样操作？→ 管理员操作流程
- ✓ 数据怎样存储和流动？→ 数据流向
- ✓ 出错了怎样处理？→ 异常处理流程
- ✓ 怎样集成第三方？→ 系统集成流程

---

## 🎯 按角色推荐文档

### 👤 新开发者/实习生

**第一周必读:**
1. README.md - 了解项目
2. STARTUP_DEPLOYMENT_GUIDE.md → "快速启动" 部分
3. PROJECT_STRUCTURE.md - 了解代码结构
4. ARCHITECTURE.md → "前端架构" 部分

**第二周进阶:**
5. ARCHITECTURE.md → 完整阅读
6. BUSINESS_PROCESS.md → "核心业务流程"

---

### 👨‍💼 项目经理/产品经理

**需要了解:**
1. README.md → "核心特性"
2. PROJECT_STRUCTURE.md → "路由配置"
3. BUSINESS_PROCESS.md → 完整阅读
4. ARCHITECTURE.md → "系统总体架构"

---

### 👨‍💻 后端开发者

**必读:**
1. STARTUP_DEPLOYMENT_GUIDE.md → "快速启动" 部分
2. ARCHITECTURE.md → "后端架构"
3. BUSINESS_PROCESS.md → "数据流向"、"异常处理"
4. server/server.js - 代码阅读

**进阶:**
5. ARCHITECTURE.md → "扩展性设计"
6. ARCHITECTURE.md → "安全性考虑"

---

### 🎨 前端开发者

**必读:**
1. STARTUP_DEPLOYMENT_GUIDE.md → "快速启动" 部分
2. PROJECT_STRUCTURE.md → "前端架构"
3. ARCHITECTURE.md → "前端架构"
4. src/ - 代码阅读

**进阶:**
5. BUSINESS_PROCESS.md → "用户流程"
6. ARCHITECTURE.md → "性能优化"

---

### 🚀 运维/DevOps

**必读:**
1. STARTUP_DEPLOYMENT_GUIDE.md - 完整阅读
2. ARCHITECTURE.md → "系统总体架构"
3. 配置文件 (vite.config.js, vercel.json, nginx.conf, Dockerfile)

**参考:**
4. PROJECT_STRUCTURE.md → "静态资源与部署配置"

---

### 🧪 QA/测试工程师

**必读:**
1. README.md → "路由列表"
2. BUSINESS_PROCESS.md → 完整阅读
3. BUSINESS_PROCESS.md → "异常处理流程"

**参考:**
4. ARCHITECTURE.md → "API 接口"

---

### 🏗️ 架构师

**完全阅读:**
1. ARCHITECTURE.md - 完整
2. BUSINESS_PROCESS.md - 完整
3. PROJECT_STRUCTURE.md - 完整
4. README.md - 完整

**代码审查:**
5. src/ 和 server/ 源码

---

## 🔍 按功能模块的文档导航

### 产品管理功能

**流程:** BUSINESS_PROCESS.md → "流程 2: 浏览产品列表和详情" / "流程 1: 产品管理"

**架构:** ARCHITECTURE.md → "模块 3: 产品管理"

**代码:** 
- 前端: src/components/Products.jsx, src/pages/ProductsPage.jsx, src/pages/ProductDetailPage.jsx
- 后端: server/server.js → 产品相关路由

**API:**
```
GET  /api/v1/products
GET  /api/v1/products/:id
POST /api/admin/products
PUT  /api/admin/products/:id
DELETE /api/admin/products/:id
```

---

### 新闻管理功能

**流程:** BUSINESS_PROCESS.md → "流程 3: 阅读新闻" / "流程 2: 新闻管理"

**架构:** ARCHITECTURE.md → "模块 4: 新闻管理"

**代码:**
- 前端: src/components/News.jsx, src/pages/NewsPage.jsx, src/pages/NewsDetailPage.jsx
- 后端: server/server.js → 新闻相关路由

**API:**
```
GET  /api/v1/news
GET  /api/v1/news/:id
POST /api/admin/news
PUT  /api/admin/news/:id
DELETE /api/admin/news/:id
```

---

### 联系表单功能

**流程:** BUSINESS_PROCESS.md → "流程 4: 提交联系表单"

**架构:** ARCHITECTURE.md → "模块 6: 联系表单"

**代码:**
- 前端: src/components/Contact.jsx, src/pages/ContactPage.jsx
- 后端: server/server.js → /api/v1/contact 路由

**API:**
```
POST /api/v1/contact
```

---

### 文件上传功能

**流程:** BUSINESS_PROCESS.md → "流程 4: 文件上传"

**架构:** ARCHITECTURE.md → "中间件层" → 文件上传

**代码:**
- 后端: server/server.js → multer 配置和 /api/admin/upload 路由

**API:**
```
POST /api/admin/upload
```

---

### 管理后台功能

**流程:** BUSINESS_PROCESS.md → "管理员操作流程"

**架构:** ARCHITECTURE.md → "模块 7: 管理后台"

**代码:**
- 前端: src/components/AdminDashboard.jsx
- 路由: /admin

---

## 🎓 学习路径建议

### 初级 (1-2 周)

```
第 1 天:
  ├─ README.md (30 分钟)
  ├─ STARTUP_DEPLOYMENT_GUIDE.md → 快速启动 (30 分钟)
  └─ 本地启动项目 (1 小时)

第 2 天:
  ├─ PROJECT_STRUCTURE.md (1 小时)
  ├─ 浏览前端代码结构 src/ (1 小时)
  └─ 简单修改一个组件 (1 小时)

第 3-4 天:
  ├─ ARCHITECTURE.md → 前端架构部分 (2 小时)
  ├─ 新建一个简单页面 (2 小时)
  └─ 修改样式和布局 (2 小时)

第 1-2 周:
  ├─ BUSINESS_PROCESS.md → 用户流程部分 (1 小时)
  ├─ 测试项目所有页面 (2 小时)
  └─ 根据理解修改数据和内容 (2 小时)
```

---

### 中级 (2-4 周)

```
第 3 周:
  ├─ ARCHITECTURE.md → 后端架构部分 (2 小时)
  ├─ 学习 Express 基础 (2 小时)
  └─ 修改一个后端 API (2 小时)

第 4 周:
  ├─ BUSINESS_PROCESS.md → 完整阅读 (2 小时)
  ├─ 实现一个完整的功能 (产品/新闻/资质) (6 小时)
  └─ 测试和调试 (2 小时)
```

---

### 高级 (4+ 周)

```
第 5 周:
  ├─ ARCHITECTURE.md → 完整阅读 (3 小时)
  ├─ BUSINESS_PROCESS.md → 完整阅读 (2 小时)
  └─ 进行系统优化和重构 (3 小时)

第 6+ 周:
  ├─ 扩展新功能
  ├─ 性能优化
  ├─ 安全性加固
  └─ 代码审查和文档完善
```

---

## 💡 常见问题对应文档

| 问题 | 答案位置 |
|------|--------|
| 怎样启动项目？ | STARTUP_DEPLOYMENT_GUIDE.md → 快速启动 |
| 项目有哪些文件？ | PROJECT_STRUCTURE.md |
| 系统怎样设计的？ | ARCHITECTURE.md |
| 用户怎样使用的？ | BUSINESS_PROCESS.md → 核心业务流程 |
| 管理员怎样操作？ | BUSINESS_PROCESS.md → 管理员操作流程 |
| API 怎样调用？ | ARCHITECTURE.md → 数据流与交互 |
| 怎样添加新页面？ | ARCHITECTURE.md → 扩展性设计 |
| 怎样部署到 Vercel？ | STARTUP_DEPLOYMENT_GUIDE.md → Vercel 部署 |
| 怎样用 Docker？ | STARTUP_DEPLOYMENT_GUIDE.md → Docker 部署 |
| 出错了怎样排查？ | BUSINESS_PROCESS.md → 异常处理流程 |
| 怎样优化性能？ | ARCHITECTURE.md → 性能优化建议 |
| 怎样加强安全？ | ARCHITECTURE.md → 安全性考虑 |

---

## 🔗 文档关联关系图

```
README.md (入口)
    ↓
STARTUP_DEPLOYMENT_GUIDE.md (启动和部署)
    ↓
PROJECT_STRUCTURE.md (项目结构)
    ↓
ARCHITECTURE.md (系统架构)
    ↓
├─ 前端架构
│  └─ src/components, src/pages
│
├─ 后端架构
│  └─ server/server.js
│
└─ 数据流与交互
   └─ API 接口
       ↓
   BUSINESS_PROCESS.md (业务流程)
   ├─ 用户流程
   ├─ 管理员流程
   └─ 异常处理
```

---

## 📌 重点内容速查

### 路由列表

详见 README.md 或 PROJECT_STRUCTURE.md

```
/              首页
/about         关于我们
/products      产品列表
/products/:id  产品详情
/technology    技术实力
/news          新闻列表
/news/:id      新闻详情
/contact       联系我们
/admin         管理后台
```

### API 端点

详见 ARCHITECTURE.md → "路由层"

```
公开 API:
GET  /api/v1/banners
GET  /api/v1/products
POST /api/v1/contact

管理 API:
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
```

### 常用命令

详见 README.md 或 STARTUP_DEPLOYMENT_GUIDE.md

```
npm run dev              # 启动前端
npm run dev:backend      # 启动后端
npm run dev:both         # 启动前后端
npm run build            # 构建生产版本
npm run preview          # 预览构建结果
```

---

## 🤝 文档贡献指南

### 如何更新文档？

1. 修改对应的 .md 文件
2. 保持格式和风格一致
3. 更新相关的索引和链接
4. 提交 Git commit
5. 推送到 GitHub

### 文档更新周期

- 功能变更 → 实时更新相关文档
- 重大更新 → 同时更新多个文档
- 定期审查 → 每月检查文档准确性

---

**最后更新:** 2025年11月24日

**维护团队:** 品牌展示官网开发团队

**问题反馈:** 提交 GitHub Issues 或联系团队成员

