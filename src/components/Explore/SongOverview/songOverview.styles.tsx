import { styled, Box } from "@mui/material";

export const SongOverviewContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "250px",
  backgroundColor: theme.palette.background.default,
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  borderRadius: "20px",
  padding:'5px'
}));

export const SongOverviewImage = styled("img")(() => ({
  width: "100%",
  height: "85%",
  borderRadius:'20px',
  objectFit:'cover'
}));
