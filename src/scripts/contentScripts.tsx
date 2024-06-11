import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement("div");
root.className = "container";

const observer = new MutationObserver((mutations, obs) => {
  const referenceElement = document.getElementById('contents');
  if (referenceElement && referenceElement.parentNode) {
      referenceElement.parentNode.insertBefore(root, referenceElement.nextSibling);
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