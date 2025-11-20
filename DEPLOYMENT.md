# 品牌展示官网 - 部署指南

## 项目介绍

这是一个对标华为官网的专业品牌展示网站，采用 React + Vite 构建，包含完整的响应式设计和性能优化。

## 核心功能

- ✅ 顶部导航栏（固定/滚动显示、响应式菜单、多语言支持）
- ✅ 首屏轮播区（4张高清品牌主题图、自动/手动切换、≤2秒加载）
- ✅ 企业简介模块（核心定位、时间轴、团队、品牌宣传视频）
- ✅ 产品矩阵模块（4个分类、9个产品、详情弹窗）
- ✅ 资质荣誉模块（6个认证/奖项、图片放大、排序功能）
- ✅ 新闻动态模块（企业新闻/行业资讯、10条以上、分页）
- ✅ 联系我们模块（地址地图、在线表单、验证码验证）
- ✅ 底部区域（品牌标识、友情链接、社交媒体）
- ✅ 响应式设计（PC、平板、手机完美适配）
- ✅ SEO优化（元标签、结构化数据、Sitemap、Robots.txt）
- ✅ 性能监控（Core Web Vitals、资源加载时间）
- ✅ 表单安全（验证码、输入验证）

## 本地开发

### 前置条件
- Node.js >= 16.0
- npm >= 8.0 或 yarn >= 1.22

### 安装和运行

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 浏览器访问
http://localhost:3000
```

### 构建生产版本

```bash
npm run build
```

构建产物位于 `dist/` 目录。

## 部署方案

### 1. Vercel 部署（推荐）

```bash
npm install -g vercel
vercel login
vercel
```

### 2. Docker 部署

```bash
# 构建镜像
docker build -t brand-showcase .

# 运行容器
docker run -p 80:80 brand-showcase
```

### 3. Nginx 部署

```bash
# 构建项目
npm run build

