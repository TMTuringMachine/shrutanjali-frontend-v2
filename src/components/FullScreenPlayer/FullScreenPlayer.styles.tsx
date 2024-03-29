import { styled, Box, LinearProgress, Slider } from "@mui/material";

type PlayerContainerProps = {
  url: string | undefined;
  read: boolean;
};

export const PlayerContainer = styled(Box)<PlayerContainerProps>(
  ({ theme, url, read }) => ({
    width: read ? "70%" : "100%",
    height: "100%",
    transition: "width 0.3s ease-in",
    backgroundColor: theme.palette.grey[400],
    backgroundImage: `url('${url}')`,
    // objectFit: "cover",
    backgroundPosition: "center",
    backgroundSize: "cover",
    // backgroundSize: "contain",
    // backgroundRepeat: "no-repeat",
    // filter:'brightness(70%)'
    [theme.breakpoints.down("sm")]: {
      backgroundImage: "none",
      backgroundColor: theme.palette.background.default,
    },
  }),
);

interface LyricsContainerProps {
  read: boolean;
}

export const LyricsContainer = styled(Box)<LyricsContainerProps>(
  ({ theme, read }) => ({
    width: read ? "30%" : "0%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    transition: "width 0.3s ease-in",
    fontSize: "2em",
    padding: read ? "30px" : "0px",
    height: "100%",
  }),
);

interface OverlayProps {
  visible: boolean;
}

export const Overlay = styled(Box)<OverlayProps>(({ theme, visible }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "#0000005e",
  display: visible ? "flex" : "none",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    justifyContent: "start",
    backgroundColor: "transparent",
  },
  "& .MuiSlider-thumb": {
    transition: "left 0.5s",
  },

  "& .MuiSlider-thumb.MuiSlider-active": {
    transition: "left 0s",
  },

  "& .MuiSlider-track": {
    transition: "width 0.5s",
  },
}));

export const SongInfoContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "end",
  marginBottom: "50px",
  gap: "30px",

  "& img": {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  "& .song-name": {
    fontSize: "3em",
    fontWeight: 800,
    color: theme.palette.background.default,
  },
  [theme.breakpoints.down("sm")]: {
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
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "#0000005c",
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#000",
    },
  },
}));

export const ProgressSlider = styled(Slider)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    color: theme.palette.primary.main,
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
  gap: "10px",

  "& .player-options": {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  "& .opt-container": {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
    "& svg > path": {
      fill: "#000",
    },

    "& .player-options": {
      gap: "10px",
    },
    "& .opt-container": {
      gap: "10px",
    },
  },
}));

export const LyricsText = styled(Box)(() => ({
  fontSize: "0.65em",
  flex: 1,
  overflowY: "auto",
}));
