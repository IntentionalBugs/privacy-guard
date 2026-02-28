/**
 * Popup Script - 控制面板逻辑
 */

class PopupController {
  constructor() {
    this.settings = {};
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.bindEvents();
    this.updateUI();
    this.loadStats();
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['privacyGuardSettings']);
      this.settings = result.privacyGuardSettings || this.getDefaultSettings();
    } catch (error) {
      console.error('加载设置失败:', error);
      this.settings = this.getDefaultSettings();
    }
  }

  getDefaultSettings() {
    return {
      enabled: true,
      autoMask: false,
      maskType: 'auto',
      enabledLevels: ['critical', 'high', 'medium'],
      showWarnings: true,
      customPatterns: []
    };
  }

  bindEvents() {
    // 总开关
    document.getElementById('enabled').addEventListener('change', (e) => {
      this.settings.enabled = e.target.checked;
      this.saveSettings();
      this.updateStatus();
    });

    // 自动混淆
    document.getElementById('autoMask').addEventListener('change', (e) => {
      this.settings.autoMask = e.target.checked;
      this.saveSettings();
    });

    // 显示预警
    document.getElementById('showWarnings').addEventListener('change', (e) => {
      this.settings.showWarnings = e.target.checked;
      this.saveSettings();
    });

    // 混淆方式
    document.getElementById('maskType').addEventListener('change', (e) => {
      this.settings.maskType = e.target.value;
      this.saveSettings();
    });

    // 检测级别
    ['critical', 'high', 'medium'].forEach(level => {
      document.getElementById(`level-${level}`).addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!this.settings.enabledLevels.includes(level)) {
            this.settings.enabledLevels.push(level);
          }
        } else {
          this.settings.enabledLevels = this.settings.enabledLevels.filter(l => l !== level);
        }
        this.saveSettings();
      });
    });

    // 导出日志
    document.getElementById('exportLogs').addEventListener('click', () => {
      this.exportLogs();
    });

    // 测试页面
    document.getElementById('testPage').addEventListener('click', () => {
      chrome.tabs.create({ url: chrome.runtime.getURL('test.html') });
    });
  }

  updateUI() {
    document.getElementById('enabled').checked = this.settings.enabled;
    document.getElementById('autoMask').checked = this.settings.autoMask;
    document.getElementById('showWarnings').checked = this.settings.showWarnings;
    document.getElementById('maskType').value = this.settings.maskType;

    ['critical', 'high', 'medium'].forEach(level => {
      document.getElementById(`level-${level}`).checked = 
        this.settings.enabledLevels.includes(level);
    });

    this.updateStatus();
  }

  updateStatus() {
    const statusEl = document.getElementById('status');
    const dot = statusEl.querySelector('.status-dot');
    const text = statusEl.querySelector('.status-text');

    if (this.settings.enabled) {
      dot.classList.add('active');
      text.textContent = '已启用';
    } else {
      dot.classList.remove('active');
      text.textContent = '已禁用';
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.sync.set({ privacyGuardSettings: this.settings });
      
      // 通知content script
      const tabs = await chrome.tabs.query({});
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SETTINGS_UPDATED',
          settings: this.settings
        }).catch(() => {});
      });
    } catch (error) {
      console.error('保存设置失败:', error);
    }
  }

  async loadStats() {
    try {
      const result = await chrome.storage.local.get(['stats']);
      const stats = result.stats || { detected: 0, blocked: 0 };
      document.getElementById('detectedCount').textContent = stats.detected;
      document.getElementById('blockedCount').textContent = stats.blocked;
    } catch (error) {
      console.error('加载统计失败:', error);
    }
  }

  async exportLogs() {
    try {
      const result = await chrome.storage.local.get(['logs']);
      const logs = result.logs || [];
      
      const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `privacy-guard-logs-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出日志失败:', error);
    }
  }
}

// 启动
new PopupController();
