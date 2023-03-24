import React, { FunctionComponent } from "react";

//libs
import { Box, Drawer, Grid, Typography } from "@mui/material";

//styles
import {
  WishlistDrawerContainer,
  StyledWishlistDrawer,
} from "./WishlistDrawer.styles";
import { songs } from "../../../helpers/data";
import SongPreview from "../SongPreview/SongPreview.component";

interface Props {
  state: boolean;
  toggleDrawer: Function;
}

const WishlistDrawer: FunctionComponent<Props> = ({ state, toggleDrawer }) => {
  return (
    <StyledWishlistDrawer
      anchor="bottom"
      open={state}
      onClose={() => {
        toggleDrawer();
      }}
    >
      <WishlistDrawerContainer>
        <Typography className="modalHeader">YOUR WISHLIST</Typography>

        <Grid container spacing={3}>
          {songs.slice(0,8).map((song) => (
            <Grid item md={6}>
              <SongPreview song={song} />
            </Grid>
          ))}
        </Grid>
      </WishlistDrawerContainer>
    </StyledWishlistDrawer>
  );
};

export default WishlistDrawer;
