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
  height: "fit-content",
  backgroundColor: theme.palette.background.default,
  boxShadow: "rgba(139, 139, 156, 0.2) 0px 7px 29px 0px",
  //   borderRadius:'20px',
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  "& form": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  [theme.breakpoints.down('md')]: {
    width: "70vw"
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: "10px",
    width: "90vw",
    // boxShadow: "none"
  }
}));
