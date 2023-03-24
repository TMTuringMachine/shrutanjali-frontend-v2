import { Box, Drawer, styled } from "@mui/material";

export const WishlistDrawerContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  gap: "25px",
  alignItems: "center",
  "& .modalHeader": {
    fontSize: "1.5em",
    fontWeight: 900,
  },
}));

export const StyledWishlistDrawer = styled(Drawer)(() => ({
  "& .MuiPaper-root": {
    width: "50vw",
    height: "fit-content",
    maxHeight: "80vh",
    overflow: "hidden",
    margin: "50px 0px",
    borderRadius: "20px",
    left: "25vw",
    // transform: "translate(-50%,0%)",
    position: "absolute",
  },
}));
