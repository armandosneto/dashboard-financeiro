import { Button, Form, Input } from "antd";
import styled from "styled-components";

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const StyledInput = styled(Input)`
  border-radius: 50px;
  padding: 10px;
  width: 100%;
`;

export const StyledPasswordInput = styled(Input.Password)`
  border-radius: 50px;
  padding: 10px;
  width: 100%;
`;

export const StyledButton = styled(Button)`
  border-radius: 50px;
  padding: 10px;
  height: 44px;
`;
