// biasguard chrome extension — popup logic

document.addEventListener("DOMContentLoaded", function() {
  const scan_btn = document.getElementById("scanNow");
  const toggle_btn = document.getElementById("toggle");
  const total_scans = document.getElementById("totalScans");
  const total_detections = document.getElementById("totalDetections");

  // load stats from storage
  chrome.storage.local.get(["scans", "detections", "active"], function(data) {
    total_scans.textContent = data.scans || 0;
    total_detections.textContent = data.detections || 0;
    if (data.active === false) {
      toggle_btn.querySelector(".btn-text").textContent = "Resume Protection";
      document.getElementById("status").querySelector(".text").textContent = "Paused";
    }
  });

  // scan current page
  scan_btn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "scan_page" });
        // increment scan count
        chrome.storage.local.get(["scans"], function(data) {
          chrome.storage.local.set({ scans: (data.scans || 0) + 1 });
          total_scans.textContent = (data.scans || 0) + 1;
        });
      }
    });
    window.close();
  });

  // toggle
  toggle_btn.addEventListener("click", function() {
    chrome.storage.local.get(["active"], function(data) {
      const now_active = data.active !== false;
      chrome.storage.local.set({ active: !now_active });
      if (now_active) {
        toggle_btn.querySelector(".btn-text").textContent = "Resume Protection";
        document.getElementById("status").querySelector(".text").textContent = "Paused";
      } else {
        toggle_btn.querySelector(".btn-text").textContent = "Pause Protection";
        document.getElementById("status").querySelector(".text").textContent = "Active";
      }
    });
  });
});
