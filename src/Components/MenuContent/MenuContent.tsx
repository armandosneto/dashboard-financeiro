import type { MenuProps } from "antd";
import React from "react";
import { Menu } from "./style";
import Icon from "@mdi/react";
import { mdiViewDashboard } from "@mdi/js";
import { useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

interface Props {
  currentRoute: string;
}
const MenuContent: React.FC<Props> = ({ currentRoute }) => {
  const router = useRouter();

  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <Icon path={mdiViewDashboard} size={1} />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/${e.key}`);
  };

  return (
    <Menu
      selectedKeys={[currentRoute]}
      onClick={onClick}
      mode="inline"
      items={items}
    />
  );
};

export default MenuContent;
