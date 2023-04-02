import { Button, Typography, styled, Box } from "@mui/material";

export const AppContainer = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  width: "fit-content",
  height: "fit-content",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: "3px 20px",
  borderRadius: "5px",
  fontStyle:'bold',
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

export const CustomHeading1 = styled(Box)(({ theme }) => ({
  fontSize: "1.5em",
  color: theme.palette.text.primary,
  fontWeight: 600,
}));
