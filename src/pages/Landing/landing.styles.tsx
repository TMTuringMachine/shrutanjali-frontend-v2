import { styled, Box } from "@mui/material";

export const LandingPageContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
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

type ImageProps = {
  active: boolean;
};

export const ImageContainer = styled(Box)<ImageProps>(({ active, theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  "& img": {
    height: "90vh",
    filter: !active ? "grayscale(100%)" : "",
    cursor:'pointer'
  },
  [theme.breakpoints.down("md")]: {
    "& img": {
      height: "60vh",
      filter:"none"
    },
  },
}));
