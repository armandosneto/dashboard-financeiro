import styled from "styled-components";
import { Menu as MenuAntd } from "antd";

export const Menu = styled(MenuAntd)`
  overflow: auto;
  overflow-x: hidden;
  flex: 1;
  border-right: 0;

  .ant-menu-item {
    padding: 2px 4px !important;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
