@echo off
chcp 65001 >nul
echo ========================================
echo   网站项目 - 开发服务器启动脚本
echo ========================================
echo.

echo 正在检查Node.js环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未检测到Node.js，请先安装Node.js
    echo 访问 https://nodejs.org/ 下载并安装
    pause
    exit /b 1
)

echo 正在检查npm环境...
npm --version >nul 2>&1
if errorlevel 1 (
    echo 错误: 未检测到npm，请检查Node.js安装
    pause
    exit /b 1
)

echo.
echo 环境检查通过！
echo Node.js版本: %node_version%
echo npm版本: %npm_version%

for /f "tokens=*" %%i in ('node --version') do set node_version=%%i
for /f "tokens=*" %%i in ('npm --version') do set npm_version=%%i

echo.
echo 正在安装依赖包...
npm install

if errorlevel 1 (
    echo 错误: 依赖包安装失败
    pause
    exit /b 1
)

echo.
echo 依赖包安装完成！
echo.
echo ========================================
echo   启动开发服务器...
echo   服务器地址: http://localhost:3000
echo   按 Ctrl+C 停止服务器
echo ========================================
echo.

npm run dev

if errorlevel 1 (
    echo.
    echo 错误: 开发服务器启动失败
    echo 请检查错误信息并重试
    pause
)

pause