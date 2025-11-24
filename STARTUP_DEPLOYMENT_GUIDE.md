# 项目启动、部署与运维指南

## 🚀 快速启动

### 前置要求
- Node.js 18+ 
- npm 8+
- Git

### 第一次启动 (初始化)

```bash
# 1. 进入项目目录
cd e:\网站项目\产品展示官网

# 2. 安装依赖
npm install

# 3. 初始化数据库 (可选)
npm run db:init

# 4. 启动前后端
npm run dev:both
```

**启动完成后:**
- 前端: http://localhost:3003 (或其他可用端口)
- 后端: http://localhost:3001

### 后续启动

```bash
# 同时启动前后端 (推荐)
npm run dev:both

# 或分别启动
npm run dev              # 仅前端
npm run dev:backend      # 仅后端
```

---

## 📦 构建生产版本

```bash
# 构建前端
npm run build

# 输出目录: dist/

# 本地预览构建结果
npm run preview
```

---

## 🌐 部署方案

### 方案 1: Vercel 部署 (推荐 - 自动化)

**优势:**
- 一键部署，自动 CI/CD
- 免费 HTTPS
- 全球 CDN 加速
- 自动化构建

**步骤:**

```bash
# 1. 将代码推送到 GitHub
git push origin main

# 2. 访问 Vercel.com 连接 GitHub 仓库
# https://vercel.com/new

# 3. 选择项目并部署 (自动化)

# 4. Vercel 会自动:
#    - 识别 Next.js/Vite 项目
#    - 运行 npm install
#    - 执行 npm run build
#    - 部署 dist/ 文件夹
```

**配置文件:** `vercel.json`
- 已配置路由重写规则 (SPA 支持)
- 已配置构建命令和输出目录

**访问地址:** `https://your-project.vercel.app`

---

### 方案 2: Docker 部署 (本地服务器)

**构建 Docker 镜像:**

```bash
# 1. 构建镜像
docker build -t brand-showcase:latest .

# 2. 运行容器
docker run -d \
  -p 80:80 \
  --name brand-showcase \
  brand-showcase:latest

# 3. 访问: http://localhost
```

**使用 Docker Compose (可选):**

```bash
# 启动
docker-compose up -d

# 停止
docker-compose down
```

---

### 方案 3: Nginx 部署 (手动部署)

**1. 构建项目:**
```bash
npm run build  # 生成 dist/ 目录
```

**2. 配置 Nginx:**

```bash
# 将 dist/ 复制到服务器
scp -r dist/ user@your-server:/var/www/html/

# 配置 nginx.conf
# location / {
#     try_files $uri /index.html;  # SPA 路由重写
# }
```

**3. 启动 Nginx:**
```bash
nginx -t              # 检查配置
systemctl restart nginx  # 重启服务
```

---

### 方案 4: 阿里云 / AWS 部署

**通用步骤:**

1. 构建项目: `npm run build`
2. 上传 `dist/` 到服务器
3. 配置 Web 服务器 (Nginx/Apache)
4. 配置 HTTPS (SSL 证书)
5. 配置路由重写规则

---

## 🔧 环境变量配置

### 本地开发 (.env.local)

```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_ADMIN_API_URL=http://localhost:3001/api/admin
```

### 生产环境配置

**Vercel 环境变量设置:**

1. 进入 Vercel 项目设置
2. 点击 "Environment Variables"
3. 添加:
   ```
   VITE_API_URL=https://your-api.com/api/v1
   VITE_ADMIN_API_URL=https://your-api.com/api/admin
   ```

---

## 📊 运维指南

### 日常检查

```bash
# 检查后端服务
curl http://localhost:3001/health

# 查看前端构建大小
ls -lh dist/

# 查看依赖数量
npm list --depth=0
```

### 常见问题排查

| 问题 | 原因 | 解决方案 |
|------|------|--------|
| 页面空白 | API 调用失败 | 检查网络，查看浏览器控制台错误 |
| 路由404 | SPA 路由重写缺失 | 检查 nginx/vercel 配置 |
| 样式混乱 | CSS 导入错误 | 检查 import 语句路径 |
| 构建失败 | Hook 导入错误 | 确认 React hooks 从 'react' 导入 |

### 日志查看

```bash
# 前端开发日志
# 在浏览器 DevTools -> Console 中查看

# 后端日志
# 在终端中查看 npm run dev:backend 的输出

# 生产环境日志 (Vercel)
# 在 Vercel 仪表盘查看构建和部署日志
```

### 性能优化

**前端优化:**
- 启用 Gzip 压缩
- CDN 加速静态资源
- 图片懒加载
- 代码分割 (Vite 默认)

**后端优化:**
- 启用 Redis 缓存
- 数据库查询优化
- API 响应缓存

---

## 🔄 部署流程总结

### 本地开发
```
修改代码 → 本地测试 → npm run build → 验证输出
```

### 自动部署 (Vercel)
```
git push origin main → GitHub 触发 Webhook → Vercel 自动构建 → 自动部署
```

### 手动部署 (阿里云/VPS)
```
npm run build → scp dist/ 到服务器 → nginx reload → 验证
```

---

## 📱 多环境配置

### 开发环境
```bash
npm run dev:both     # 启动前后端
NODE_ENV=development
```

### 生产环境
```bash
npm run build        # 构建优化版本
NODE_ENV=production
```

---

## 🛡️ 安全建议

1. **不要在代码中硬编码敏感信息** - 使用环境变量
2. **HTTPS 部署** - 所有生产环境必须使用 HTTPS
3. **定期更新依赖** - `npm audit fix`
4. **CORS 配置** - 在 server.js 中限制允许的源
5. **环境变量隐密** - .env.local 不要提交到 Git

---

## 📞 支持

遇到问题?

1. 查看浏览器控制台错误信息
2. 查看后端日志输出
3. 检查网络连接和 API 地址
4. 确认依赖已安装: `npm install`
5. 清缓存重启: `npm cache clean --force`

