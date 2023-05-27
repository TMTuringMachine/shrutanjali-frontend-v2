import { Box, Button, styled } from "@mui/material";
import { motion } from "framer-motion";

export const SwiperContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "50px",
}));

export const SongDataContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  zIndex: 99999999,
  backgroundColor: theme.palette.background.default,
  position:"relative",

  '& .MuiSlider-thumb':{
    transition:'left 0.5s'
  },
  
  '& .MuiSlider-thumb.MuiSlider-active':{
    transition:'left 0s'
  },

  '& .MuiSlider-track':{
    transition:'width 0.5s'
  }
}));

export const SongData = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "fit-content",
  padding: theme.spacing(2),
  // backgroundColor: theme.palette.background.default,
  //   borderRadius: "20px",
  // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  whiteSpace: "break-spaces",
  // zIndex: "99999999",
  textAlign: "center",
}));

export const PlayerOptionsContainer = styled(Box)(({ theme }) => ({
  width: "30vw",
  height: "10vh",
  backgroundColor: "transparent",
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),

  "& .player-options": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

export const WhishListButton = styled(Button)(({ theme }) => ({
  widt: "50px",
  height: "50px",
  borderRadius: "10px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  position: "absolute",
  bottom: "0px",
  left: "50%",
  transform: "translate(-50%,0%)",
  color: "#000",
  "&:hover": {
    backgroundColor: "#e7e7e7",
  },
}));

type PlayingSongProps = {
  url?: string;
};

export const PlayingSong = styled(motion.div)<PlayingSongProps>(
  ({ url, theme }) => ({
    position: "absolute",
    width: "50vw",
    height: "55vh",
    top: "30px",
    left: "25vw",
    backgroundColor: theme.palette.grey[400],
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    zIndex: 9,
    borderRadius: "20px",
    [theme.breakpoints.down("md")]: {
      width: "94vw",
      left: "3vw",
    },
  })
);
