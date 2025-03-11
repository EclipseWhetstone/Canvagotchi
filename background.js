const SUBMISSION_URL_PATTERNS = [
  '*://*/*submit*',
  '*://*/*assignment*',
  '*://*/*upload*'
];

chrome.webRequest.onCompleted.addListener(
  (details) => {
    chrome.storage.local.get(['submissions'], (result) => {
      const count = (result.submissions || 0) + 1;
      chrome.storage.local.set({ submissions: count });
      
      // Send message to content script
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'submission', count});
      });
    });
  },
  {urls: SUBMISSION_URL_PATTERNS},
  ['responseHeaders']
);