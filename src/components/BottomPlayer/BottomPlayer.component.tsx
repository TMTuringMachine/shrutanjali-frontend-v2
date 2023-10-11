import {
  ChangeEvent,
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Icon } from "@iconify/react";

import { Box, Slider } from "@mui/material";
import {
  BottomPlayerContainer,
  SongActionsContainer,
  SongImageContainer,
  SongPlayerOptions,
} from "./BottomPlayer.styles";
import { IMedia } from "../../interfaces/media.interface";
import { FullScreenHandle } from "react-full-screen";

interface Prop {
  fullScreenHandler: FullScreenHandle;
  song: IMedia | null;
  nextSong: Function;
  previousSong: Function;
  togglePlay: Function;
  progress: number;
  isPlaying: boolean;
  seek: Function;
}
const BottomPlayer: FunctionComponent<Prop> = ({
  song,
  nextSong,
  previousSong,
  togglePlay,
  progress,
  fullScreenHandler,
  isPlaying,
  seek,
}) => {

  

  return (
    <BottomPlayerContainer>
      <SongImageContainer>
        <img src={song?.thumbnailUrl} className="song-image" alt="" />
        <Box>
          <p>{song?.title}</p>
        </Box>
      </SongImageContainer>
      <SongPlayerOptions>
        <Box className="player-options">
          <Icon
            color="black"
            icon="material-symbols:skip-previous-rounded"
            width="40px"
            height="40px"
            onClick={() => {
              previousSong();
            }}
          />
          <Icon
            color="black"
            icon={
              isPlaying
                ? "material-symbols:pause-circle-rounded"
                : "material-symbols:play-circle-rounded"
            }
            width="50px"
            height="50px"
            onClick={() => {
              togglePlay();
            }}
          />
          <Icon
            color="black"
            icon="material-symbols:skip-next-rounded"
            width="40px"
            height="40px"
            onClick={() => {
              nextSong();
            }}
          />
        </Box>
        <Slider
          sx={{ width: "90%" }}
          color="primary"
          value={progress}
          onChange={(e: any) => {
            seek(e?.target?.value);
          }}
        />
      </SongPlayerOptions>
      <SongActionsContainer>
        <Icon
          color="black"
          icon="basil:book-open-solid"
          width="30px"
          height="30px"
        />{" "}
        <Icon
          color="black"
          icon="material-symbols:fullscreen-rounded"
          width="30px"
          height="30px"
        />
      </SongActionsContainer>
    </BottomPlayerContainer>
    // <Box
    //   sx={{
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    //     padding: '0.5rem',
    //   }}
    // >
    //   <Box sx={{ fontSize: '1.2rem', margin: '0.4rem' }}>{title}</Box>
    //   <input style={{ width: '90%' }} type="range" />
    //   <Box className="player-options">
    //     <Icon
    //       color="black"
    //       icon="material-symbols:skip-previous-rounded"
    //       width="40px"
    //       height="40px"
    //     />
    //     <Icon
    //       color="black"
    //       icon={
    //         isPlaying
    //           ? 'material-symbols:pause-circle-rounded'
    //           : 'material-symbols:play-circle-rounded'
    //       }
    //       width="40px"
    //       height="40px"
    //       onClick={togglePlay}
    //     />
    //     <Icon
    //       color="black"
    //       icon="material-symbols:skip-next-rounded"
    //       width="40px"
    //       height="40px"
    //     />
    //   </Box>
    // </Box>
  );
};
export default BottomPlayer;
