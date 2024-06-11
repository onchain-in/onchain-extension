import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement("div");
root.className = "container";

const referenceElement = document.getElementById('contents');

if (referenceElement && referenceElement.parentNode) {
  referenceElement.parentNode.insertBefore(root, referenceElement.nextSibling);

  const rootDiv = ReactDOM.createRoot(root);
  rootDiv.render(<App />);
} else {
  console.error('The reference element or its parent was not found.');
}