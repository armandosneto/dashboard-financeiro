"use client";
import React, { useState } from "react";
import {
  Button,
  CloseWrapper,
  Content,
  Header,
  Layout,
  Sider,
  ToggleButtonWrapper,
} from "./style";
import useCollapsed from "@/Hooks/useCollaped";
import Icon from "@mdi/react";
import { mdiClose, mdiLogout, mdiMenu } from "@mdi/js";
import Logo from "../Logo";
import { usePathname } from "next/navigation";
import MenuContent from "../MenuContent";
import { Button as ButtonAntd, Divider } from "antd";
import { useAuthContext } from "@/Contexts/AuthContext";
import { useAppContext } from "@/Contexts/AppContext";

interface Props {
  children: React.ReactNode;
}
const PageContainer: React.FC<Props> = ({ children }) => {
  const OPEN_WIDTH = 250;
  const COLLAPSE_ANIMATION = "all 0.2s linear";
  const { collapsed: mobile } = useAppContext();
  const [opened, setOpened] = useState(!mobile);
  const { logout } = useAuthContext();
  const pathname = usePathname();
  const currentRoute = pathname.split("/")[1];

  const toggle = () => {
    setOpened((old) => !old);
  };

  return (
    <Layout>
      <Layout $siderLayout>
        <Sider
          collapsed={!opened}
          $mobileActive={mobile && opened}
          collapsedWidth={0}
          width={OPEN_WIDTH}
        >
          <span>
            {mobile && (
              <CloseWrapper>
                <ButtonAntd
                  onClick={toggle}
                  size="large"
                  icon={<Icon path={mdiClose} size={1} />}
                  type="link"
                  style={{ color: "#000" }}
                />
              </CloseWrapper>
            )}
            <Logo />
            <MenuContent currentRoute={currentRoute} />
          </span>
          <span>
            <Divider />
            <Button
              danger
              type="link"
              icon={<Icon path={mdiLogout} size={1} />}
              onClick={async () => await logout()}
            >
              Logout
            </Button>
          </span>
        </Sider>
      </Layout>
      <Header>
        {mobile && (
          <ToggleButtonWrapper>
            <Button
              className="toggle-menu"
              type="link"
              onClick={toggle}
              icon={<Icon path={mdiMenu} size={"2em"} />}
            />
          </ToggleButtonWrapper>
        )}
      </Header>
      <Content
        style={{
          transition: COLLAPSE_ANIMATION,
          marginLeft: mobile ? 12 : OPEN_WIDTH + 12,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default PageContainer;
