# Privacy Guard 浏览器插件 - 快速开始

## 🎉 插件已创建完成！

### 📁 项目位置
```
~/.openclaw-autoclaw/workspace/privacy-guard-extension/
```

### 🚀 安装步骤

1. **打开Chrome扩展页面**
   ```
   chrome://extensions/
   ```

2. **开启开发者模式**
   - 在右上角找到"开发者模式"开关
   - 点击开启

3. **加载插件**
   - 点击"加载已解压的扩展程序"
   - 选择文件夹：`~/.openclaw-autoclaw/workspace/privacy-guard-extension`
   - 点击"选择"

4. **完成！** 🎊
   - 插件图标会出现在浏览器工具栏
   - 访问支持的AI网站即可自动保护

### 🎯 功能特点

✅ **智能检测**
- 🔴 高危：API密钥、密码、私钥（自动拦截）
- 🟠 中危：身份证、银行卡、护照
- 🟡 低危：手机号、邮箱、IP地址

✅ **灵活配置**
- 总开关控制
- 自动混淆开关
- 混淆方式选择（完全遮盖/部分隐藏/占位符/假数据）
- 检测级别自定义

✅ **支持网站**
- ChatGPT (chat.openai.com)
- Claude (claude.ai)
- Gemini (gemini.google.com)
- DeepSeek (chat.deepseek.com)
- 通义千问、文心一言、Kimi、ChatGLM、讯飞星火

### 🧪 测试方法

1. 点击插件图标
2. 点击"测试页面"按钮
3. 输入包含隐私信息的文本
4. 观察检测和混淆效果

### 📝 测试示例

在ChatGPT等网站输入：
```
我的API密钥是：sk-proj-1234567890abcdefghijklmnopqrstuvwxyz
身份证号：110101199001011234
手机号：13800138000
邮箱：user@example.com
```

插件会自动检测并显示预警！

### ⚙️ 图标设置

当前使用占位图标。如需自定义：

1. 在浏览器中打开 `generate-icons.html`
2. 点击"下载全部图标"
3. 将下载的图标保存到 `assets/` 文件夹
4. 重新加载插件

### 📖 完整文档

查看 `README.md` 获取完整文档。

---

**保护隐私，从输入开始！** 🛡️
