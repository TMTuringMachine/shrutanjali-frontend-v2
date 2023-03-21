import { Drawer } from "@mui/material";
import React, { FunctionComponent } from "react";

//styles
import { WishlistDrawerContainer } from "./WishlistDrawer.styles";

interface Props {
  state: boolean;
  toggleDrawer: Function;
}

const WishlistDrawer: FunctionComponent<Props> = ({ state, toggleDrawer }) => {
  return (
    <Drawer
      anchor="bottom"
      open={state}
      onClose={() => {
        toggleDrawer();
      }}
    >
      <WishlistDrawerContainer>hehe</WishlistDrawerContainer>
    </Drawer>
  );
};

export default WishlistDrawer;
