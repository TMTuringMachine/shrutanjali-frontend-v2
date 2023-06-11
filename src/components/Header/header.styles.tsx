import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "50px",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
}));

export const HeaderOptions = styled(Box)(() => ({
  width: "fit-content",
  display: "flex",
  gap: "30px",
  alignItems: "center",
  marginRight: "25px",
  marginTop: "6px",
}));

export const CustomLink = styled(Link)(() => ({
  color: "#000",
}));
