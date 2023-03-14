// import { useMemo } from "react";
// material
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//
import shape from "./shape";
import palette from "./palette";
import breakpoints from "./breakpoints";
import { FunctionComponent } from "react";

// ----------------------------------------------------------------------

interface Props {
  children: React.ReactNode;
}

const ThemeConfig: FunctionComponent<Props> = ({ children }) => {
  // const themeOptions = useMemo(
  //   () => ({
  //     palette,
  //     shape,
  //     typography,
  //     breakpoints,
  //     shadows,
  //   }),
  //   []
  // );

  const theme = createTheme({
    palette,
    shape,
    breakpoints,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
