/**
 * ∞ BiasGuard Chrome - Background Service Worker ∞
 * 
 * Coordinates between content scripts and popup.
 * Maintains state across page loads.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

interface BiasStats {
  totalScans: number;
  totalDetections: number;
  severityCounts: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
  lastScan: number;
}

// Initialize stats
const stats: BiasStats = {
  totalScans: 0,
  totalDetections: 0,
  severityCounts: {
    CRITICAL: 0,
    HIGH: 0,
    MEDIUM: 0,
    LOW: 0
  },
  lastScan: Date.now()
};

// Load saved stats
chrome.storage.local.get(['stats'], (result) => {
  if (result.stats) {
    Object.assign(stats, result.stats);
  }
});

// Listen for scan results from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'scan_result') {
    stats.totalScans++;
    
    if (message.detected) {
      stats.totalDetections++;
      
      const severity = message.severity || 'LOW';
      stats.severityCounts[severity as keyof typeof stats.severityCounts]++;
    }
    
    stats.lastScan = Date.now();
    
    // Save stats
    chrome.storage.local.set({ stats });
    
    // Update badge
    updateBadge();
    
    sendResponse({ success: true });
  }
  
  if (message.type === 'get_stats') {
    sendResponse({ stats });
  }
  
  return true;
});

/**
 * Update extension badge with detection count
 */
function updateBadge(): void {
  if (stats.totalDetections > 0) {
    chrome.action.setBadgeText({ 
      text: stats.totalDetections > 99 ? '99+' : stats.totalDetections.toString() 
    });
    chrome.action.setBadgeBackgroundColor({ color: '#ff4444' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  // Set default settings
  chrome.storage.sync.set({
    enabled: true,
    autoScan: true,
    showSidebar: true,
    minScore: 30
  });
  
  console.log('∞ BiasGuard Chrome Activated ∞');
  console.log('Real-time protection enabled. Every page monitored.');
});

// Update badge on startup
updateBadge();
