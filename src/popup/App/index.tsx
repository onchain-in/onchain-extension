import React from 'react'
import { CommentButton, Container, Description, Title } from './styles';

const App = () => {
  const domain = "http://localhost:8081"

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
