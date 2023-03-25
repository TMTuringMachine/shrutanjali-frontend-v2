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
    [theme.breakpoints.down("md")]: {
      backgroundImage: "none",
      backgroundColor: theme.palette.background.default,
    },
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
  [theme.breakpoints.down("md")]: {
    justifyContent: "start",
    backgroundColor:'transparent',
  },
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
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",

    "& img": {
      width: "90vw",
      height: "90vw",
    },
    "& .song-name": {
      fontSize: "1.5em",
      color: theme.palette.text.primary,
    },
  },
}));

export const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  backgroundColor: "#ffffff4c",
  borderRadius: "20px",
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#fff",
  },
  [theme.breakpoints.down("md")]: {
    backgroundColor: "#0000005c",
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#000",
    },
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

  [theme.breakpoints.down("md")]: {
    "& svg > path": {
      fill: "#000",
    },
  },
}));
