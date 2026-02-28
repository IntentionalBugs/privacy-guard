# 🚀 安装指南 / Installation Guide

## 方法一：使用压缩包安装 / Installation via ZIP

1. **下载压缩包** / Download ZIP
   - 点击下方的 `privacy-guard-v1.0.0.zip` 文件下载
   - 或访问：https://github.com/IntentionalBugs/privacy-guard/releases

2. **解压文件** / Extract Files
   - 将下载的zip文件解压到任意文件夹
   - 例如：`/Users/username/extensions/privacy-guard/`

3. **在浏览器中加载** / Load in Browser

   **Chrome / Edge:**
   ```
   1. 打开扩展页面 / Open extensions page:
      - Chrome: chrome://extensions/
      - Edge: edge://extensions/
   
   2. 开启开发者模式 / Enable Developer Mode:
      - 右上角或左上角找到"开发者模式"开关
      - 打开它 / Turn it on
   
   3. 加载扩展 / Load Extension:
      - 点击"加载已解压的扩展程序"
      - 或"加载解压缩扩展" (Load unpacked)
      - 选择解压后的文件夹
      - 点击"选择"
   ```

   **Firefox:**
   ```
   1. 访问 about:debugging#/runtime/this-firefox
   2. 点击"临时载入附加组件"
   3. 选择解压文件夹中的 manifest.json
   ```

## 方法二：从源码安装 / Installation from Source

```bash
# 克隆仓库
git clone git@github.com:IntentionalBugs/privacy-guard.git
cd privacy-guard

# 在浏览器中加载该文件夹
```

## 验证安装 / Verify Installation

安装成功后：
- 浏览器工具栏会出现 🛡️ 插件图标
- 访问支持的AI网站时，插件会自动启动
- 输入包含隐私信息的文本时，会显示预警面板

## 支持的网站 / Supported Websites

✅ ChatGPT (chat.openai.com)
✅ Claude (claude.ai)
✅ Gemini (gemini.google.com)
✅ DeepSeek (chat.deepseek.com)
✅ 通义千问 (tongyi.aliyun.com)
✅ 文心一言 (yiyan.baidu.com)
✅ Kimi (kimi.moonshot.cn)
✅ ChatGLM (chatglm.cn)
✅ 讯飞星火 (xinghuo.xfyun.cn)

## 使用示例 / Usage Example

在ChatGPT中输入：
```
我的API密钥是：sk-proj-1234567890abcdefghijklmnopqrstuvwxyz
身份证号：110101199001011234
手机号：13800138000
```

插件会立即检测并显示预警面板！

---

需要帮助？查看完整文档 / Need help? Check full documentation:
📖 README.md: https://github.com/IntentionalBugs/privacy-guard/blob/main/README.md
