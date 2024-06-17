const domData: { [key: string]: string } = {
  'n.news.naver.com': '.newsct_body',
  'edition.cnn.com': '.article__content-container',
  'default': 'div#main',
};

const titleData: { [key: string]: string } = {
  'n.news.naver.com': '#title_area',
  'edition.cnn.com': '#maincontent',
  'default': 'div#main',
};

const contentData: { [key: string]: string } = {
  'n.news.naver.com': '#dic_area span',
  'edition.cnn.com': '.article__content p',
  'default': 'div#main',
};

let popupConnect = null;
let domain: any = null;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    const url = new URL(tab.url);
    domain = url.hostname;

    const urlSelector = domData[domain] || domData['default'];


    chrome.tabs.sendMessage(tabId, { type: "URL_SELECTOR", urlSelector: urlSelector });
  }
});

chrome.runtime.onConnect.addListener((connect) => {
  if (connect.name === "popup-background") {
    popupConnect = connect;

    const titleSelector = titleData[domain] || titleData['default'];
    const contentSelector = contentData[domain] || contentData['default'];
    console.log(titleSelector)
    console.log(contentSelector);

    connect.postMessage({ type: "TITLE_SELECTOR", titleSelector: titleSelector });
    connect.postMessage({ type: "CONTENT_SELECTOR", contentSelector: contentSelector });

    connect.onDisconnect.addListener(() => {
      popupConnect = null;
    });
  }
});