import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement("div");
root.className = "container";

let selectedElement:Element | null = null ;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "URL_SELECTOR") {
    selectedElement = document.querySelector(message.urlSelector);
  }
});

const observer = new MutationObserver((mutations, obs) => {
  const hostname = window.location.hostname;
  if (selectedElement && selectedElement.parentNode) {
      selectedElement.parentNode.insertBefore(root, selectedElement.nextSibling);
      const rootDiv = ReactDOM.createRoot(root);
      rootDiv.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      obs.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});