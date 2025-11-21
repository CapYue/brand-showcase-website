@echo off
chcp 65001 >nul
title 网站项目开发服务器

echo 正在启动网站开发服务器...
echo.

npm run dev

if errorlevel 1 (
    echo.
    echo 启动失败，正在尝试安装依赖...
    npm install
    echo.
    echo 重新启动服务器...
    npm run dev
)

pause