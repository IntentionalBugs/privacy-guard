#!/bin/bash

# Privacy Guard 自动安装脚本 / Privacy Guard Auto Installation Script
# 适用于 macOS 和 Linux / Works on macOS and Linux

set -e

echo "=========================================="
echo "🛡️  Privacy Guard v1.0.0 安装脚本"
echo "    Installation Script"
echo "=========================================="
echo ""

# 检测操作系统 / Detect OS
OS="$(uname -s)"
case "${OS}" in
    Darwin*)    PLATFORM="macOS";;
    Linux*)     PLATFORM="Linux";;
    MINGW*)     PLATFORM="Windows";;
    *)          PLATFORM="UNKNOWN";;
esac

echo "检测到操作系统 / Detected OS: ${PLATFORM}"
echo ""

# 检查是否有 zip 文件 / Check if zip file exists
if [ ! -f "privacy-guard-v1.0.0.zip" ]; then
    echo "❌ 错误 / Error: 找不到安装包 / Installation package not found"
    echo "   请确保当前目录有 privacy-guard-v1.0.0.zip"
    echo "   Make sure privacy-guard-v1.0.0.zip exists in current directory"
    exit 1
fi

# 解压文件 / Extract files
echo "📦 解压安装包 / Extracting package..."
unzip -q "privacy-guard-v1.0.0.zip"

# 根据系统提供不同的安装指引 / Provide different instructions based on OS
echo ""
echo "✅ 解压完成！/ Extraction complete!"
echo ""
echo "📋 接下来请按以下步骤安装：/ Next steps for installation:"
echo ""
echo "=========================================="
echo "🌐 浏览器安装步骤 / Browser Installation"
echo "=========================================="
echo ""

if [[ "${PLATFORM}" == "macOS" ]]; then
    echo "1. 在 Safari 或 Chrome 中打开扩展页面："
    echo "   Open extensions page in Safari or Chrome:"
    echo "   chrome://extensions/"
    echo ""
    echo "2. 开启'开发者模式' / Enable 'Developer Mode'"
    echo ""
    echo "3. 点击'加载已解压的扩展程序'"
    echo "   Click 'Load unpacked'"
    echo ""
    echo "4. 在文件选择器中，按 Cmd+Shift+G 粘贴以下路径："
    echo "   In file dialog, press Cmd+Shift+G and paste:"
    echo ""
    echo "   $(pwd)"
    echo ""
else
    echo "1. 在浏览器中打开扩展页面："
    echo "   Open extensions page in browser:"
    echo "   chrome://extensions/ 或 edge://extensions/"
    echo ""
    echo "2. 开启'开发者模式' / Enable 'Developer Mode'"
    echo ""
    echo "3. 点击'加载已解压的扩展程序'"
    echo "   Click 'Load unpacked'"
    echo ""
    echo "4. 选择解压后的文件夹："
    echo "   Select the extracted folder:"
    echo ""
    echo "   $(pwd)"
    echo ""
fi

echo "=========================================="
echo ""
echo "📖 完整安装指南 / Full Installation Guide:"
echo "   查看 README.md 和 INSTALL.md"
echo "   Check README.md and INSTALL.md"
echo ""
echo "🚀 支持的AI网站 / Supported AI Websites:"
echo "   ChatGPT, Claude, Gemini, DeepSeek, 通义千问, 文心一言, Kimi, ChatGLM, 讯飞星火"
echo ""
echo "✨ 安装后，在AI网站输入时即可自动保护隐私！"
echo "   After installation, your privacy is protected automatically when typing on AI websites!"
echo ""
echo "=========================================="
echo "🛡️  安装完成 / Installation Ready!"
echo "=========================================="
