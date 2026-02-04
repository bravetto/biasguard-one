/**
 * ∞ BiasGuard Chrome - Popup Script ∞
 * 
 * User interface for controlling the extension.
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

let isEnabled = true;

// Load current state
chrome.storage.sync.get(['enabled'], (result) => {
  isEnabled = result.enabled !== false;
  updateUI();
});

// Load stats
function loadStats(): void {
  chrome.runtime.sendMessage({ type: 'get_stats' }, (response) => {
    if (response && response.stats) {
      const stats = response.stats;
      
      document.getElementById('totalScans')!.textContent = stats.totalScans.toString();
      document.getElementById('totalDetections')!.textContent = stats.totalDetections.toString();
      
      document.getElementById('critical')!.textContent = stats.severityCounts.CRITICAL.toString();
      document.getElementById('high')!.textContent = stats.severityCounts.HIGH.toString();
      document.getElementById('medium')!.textContent = stats.severityCounts.MEDIUM.toString();
      document.getElementById('low')!.textContent = stats.severityCounts.LOW.toString();
    }
  });
}

// Update UI based on state
function updateUI(): void {
  const status = document.getElementById('status')!;
  const toggle = document.getElementById('toggle')!;
  
  if (isEnabled) {
    status.classList.remove('disabled');
    status.querySelector('.text')!.textContent = 'Active';
    toggle.querySelector('.btn-icon')!.textContent = '⏸️';
    toggle.querySelector('.btn-text')!.textContent = 'Pause Protection';
  } else {
    status.classList.add('disabled');
    status.querySelector('.text')!.textContent = 'Paused';
    toggle.querySelector('.btn-icon')!.textContent = '▶️';
    toggle.querySelector('.btn-text')!.textContent = 'Resume Protection';
  }
}

// Toggle protection
document.getElementById('toggle')!.addEventListener('click', () => {
  isEnabled = !isEnabled;
  
  chrome.storage.sync.set({ enabled: isEnabled });
  
  // Notify content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'toggle',
        enabled: isEnabled
      });
    }
  });
  
  updateUI();
});

// Scan current page
document.getElementById('scanNow')!.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { type: 'scan_now' });
      
      // Visual feedback
      const btn = document.getElementById('scanNow')!;
      btn.classList.add('scanning');
      setTimeout(() => btn.classList.remove('scanning'), 1000);
    }
  });
});

// About button
document.getElementById('about')!.addEventListener('click', (e) => {
  e.preventDefault();
  alert(`∞ BiasGuard Chrome ∞

Version: 1.0.0

Real-time bias detection for the web.
For the 98.6% who aren't coders.

2016: Post-truth crystallized.
2026: The antidote flows.

BiasGuard is not an authority.
It is a mirror.

∞ LOVE = LIFE = ONE ∞`);
});

// Settings button
document.getElementById('settings')!.addEventListener('click', (e) => {
  e.preventDefault();
  // TODO: Open settings page
  alert('Settings coming in next version');
});

// Load stats on popup open
loadStats();

// Refresh stats every 2 seconds
setInterval(loadStats, 2000);
