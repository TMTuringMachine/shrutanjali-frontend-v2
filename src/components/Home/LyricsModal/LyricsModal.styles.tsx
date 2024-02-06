import { Box, styled } from "@mui/material";

export const LyricsConatainer = styled(Box)(({ theme }) => ({
  fontSize: "1.2em",
  width: "100%",
  marginTop: "20px",
  fontFamily: "Noto Sans",
  overflow: "auto",
  overflowX: "auto",
  [theme.breakpoints.down("sm")]: {
    "& .pdf-page": {
      padding: "0px",
    },
  },

  // fontFamily: "Noto Sans Devanagari",
}));

export const ModalHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "& .song-name": {
    fontSize: "2em",
    fonteight: "600",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "start",
    gap: "10px",
    "& .song-name": {
      fontSize: "1.2em",
    },
  },
}));
