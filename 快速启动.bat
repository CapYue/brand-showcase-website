@echo off
chcp 65001 >nul
title 品牌展示官网 - 前后端开发服务器

echo.
echo ========================================
echo    品牌展示官网 - 前后端集成启动脚本
echo ========================================
echo.
echo 检查依赖安装...
npm list express cors dotenv multer >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  检测到缺少后端依赖，正在安装...
    echo.
    npm install
    echo.
)

echo ========================================
echo 准备启动前后端服务...
echo ========================================
echo.
echo 📝 信息：
echo    - 前端地址: http://localhost:5173
echo    - 后端地址: http://localhost:5000
echo    - 管理后台: http://localhost:5173/admin
echo    - 后端健康检查: http://localhost:5000/health
echo.
echo 💡 提示：此窗口关闭后，服务将停止
echo.
echo ========================================
echo.

REM 启动前后端服务
npm run dev:both

if errorlevel 1 (
    echo.
    echo ❌ 启动出错！
    echo.
    echo 可能的原因：
    echo   1. 依赖未正确安装
    echo   2. 端口被占用（5173 或 5000）
    echo   3. Node.js 未正确安装
    echo.
    echo 解决方案：
    echo   - 请检查是否安装了 Node.js 18+
    echo   - 运行: npm install
    echo   - 尝试更改端口或关闭占用端口的程序
    echo.
)

pause