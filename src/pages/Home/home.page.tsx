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

//styles
import { PageContainer } from "../page.styles";
import {
  SwiperContainer,
  SongData,
  SongDataContainer,
  WhishListButton,
  PlayerOptionsContainer,
  PlayingSong,
} from "./home.styles";

//data
// import { songs } from "../../helpers/data";

//interfaces
import { Song } from "../../interfaces/song.interface";
import { Box, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import FullScreenPlayer from "../../components/FullScreenPlayer/FullScreenPlayer.component";

interface Props {}

SwiperCore.use([Navigation, EffectCoverflow, Mousewheel]);

const Home: FunctionComponent<Props> = () => {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [songs, setSongs] = useState<Song[] | null>(null);

  const fullScreenHandler = useFullScreenHandle();
  const { width } = useWindowSize();
  const { getFeaturedMedia, featuredSongs } = useMedia();

  const audioRef = useRef<HTMLAudioElement>();

  const toggleWishlistDrawer: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    setShowWishlist(!showWishlist);
  };

  const togglePlay: Function = (): void => {
    if (isPlaying == false) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
    // setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    getFeaturedMedia();
  }, []);

  useEffect(() => {
    if (featuredSongs.length > 0) {
      let ns = featuredSongs.map((fs: any) => ({
        name: fs.title,
        image: fs.thumbnailUrl,
        shortLyrics: "hehe",
        id: fs._id,
      }));

      setSongs([...ns, ...ns, ...ns]);
    }
  }, [featuredSongs]);

  return (
    <Transition>
      <PageContainer>
        <MuxAudio
          // src="https://stream.mux.com/qKAAVaxiKFKVAJx6CRPfwErh2u86LqU9g3lBj9rgSgc.m3u8?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlgzWTJMenlCV2g4MDFWbTAyUTl2Z09YMlBJNzh2VEVoMDBKOUNHY2thNlcwMjhZIn0.eyJleHAiOjE2ODIxMTAzMjcsImF1ZCI6InYiLCJzdWIiOiJxS0FBVmF4aUtGS1ZBSng2Q1JQZndFcmgydTg2THFVOWczbEJqOXJnU2djIn0.uJ6IMQagJ0ahw1xeuPFog8A42f7Nwq7KjXK8vmyJNYYMjr6xIl9H0lnD9hGu3-RMq6urCYthe8nvxBTKDfMGwf3ACt5cU53CPS1GhLy12bTjINwQMFP8v4C-Mh8oRALtgUb2x0XaeEntq9fsTHrsu2n_e_q9hT1vs8K6V9eXjRh-Z7jmjL0YKhagLYX-tG1Ktm0wHrnN8knIVDPfLPd316R3br4ba7bZFtS77zl3YZ_yyMfuRqzkAY8dm9ZT-FrtmQXK8DCG8nVhuuhavmXtT-pVBfZFPA7DzUFk4eeWuWeqD2YEab3fSsffLp7ufSuSAvivRILcWEymZ7-Js0OkTg"
          type="hls"
          controls
          ref={audioRef}
          style={{ display: "none" }}
        />
        <SwiperContainer>
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
            slidesPerView={width !== undefined && width > 900 ? 4 : 1}
            centeredSlides
            style={{ overflow: "visible" }}
          >
            {songs &&
              songs.map((item, idx) => (
                <SwiperSlide>
                  {({ isActive }) => {
                    if (isActive) {
                      setActiveSong(item);
                    }
                    return (
                      <CarouselCard
                        song={item}
                        active={isActive}
                        disabled={isPlaying}
                        onClick={() => {
                          togglePlay();
                        }}
                        // setSong={setActiveSong}
                      />
                    );
                  }}
                </SwiperSlide>
              ))}
          </Swiper>
        </SwiperContainer>
        <AnimatePresence>
          {isPlaying && (
            <PlayingSong
              layoutId={activeSong?.name}
              url={activeSong?.image}
            ></PlayingSong>
          )}
        </AnimatePresence>
        <SongDataContainer>
          <SongData>
            <Typography>
              {activeSong ? <h1>{activeSong.name}</h1> : null}
            </Typography>
            <Typography>
              {activeSong ? <p>{activeSong.shortLyrics}</p> : null}
            </Typography>
          </SongData>
          <PlayerOptionsContainer>
            <Icon icon="basil:book-open-solid" width="35px" height="35px" />
            <Box className="player-options">
              <Icon
                icon="material-symbols:skip-previous-rounded"
                width="30px"
                height="30px"
              />
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
              <Icon
                icon="material-symbols:skip-next-rounded"
                width="30px"
                height="30px"
              />
            </Box>
            <Icon
              icon="material-symbols:fullscreen-rounded"
              width="35px"
              height="35px"
              onClick={fullScreenHandler.enter}
            />
          </PlayerOptionsContainer>
        </SongDataContainer>
        <FullScreen handle={fullScreenHandler}>
          {fullScreenHandler.active ? (
            <FullScreenPlayer
              fullScreenHandler={fullScreenHandler}
              song={activeSong}
            />
          ) : null}
        </FullScreen>
        <WhishListButton onClick={toggleWishlistDrawer}>
          <Icon icon="mdi:music-circle" width="30px" height="30px" />
        </WhishListButton>
        <WishlistDrawer
          state={showWishlist}
          toggleDrawer={toggleWishlistDrawer}
        />
      </PageContainer>
    </Transition>
  );
};

export default Home;
