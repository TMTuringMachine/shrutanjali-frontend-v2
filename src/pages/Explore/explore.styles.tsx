import { styled, Box, Grid } from "@mui/material";

export const ContinueListeningSection = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: "10px",
  display: "flex",
  flexWrap: "wrap",
  //   backgroundColor: "red",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const EmptyWishList = styled(Box)(() => ({
  width: "100%",
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  justifyContent:"center",
  borderRadius:"10px",
  height: "fit-content",
  padding: "20px 30px",
  boxShadow: "rgba(139, 139, 156, 0.2) 0px 7px 29px 0px",
}));
