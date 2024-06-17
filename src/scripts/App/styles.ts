import { EColor } from "@styles/color";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 256px;
  margin: 12px, 0;
  padding: 24px;
  background: linear-gradient(145deg, ${EColor.COLOR_PRIMARY}, ${EColor.COLOR_SUB});
  border-radius: 24px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: ${EColor.TEXT_200};
  gap: 16px;
  border: none;
`;
