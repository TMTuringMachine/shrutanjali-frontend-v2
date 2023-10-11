import React, { FunctionComponent, useEffect, useState } from "react";

//libs
import { Box, Drawer, Grid, Typography } from "@mui/material";

//styles
import {
  WishlistDrawerContainer,
  StyledWishlistDrawer,
} from "./WishlistDrawer.styles";
import { songs } from "../../../helpers/data";
import SongPreview from "../SongPreview/SongPreview.component";
import useWishlist from "../../../hooks/useWishlist";
import useMedia from "../../../hooks/useMedia";
interface Props {
  state: boolean;
  toggleDrawer: Function;
}

const WishlistDrawer: FunctionComponent<Props> = ({ state, toggleDrawer }) => {
  const { getWishlist } = useWishlist()
  const [wishlist, setWishlist] = useState([]);
  const { populateMedia } = useMedia();
  const populateWishlist = async () => {

    const list = getWishlist();
    if (!list) return;
    setWishlist(await populateMedia(list));
  }

  useEffect(() => {
    // setWishlist(getWishlist());
    populateWishlist()
  }, [state])

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
        {
          wishlist ? <> <Grid container spacing={3}>
            {wishlist?.slice(0, 8)?.map((song) => (
              <Grid item md={6}>
                <SongPreview song={song} />
              </Grid>
            ))}
          </Grid></> : <>Your Wishlist Is Empty!</>
        }


      </WishlistDrawerContainer>
    </StyledWishlistDrawer>
  );
};

export default WishlistDrawer;
