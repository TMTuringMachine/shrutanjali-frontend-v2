import React, { FunctionComponent } from "react";
import { FullScreenHandle } from "react-full-screen";

//styles
import { PlayerContainer } from "./FullScreenPlayer.styles";

interface Props {
  fullScreenHandler: FullScreenHandle;
}

const FullScreenPlayer: FunctionComponent<Props> = () => {
  return <PlayerContainer>hehe</PlayerContainer>;
};

export default FullScreenPlayer;
