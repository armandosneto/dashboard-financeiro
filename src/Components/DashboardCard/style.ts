import { Typography, List as ListAntd } from "antd";
import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
  background-color: white;
  border-radius: 8px;
  background-color: #fbfbfb;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Text = styled(Typography.Text)`
  font-size: 36px;

  @media (max-width: 1260px) {
    font-size: 24px;
  }
`;

export const List = styled(ListAntd)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  height: 120px;
  overflow: auto;
`;
