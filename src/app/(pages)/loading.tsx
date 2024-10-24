import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <Icon path={mdiLoading} spin size={4} />
    </div>
  );
};

export default Loading;
