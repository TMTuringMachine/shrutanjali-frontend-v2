import React, { FunctionComponent, useState, MouseEventHandler } from "react";

//libs
import { FullScreenHandle } from "react-full-screen";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";

//interfaces
import { Song } from "../../interfaces/song.interface";

//styles
import {
  PlayerContainer,
  Overlay,
  SongInfoContainer,
  ProgressBar,
  PlayerOptions,
} from "./FullScreenPlayer.styles";
import { IMedia } from "../../interfaces/media.interface";

interface Props {
  fullScreenHandler: FullScreenHandle;
  song: IMedia | null;
}

const FullScreenPlayer: FunctionComponent<Props> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay: MouseEventHandler<SVGElement> = (): void => {
    setIsPlaying(!isPlaying);
  };
  return (
    <PlayerContainer url={song?.thumbnailUrl}>
      <Overlay>
        <SongInfoContainer>
          <img src={song!.thumbnailUrl} alt="" />
          <h1 className="song-name">{song!.title}</h1>
        </SongInfoContainer>
        <ProgressBar variant="determinate" value={30} />
        <PlayerOptions>
          <Icon
            color="white"
            icon="basil:book-open-solid"
            width="35px"
            height="35px"
          />
          <Box className="player-options">
            <Icon
              color="white"
              icon="material-symbols:skip-previous-rounded"
              width="40px"
              height="40px"
            />
            <Icon
              color="white"
              icon={
                isPlaying
                  ? "material-symbols:pause-circle-rounded"
                  : "material-symbols:play-circle-rounded"
              }
              width="80px"
              height="80px"
              onClick={togglePlay}
            />
            <Icon
              color="white"
              icon="material-symbols:skip-next-rounded"
              width="40px"
              height="40px"
            />
          </Box>
          <Icon
            color="white"
            icon="tabler:arrows-diagonal-minimize-2"
            width="35px"
            height="35px"
            // onClick={fullScreenHandler.enter}
          />
        </PlayerOptions>
      </Overlay>
    </PlayerContainer>
  );
};

export default FullScreenPlayer;
