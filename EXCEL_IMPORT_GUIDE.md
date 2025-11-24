# 📊 Excel 数据导入工具使用指南

## 概述

这是一个**后端命令行工具**，用于导入 Excel/CSV 文件，自动更新网站配置文件中的内容。**不在网页上显示任何工具图标**，保持网站界面简洁。

---

## 🎯 工作原理

```
Excel/CSV 文件 → 命令行脚本 → 解析数据 → 更新 config.json → 网站读取新配置 → 显示新内容
```

**完全独立于前端界面，操作更安全**

---

## 📋 前置要求

### 1. 安装必要的依赖

```bash
npm install xlsx
```

### 2. 准备 Excel 或 CSV 文件

文件需要包含以下列：
- **分类** (Category) - 导航、轮播、企业简介、产品等
- **字段** (Field) - 具体的字段名称
- **值** (Value) - 要更新的内容
- **说明** (Description) - 可选，用于标注

---

## 🚀 使用方法

### 方式 1：使用 CSV 文件（推荐）

```bash
# 在项目根目录运行
node server/excel-importer.js ./your-data.csv
```

### 方式 2：使用 Excel 文件

```bash
# 支持 .xlsx 和 .xls 格式
node server/excel-importer.js ./website-data.xlsx
```

### 示例

```bash
node server/excel-importer.js ./excel-template-example.csv
```

---

## 📝 CSV 文件格式

### 列结构

| 分类 | 字段 | 值 | 说明 |
|------|------|-----|------|
| 导航 | 品牌名称 | 我的品牌 | 在导航栏显示 |
| 轮播 | 标题1 | 创新驱动未来 | 第一张轮播图 |
| 企业简介 | 公司名称 | ABC 公司 | 公司全称 |
| 产品 | 产品1名称 | 智能设备 | 产品名称 |
| 资质 | ISO9001 | 质量认证 | 资质信息 |
| 新闻 | 标题1 | 公司新闻 | 新闻标题 |
| 联系 | 电话 | 010-1234-5678 | 联系电话 |
| 页脚 | 版权年份 | 2024 | 版权年份 |
| 配置 | 网站标题 | 新标题 | 网站配置 |

### 分类说明

| 分类 | 作用 | 示例 |
|------|------|------|
| **导航** | 更新导航栏内容 | 品牌名称、菜单文本 |
| **轮播** | 更新首页轮播图 | 标题、副标题 |
| **企业简介** | 更新关于我们页面 | 公司名称、公司简介 |
| **产品** | 更新产品信息 | 产品名称、描述、价格 |
| **资质** | 更新资质荣誉 | ISO 认证、奖项 |
| **新闻** | 更新新闻列表 | 新闻标题、日期 |
| **联系** | 更新联系方式 | 电话、邮箱、地址 |
| **页脚** | 更新页脚内容 | 版权年份、备案号 |
| **配置** | 更新网站配置 | Meta标签、网站标题 |

---

## 📥 导入示例

### 创建 CSV 文件 (data.csv)

```csv
分类,字段,值,说明
导航,品牌名称,创新科技,品牌名称
轮播,标题1,数字创新时代,轮播标题
轮播,副标题1,引领行业发展,轮播副标题
企业简介,公司名称,创新科技有限公司,公司全称
企业简介,核心定位,为全球企业提供创新解决方案,公司定位
产品,产品1名称,智能云平台,产品名称
产品,产品1描述,企业级云计算方案,产品描述
产品,产品1价格,¥9999,产品价格
联系,电话,+86-010-12345678,公司电话
联系,邮箱,contact@company.com,公司邮箱
页脚,版权年份,2024,版权年份
配置,网站标题,创新科技官网,网站标题
```

### 运行导入

```bash
node server/excel-importer.js ./data.csv
```

### 输出结果

```
📊 Excel 导入工具
=====================================

📁 读取文件: ./data.csv

✅ 成功读取 12 行数据

✅ 成功读取 12 行数据

  行 1: 导航 - 品牌名称
  行 2: 轮播 - 标题1
  行 3: 轮播 - 副标题1
  ... (更多行)

📝 应用修改...

  ✅ 导航栏已更新
  ✅ 轮播图已更新
  ✅ 企业简介已更新
  ✅ 产品信息已更新
  ✅ 联系信息已更新
  ✅ 页脚已更新
  ✅ 配置已更新

💾 配置已保存到: e:\网站项目\产品展示官网\public\config.json
💾 开发配置已更新: e:\网站项目\产品展示官网\public\config-dev.json

📊 导入报告:
  导航栏:    1 项
  轮播图:    2 项
  企业简介:  2 项
  产品信息:  3 项
  资质荣誉:  0 项
  新闻动态:  0 项
  联系信息:  2 项
  页脚:      1 项
  其他配置:  1 项

📋 报告已保存: e:\网站项目\产品展示官网\public\import-report.json

✅ 导入完成！
```

