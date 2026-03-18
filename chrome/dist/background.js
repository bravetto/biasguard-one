// biasguard chrome extension — service worker
// calls local bias api, returns results to content script

const API_URL = "http://localhost:3078/api/bias";

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
  if (msg.type !== "analyze") return false;
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: msg.text, surface: "chrome" })
  })
    .then(r => r.json())
    .then(data => reply({ ok: true, data }))
    .catch(err => reply({ ok: false, error: err.message }));
  return true; // async reply
});
