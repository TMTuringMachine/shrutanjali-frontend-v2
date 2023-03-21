import { styled, Box } from "@mui/material";

export const LandingPageContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
}));

export const NameContainer = styled(Box)(() => ({
  flex: 1,
  display: "grid",
  placeItems: "center",
  "& img": {
    cursor: "pointer",
    transition: "all ease-in-out 1s",
  },
}));

export const ImageContainer = styled(Box)(() => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  "& img": {
    height: "90vh",
  },
}));
