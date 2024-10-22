import React from "react";
import Image from "next/image";
import { LogoWrapper } from "./style";

interface Props {
  size?: string;
}
const Logo: React.FC<Props> = () => {
  return (
    <LogoWrapper>
      <Image
        src={"/bix_logo.png"}
        alt="bix logo"
        style={{ objectFit: "contain" }}
        fill
      />
    </LogoWrapper>
  );
};

export default Logo;
