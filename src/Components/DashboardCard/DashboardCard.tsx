import React from "react";
import { Card, Text, List } from "./style";
import { Space, Typography } from "antd";

interface Props {
  title: string;
  content: string | number | React.ReactNode;
  data?: string[];
  icon?: React.ReactNode;
  extra?: React.ReactNode;
}
const DashboardCard: React.FC<Props> = ({
  title,
  content,
  icon,
  extra,
  data,
}) => {
  return (
    <Card>
      <Space>
        {icon}
        {
          <Typography.Title level={5} type="secondary">
            {title}
          </Typography.Title>
        }
      </Space>
      {typeof content === "string" || typeof content === "number" ? (
        <Text>{content}</Text>
      ) : (
        content
      )}
      {/* faça uma ul com os valores de data */}
      {data && (
        <List>
          {data.map((item) => (
            <List.Item key={item}>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          ))}
        </List>
      )}
      <div className="extra">{extra}</div>
    </Card>
  );
};

export default DashboardCard;
