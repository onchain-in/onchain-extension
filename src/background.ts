const urlData: { [key: string]: string } = {
  'n.news.naver.com': '.newsct_body',
  'edition.cnn.com': '.article__content-container',
  'default': 'div#main',
};

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    const url = new URL(tab.url);
    const domain = url.hostname;
    const selector = urlData[domain] || urlData['default'];

    chrome.tabs.sendMessage(tabId, { type: "URL_SELECTOR", selector: selector });
  }
});