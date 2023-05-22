import React, { FunctionComponent, useState, MouseEventHandler } from "react";

//libs
import { FullScreenHandle } from "react-full-screen";
import { Icon } from "@iconify/react";
import { Box, Slider } from "@mui/material";

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
  nextSong: Function;
  previousSong: Function;
  togglePlay: Function;
  progress: number;
  isPlaying: boolean;
}

const FullScreenPlayer: FunctionComponent<Props> = ({
  song,
  nextSong,
  previousSong,
  togglePlay: toggle,
  progress,
  fullScreenHandler,
  isPlaying,
}) => {
  return (
    <PlayerContainer url={song?.thumbnailUrl}>
      <Overlay>
        <SongInfoContainer>
          <img src={song!.thumbnailUrl} alt="" />
          <h1 className="song-name">{song!.title}</h1>
        </SongInfoContainer>
        <Slider sx={{ width: "95%" }} color="secondary" value={progress} />
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
              onClick={() => {
                previousSong();
              }}
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
              onClick={() => {
                toggle();
              }}
            />
            <Icon
              color="white"
              icon="material-symbols:skip-next-rounded"
              width="40px"
              height="40px"
              onClick={() => {
                nextSong();
              }}
            />
          </Box>
          <Icon
            color="white"
            icon="tabler:arrows-diagonal-minimize-2"
            width="35px"
            height="35px"
            onClick={fullScreenHandler.exit}
          />
        </PlayerOptions>
      </Overlay>
    </PlayerContainer>
  );
};

export default FullScreenPlayer;
