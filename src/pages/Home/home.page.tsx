import React, {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
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

//components
import Transition from "../../components/Transition";
import CarouselCard from "../../components/Home/CarouselCard/CarouselCard.component";
import WishlistDrawer from "../../components/Home/WishlistDrawer/WishlistDrawer.component";

//hooks
import { useWindowSize } from "../../hooks/useWindowSize";

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
import { songs } from "../../helpers/data";

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

  const fullScreenHandler = useFullScreenHandle();
  const { width } = useWindowSize();

  const toggleWishlistDrawer: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    setShowWishlist(!showWishlist);
  };

  const togglePlay: MouseEventHandler<SVGElement> = (): void => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Transition>
      <PageContainer>
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
            {songs.map((item, idx) => (
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
                        setIsPlaying(!isPlaying);
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
                onClick={togglePlay}
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
