/**
 * ∞ BiasGuard Chrome - Content Script ∞
 * 
 * The mirror that runs on every web page.
 * For the 98.6% who aren't coders.
 * 
 * 2016: Post-truth crystallized
 * 2026: The antidote flows
 * 
 * ∞ LOVE = LIFE = ONE ∞
 */

import { one } from '@biasguard/one';

// =============================================================================
// THE OBSERVER - MutationObserver for real-time detection
// =============================================================================

interface BiasHighlight {
  element: HTMLElement;
  originalText: string;
  detected: string[];
  score: number;
}

const highlights: BiasHighlight[] = [];
let observerActive = false;

/**
 * Initialize the bias detection observer
 */
function initObserver(): void {
  // Only run if enabled
  chrome.storage.sync.get(['enabled'], (result) => {
    if (result.enabled === false) return;
    
    observerActive = true;
    scanPage();
    watchForChanges();
  });
}

/**
 * Scan all text content on the page
 */
function scanPage(): void {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        // Skip scripts, styles, and small text
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        
        const tag = node.parentElement.tagName.toLowerCase();
        if (['script', 'style', 'noscript'].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }
        
        const text = node.textContent?.trim() || '';
        return text.length > 20 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );
  
  const textNodes: Node[] = [];
  let node: Node | null;
  
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }
  
  // Scan in batches to avoid blocking
  batchScan(textNodes, 0);
}

/**
 * Batch scan text nodes
 */
function batchScan(nodes: Node[], index: number): void {
  const BATCH_SIZE = 10;
  const end = Math.min(index + BATCH_SIZE, nodes.length);
  
  for (let i = index; i < end; i++) {
    const node = nodes[i];
    const text = node.textContent?.trim() || '';
    
    if (text.length < 20) continue;
    
    // Run through ONE
    const result = one(text, 'chrome');
    
    if (!result.clear && result.reflections.length > 0) {
      highlightBias(node.parentElement!, result);
    }
  }
  
  // Continue scanning
  if (end < nodes.length) {
    setTimeout(() => batchScan(nodes, end), 100);
  }
}

/**
 * Highlight detected bias in the DOM
 */
function highlightBias(element: HTMLElement, result: any): void {
  const detected = result.reflections.map((r: any) => r.reflects);
  const score = result.score?.score || 0;
  
  // Add highlight class
  element.classList.add('biasguard-detected');
  element.setAttribute('data-biasguard-score', score.toString());
  element.setAttribute('data-biasguard-patterns', detected.join(' | '));
  
  // Store for reporting
  highlights.push({
    element,
    originalText: element.textContent || '',
    detected,
    score
  });
  
  // Add click handler to show details
  element.addEventListener('click', (e) => {
    e.preventDefault();
    showDetails(element, result);
  });
}

/**
 * Show details sidebar when user clicks highlighted text
 */
function showDetails(element: HTMLElement, result: any): void {
  // Remove existing sidebar
  const existing = document.getElementById('biasguard-sidebar');
  if (existing) existing.remove();
  
  // Create sidebar
  const sidebar = document.createElement('div');
  sidebar.id = 'biasguard-sidebar';
  sidebar.className = 'biasguard-sidebar';
  
  sidebar.innerHTML = `
    <div class="biasguard-header">
      <div class="biasguard-logo">🛡️ BiasGuard</div>
      <button class="biasguard-close">×</button>
    </div>
    
    <div class="biasguard-content">
      <div class="biasguard-score ${getSeverityClass(result.score?.severity)}">
        Score: ${result.score?.score || 0}/100
        <span class="biasguard-severity">${result.score?.severity || 'LOW'}</span>
      </div>
      
      <div class="biasguard-section">
        <h3>What Was Detected</h3>
        <ul>
          ${result.reflections.map((r: any) => `
            <li><strong>${r.mirror}:</strong> ${r.reflects}</li>
          `).join('')}
        </ul>
      </div>
      
      ${result.score?.message ? `
        <div class="biasguard-section">
          <h3>Why It Matters</h3>
          <p>${result.score.message}</p>
        </div>
      ` : ''}
      
      <div class="biasguard-footer">
        <p>BiasGuard is not an authority. It is a mirror.</p>
        <p>Everything it sees, you can inspect.</p>
      </div>
    </div>
  `;
  
  // Add close handler
  sidebar.querySelector('.biasguard-close')?.addEventListener('click', () => {
    sidebar.remove();
  });
  
  document.body.appendChild(sidebar);
  
  // Animate in
  setTimeout(() => sidebar.classList.add('biasguard-visible'), 10);
}

/**
 * Get CSS class for severity level
 */
function getSeverityClass(severity?: string): string {
  switch (severity) {
    case 'CRITICAL': return 'biasguard-critical';
    case 'HIGH': return 'biasguard-high';
    case 'MEDIUM': return 'biasguard-medium';
    default: return 'biasguard-low';
  }
}

/**
 * Watch for DOM changes
 */
function watchForChanges(): void {
  const observer = new MutationObserver((mutations) => {
    if (!observerActive) return;
    
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const text = element.textContent?.trim() || '';
            
            if (text.length > 20) {
              const result = one(text, 'chrome');
              if (!result.clear) {
                highlightBias(element, result);
              }
            }
          }
        });
      }
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Wait for page to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initObserver);
} else {
  initObserver();
}

// Listen for enable/disable from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'toggle') {
    observerActive = message.enabled;
    
    if (!observerActive) {
      // Remove all highlights
      document.querySelectorAll('.biasguard-detected').forEach((el) => {
        el.classList.remove('biasguard-detected');
        el.removeAttribute('data-biasguard-score');
        el.removeAttribute('data-biasguard-patterns');
      });
      
      // Remove sidebar
      document.getElementById('biasguard-sidebar')?.remove();
    } else {
      scanPage();
    }
    
    sendResponse({ success: true });
  }
  
  return true;
});
