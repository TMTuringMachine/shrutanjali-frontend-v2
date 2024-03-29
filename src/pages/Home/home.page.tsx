import React, {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

//libs
import { Swiper, SwiperSlide, useSwiper, useSwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCoverflow,
  Mousewheel,
} from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/mousewheel";
import { Icon } from "@iconify/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MuxAudio from "@mux/mux-audio-react";

//components
import Transition from "../../components/Transition";
import CarouselCard from "../../components/Home/CarouselCard/CarouselCard.component";
import WishlistDrawer from "../../components/Home/WishlistDrawer/WishlistDrawer.component";

//hooks
import { useWindowSize } from "../../hooks/useWindowSize";
import useMedia from "../../hooks/useMedia";
import useAudioPlayer from "../../hooks/useAudioPlayer";

//styles
import { PageContainer } from "../page.styles";
import {
  SwiperContainer,
  SongData,
  SongDataContainer,
  WhishListButton,
  PlayerOptionsContainer,
  PlayingSong,
  OptionButton,
} from "./home.styles";

//data
// import { songs } from "../../helpers/data";

//interfaces
import { Song } from "../../interfaces/song.interface";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Popover,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import FullScreenPlayer from "../../components/FullScreenPlayer/FullScreenPlayer.component";
import { IAudio, IMedia } from "../../interfaces/media.interface";
import { convertApiMedia } from "./home.utils";
import SliderProps from "../../components/Home/SliderProps";
import LyricsModal from "../../components/Home/LyricsModal/LyricsModal.component";
import useWishlist from "../../hooks/useWishlist";
interface Props {}

SwiperCore.use([Navigation, EffectCoverflow, Mousewheel]);

const Home: FunctionComponent<Props> = () => {
  const { addToWishlist } = useWishlist();
  const [activeSong, setActiveSong] = useState<IMedia | null>(null);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [songs, setSongs] = useState<IMedia[] | null>(null);
  const [lyricModalState, setLyricModalState] = useState<any>({
    open: false,
    song: null,
  });
  const { getWishlist, removeFromWishlist } = useWishlist();
  const [wish, setWish] = useState<string[]>([]);
  //popover states
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [render, setRender] = useState<Boolean>(false);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const { width } = useWindowSize();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fullScreenHandler = useFullScreenHandle();
  const { getFeaturedMedia, featuredSongs } = useMedia();

  const ref = useRef<any>();
  const {
    play,
    pause,
    audioRef,
    progress,
    nextSong,
    previousSong,
    currentSong,
    setCurrentSongIndex,
    currentSongIndex,
    seek,
    isPlaying: playing,
    restartSong,
  } = useAudioPlayer({
    songList: songs,
    ref: ref,
  });

  // const audioRef = useRef<HTMLAudioElement>();
  const toggleWishlistDrawer: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    setShowWishlist(!showWishlist);
  };

  const togglePlay: Function = (): void => {
    if (isPlaying == false) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
    // setIsPlaying(!isPlaying);
  };

  const isWishListed = (songId: string) => {
    if (wish?.includes(songId)) return true;
    return false;
  };

  useEffect(() => {
    getFeaturedMedia();
    setWish(getWishlist());
  }, [render]);

  const playNextSong = () => {
    ref?.current?.next();
    nextSong({ playing: isPlaying });
  };

  const playPreviousSong = () => {
    ref?.current?.previous();
    previousSong({ playing: isPlaying });
  };

  useEffect(() => {
    if (featuredSongs.length > 0) {
      setSongs(convertApiMedia(featuredSongs));
    }
  }, [featuredSongs]);

  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);

  const handleFullScreenFromCard = (song: any, index: number) => {
    setActiveSong(song);
    if (index === currentSongIndex + 1) {
      ref?.current?.next();
    } else if (index !== currentSongIndex) {
      ref?.current?.previous();
    }
    setTimeout(() => {
      fullScreenHandler.enter();
      togglePlay();
    }, 300);
  };

  useEffect(() => {
    setCurrentAudioIndex(0);
  }, [currentSong]);

  return (
    <Transition>
      <PageContainer>
        <MuxAudio
          src={
            currentSong &&
            currentSong?.audios[currentAudioIndex]?.audioId?.playbackUrl
          }
          type="hls"
          controls
          ref={audioRef}
          style={{ display: "none" }}
        />
        <SwiperContainer>
          {songs === null && (
            <Box
              sx={{
                width: "100$",
                height: "36vh",
                display: "grid",
                placeItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {songs && songs.length > 0 ? (
            <Swiper
              navigation
              pagination={{ clickable: true }}
              effect={"coverflow"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              loop
              mousewheel
              slidesPerView={width !== undefined && width > 900 ? 3 : 1}
              centeredSlides
              style={{ overflow: "visible" }}
            >
              <SliderProps ref={ref} />
              {songs.map((item, idx) => (
                <SwiperSlide key={idx}>
                  {({ isActive }) => {
                    if (isActive) {
                      setActiveSong(item);
                      if (idx > currentSongIndex) {
                        playNextSong();
                      } else if (idx < currentSongIndex) {
                        playPreviousSong();
                      }
                      setCurrentSongIndex(idx);
                    }
                    return (
                      <CarouselCard
                        key={idx}
                        song={item}
                        active={isActive}
                        disabled={isPlaying}
                        onClick={() => {
                          // setActiveSong(item);
                          // fullScreenHandler.enter();
                          handleFullScreenFromCard(item, idx);
                          // togglePlay();
                        }}
                        // setSong={setActiveSong}
                      />
                    );
                  }}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </SwiperContainer>
        <AnimatePresence>
          {isPlaying && width! > 900 && (
            <PlayingSong
              layoutId={activeSong?._id}
              url={activeSong?.thumbnailUrl}
            ></PlayingSong>
          )}
        </AnimatePresence>
        <SongDataContainer>
          <SongData>
            {/* <Typography> */}
            {activeSong ? <h1>{activeSong.title}</h1> : null}
          </SongData>
          <Slider
            sx={{ width: "90%" }}
            value={progress}
            onChange={(e: any) => {
              seek(e?.target?.value);
            }}
          />
          <PlayerOptionsContainer>
            {isWishListed(currentSong?._id) ? (
              <>
                <Tooltip title={"Remove From Wishlist"} arrow>
                  <Icon
                    icon="fe:heart"
                    width="35px"
                    height="35px"
                    style={{ color: "red" }}
                    onClick={() => {
                      removeFromWishlist(currentSong?._id);
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
                      addToWishlist(currentSong?._id);
                      setRender(!render);
                    }}
                  />
                </Tooltip>
              </>
            )}
            <Tooltip title={"Lyrics"} arrow>
              <Icon
                icon="basil:book-open-solid"
                width="35px"
                height="35px"
                onClick={() => {
                  setLyricModalState({
                    open: true,
                    song: currentSong,
                  });
                }}
              />
            </Tooltip>

            <Box className="player-options">
              <Tooltip title={"Previous Song"} arrow>
                <Icon
                  icon="material-symbols:skip-previous-rounded"
                  width="30px"
                  height="30px"
                  onClick={() => {
                    playPreviousSong();
                  }}
                />
              </Tooltip>
              <Tooltip title={"Play"} arrow>
                <Icon
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
                  icon="material-symbols:skip-next-rounded"
                  width="30px"
                  height="30px"
                  onClick={() => {
                    playNextSong();
                  }}
                />
              </Tooltip>
            </Box>
            <Tooltip title={"Change Audio"} arrow>
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
                {currentSong?.audios?.map((item: IAudio, idx: number) => (
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
                      // handleClose();
                      // setTimeout(() => {
                      //   togglePlay();
                      // }, 1000);
                    }}
                  >
                    {item.language}
                  </OptionButton>
                ))}
              </Box>
            </Popover>
            <Tooltip title={"Fullscreen Mode"} arrow>
              <Icon
                icon="material-symbols:fullscreen-rounded"
                width="35px"
                height="35px"
                onClick={fullScreenHandler.enter}
              />
            </Tooltip>
          </PlayerOptionsContainer>
        </SongDataContainer>
        <FullScreen handle={fullScreenHandler}>
          {fullScreenHandler.active ? (
            <FullScreenPlayer
              fullScreenHandler={fullScreenHandler}
              song={activeSong}
              nextSong={playNextSong}
              previousSong={playPreviousSong}
              togglePlay={togglePlay}
              progress={progress}
              isPlaying={isPlaying}
              seek={seek}
              currentAudioIndex={currentAudioIndex}
              setCurrentAudioIndex={setCurrentAudioIndex}
              restartSong={restartSong}
            />
          ) : null}
        </FullScreen>
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
        <Tooltip title={"Open Wishlist"} arrow>
          <WhishListButton onClick={toggleWishlistDrawer}>
            <Icon icon="mdi:music-circle" width="30px" height="30px" />
          </WhishListButton>
        </Tooltip>
        <WishlistDrawer
          state={showWishlist}
          toggleDrawer={toggleWishlistDrawer}
        />
      </PageContainer>
    </Transition>
  );
};

export default Home;
