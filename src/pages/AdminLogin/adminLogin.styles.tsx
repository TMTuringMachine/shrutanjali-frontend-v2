import { Box, styled } from "@mui/material";

export const AdminLoginPage = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "grid",
  placeItems: "center",
}));

export const AdminLoginContainer = styled(Box)(({ theme }) => ({
  width: "40vw",
  height: "50vh",
  backgroundColor: theme.palette.background.default,
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  //   borderRadius:'20px',
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems:'center'
}));
