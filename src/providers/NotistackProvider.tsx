import React, { FunctionComponent, ReactNode, useEffect, memo } from "react";

import { enqueueSnackbar, SnackbarProvider } from "notistack";
import useControl from "../hooks/useControl";

interface Props {
  children: ReactNode;
}

const NotistackProvider: FunctionComponent<Props> = ({ children }) => {
  const { snack, hideSnackbar } = useControl();

  useEffect(() => {
    if (snack.type) {
      switch (snack.type) {
        case "success":
          enqueueSnackbar(snack.text, { variant: "success" });
          break;
        case "error":
          enqueueSnackbar(snack.text, { variant: "error" });
          break;
        case "warning":
          enqueueSnackbar(snack.text, { variant: "warning" });
          break;
        case "info":
          enqueueSnackbar(snack.text, { variant: "info" });
          break;
        default:
          enqueueSnackbar(snack.text, { variant: "success" });
          break;
      }
    }
  }, [snack]);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default memo(NotistackProvider);
