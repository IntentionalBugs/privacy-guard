# 🎉 Privacy Guard v1.0.0 - 首个正式发布 / Initial Release

## 📦 下载安装 / Download & Install

**安装包 / Installation Package:** `privacy-guard-v1.0.0.zip` (25KB)

[点击这里下载安装包](../privacy-guard-v1.0.0.zip)

详细安装指南请查看：[INSTALL.md](INSTALL.md)

---

## ✨ 新功能 / New Features

### 🔍 实时隐私检测 / Real-time Privacy Detection
- 监听输入框内容变化 / Monitor input field changes
- 使用正则表达式快速识别 / Fast recognition using regex patterns
- 支持多种隐私信息类型 / Support multiple privacy data types

### 📊 三级预警系统 / Three-Level Warning System
- 🔴 **高危 / Critical**: API密钥、密码、私钥（默认自动拦截）
- 🟠 **中危 / High**: 身份证、银行卡、护照号
- 🟡 **低危 / Medium**: 手机号、邮箱、IP地址

### 🔒 智能混淆功能 / Smart Obfuscation
- 四种混淆方式 / Four masking methods:
  - 完全遮盖 / Full masking: `****`
  - 部分隐藏 / Partial masking: `138****8000`
  - 占位符 / Placeholder: `[已保护]`
  - 假数据 / Fake data: 生成符合格式的假信息
- 一键混淆或自动混淆 / One-click or auto masking

### 🎯 支持9大AI平台 / Support for 9 Major AI Platforms
- ✅ ChatGPT (chat.openai.com)
- ✅ Claude (claude.ai)
- ✅ Gemini (gemini.google.com)
- ✅ DeepSeek (chat.deepseek.com)
- ✅ 通义千问 (tongyi.aliyun.com)
- ✅ 文心一言 (yiyan.baidu.com)
- ✅ Kimi (kimi.moonshot.cn)
- ✅ ChatGLM (chatglm.cn)
- ✅ 讯飞星火 (xinghuo.xfyun.cn)

### ⚙️ 灵活配置选项 / Flexible Configuration
- 总开关控制 / Master switch
- 自动混淆开关 / Auto masking toggle
- 预警面板显示 / Warning panel visibility
- 自定义检测级别 / Customizable detection levels
- 详细的设置面板 / Detailed settings panel

---

## 🔒 隐私保护类型 / Privacy Protection Types

| 类型 / Type | 说明 / Description | 示例 / Example |
|------------|------------------|---------------|
| **API密钥** | OpenAI、GitHub等平台密钥 | `sk-proj-xxxxxxxxxxx` |
| **密码** | 显式密码字段 | `password: mypassword123` |
| **私钥** | RSA/EC/DSA私钥 | `-----BEGIN PRIVATE KEY-----` |
| **访问令牌** | OAuth、Bearer Token | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| **身份证号** | 18位中国身份证 | `110101199001011234` |
| **银行卡号** | 中国银行卡号 | `6225880123456789` |
| **护照号** | 中国护照 | `E12345678` |
| **手机号** | 中国手机号 | `13800138000` |
| **邮箱** | 电子邮箱地址 | `user@example.com` |
| **IP地址** | IPv4地址 | `192.168.1.1` |

---

## 🚀 快速开始 / Quick Start

### 1. 安装扩展 / Install Extension
```bash
# 下载并解压安装包
# Download and extract the ZIP package
unzip privacy-guard-v1.0.0.zip

# 在浏览器中加载文件夹
# Load the folder in your browser
```

### 2. 配置设置 / Configure Settings
- 点击插件图标打开设置面板 / Click extension icon to open settings
- 开启"自动混淆高危信息"（可选）/ Enable "Auto mask critical info" (optional)
- 选择混淆方式 / Choose masking method

### 3. 开始使用 / Start Using
- 访问任意支持的AI网站 / Visit any supported AI website
- 在输入框中输入内容 / Type in input fields
- 插件会自动检测并预警 / Extension automatically detects and warns

---

## 📸 界面预览 / Interface Preview

### 预警面板 / Warning Panel
```
🛡️ 隐私保护预警
────────────────────────
🔴 高危          2
  API密钥: sk-proj-xxxx
  密码: password123

🟠 中危          1
  身份证: 110101199001011234

[混淆全部] [忽略]
```

### 设置面板 / Settings Panel
- ✅ 启用保护
- ⚙️ 自动混淆高危信息
- 📊 混淆方式: 自动选择
- 🔴 高危 (密钥、密码、私钥)
- 🟠 中危 (身份证、银行卡、护照)
- 🟡 低危 (手机号、邮箱、IP)

---

## 🔧 技术架构 / Technical Architecture

- **Manifest Version:** 3
- **核心引擎 / Core Engine:** 基于正则的隐私检测 / Regex-based detection
- **前端框架 / Frontend:** 原生JavaScript / Vanilla JavaScript
- **存储 / Storage:** Chrome Storage API
- **权限 / Permissions:** storage, activeTab, notifications

```
├── manifest.json          # 扩展清单 / Extension manifest
├── src/
│   ├── content/           # 内容脚本 / Content scripts
│   ├── background/        # 后台服务 / Background service
│   ├── popup/            # 设置面板 / Settings panel
│   └── utils/            # 工具函数 / Utilities
├── assets/               # 图标资源 / Icon assets
└── test.html            # 测试页面 / Test page
```

---

## 🐛 已知问题 / Known Issues

- 部分网站可能需要刷新页面才能注入脚本 / Some sites may need page refresh
- 某些复杂输入框可能无法监听 / Some complex inputs may not be monitored
- 可能存在误报情况 / False positives may occur

---

## 🗺️ 后续计划 / Future Roadmap

- [ ] 添加更多AI网站支持 / More AI websites
- [ ] 自定义检测规则界面 / Custom rule interface
- [ ] 历史记录功能 / History logging
- [ ] 导出检测报告 / Export detection reports
- [ ] 白名单功能 / Whitelist feature
- [ ] 多语言支持 / Multi-language support
- [ ] 深度学习检测模型 / ML-based detection
- [ ] Firefox完全支持 / Full Firefox support

---

## 📄 许可证 / License

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 💬 反馈与支持 / Feedback & Support

- 🐛 报告问题 / Report bugs: [GitHub Issues](https://github.com/IntentionalBugs/privacy-guard/issues)
- 💡 功能建议 / Feature requests: [GitHub Discussions](https://github.com/IntentionalBugs/privacy-guard/discussions)
- 📧 联系我们 / Contact us: [创建Issue](https://github.com/IntentionalBugs/privacy-guard/issues/new)

---

## 🙏 致谢 / Acknowledgments

感谢所有测试者和贡献者！

感谢开源社区提供的灵感和技术支持。

---

**🛡️ 保护隐私，从输入开始！ / Protect your privacy, starting from input!**
