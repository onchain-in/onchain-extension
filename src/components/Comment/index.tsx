import React from 'react';
import { AuthorName, BottomeView, CommentWrapper, Content, ProfileContainer, ProfileImage, PublicKey, Timestamp, VoteCount } from './styled';

type CommentProps = {
  author: string;
  content: string;
  vote: number;
  publicKey: string;
  timestamp: string;
};

const shortenPublicKey = (publicKey: string) => {
  if (publicKey.length > 10) {
    return `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`;
  }
  return publicKey;
};

const Comment = ({ author, content, vote, publicKey, timestamp }: CommentProps) => {
  return (
    <CommentWrapper>
      <ProfileContainer>
        <ProfileImage src={`https://avatar.iran.liara.run/username?username=${author}`} />
        <div>
          <AuthorName>{shortenPublicKey(author)}</AuthorName>
          <Timestamp>{timestamp}</Timestamp>
        </div>
      </ProfileContainer>
      <Content>{content}</Content>
      <BottomeView>
        <VoteCount>Upvote: {vote}</VoteCount>
        <PublicKey>{shortenPublicKey(publicKey)}</PublicKey>
      </BottomeView>
    </CommentWrapper>
  );
};

export default Comment;
