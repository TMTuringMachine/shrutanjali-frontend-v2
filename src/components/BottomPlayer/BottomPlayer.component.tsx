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
  OuterContainer,
  SongActionsContainer,
  SongImageContainer,
  SongPlayerOptions,
} from "./BottomPlayer.styles";
import { IAudio, IMedia } from "../../interfaces/media.interface";
import {
  FullScreen,
  FullScreenHandle,
  useFullScreenHandle,
} from "react-full-screen";
import LyricsModal from "../Home/LyricsModal/LyricsModal.component";
import { OptionButton } from "../../pages/Home/home.styles";
import FullScreenPlayer from "../FullScreenPlayer/FullScreenPlayer.component";
import useWishlist from "../../hooks/useWishlist";
import { useWindowSize } from "../../hooks/useWindowSize";

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
  restartSong: Function;
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
  restartSong,
}) => {
  const [lyricModalState, setLyricModalState] = useState<any>({
    open: false,
    song: null,
  });
  const [wish, setWish] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [render, setRender] = useState<Boolean>(false);
  const [showMobileOptions, setShowMobileOptions] = useState<boolean>(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const mywindow = useWindowSize();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  useEffect(() => {
    // getFeaturedMedia();
    setWish(getWishlist());
  }, [render]);
  const isWishListed = (songId: string) => {
    if (wish?.includes(songId)) return true;
    return false;
  };

  const getLikeIconForActionsContainer = () => {
    if (mywindow.width! > 600) {
      return null;
    }
    if (isWishListed(song?._id!)) {
      return (
        <Tooltip title={"Remove From Wishlist"} arrow>
          <Icon
            icon="fe:heart"
            width="35px"
            height="35px"
            color="red"
            onClick={() => {
              removeFromWishlist(song?._id!);
              setRender(!render);
            }}
          />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={"Add To Wishlist"} arrow>
          <Icon
            icon="fe:heart"
            width="35px"
            height="35px"
            onClick={() => {
              addToWishlist(song?._id!);
              setRender(!render);
            }}
          />
        </Tooltip>
      );
    }
  };
  const getLikeIcon = () => {
    if (mywindow.width! < 600) {
      return (
        <Icon
          icon="iconamoon:options-light"
          width="35px"
          height="35px"
          onClick={() => {
            setShowMobileOptions(!showMobileOptions);
          }}
        />
      );
    }
    if (isWishListed(song?._id!)) {
      return (
        <Tooltip title={"Remove From Wishlist"} arrow>
          <Icon
            icon="fe:heart"
            width="30x"
            height="30px"
            style={{ color: "red" }}
            onClick={() => {
              removeFromWishlist(song?._id!);
              setRender(!render);
            }}
          />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={"Add To Wishlist"} arrow>
          <Icon
            icon="fe:heart"
            width="35px"
            height="35px"
            onClick={() => {
              addToWishlist(song?._id!);
              setRender(!render);
            }}
          />
        </Tooltip>
      );
    }
  };

  const { getWishlist, removeFromWishlist, addToWishlist } = useWishlist();
  return (
    <OuterContainer>
      <BottomPlayerContainer>
        <SongImageContainer>
          <img src={song?.thumbnailUrl} className="song-image" alt="" />
          <Box className="song-name">
            <p>{song?.title}</p>
          </Box>
          {getLikeIcon()}
          {/* {isWishListed(song?._id!) ? (
            <>
              <Tooltip title={"Remove From Wishlist"} arrow>
                <Icon
                  icon="fe:heart"
                  width="30x"
                  height="30px"
                  style={{ color: "red" }}
                  onClick={() => {
                    removeFromWishlist(song?._id!);
                    setRender(!render);
                  }}
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title={"Add To Wishlist"} arrow>
                <Icon
                  icon="fe:heart"
                  width="35px"
                  height="35px"
                  onClick={() => {
                    addToWishlist(song?._id!);
                    setRender(!render);
                  }}
                />
              </Tooltip>
            </>
          )} */}
        </SongImageContainer>
        <SongPlayerOptions>
          <Box className="player-options">
            <Tooltip title={"Previous Song"} arrow>
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
            <Tooltip title={"Play"} arrow>
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
            <Tooltip title={"Next Song"} arrow>
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
            className="slider"
            sx={{ width: "90%" }}
            color="primary"
            value={progress}
            onChange={(e: any) => {
              seek(e?.target?.value);
            }}
          />
        </SongPlayerOptions>
        <SongActionsContainer showMobileOptions={showMobileOptions}>
          {getLikeIconForActionsContainer()}
          <Tooltip title={"Lyrics"} arrow>
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
          <Tooltip title={"Audio Options"} arrow>
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
                    setTimeout(() => {
                      restartSong();
                    }, 500);
                    // pause();
                    // setIsPlaying(false);
                  }}
                >
                  {item.language}
                </OptionButton>
              ))}
            </Box>
          </Popover>
          <Tooltip title={"Fullscreen Mode"} arrow>
            <Icon
              color="black"
              icon="material-symbols:fullscreen-rounded"
              width="30px"
              height="30px"
              onClick={fullScreenHandler.enter}
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
      <Slider
        size="small"
        className="mobile-slider"
        sx={{ width: "94%" }}
        color="primary"
        value={progress}
        onChange={(e: any) => {
          seek(e?.target?.value);
        }}
      />
    </OuterContainer>

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
