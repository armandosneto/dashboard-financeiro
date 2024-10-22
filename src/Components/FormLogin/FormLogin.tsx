import { Form, FormInstance } from "antd";
import React from "react";
import {
  StyledButton,
  StyledForm,
  StyledInput,
  StyledPasswordInput,
} from "./style";

interface Props {
  form: FormInstance;
  onFinish?: (values: Contexts.AuthContext.LoginValues) => Promise<void>;
}
const FormLogin: React.FC<Props> = ({ form, onFinish }) => {
  return (
    <>
      <StyledForm form={form} onFinish={onFinish as (values: unknown) => void}>
        <Form.Item name="username">
          <StyledInput type="text" placeholder="Usuário" />
        </Form.Item>
        <Form.Item name="password">
          <StyledPasswordInput placeholder="Senha" />
        </Form.Item>
      </StyledForm>
      <StyledButton type="primary" onClick={form.submit}>
        Login
      </StyledButton>
    </>
  );
};

export default FormLogin;
