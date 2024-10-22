"use client";
import styled from "styled-components";

export const MainContent = styled.main`
  display: flex;
  align-items: center;
  height: 100dvh;
  width: 100%;
  @media (max-width: 1260px) {
    flex-direction: column;
  }
`;

export const ImageBg = styled.div`
  position: relative;
  flex: 0.7;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  background-color: #000000aa;
  @media (max-width: 1260px) {
    flex: 0.3;
  }
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  flex: 0.3;
  width: 100%;
  @media (max-width: 1260px) {
    flex: 0.7;
  }
`;

export const LoginCard = styled.div`
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

export const Footer = styled.footer`
  text-align: center;
  font-size: 1rem;
  position: absolute;
  bottom: 20px;
  margin-top: 20px;
`;
