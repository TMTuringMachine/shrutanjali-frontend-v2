import { Box, Button, styled } from "@mui/material";

export const SwiperContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "80px",
}));

export const SongDataContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
}));

export const SongData = styled(Box)(({ theme }) => ({
  width: "90vw",
  height: "20vh",
  backgroundColor: theme.palette.background.default,
  //   borderRadius: "20px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  whiteSpace: "break-spaces",
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
