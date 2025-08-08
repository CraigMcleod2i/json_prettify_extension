// Create context menu item on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "viewPrettyJson",
    title: "View as Pretty JSON",
    contexts: ["selection"]
  });
});

// When user clicks the context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "viewPrettyJson" && info.selectionText) {
    try {
      const json = JSON.stringify(JSON.parse(info.selectionText)); // Validate it's JSON
      const encoded = encodeURIComponent(json);
      chrome.tabs.create({
        url: `viewer.html?data=${encoded}`
      });
    } catch (e) {
      chrome.tabs.create({
        url: `viewer.html?data=${encodeURIComponent(JSON.stringify({ error: "Invalid JSON selected." }))}`
      });
    }
  }
});

// Still allow action button to trigger with dummy data
chrome.action.onClicked.addListener(() => {
  const json = JSON.stringify({
    name: "ChatGPT",
    status: "online",
    count: 123,
    active: true,
    nested: { key: "value", arr: [1, 2, 3] }
  });

  const encoded = encodeURIComponent(json);
  chrome.tabs.create({
    url: `viewer.html?data=${encoded}`
  });
});
