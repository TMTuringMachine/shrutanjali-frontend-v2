import { styled, Box } from "@mui/material";

export const LayoutOuterContainer = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const LayoutOutletContainer = styled(Box)(() => ({
  width: "100%",
  flex: 1,
  overflowY: "auto",
  padding: "0px 40px",
}));
