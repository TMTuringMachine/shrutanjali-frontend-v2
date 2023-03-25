import { styled, Box, LinearProgress } from "@mui/material";

type PlayerContainerProps = {
  url: string | undefined;
};

export const PlayerContainer = styled(Box)<PlayerContainerProps>(
  ({ theme, url }) => ({
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.grey[400],
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    // filter:'brightness(70%)'
  })
);

export const Overlay = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "#0000006e",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: theme.spacing(3),
}));

export const SongInfoContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "end",
  marginBottom: "50px",
  gap: "30px",

  "& img": {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "20px",
  },
  "& .song-name": {
    fontSize: "2.5em",
    fontWeight: 900,
    color: theme.palette.background.default,
  },
}));

export const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: "#ffffff4c",
  borderRadius: "20px",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#fff",
  },
}));

export const PlayerOptions = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  backgroundColor: "transparent",
  marginTop: "10px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),

  "& .player-options": {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

}));
