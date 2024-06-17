import styled from 'styled-components';
import { EColor } from '@styles/color';
import { Title4_2, Title5, Title6, body3, body4 } from '@styles/font';

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 16px;
  margin: 8px 0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AuthorName = styled.span`
  ${Title4_2};
  color: ${EColor.COLOR_SUB};
  display: block;
`;

export const PublicKey = styled.div`
  ${body4};
  color: ${EColor.TEXT_300};
`;

export const Content = styled.p`
  font-size: 14px;
  color: ${EColor.TEXT_200};
  padding: 12px 8px;
`;
export const BottomeView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

export const VoteCount = styled.div`
  ${Title6};
  color: ${EColor.YELLOW};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export const Timestamp = styled.div`
  ${body4};
  color: ${EColor.TEXT_200};
  font-size: 12px;
`;
