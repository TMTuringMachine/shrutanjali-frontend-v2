import { styled, Box } from "@mui/material";

export const BottomPlayerContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "15px",
  width: "98%",
  margin: "0",
  left: "1%",
  //   boxShadow: "2px 2px 10px #D3D3D3",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  backgroundColor: "white",
  //   backgroundColor: "red",
  borderRadius: "10px",
  height: "100px",
  padding: theme.spacing(1),
  display: "flex",
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
}));
