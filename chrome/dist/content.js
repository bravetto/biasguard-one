// biasguard chrome extension — content script
// injects floating shield button + overlay on every page

(function() {
  "use strict";
  if (document.getElementById("biasguard-root")) return;

  // ═══ inject styles ═══
  const style = document.createElement("style");
  style.textContent = `
    #biasguard-root {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    #biasguard-btn {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #1a1a2e;
      border: 2px solid #9D4EDD;
      box-shadow: 0 0 16px rgba(157,78,221,0.3), 0 4px 12px rgba(0,0,0,0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.3s;
      color: #9D4EDD;
    }
    #biasguard-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 0 24px rgba(157,78,221,0.5), 0 4px 16px rgba(0,0,0,0.5);
    }
    #biasguard-btn.scanning {
      animation: bg-pulse 1.2s ease-in-out infinite;
      border-color: #c45c4a;
      color: #c45c4a;
    }
    @keyframes bg-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }
    #biasguard-overlay {
      display: none;
      position: fixed;
      top: 20px;
      right: 20px;
      width: 380px;
      max-height: 80vh;
      background: #0d0f09;
      border: 1px solid #1c221a;
      border-radius: 10px;
      box-shadow: 0 0 30px rgba(157,78,221,0.15), 0 8px 32px rgba(0,0,0,0.6);
      overflow-y: auto;
      z-index: 2147483647;
      color: #e8e6df;
      font-size: 14px;
      line-height: 1.6;
    }
    #biasguard-overlay.open { display: block; animation: bg-slide 0.3s ease; }
    @keyframes bg-slide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
    .bg-header {
      padding: 16px 20px;
      border-bottom: 1px solid #1c221a;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .bg-title {
      font-weight: 600;
      font-size: 15px;
      color: #9D4EDD;
      text-shadow: 0 0 12px rgba(157,78,221,0.25);
    }
    .bg-close {
      background: none;
      border: none;
      color: #8a8a7c;
      font-size: 18px;
      cursor: pointer;
      padding: 4px 8px;
    }
    .bg-close:hover { color: #e8e6df; }
    .bg-body { padding: 16px 20px; }
    .bg-score {
      text-align: center;
      padding: 16px;
      margin-bottom: 12px;
    }
    .bg-score-value {
      font-size: 36px;
      font-weight: 600;
    }
    .bg-score-value.clear { color: #7fb069; text-shadow: 0 0 12px rgba(127,176,105,0.3); }
    .bg-score-value.flagged { color: #d4a53c; text-shadow: 0 0 12px rgba(212,165,60,0.3); }
    .bg-score-value.critical { color: #c45c4a; text-shadow: 0 0 12px rgba(196,92,74,0.3); }
    .bg-score-label {
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #8a8a7c;
      margin-top: 4px;
    }
    .bg-reflection {
      background: #111410;
      border: 1px solid #1c221a;
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 8px;
    }
    .bg-reflection:hover { border-color: #d4a53c; }
    .bg-guard {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #d4a53c;
      margin-bottom: 4px;
    }
    .bg-evidence {
      font-size: 13px;
      color: #e8e6df;
      font-style: italic;
    }
    .bg-sev {
      display: inline-block;
      margin-top: 6px;
      padding: 2px 8px;
      border-radius: 8px;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .bg-sev-high { background: rgba(196,92,74,0.2); color: #c45c4a; }
    .bg-sev-medium { background: rgba(212,165,60,0.15); color: #d4a53c; }
    .bg-sev-low { background: rgba(127,176,105,0.15); color: #7fb069; }
    .bg-error {
      padding: 16px;
      color: #c45c4a;
      text-align: center;
    }
    .bg-glow-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, #9D4EDD, transparent);
      box-shadow: 0 0 8px rgba(157,78,221,0.25);
      opacity: 0.6;
      margin: 12px 0;
    }
  `;
  document.head.appendChild(style);

  // ═══ create root ═══
  const root = document.createElement("div");
  root.id = "biasguard-root";

  // shield button
  const btn = document.createElement("button");
  btn.id = "biasguard-btn";
  btn.innerHTML = "\u26CA";
  btn.title = "BiasGuard — scan this page";

  // overlay
  const overlay = document.createElement("div");
  overlay.id = "biasguard-overlay";

  root.appendChild(btn);
  root.appendChild(overlay);
  document.body.appendChild(root);

  // ═══ scan page ═══
  btn.addEventListener("click", function() {
    if (btn.classList.contains("scanning")) return;

    // get page text (visible text only, no scripts/styles)
    const sel = window.getSelection();
    let text;
    if (sel && sel.toString().trim().length > 10) {
      text = sel.toString().trim();
    } else {
      text = document.body.innerText.substring(0, 5000);
    }

    if (!text || text.length < 5) {
      show_error("No text found on this page.");
      return;
    }

    btn.classList.add("scanning");
    overlay.className = "open";
    overlay.innerHTML = '<div class="bg-header"><span class="bg-title">BiasGuard</span></div><div class="bg-body" style="text-align:center;color:#8a8a7c;">Scanning ' + text.length + ' characters...</div>';

    chrome.runtime.sendMessage({ type: "analyze", text: text }, function(response) {
      btn.classList.remove("scanning");
      if (!response || !response.ok) {
        show_error(response ? response.error : "No response from background. Is the bias API running on localhost:3078?");
        return;
      }
      render_results(response.data);
    });
  });

  function show_error(msg) {
    overlay.className = "open";
    overlay.innerHTML = '<div class="bg-header"><span class="bg-title">BiasGuard</span><button class="bg-close" id="bg-close-btn">\u2715</button></div><div class="bg-error">' + msg + '</div>';
    document.getElementById("bg-close-btn").addEventListener("click", function() { overlay.className = ""; });
  }

  function render_results(data) {
    let html = '<div class="bg-header"><span class="bg-title">BiasGuard</span><button class="bg-close" id="bg-close-btn">\u2715</button></div>';
    html += '<div class="bg-body">';

    // score
    const score_cls = data.clear ? "clear" : (data.score > 7 ? "critical" : "flagged");
    html += '<div class="bg-score">';
    html += '<div class="bg-score-value ' + score_cls + '">' + (data.clear ? "\u2713" : (data.score || "?")) + '</div>';
    html += '<div class="bg-score-label">' + (data.clear ? "all clear" : "patterns detected") + '</div>';
    html += '</div>';
    html += '<div class="bg-glow-line"></div>';

    // reflections
    if (data.reflections && data.reflections.length > 0) {
      data.reflections.forEach(function(r) {
        const sev = r.severity === "high" ? "high" : r.severity === "medium" ? "medium" : "low";
        html += '<div class="bg-reflection">';
        html += '<div class="bg-guard">' + (r.guard || r.type || "pattern") + '</div>';
        html += '<div class="bg-evidence">' + (r.reflection || r.message || r.text || "") + '</div>';
        html += '<span class="bg-sev bg-sev-' + sev + '">' + sev + '</span>';
        html += '</div>';
      });
    }

    // epistemic risks
    if (data.epistemic_risks && data.epistemic_risks.length > 0) {
      html += '<div class="bg-glow-line"></div>';
      data.epistemic_risks.forEach(function(r) {
        html += '<div class="bg-reflection">';
        html += '<div class="bg-guard">epistemic risk</div>';
        html += '<div class="bg-evidence">' + (r.risk || r.message || r) + '</div>';
        html += '</div>';
      });
    }

    html += '</div>';
    overlay.innerHTML = html;
    document.getElementById("bg-close-btn").addEventListener("click", function() { overlay.className = ""; });
  }

  // ═══ context menu (select text + right-click) ═══
  // handled by background.js if we add contextMenus permission later

})();
