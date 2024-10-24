import styled from "styled-components";
import { Layout as LayoutAntd, Button as ButtonAntd } from "antd";

export const Layout = styled(LayoutAntd)<{ $siderLayout?: boolean }>`
  min-height: 100vh;

  ${(props) =>
    props.$siderLayout
      ? `
        background-color: #fff;
        position: absolute;
        top: 0;

        .ant-layout-sider {
            background-color: #fff;
            box-shadow: 0px 0px 26px -18px #000;

            @media (max-width: 1260px) {
              height: 100%;
              position: fixed;
              z-index: 10;
              left: 0;
              overflow: auto;
              overflow-x: hidden;
              transition: all 0.2s linear;
            }
        }

  `
      : ""}
`;

export const Sider = styled(LayoutAntd.Sider)<{ $mobileActive?: boolean }>`
  height: 100%;
  position: fixed;
  z-index: 3;
  left: 0;
  overflow: auto;
  overflowx: hidden;
  padding: ${(props) => (props.collapsed ? "0px" : "12px")};
  background-color: #fff;
  box-shadow: 0px 0px 26px -18px #000;
  transition: all 0.2s linear;
  width: ${(props) => (props.$mobileActive ? "75vw !important" : "")};
  max-width: ${(props) => (props.$mobileActive ? "75vw !important" : "")};

  & > .ant-layout-sider-children {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
`;

export const Header = styled(LayoutAntd.Header)`
  display: flex;
  flex-direction: row;
  position: fixed;
  width: 100%;
  z-index: 2;
  padding: 0px;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 7px 11px -14px #000000;
`;

export const ToggleButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
`;

export const Content = styled(LayoutAntd.Content)`
  height: fit-content;
  background-color: #fff;
  padding: 12px;
  margin: 80px 12px 12px 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.03);
  border-radius: 4px;
`;

export const Button = styled(ButtonAntd)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  width: 100%;
  // height: 100%;
`;

export const CloseWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
