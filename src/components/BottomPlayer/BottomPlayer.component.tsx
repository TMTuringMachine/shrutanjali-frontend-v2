import {
  ChangeEvent,
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Icon } from "@iconify/react";

import { Box, Popover, Slider, Tooltip } from "@mui/material";
import {
  BottomPlayerContainer,
  SongActionsContainer,
  SongImageContainer,
  SongPlayerOptions,
} from "./BottomPlayer.styles";
import { IAudio, IMedia } from "../../interfaces/media.interface";
import { FullScreenHandle } from "react-full-screen";
import LyricsModal from "../Home/LyricsModal/LyricsModal.component";
import { OptionButton } from "../../pages/Home/home.styles";

interface Prop {
  fullScreenHandler: FullScreenHandle;
  song: IMedia | null;
  nextSong: Function;
  previousSong: Function;
  togglePlay: Function;
  progress: number;
  isPlaying: boolean;
  seek: Function;
  currentAudioIndex: number;
  setCurrentAudioIndex: Function;
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
  currentAudioIndex,
  setCurrentAudioIndex,
}) => {
  const [lyricModalState, setLyricModalState] = useState<any>({
    open: false,
    song: null,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <BottomPlayerContainer>
      <SongImageContainer>
        <img src={song?.thumbnailUrl} className="song-image" alt="" />
        <Box sx={{ fontWeight: 600, fontSize: "1.2em" }}>
          <p>{song?.title}</p>
        </Box>
      </SongImageContainer>
      <SongPlayerOptions>
        <Box className="player-options">
        <Tooltip title={"Previous Song"} arrow >
          <Icon
            color="black"
            icon="material-symbols:skip-previous-rounded"
            width="40px"
            height="40px"
            onClick={() => {
              previousSong();
            }}
            />
            </Tooltip>
        <Tooltip title={"Play"} arrow >

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
          </Tooltip>
          <Tooltip title={"Next Song"} arrow >
          <Icon
            color="black"
            icon="material-symbols:skip-next-rounded"
            width="40px"
            height="40px"
            onClick={() => {
              nextSong();
            }}
            />
            </Tooltip>
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
      <Tooltip title={"Lyrics"} arrow >
        <Icon
          color="black"
          icon="basil:book-open-solid"
          width="30px"
          height="30px"
          onClick={() => {
            setLyricModalState({
              open: true,
              song: song,
            });
          }}
          />
          </Tooltip>
        <Tooltip title={"Change Audio"} arrow >
        <Icon
          icon="material-symbols:headphones"
          width="35px"
          height="35px"
          aria-describedby={id}
          onClick={handleClick}
          />
          </Tooltip>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Box sx={{ width: "fit-content", padding: "5px" }}>
            {song?.audios?.map((item: IAudio, idx: number) => (
              <OptionButton
                key={idx}
                active={idx == currentAudioIndex}
                onClick={() => {
                  setCurrentAudioIndex(idx);
                  // pause();
                  // setIsPlaying(false);
                }}
              >
                {item.language}
              </OptionButton>
            ))}
          </Box>
        </Popover>
        <Tooltip title={"Fullscreen Mode"} arrow >
        <Icon
          color="black"
          icon="material-symbols:fullscreen-rounded"
          width="30px"
          height="30px"
          />
          </Tooltip>
      </SongActionsContainer>

      <LyricsModal
        state={lyricModalState.open}
        toggleModal={() => {
          setLyricModalState({
            ...lyricModalState,
            open: false,
          });
        }}
        song={lyricModalState.song}
      />
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