---

## 🔍 文件更新位置

导入完成后，以下文件会被自动更新：

| 文件 | 用途 |
|------|------|
| `public/config.json` | 生产环境配置 |
| `public/config-dev.json` | 开发环境配置 |
| `public/import-report.json` | 导入报告 |

---

## 📖 如何让网站读取新配置

### 方式 1：网站自动读取（推荐）

前端会在加载时自动读取 `config.json`：

```javascript
// configReader.js 会自动加载配置
const config = await ConfigReader.loadConfig();
```

**刷新网页即可看到新内容**

### 方式 2：强制刷新

```bash
# 清空浏览器缓存，按 Ctrl+Shift+Del
# 然后刷新网页 Ctrl+R
```

---

## 🛠️ 自动化脚本

### 添加到 npm scripts

编辑 `package.json`，添加快捷命令：

```json
{
  "scripts": {
    "dev": "vite",
    "dev:backend": "node server/server.js",
    "dev:both": "concurrently \"npm run dev\" \"npm run dev:backend\"",
    "build": "vite build",
    "import:excel": "node server/excel-importer.js"
  }
}
```

然后使用：

```bash
npm run import:excel ./data.csv
```

### 批量导入脚本

创建 `server/batch-import.sh` (Unix/Mac/Linux):

```bash
#!/bin/bash
# 批量导入多个文件

for file in ./data/*.csv; do
    echo "导入 $file..."
    node server/excel-importer.js "$file"
    echo "完成\n"
done
```

---

## ⚙️ 工作流程

### 产品经理工作流

```
1. 获取 excel-template-example.csv 模板
   ↓
2. 在 Excel 中编辑数据
   ↓
3. 另存为 CSV 格式
   ↓
4. 运行导入脚本
   node server/excel-importer.js ./data.csv
   ↓
5. 查看导入报告
   ↓
6. 刷新网站，验证更新
```

### 开发团队工作流

```
1. 接收产品经理提供的 CSV 文件
   ↓
2. 在项目目录运行导入脚本
   ↓
3. 自动更新 public/config.json
   ↓
4. 前端自动加载新配置
   ↓
5. 用户访问网站看到新内容
```

---

## 🔐 安全注意事项

### 1. 备份重要文件

导入前备份 `public/config.json`：

```bash
cp public/config.json public/config.json.backup
```

### 2. 验证导入结果

每次导入后检查 `public/import-report.json` 确认修改项数

### 3. 版本控制

```bash
git add public/config.json
git commit -m "Update config via Excel import"
git push
```

### 4. 权限限制

- 仅运维人员有权运行导入脚本
- 脚本只更新配置文件，不修改代码

---

## 🐛 故障排查

### 问题 1：找不到文件

```
❌ 错误：文件不存在
```

**解决**：检查文件路径是否正确

```bash
# 使用绝对路径
node server/excel-importer.js "C:\path\to\data.csv"

# 或使用相对路径
node server/excel-importer.js ./data.csv
```

### 问题 2：Excel 读取失败

```
❌ 处理失败: Cannot find module 'xlsx'
```

**解决**：安装 xlsx 库

```bash
npm install xlsx
```

### 问题 3：配置没有生效

```
网站刷新后仍未看到新内容
```

**解决**：
- 确认配置文件已更新 (`public/config.json`)
- 清空浏览器缓存
- 按 `Ctrl+Shift+R` 硬刷新

### 问题 4：字段未识别

```
导入报告显示某些字段为 0 项
```

**解决**：检查 CSV 文件格式，确保：
- 第一行是列标题
- 分类、字段、值列都有内容
- 没有隐藏的空格或特殊字符

---

## 📞 获取帮助

1. 查看示例文件：`excel-template-example.csv`
2. 查看导入报告：`public/import-report.json`
3. 检查浏览器控制台是否有错误

---

## ✨ 总结

✅ **完全后端处理** - 不在网页显示任何工具图标

✅ **自动更新配置** - 直接修改 config.json

✅ **支持多种格式** - CSV 和 Excel 文件都支持

✅ **详细导入报告** - 显示每个更新项目

✅ **安全可靠** - 备份和版本控制都支持

**现在您可以像 Excel 编辑员一样，轻松管理网站内容了！** 🚀
