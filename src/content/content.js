/**
 * Content Script - Monitor AI website inputs, real-time privacy detection
 * 内容脚本 - 监听AI网站输入，实时检测隐私信息
 * English UI Version
 */

// ============ Detection Engine / 检测引擎 ============
const PRIVACY_LEVELS = {
  CRITICAL: { level: 'critical', name: 'Critical', icon: '🔴', autoBlock: true, color: '#ff3b30' },
  HIGH: { level: 'high', name: 'High', icon: '🟠', autoBlock: false, color: '#ff9500' },
  MEDIUM: { level: 'medium', name: 'Medium', icon: '🟡', autoBlock: false, color: '#ffcc00' }
};

const PRIVACY_PATTERNS = {
  critical: [
    { name: 'API Key', patterns: [/sk-[a-zA-Z0-9]{32,}/gi, /AIza[a-zA-Z0-9_-]{35}/g, /ghp_[a-zA-Z0-9]{36}/g, /xox[baprs]-[a-zA-Z0-9-]{10,}/g], maskType: 'asterisk' },
    { name: 'Password', patterns: [/(?:password|passwd|pwd)['":\s]*['"]?([^\s'"]{6,})['"]?/gi], maskType: 'asterisk' },
    { name: 'Private Key', patterns: [/-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/gi], maskType: 'placeholder' },
    { name: 'Access Token', patterns: [/Bearer\s+[a-zA-Z0-9_.-]{20,}/gi], maskType: 'asterisk' }
  ],
  high: [
    { name: 'ID Card', patterns: [/\b[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/g], maskType: 'partial' },
    { name: 'Bank Card', patterns: [/\b(?:62|4|5)\d{14,17}\b/g], maskType: 'partial' },
    { name: 'Passport', patterns: [/\b[EG][0-9]{8}\b/gi], maskType: 'partial' }
  ],
  medium: [
    { name: 'Phone Number', patterns: [/\b1[3-9]\d{9}\b/g], maskType: 'partial' },
    { name: 'Email', patterns: [/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g], maskType: 'partial' },
    { name: 'IP Address', patterns: [/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g], maskType: 'partial' }
  ]
};

function detectPrivacy(text, options = {}) {
  const results = [];
  const { enabledLevels = ['critical', 'high', 'medium'] } = options;

  Object.keys(PRIVACY_PATTERNS).forEach(level => {
    if (!enabledLevels.includes(level)) return;
    
    PRIVACY_PATTERNS[level].forEach(pattern => {
      pattern.patterns.forEach(regex => {
        let match;
        const globalRegex = new RegExp(regex.source, regex.flags);
        
        while ((match = globalRegex.exec(text)) !== null) {
          if (!results.some(r => r.text === match[0] && r.start === match.index)) {
            results.push({
              level, levelInfo: PRIVACY_LEVELS[level.toUpperCase()],
              type: pattern.name, text: match[0],
              start: match.index, end: match.index + match[0].length,
              maskType: pattern.maskType
            });
          }
        }
      });
    });
  });

  return results;
}

function maskPrivacy(text, detected, maskType = 'auto') {
  let result = text;
  [...detected].sort((a, b) => b.start - a.start).forEach(item => {
    const type = maskType === 'auto' ? item.maskType : maskType;
    let replacement;
    
    if (type === 'asterisk') replacement = '*'.repeat(Math.min(item.text.length, 20));
    else if (type === 'partial') replacement = item.text.substring(0, 2) + '*'.repeat(Math.min(item.text.length - 4, 10)) + item.text.substring(item.text.length - 2);
    else if (type === 'placeholder') replacement = `[${item.type} Protected]`;
    else replacement = '[Protected]';
    
    result = result.substring(0, item.start) + replacement + result.substring(item.end);
  });
  return result;
}

// ============ Main Logic / 主逻辑 ============
class PrivacyGuard {
  constructor() {
    this.settings = { enabled: true, autoMask: false, maskType: 'auto', enabledLevels: ['critical', 'high', 'medium'], showWarnings: true };
    this.warningOverlay = null;
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupMessageListener();
    this.setupInputListeners();
    this.createWarningOverlay();
    console.log('[Privacy Guard] Initialized / 已启动');
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.sync.get(['privacyGuardSettings']);
      if (result.privacyGuardSettings) this.settings = { ...this.settings, ...result.privacyGuardSettings };
    } catch (error) {
      console.error('[Privacy Guard] Failed to load settings / 加载设置失败:', error);
    }
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'SETTINGS_UPDATED') this.settings = { ...this.settings, ...message.settings };
    });
  }

  setupInputListeners() {
    let timeout;
    document.addEventListener('input', (e) => {
      if (!this.settings.enabled) return;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (this.isInputElement(e.target)) this.checkInput(e.target);
      }, 300);
    }, true);
  }

  isInputElement(element) {
    if (!element) return false;
    const tag = element.tagName?.toLowerCase();
    return tag === 'textarea' || (tag === 'input' && ['text', 'search'].includes(element.type)) || element.isContentEditable;
  }

  checkInput(element) {
    const text = element.value || element.textContent || '';
    const detected = detectPrivacy(text, { enabledLevels: this.settings.enabledLevels });

    if (detected.length > 0) {
      this.showWarning(detected, element);
      this.updateBadge(detected.length);
      
      if (this.settings.autoMask) {
        const criticalItems = detected.filter(d => d.level === 'critical');
        if (criticalItems.length > 0) this.maskInput(element, text, criticalItems);
      }
    } else {
      this.hideWarning();
      this.updateBadge(0);
    }
  }

  maskInput(element, text, items) {
    const maskedText = maskPrivacy(text, items, this.settings.maskType);
    if (element.isContentEditable) element.textContent = maskedText;
    else element.value = maskedText;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    this.showNotification(`Auto-masked ${items.length} privacy items / 已自动混淆 ${items.length} 处隐私信息`);
  }

  createWarningOverlay() {
    this.warningOverlay = document.createElement('div');
    this.warningOverlay.id = 'privacy-guard-warning';
    this.warningOverlay.innerHTML = `
      <div class="pg-header">
        <span class="pg-icon">🛡️</span>
        <span class="pg-title">Privacy Warning</span>
        <button class="pg-close">×</button>
      </div>
      <div class="pg-content"></div>
      <div class="pg-actions">
        <button class="pg-btn pg-btn-mask">Mask All</button>
        <button class="pg-btn pg-btn-ignore">Ignore</button>
      </div>
    `;
    this.warningOverlay.style.display = 'none';
    document.body.appendChild(this.warningOverlay);

    this.warningOverlay.querySelector('.pg-close').onclick = () => this.hideWarning();
  }

  showWarning(detected, inputElement) {
    if (!this.settings.showWarnings) return;

    const content = this.warningOverlay.querySelector('.pg-content');
    const grouped = this.groupByLevel(detected);

    content.innerHTML = Object.entries(grouped).map(([level, items]) => {
      const info = PRIVACY_LEVELS[level.toUpperCase()];
      return `
        <div class="pg-level pg-level-${level}">
          <div class="pg-level-header">
            <span>${info.icon} ${info.name}</span>
            <span class="pg-count">${items.length}</span>
          </div>
          <div class="pg-items">
            ${items.map(item => `<div class="pg-item"><strong>${item.type}:</strong> <code>${this.escapeHtml(item.text.substring(0, 30))}${item.text.length > 30 ? '...' : ''}</code></div>`).join('')}
          </div>
        </div>
      `;
    }).join('');

    if (inputElement) {
      const rect = inputElement.getBoundingClientRect();
      this.warningOverlay.style.top = `${rect.bottom + window.scrollY + 10}px`;
      this.warningOverlay.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - 420)}px`;
    }

    this.warningOverlay.style.display = 'block';
    
    this.warningOverlay.querySelector('.pg-btn-mask').onclick = () => {
      const text = inputElement.value || inputElement.textContent || '';
      this.maskInput(inputElement, text, detected);
      this.hideWarning();
    };
    
    this.warningOverlay.querySelector('.pg-btn-ignore').onclick = () => this.hideWarning();
  }

  hideWarning() {
    if (this.warningOverlay) this.warningOverlay.style.display = 'none';
  }

  updateBadge(count) {
    chrome.runtime.sendMessage({ type: 'UPDATE_BADGE', count }).catch(() => {});
  }

  showNotification(message) {
    chrome.runtime.sendMessage({ type: 'SHOW_NOTIFICATION', message }).catch(() => {});
  }

  groupByLevel(detected) {
    return detected.reduce((acc, item) => {
      if (!acc[item.level]) acc[item.level] = [];
      acc[item.level].push(item);
      return acc;
    }, {});
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

new PrivacyGuard();
