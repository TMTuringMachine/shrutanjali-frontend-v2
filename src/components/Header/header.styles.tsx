import { Box, styled } from "@mui/material";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "50px",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
}));
