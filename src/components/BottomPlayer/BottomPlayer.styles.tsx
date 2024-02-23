import { styled, Box } from "@mui/material";

export const OuterContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "15px",
  width: "98%",
  margin: "0",
  left: "1%",
  height: "100px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  backgroundColor: "white",

  "& .mobile-slider": {
    display: "none",
  },
  [theme.breakpoints.down("sm")]: {
    height: "90px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .mobile-slider": {
      display: "flex",
      padding:"0px"
    },
  },
}));

export const BottomPlayerContainer = styled(Box)(({ theme }) => ({
  // position: "absolute",
  // bottom: "15px",
  // width: "98%",
  // margin: "0",
  // left: "1%",
  width: "100%",
  height: "100%",
  //   boxShadow: "2px 2px 10px #D3D3D3",
  //   backgroundColor: "red",
  borderRadius: "10px",
  padding: theme.spacing(1),
  display: "flex",

  [theme.breakpoints.down("sm")]: {
    height: "80%",
    // height:"90%"
    // flex:1,
    // flexDirection:"column"
  },
}));

export const SongImageContainer = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "100%",
  // backgroundColor: "red",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  "& .song-image": {
    objectFit: "cover",
    height: "100%",
    width: "30%",
    borderRadius: "5px",
  },
  "& .song-name": {
    fontWeight: 600,
    fontSize: "1.2em",
  },
  [theme.breakpoints.down("sm")]: {
    // display: 'none'
    width: "50%",
    "& .song-name": {
      fontSize: "0.9em",
      fontWeight: 500,
    },
  },
}));

export const SongPlayerOptions = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "100%",
  // backgroundColor: "yellow",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "& .player-options": {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "50%",
    "& svg": {
      transform: "scale(0.8)",
    },
    "& .slider": {
      display: "none",
    },
  },
}));

export const SongActionsContainer = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "100%",
  // backgroundColor: "blue",
  display: "flex",
  gap: "30px",
  alignItems: "center",
  justifyContent: "end",
  paddingRight: "30px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
