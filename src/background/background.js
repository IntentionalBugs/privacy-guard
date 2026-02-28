/**
 * Background Script - Service Worker
 * 后台脚本
 */

// Listen for messages / 监听消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_BADGE') {
    updateBadge(message.count);
  }
  if (message.type === 'SHOW_NOTIFICATION') {
    showNotification(message.message);
  }
  if (message.type === 'SETTINGS_UPDATED') {
    broadcastSettings(message.settings);
  }
});

// Update badge / 更新徽章
function updateBadge(count) {
  if (count > 0) {
    chrome.action.setBadgeText({ text: count.toString() });
    chrome.action.setBadgeBackgroundColor({ color: '#ff3b30' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// Show notification / 显示通知
function showNotification(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'assets/icon128.png',
    title: 'Privacy Guard',
    message: message
  });
}

// Broadcast settings to all tabs / 广播设置到所有标签页
async function broadcastSettings(settings) {
  const tabs = await chrome.tabs.query({});
  tabs.forEach(tab => {
    chrome.tabs.sendMessage(tab.id, {
      type: 'SETTINGS_UPDATED',
      settings: settings
    }).catch(() => {});
  });
}

// Initialize default settings on install / 安装时初始化默认设置
chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.sync.get(['privacyGuardSettings']);
  if (!result.privacyGuardSettings) {
    const defaultSettings = {
      enabled: true,
      autoMask: false,
      maskType: 'auto',
      enabledLevels: ['critical', 'high', 'medium'],
      showWarnings: true,
      customPatterns: []
    };
    await chrome.storage.sync.set({ privacyGuardSettings: defaultSettings });
  }
});

// Re-inject content script on tab update / 标签页更新时重新注入
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // Check if it's a supported AI website / 检查是否是支持的AI网站
    const supportedSites = [
      'chat.openai.com',
      'claude.ai',
      'gemini.google.com',
      'chat.deepseek.com',
      'tongyi.aliyun.com',
      'yiyan.baidu.com',
      'kimi.moonshot.cn',
      'chatglm.cn',
      'xinghuo.xfyun.cn'
    ];
    
    if (supportedSites.some(site => tab.url?.includes(site))) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['src/content/content.js']
      }).catch(() => {});
    }
  }
});
