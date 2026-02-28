/**
 * 隐私信息检测引擎
 * 支持分级检测和混淆
 */

const PRIVACY_LEVELS = {
  CRITICAL: {
    level: 'critical',
    name: '高危',
    icon: '🔴',
    autoBlock: true,
    color: '#ff3b30'
  },
  HIGH: {
    level: 'high',
    name: '中危',
    icon: '🟠',
    autoBlock: false,
    color: '#ff9500'
  },
  MEDIUM: {
    level: 'medium',
    name: '低危',
    icon: '🟡',
    autoBlock: false,
    color: '#ffcc00'
  }
};

const PRIVACY_PATTERNS = {
  // 🔴 高危 - 自动拦截
  critical: [
    {
      name: 'API密钥',
      patterns: [
        /(?:api[_-]?key|apikey|api[_-]?secret)['":\s]*['"]?([a-zA-Z0-9_-]{20,})['"]?/gi,
        /sk-[a-zA-Z0-9]{32,}/gi,
        /AIza[a-zA-Z0-9_-]{35}/g,
        /ghp_[a-zA-Z0-9]{36}/g,
        /xox[baprs]-[a-zA-Z0-9-]{10,}/g,
      ],
      example: 'sk-xxxxxxxxxxxxx',
      maskType: 'asterisk'
    },
    {
      name: '密码',
      patterns: [
        /(?:password|passwd|pwd)['":\s]*['"]?([^\s'"]{6,})['"]?/gi,
      ],
      example: 'password123',
      maskType: 'asterisk'
    },
    {
      name: '私钥',
      patterns: [
        /-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/gi,
        /-----BEGIN PGP PRIVATE KEY BLOCK-----/gi,
      ],
      example: '-----BEGIN PRIVATE KEY-----',
      maskType: 'placeholder'
    },
    {
      name: '访问令牌',
      patterns: [
        /(?:access[_-]?token|auth[_-]?token|bearer)['":\s]*['"]?([a-zA-Z0-9_.-]{20,})['"]?/gi,
        /Bearer\s+[a-zA-Z0-9_.-]{20,}/gi,
      ],
      example: 'Bearer xxxxx',
      maskType: 'asterisk'
    }
  ],

  // 🟠 中危 - 强预警
  high: [
    {
      name: '身份证号',
      patterns: [
        /\b[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]\b/g,
      ],
      example: '110101199001011234',
      maskType: 'partial'
    },
    {
      name: '银行卡号',
      patterns: [
        /\b(?:62|4|5)\d{14,17}\b/g,
      ],
      example: '6225880123456789',
      maskType: 'partial'
    },
    {
      name: '护照号',
      patterns: [
        /\b[EG][0-9]{8}\b/gi,
        /\b1[45][0-9]{7}\b/g,
      ],
      example: 'E12345678',
      maskType: 'partial'
    },
    {
      name: '统一社会信用代码',
      patterns: [
        /\b[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}\b/g,
      ],
      example: '91110000000000000X',
      maskType: 'partial'
    }
  ],

  // 🟡 低危 - 提示预警
  medium: [
    {
      name: '手机号',
      patterns: [
        /\b1[3-9]\d{9}\b/g,
      ],
      example: '13800138000',
      maskType: 'partial'
    },
    {
      name: '邮箱',
      patterns: [
        /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      ],
      example: 'user@example.com',
      maskType: 'partial'
    },
    {
      name: 'IP地址',
      patterns: [
        /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
      ],
      example: '192.168.1.1',
      maskType: 'partial'
    },
    {
      name: '地址信息',
      patterns: [
        /(?:省|市|区|县|路|街道|号|室|楼|栋|单元).*?(?:省|市|区|县|路|街道|号|室|楼|栋|单元)/g,
      ],
      example: '北京市朝阳区xxx街道xxx号',
      maskType: 'placeholder'
    }
  ]
};

/**
 * 检测文本中的隐私信息
 */
function detectPrivacy(text, options = {}) {
  const results = [];
  const { enabledLevels = ['critical', 'high', 'medium'] } = options;

  Object.keys(PRIVACY_PATTERNS).forEach(level => {
    if (!enabledLevels.includes(level)) return;

    const patterns = PRIVACY_PATTERNS[level];
    patterns.forEach(pattern => {
      pattern.patterns.forEach(regex => {
        let match;
        const globalRegex = new RegExp(regex.source, regex.flags);
        
        while ((match = globalRegex.exec(text)) !== null) {
          const matchedText = match[0];
          
          if (!results.some(r => r.text === matchedText && r.start === match.index)) {
            results.push({
              level: level,
              levelInfo: PRIVACY_LEVELS[level.toUpperCase()],
              type: pattern.name,
              text: matchedText,
              start: match.index,
              end: match.index + matchedText.length,
              maskType: pattern.maskType,
              example: pattern.example
            });
          }
        }
      });
    });
  });

  return results;
}

/**
 * 混淆隐私信息
 */
function maskPrivacy(text, detected, maskType = 'auto') {
  let result = text;
  const sorted = [...detected].sort((a, b) => b.start - a.start);

  sorted.forEach(item => {
    const type = maskType === 'auto' ? item.maskType : maskType;
    let replacement;

    switch (type) {
      case 'asterisk':
        replacement = '*'.repeat(Math.min(item.text.length, 20));
        break;
      case 'partial':
        replacement = maskPartial(item.text);
        break;
      case 'placeholder':
        replacement = `[${item.type}已隐藏]`;
        break;
      case 'fake':
        replacement = generateFake(item.type, item.text);
        break;
      default:
        replacement = '[已保护]';
    }

    result = result.substring(0, item.start) + replacement + result.substring(item.end);
  });

  return result;
}

/**
 * 部分隐藏
 */
function maskPartial(text) {
  if (text.length <= 4) return '****';
  const visible = Math.ceil(text.length / 4);
  return text.substring(0, visible) + '*'.repeat(text.length - visible * 2) + text.substring(text.length - visible);
}

/**
 * 生成假数据
 */
function generateFake(type, original) {
  const fakes = {
    '手机号': () => `1${['3', '5', '7', '8', '9'][Math.floor(Math.random() * 5)]}${Math.random().toString().substring(2, 11)}`,
    '身份证号': () => {
      const area = ['110101', '310101', '440101'][Math.floor(Math.random() * 3)];
      const year = 1970 + Math.floor(Math.random() * 40);
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
      const seq = String(Math.floor(Math.random() * 999)).padStart(3, '0');
      return `${area}${year}${month}${day}${seq}X`;
    },
    '邮箱': () => `user${Math.floor(Math.random() * 10000)}@example.com`,
    'IP地址': () => `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  };
  
  const generator = fakes[type];
  return generator ? generator() : '[已保护]';
}
