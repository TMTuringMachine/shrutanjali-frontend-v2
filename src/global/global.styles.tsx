import { Button, Typography, styled, Box, TextField } from "@mui/material";

export const AppContainer = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

export const CustomToggleButton = styled(Button)(({ theme, active }) => ({
  width: "fit-content",
  height: "fit-content",
  backgroundColor: active ? theme.palette.primary.main : "white",
  color: active ? "#fff" : theme.palette.primary.main,
  padding: "3px 20px",
  borderRadius: "5px",
  fontStyle: "bold",
  "&:hover": {
    backgroundColor: active ? theme.palette.primary.main : "white",
    color: active ? "#fff" : theme.palette.primary.main,
  },
  marginLeft: "1rem",
}));
export const CustomButton = styled(Button)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: "3px 20px",
  borderRadius: "5px",
  fontStyle: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  marginLeft: "1rem",
}));

export const CustomHeading1 = styled(Box)(({ theme }) => ({
  fontSize: "1.5em",
  color: theme.palette.text.primary,
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2em",
  },
}));

type ModalContainerProps = {
  width?: string;
  height?: string;
  left?: string;
  top?: string;
};

export const ModalContainer = styled(Box)<ModalContainerProps>(
  ({ theme, width, height, left, top }) => ({
    width: width || "50vw",
    height: height || "fit-content",
    maxHeight: "80vh",
    overflowY: "auto",
    position: "absolute",
    top: top || "10vh",
    left: left || "25vw",
    backgroundColor: theme.palette.background.default,
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),

    "& .modal-title": {
      fontSize: "1.5em",
      fontWeight: 700,
    },
    [theme.breakpoints.down("md")]: {
      width: "90vw",
      left: "5vw",
      top: "8vh",
    },
  }),
);

export const StyledTextField = styled(TextField)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
