import { Box, styled } from "@mui/material";

export const LyricsConatainer = styled(Box)(() => ({
  fontSize: "1.2em",
  width: "100%",
  marginTop: "20px",
}));

export const ModalHeader = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems:'center',

  "& .song-name": {
    fontSize: "2em",
    fonteight: "600",
  },
}));
