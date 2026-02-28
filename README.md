# 🛡️ Privacy Guard - AI输入隐私保护插件

在使用ChatGPT、Claude等大模型时，自动检测并保护你的隐私信息。

## ✨ 功能特性

- **🔍 实时检测**：输入时自动识别隐私信息
- **📊 分级预警**：
  - 🔴 **高危**：API密钥、密码、私钥（默认自动拦截）
  - 🟠 **中危**：身份证号、银行卡号、护照号
  - 🟡 **低危**：手机号、邮箱、IP地址
- **🔒 智能混淆**：一键混淆或自动替换隐私信息
- **⚙️ 灵活配置**：自定义检测级别和混淆方式

## 📦 安装方法

### Chrome / Edge / 其他Chromium浏览器

1. **下载源码**
   ```bash
   cd ~/workspace
   git clone [你的仓库地址]
   cd privacy-guard-extension
   ```

2. **打开扩展管理页面**
   - Chrome: 访问 `chrome://extensions/`
   - Edge: 访问 `edge://extensions/`

3. **开启开发者模式**
   - 在右上角找到"开发者模式"开关，打开它

4. **加载插件**
   - 点击"加载已解压的扩展程序"
   - 选择 `privacy-guard-extension` 文件夹

5. **完成！** 
   - 插件图标会出现在浏览器工具栏
   - 点击图标可进行设置

### Firefox

1. 访问 `about:debugging#/runtime/this-firefox`
2. 点击"临时载入附加组件"
3. 选择文件夹中的 `manifest.json`

> **注意**：Firefox版本需要修改manifest为v2格式

## 🎯 使用方法

### 1. 自动保护

访问支持的AI网站时，插件自动启动：

- ✅ ChatGPT (chat.openai.com)
- ✅ Claude (claude.ai)
- ✅ Gemini (gemini.google.com)
- ✅ DeepSeek (chat.deepseek.com)
- ✅ 通义千问 (tongyi.aliyun.com)
- ✅ 文心一言 (yiyan.baidu.com)
- ✅ Kimi (kimi.moonshot.cn)
- ✅ 智谱ChatGLM (chatglm.cn)
- ✅ 讯飞星火 (xinghuo.xfyun.cn)

### 2. 检测预警

当输入包含隐私信息时：
- 输入框下方显示预警面板
- 按危险级别分类显示
- 显示具体类型和内容

### 3. 处理隐私信息

两种方式：

**方式A：手动混淆**
1. 看到预警后点击"混淆全部"按钮
2. 隐私信息会被替换为安全形式

**方式B：自动混淆**
1. 点击插件图标
2. 打开"自动混淆高危信息"开关
3. 高危信息（密钥、密码等）会自动替换

### 4. 配置选项

点击插件图标可设置：

- **启用保护**：总开关
- **自动混淆高危信息**：检测到高危内容自动替换
- **显示预警面板**：控制是否显示提示
- **混淆方式**：
  - 自动选择（推荐）
  - 完全遮盖 `****`
  - 部分隐藏 `138****8000`
  - 占位符 `[已隐藏]`
  - 生成假数据
- **检测级别**：选择要检测的隐私级别

## 🔬 测试

1. 点击插件图标
2. 点击"测试页面"按钮
3. 在测试页面输入各种隐私信息
4. 观察检测和混淆效果

## 📝 检测规则

### 高危（自动拦截）

| 类型 | 正则示例 | 说明 |
|------|---------|------|
| API密钥 | `sk-[a-zA-Z0-9]{32,}` | OpenAI、GitHub等 |
| 密码 | `password: xxx` | 显式密码字段 |
| 私钥 | `-----BEGIN PRIVATE KEY-----` | RSA/EC/DSA私钥 |
| 访问令牌 | `Bearer xxx` | OAuth Token |

### 中危（强预警）

| 类型 | 正则示例 | 说明 |
|------|---------|------|
| 身份证号 | `[1-9]\d{5}(18|19|20)...` | 18位中国身份证 |
| 银行卡号 | `(62|4|5)\d{14,17}` | 银行卡号 |
| 护照号 | `[EG][0-9]{8}` | 中国护照 |

### 低危（提示预警）

| 类型 | 正则示例 | 说明 |
|------|---------|------|
| 手机号 | `1[3-9]\d{9}` | 中国手机号 |
| 邮箱 | `[a-zA-Z0-9._%+-]+@...` | 电子邮箱 |
| IP地址 | `\d{1,3}\.\d{1,3}...` | IPv4地址 |

## 🔧 自定义扩展

### 添加自定义检测规则

编辑 `src/utils/detector.js`：

```javascript
{
  name: '自定义类型',
  patterns: [
    /你的正则表达式/g
  ],
  example: '示例文本',
  maskType: 'partial' // asterisk | partial | placeholder | fake
}
```

### 添加支持的网站

编辑 `manifest.json`：

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

## 🏗️ 项目结构

```
privacy-guard-extension/
├── manifest.json           # 插件配置
├── src/
│   ├── utils/
│   │   └── detector.js     # 检测引擎
│   ├── content/
│   │   ├── content.js      # 内容脚本
│   │   └── content.css     # 样式
│   ├── background/
│   │   └── background.js   # 后台脚本
│   └── popup/
│       ├── popup.html      # 弹窗界面
│       ├── popup.js        # 弹窗逻辑
│       └── popup.css       # 弹窗样式
├── assets/                 # 图标等资源
└── test.html               # 测试页面
```

## 📋 开发计划

- [ ] 添加更多AI网站支持
- [ ] 支持自定义检测规则界面
- [ ] 添加历史记录功能
- [ ] 支持导出检测报告
- [ ] 添加白名单功能
- [ ] 支持多语言

## ⚠️ 注意事项

1. **本地处理**：所有检测都在本地完成，不上传任何数据
2. **误报可能**：某些非隐私内容可能被误判，可点击"忽略"
3. **性能影响**：插件会轻微增加页面加载时间
4. **不可逆性**：混淆后的信息无法还原，请谨慎操作

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

**保护隐私，从输入开始！** 🛡️