# 上传 dist 文件夹到服务器
scp -r dist/* user@server:/var/www/html/

# 配置 Nginx（使用提供的 nginx.conf）
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo systemctl reload nginx
```

### 4. 云服务部署

#### AWS
- S3 + CloudFront 用于静态文件托管和 CDN

#### Azure
- Azure App Service + Application Gateway + CDN

#### Google Cloud
- Cloud Run + Cloud CDN

#### 阿里云
- OSS + CDN + 全站加速

## HTTPS 配置

### Let's Encrypt 免费证书

```bash
# 安装 Certbot
sudo apt-get install certbot python3-certbot-nginx

# 获取证书
sudo certbot certonly --standalone -d example.com -d www.example.com

# 更新 Nginx 配置
sudo nano /etc/nginx/nginx.conf

# 重启 Nginx
sudo systemctl reload nginx
```

## 环境变量配置

1. 复制 `.env.example` 为 `.env.local`
2. 填写实际的 API 端点和密钥

```bash
cp .env.example .env.local
```

## SEO 配置

### Meta 标签（自动更新）
- Title, Description, Keywords 已在 App.jsx 中配置
- Open Graph 标签用于社交媒体分享
- Twitter Card 标签用于推特分享

### 结构化数据（Schema.org）
- 已添加 JSON-LD 格式的组织结构化数据
- 改善搜索引擎理解

### 生成 Sitemap

访问以下 URL 自动生成 Sitemap：
```
https://example.com/sitemap.xml
```

或手动编辑 `public/sitemap.xml`

### Robots.txt
- 已配置于 `public/robots.txt`
- 允许所有搜索引擎爬虫访问
- 支持百度、Google 等主流搜索引擎

## 性能优化

### 已实现的优化

1. **代码分割** - Vite 自动代码分割
2. **图片优化** - 使用 Unsplash CDN 图片，支持懒加载
3. **Gzip 压缩** - Nginx 自动压缩 HTML/CSS/JS
4. **缓存策略**
   - 静态文件（JS/CSS/图片）：缓存 1 年
   - HTML 文件：不缓存
5. **Core Web Vitals 监控** - 已在控制台输出
6. **防抖和节流** - 高频事件已优化

### 进一步优化建议

1. **使用 CDN**
   ```
   - 将图片上传到 CDN
   - 配置 DNS CNAME 到 CDN
   ```

2. **启用 HTTP/2**
   ```nginx
   listen 443 ssl http2;
   ```

3. **启用 TLS 1.3**
   ```nginx
   ssl_protocols TLSv1.2 TLSv1.3;
   ```

4. **使用 WebP 图片**
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg">
   </picture>
   ```

5. **预加载关键资源**
   ```html
   <link rel="preload" as="font" href="fonts.woff2" crossorigin>
   <link rel="prefetch" href="next-page.js">
   ```

## 安全配置

### 已配置的安全措施

1. **HTTPS/SSL** - 所有连接都加密
2. **HSTS** - 强制使用 HTTPS
3. **CSP** - 内容安全策略
4. **X-Frame-Options** - 防止点击劫持
5. **X-Content-Type-Options** - 防止 MIME 嗅探
6. **表单验证码** - 防止机器人滥用

### 表单提交安全

```javascript
// 验证码验证已在 Contact.jsx 中实现
// 前端验证后，后端还需进行以下检查：
// 1. 验证码服务器端验证
// 2. 速率限制（Rate Limiting）
// 3. CSRF token 验证
// 4. SQL 注入防护
// 5. XSS 防护
```

## 多语言支持

已支持中文和英文，在 Navbar 中可以切换。

扩展多语言步骤：
1. 在相关组件中添加新语言条件
2. 维护统一的翻译字符串
3. 可考虑使用 i18n 库简化翻译管理

```bash
npm install i18next react-i18next
```

## 监控和分析

### Google Analytics

```javascript
// 在 public/index.html 中添加
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 百度统计

```javascript
// 在 public/index.html 中添加
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?xxxxxx";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```

### 性能监控

控制台会自动输出：
- 页面加载时间
- 资源加载时间
- LCP、FID、CLS 等核心指标

## 常见问题

### Q: 如何修改品牌信息？
A: 编辑各个组件中的数据，特别是 Footer.jsx 和 About.jsx

### Q: 如何添加新产品？
A: 在 Products.jsx 中的 `products` 对象中添加新的产品数据

### Q: 如何自定义颜色主题？
A: 修改 `src/styles/global.css` 中的 CSS 变量

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... */
}
```

### Q: 如何处理表单提交？
A: 在 Contact.jsx 的 `handleSubmit` 函数中集成后端 API

```javascript
const response = await fetch(process.env.VITE_FORM_SUBMIT_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

## 故障排除

### 开发服务器无法启动
```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 构建失败
```bash
# 检查 Node.js 版本
node --version  # 应该 >= 16.0

# 清除缓存并重新构建
rm -rf dist
npm run build
```

### 页面加载缓慢
1. 检查图片大小和格式
2. 启用 Gzip 压缩
3. 配置 CDN
4. 检查浏览器开发工具中的 Network 标签

## 后续维护

### 定期任务

1. **内容更新** - 每月更新新闻动态
2. **安全补丁** - 运行 `npm audit` 检查依赖安全
3. **性能监控** - 定期查看 Core Web Vitals
4. **SEO 检查** - 使用 Google Search Console 检查索引状态

### 依赖更新

```bash
# 检查过期依赖
npm outdated

# 安全更新
npm audit fix

# 主版本更新（需要手动测试）
npm update --save
```

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite 5
- **样式**: CSS 3（响应式）
- **服务器**: Nginx + Node.js
- **容器化**: Docker
- **部署**: Vercel/Docker/VPS

## 支持和反馈

如有问题，请：
1. 检查 GitHub Issues
2. 提交 Bug Report
3. 联系开发团队：contact@brand.com

---

**最后更新**: 2024年11月
**版本**: 1.0.0
