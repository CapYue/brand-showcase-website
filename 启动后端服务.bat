@echo off
chcp 65001 >nul
title 品牌展示官网 - 后端服务

echo.
echo ========================================
echo    品牌展示官网 - 后端服务启动脚本
echo ========================================
echo.

REM 检查依赖
echo 检查后端依赖...
npm list express >nul 2>&1
if errorlevel 1 (
    echo.
    echo ⚠️  检测到缺少后端依赖，正在安装...
    echo.
    npm install
    echo.
)

echo ========================================
echo 启动后端服务...
echo ========================================
echo.
echo 📝 信息：
echo    - 后端地址: http://localhost:5000
echo    - API 文档: http://localhost:5000/api/website/banner
echo    - 健康检查: http://localhost:5000/health
echo.
echo 💡 提示：
echo    - 此窗口关闭后，后端服务将停止
echo    - 如需完整功能，需同时运行前端服务
echo    - 可在新终端运行 npm run dev 启动前端
echo.
echo ========================================
echo.

REM 启动后端服务
npm run dev:backend

if errorlevel 1 (
    echo.
    echo ❌ 后端启动失败！
    echo.
    echo 可能的原因：
    echo   1. 端口 5000 被占用
    echo   2. Node.js 未正确安装
    echo   3. 依赖缺失
    echo.
    echo 解决方案：
    echo   - 运行: npm install
    echo   - 检查端口占用: netstat -ano ^| findstr :5000
    echo   - 更改端口: set PORT=5001 ^& npm run dev:backend
    echo.
)

pause
