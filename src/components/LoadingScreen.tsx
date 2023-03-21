import React, { FunctionComponent } from "react";

//libs
import { Box, CircularProgress, styled } from "@mui/material";

const LoadingScreenContainer = styled(Box)(() => ({
  width: "100vw",
  height: "100vh",
  display: "grid",
  placeItems: "center",
}));

interface Props {}

const LoadingScreen: FunctionComponent<Props> = (props: Props) => {
  return (
    <LoadingScreenContainer>
      <CircularProgress />
    </LoadingScreenContainer>
  );
};

export default LoadingScreen;
