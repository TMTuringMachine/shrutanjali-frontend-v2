import { styled, Box } from "@mui/material";

export const SongPreviewContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "12vh",
  borderRadius: "20px",
  backgroundColor: theme.palette.background.default,
  boxShadow: " 0px 8px 20px rgba(35, 35, 35, 0.1)",
  padding: theme.spacing(1),
  display: "flex",
  gap: theme.spacing(1),
  cursor: "pointer",
  transition: "all 0.2s ease-in",
  "& img": {
    borderRadius: "10px",
    objectFit: "cover",
  },
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

export const SongInfoContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  flex: 1,

  "& .song-name": {
    fontWeight: 700,
  },
  "& .song-lyrics": {
    fontSize: "0.8em",
    color: theme.palette.text.secondary,
  },
}));
