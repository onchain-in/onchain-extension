import React, { useEffect, useState } from 'react'
import { CommentButton, Container, Description, Title } from './styles';

const domain = "http://localhost:8081"
const App = () => {
  const [title, set_title] = useState('');
  const [content, set_content] = useState('');
  console.log(title, content);

  useEffect(() => {
    const connect = chrome.runtime.connect({ name: "popup-background" });
    connect.onMessage.addListener((message) => {
      if (message) {
        const titleElement = document.querySelector(message.titleSelector);
        const contentElement = document.querySelector(message.contentSelector);
        console.log(contentElement)
        set_title(titleElement.innerText);
        set_content(contentElement.innerText);
      }
    })
  }, [])

  const handleOpenCommentPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTabUrl = new URL(tabs[0].url);
      const encodedUrl = encodeURIComponent(currentTabUrl.hostname + currentTabUrl.pathname);
      chrome.tabs.create({ url: `${domain}/home?params=${encodedUrl}` });
    });
  }

  return (
    <Container>
      <Title>Leave Your Comment</Title>
      <Description>Click the button below to share your thoughts on the news.</Description>
      <CommentButton onClick={handleOpenCommentPage}>
        Write a Comment
      </CommentButton>
    </Container>
  )
}

export default App;
