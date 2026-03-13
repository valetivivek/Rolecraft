chrome.runtime.onInstalled.addListener(() => {
  // Extension installed or updated
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'PING') {
    sendResponse({ status: 'ok' });
  } else if (message.type === 'TRIGGER_FILL') {
    // TODO: wire up AI fill flow
    sendResponse({ ok: true });
  }
  return true;
});
