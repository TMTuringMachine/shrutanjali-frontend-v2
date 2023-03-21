import React, { FunctionComponent } from "react";

//libs
import { Icon } from "@iconify/react";

//styled
import { HeaderContainer } from "./header.styles";

interface Props {}

const Header: FunctionComponent<Props> = () => {
  return (
    <HeaderContainer>
      <Icon icon="material-symbols:keyboard-double-arrow-left" width="40px" height="40px"  />
    </HeaderContainer>
  );
};

export default Header;
