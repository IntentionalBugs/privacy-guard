# 🚀 Installation Guide / 安装指南

## Method 1: Quick Installation via ZIP / 方法一：使用压缩包安装

**Latest Version / 最新版本:** v1.1.0

1. **Download ZIP package / 下载压缩包**
   - Visit: https://github.com/IntentionalBugs/privacy-guard/releases
   - Click on `privacy-guard-v1.1.0.zip` to download

2. **Extract files / 解压文件**
   - Extract the downloaded zip file to any folder
   - 例如：`/Users/username/extensions/privacy-guard/`

3. **Load in browser / 在浏览器中加载**

   **Chrome / Edge:**
   ```
   1. Open extensions page / 打开扩展页面:
      - Chrome: chrome://extensions/
      - Edge: edge://extensions/
   
   2. Enable Developer Mode / 开启开发者模式:
      - Find "Developer Mode" switch in top-right or top-left
      - Turn it on / 打开它
   
   3. Load Extension / 加载扩展:
      - Click "Load unpacked" (Chrome) or "Load unpacked extension" (Edge)
      - Click "加载已解压的扩展程序" or "加载解压缩扩展"
      - Select the extracted folder
      - Click "Select" / 点击"选择"
   ```

   **Firefox:**
   ```
   1. Visit about:debugging#/runtime/this-firefox
   2. Click "Load Temporary Add-on"
   3. Select manifest.json from the extracted folder
   ```

## Method 2: Installation from Source / 方法二：从源码安装

```bash
# Clone repository / 克隆仓库
git clone git@github.com:IntentionalBugs/privacy-guard.git
cd privacy-guard

# Load the folder in your browser / 在浏览器中加载该文件夹
```

## Verify Installation / 验证安装

After successful installation:
安装成功后：

- 🛡️ Extension icon appears in browser toolbar / 浏览器工具栏会出现插件图标
- Extension automatically activates when visiting supported AI websites / 访问支持的AI网站时，插件会自动启动
- Warning panel appears when inputting privacy information / 输入包含隐私信息的文本时，会显示预警面板

## Supported Websites / 支持的网站

✅ ChatGPT (chat.openai.com)
✅ Claude (claude.ai)
✅ Gemini (gemini.google.com)
✅ DeepSeek (chat.deepseek.com)
✅ Tongyi Qianwen / 通义千问 (tongyi.aliyun.com)
✅ Wenxin Yiyan / 文心一言 (yiyan.baidu.com)
✅ Kimi (kimi.moonshot.cn)
✅ ChatGLM (chatglm.cn)
✅ iFlytek Spark / 讯飞星火 (xinghuo.xfyun.cn)

## Usage Example / 使用示例

Input in ChatGPT:
在ChatGPT中输入：

```
My API key is: sk-proj-1234567890abcdefghijklmnopqrstuvwxyz
ID Card: 110101199001011234
Phone: 13800138000
Email: user@example.com
```

The extension will immediately detect and display a warning panel!
插件会立即检测并显示预警面板！

---

Need help? Check full documentation / 需要帮助？查看完整文档：
📖 README.md: https://github.com/IntentionalBugs/privacy-guard/blob/main/README.md
