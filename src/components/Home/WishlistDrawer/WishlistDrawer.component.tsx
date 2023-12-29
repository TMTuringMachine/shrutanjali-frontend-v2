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
import { Icon } from "@iconify/react";
import {EmptyWishList} from '../../../pages/Explore/explore.styles'
interface Props {
  state: boolean;
  toggleDrawer: Function;
}

const WishlistDrawer: FunctionComponent<Props> = ({ state, toggleDrawer }) => {
  const { getWishlist } = useWishlist()
  const [zero,setZero] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const { populateMedia } = useMedia();
  const populateWishlist = async () => {
    const list = getWishlist();
    if(list.length===0){
      setZero(true);
      return;
    }
    if (!list) return;
    const data = await populateMedia(list)
    if(data.length!==0) setZero(false)
    setWishlist(data); 
  }

  useEffect(() => {
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
            {wishlist?.slice(0, 8)?.map((song,idx) => (
              <Grid key={idx} item md={6}>
                <SongPreview song={song} />
              </Grid>
            ))}
          </Grid></> : <></>
        }

        {zero && (
            <EmptyWishList> 
              <Icon icon="ri:heart-add-fill" width="50px" height="50px" />
              <Typography sx={{ fontSize: "1.5em" }}>
                Your wishlist is empty!
              </Typography>
              <Typography sx={{ color: "gray" }}>
                Add songs to your wishlist to enjoy the songs special to you !
              </Typography>
            </EmptyWishList>
        )}

      </WishlistDrawerContainer>
    </StyledWishlistDrawer>
  );
};

export default WishlistDrawer;
