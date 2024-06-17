import { EColor } from "@styles/color";
import { Title2, body2 } from "@styles/font";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  padding: 24px;
  background: linear-gradient(145deg, ${EColor.COLOR_PRIMARY}, ${EColor.COLOR_SUB});
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  gap: 16px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${EColor.TEXT_200};
  margin-bottom: 8px;
  ${Title2}
`;

export const Description = styled.div`
  font-size: 16px;
  color: ${EColor.TEXT_300};
  text-align: center;
  max-width: 80%;
  ${body2}
`;

export const CommentButton = styled.button`
  background-color: ${EColor.COLOR_PRIMARY};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: ${EColor.COLOR_SUB};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
