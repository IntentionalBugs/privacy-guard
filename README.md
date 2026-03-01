# 🛡️ Privacy Guard - AI Input Privacy Protection Extension
# 🛡️ AI输入隐私保护插件

[中文版](#中文文档) | [English](#english-documentation)

---

## English Documentation

## About / 关于

Privacy Guard is a browser extension that automatically detects and protects your privacy information when using ChatGPT, Claude, and other AI models.

在使用ChatGPT、Claude等大模型时，自动检测并保护你的隐私信息。

## Features / 功能特性

- **🔍 Real-time Detection / 实时检测**  
  Automatically identifies privacy information as you type / 输入时自动识别隐私信息

- **📊 Three-Level Warning System / 三级预警系统**：
  - 🔴 **Critical / 高危**: API Keys, Passwords, Private Keys (Auto-block by default / 默认自动拦截)
  - 🟠 **High / 中危**: ID Numbers, Bank Cards, Passports
  - 🟡 **Medium / 低危**: Phone Numbers, Emails, IP Addresses

- **🔒 Smart Obfuscation / 智能混淆**  
  One-click or auto-replace privacy information / 一键混淆或自动替换隐私信息

- **⚙️ Flexible Configuration / 灵活配置**  
  Customize detection levels and masking methods / 自定义检测级别和混淆方式

## Installation / 安装方法

### Quick Installation (Recommended) / 快速安装（推荐）

**Latest Version / 最新版本:** v1.1.0

1. **Download Installation Package / 下载安装包**
   - Visit [Releases Page](https://github.com/IntentionalBugs/privacy-guard/releases)
   - Click to download `privacy-guard-v1.1.0.zip`

2. **Extract and Install / 解压并安装**
   - Use auto-install script (macOS/Linux):
     ```bash
     unzip privacy-guard-v1.1.0.zip
     ./install.sh
     ```
   - Or manually install, see [INSTALL.md](INSTALL.md)

### Installation from Source / 从源码安装

#### Chrome / Edge / Other Chromium Browsers

1. **Download source code / 下载源码**
   ```bash
   git clone git@github.com:IntentionalBugs/privacy-guard.git
   cd privacy-guard
   ```

2. **Open extensions management page / 打开扩展管理页面**
   - Chrome: Visit `chrome://extensions/`
   - Edge: Visit `edge://extensions/`

3. **Enable Developer Mode / 开启开发者模式**
   - Find "Developer Mode" switch in the top-right corner, turn it on
   - 在右上角找到"开发者模式"开关，打开它

4. **Load extension / 加载插件**
   - Click "Load unpacked"
   - Select `privacy-guard` folder

5. **Done! / 完成！**  
   - Extension icon will appear in the browser toolbar
   - Click icon to configure settings
   - 插件图标会出现在浏览器工具栏
   - 点击图标可进行设置

### Firefox

1. Visit `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Select `manifest.json` from the folder

> **Note / 注意**: Firefox version requires modifying manifest to v2 format

## Usage / 使用方法

### 1. Auto Protection / 自动保护

The extension automatically activates when visiting supported AI websites:
访问支持的AI网站时，插件自动启动：

- ✅ ChatGPT (chat.openai.com)
- ✅ Claude (claude.ai)
- ✅ Gemini (gemini.google.com)
- ✅ DeepSeek (chat.deepseek.com)
- ✅ Tongyi Qianwen / 通义千问 (tongyi.aliyun.com)
- ✅ Wenxin Yiyan / 文心一言 (yiyan.baidu.com)
- ✅ Kimi (kimi.moonshot.cn)
- ✅ ChatGLM (chatglm.cn)
- ✅ iFlytek Spark / 讯飞星火 (xinghuo.xfyun.cn)

### 2. Detection Warning / 检测预警

When input contains privacy information:
当输入包含隐私信息时：

- Warning panel appears below input box
- 输入框下方显示预警面板
- Classified by danger level
- 按危险级别分类显示
- Shows specific types and content
- 显示具体类型和内容

### 3. Handle Privacy Information / 处理隐私信息

**Method A: Manual Masking / 方式A：手动混淆**
1. Click "Mask All" button when warning appears
2. 看到预警后点击"Mask All"按钮
3. Privacy information will be replaced with safe format
4. 隐私信息会被替换为安全形式

**Method B: Auto Masking / 方式B：自动混淆**
1. Click extension icon
2. 点击插件图标
3. Toggle "Auto mask critical info"
4. 打开"Auto mask critical info"开关
5. Critical information (keys, passwords, etc.) will be auto-replaced
6. 高危信息（密钥、密码等）会自动替换

### 4. Configuration Options / 配置选项

Click extension icon to configure:
点击插件图标可设置：

- **Enable Protection / 启用保护**: Master switch / 总开关
- **Auto Mask Critical / 自动混淆高危信息**: Auto-replace detected critical content / 检测到高危内容自动替换
- **Show Warnings / 显示预警**: Control warning panel visibility / 控制是否显示提示
- **Masking Method / 混淆方式**:
  - Auto (Recommended / 推荐)
  - Full masking `****` / 完全遮盖
  - Partial masking `138****8000` / 部分隐藏
  - Placeholder `[Protected]` / 占位符
  - Fake data / 生成假数据
- **Detection Levels / 检测级别**: Select which privacy levels to detect / 选择要检测的隐私级别

## Testing / 测试

1. Click extension icon
2. 点击插件图标
3. Click "Test Page" button
4. 点击"测试页面"按钮
5. Input various privacy information in test page
6. 在测试页面输入各种隐私信息
7. Observe detection and obfuscation effects
8. 观察检测和混淆效果

## Detection Rules / 检测规则

### Critical (Auto-block) / 高危（自动拦截）

| Type | Regex Example | Description / 说明 |
|------|--------------|-------------------|
| API Keys | `sk-[a-zA-Z0-9]{32,}` | OpenAI, GitHub keys |
| Passwords | `password: xxx` | Explicit password fields / 显式密码字段 |
| Private Keys | `-----BEGIN PRIVATE KEY-----` | RSA/EC/DSA keys |
| Access Tokens | `Bearer xxx` | OAuth Tokens |

### High (Strong Warning) / 中危（强预警）

| Type | Regex Example | Description / 说明 |
|------|--------------|-------------------|
| ID Numbers | `[1-9]\d{5}(18|19|20)...` | 18-digit Chinese ID / 18位中国身份证 |
| Bank Cards | `(62|4|5)\d{14,17}` | Bank card numbers / 银行卡号 |
| Passports | `[EG][0-9]{8}` | Chinese passports / 中国护照 |

### Medium (Warning) / 低危（提示预警）

| Type | Regex Example | Description / 说明 |
|------|--------------|-------------------|
| Phone Numbers | `1[3-9]\d{9}` | Chinese phone numbers / 中国手机号 |
| Emails | `[a-zA-Z0-9._%+-]+@...` | Email addresses / 电子邮箱 |
| IP Addresses | `\d{1,3}\.\d{1,3}...` | IPv4 addresses |

## Customization / 自定义扩展

### Add Custom Detection Rules / 添加自定义检测规则

Edit `src/utils/detector.js`:

```javascript
{
  name: 'Custom Type', // 自定义类型
  patterns: [
    /your-regex-pattern/g // 你的正则表达式
  ],
  example: 'Example text', // 示例文本
  maskType: 'partial' // asterisk | partial | placeholder | fake
}
```

### Add Supported Websites / 添加支持的网站

Edit `manifest.json`:

```json
{
  "host_permissions": [
    "https://your-ai-site.com/*"
  ],
  "content_scripts": [{
    "matches": [
      "https://your-ai-site.com/*"
    ]
  }]
}
```

## Project Structure / 项目结构

```
privacy-guard-extension/
├── manifest.json           # Extension config / 插件配置
├── src/
│   ├── utils/
│   │   └── detector.js     # Detection engine / 检测引擎
│   ├── content/
│   │   ├── content.js      # Content script / 内容脚本
│   │   └── content.css     # Styles / 样式
│   ├── background/
│   │   └── background.js   # Background service / 后台脚本
│   └── popup/
│       ├── popup.html      # Popup UI / 弹窗界面
│       ├── popup.js        # Popup logic / 弹窗逻辑
│       └── popup.css       # Popup styles / 弹窗样式
├── assets/                 # Icons and resources / 图标等资源
└── test.html               # Test page / 测试页面
```

## Roadmap / 开发计划

- [ ] Add more AI website support / 添加更多AI网站支持
- [ ] Support custom rule UI / 支持自定义检测规则界面
- [ ] Add history logging / 添加历史记录功能
- [ ] Support report export / 支持导出检测报告
- [ ] Add whitelist feature / 添加白名单功能
- [ ] Multi-language support / 支持多语言

## Important Notes / 注意事项

1. **Local Processing / 本地处理**: All detection is done locally, no data uploaded / 所有检测都在本地完成，不上传任何数据
2. **False Positives / 误报可能**: Some non-privacy content may be misidentified, can click "Ignore" / 某些非隐私内容可能被误判，可点击"忽略"
3. **Performance Impact / 性能影响**: Extension slightly increases page load time / 插件会轻微增加页面加载时间
4. **Irreversible / 不可逆性**: Obfuscated information cannot be restored, use with caution / 混淆后的信息无法还原，请谨慎操作

## Contributing / 贡献

Contributions are welcome! Please submit Issues and Pull Requests!
欢迎提交Issue和Pull Request！

## License / 许可证

MIT License

---

## 中文文档

## 关于

Privacy Guard 是一个浏览器扩展，在使用ChatGPT、Claude和其他AI模型时，自动检测并保护您的隐私信息。

## 功能特性

详见上方英文版本

## 安装方法

详见上方英文版本

## 使用方法

详见上方英文版本

## 测试

详见上方英文版本

## 检测规则

详见上方英文版本

## 自定义扩展

详见上方英文版本

## 项目结构

详见上方英文版本

## 开发计划

详见上方英文版本

## 注意事项

详见上方英文版本

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

---

**🛡️ Protect your privacy, starting from input! 保护隐私，从输入开始！**
