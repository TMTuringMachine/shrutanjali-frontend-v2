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

//components
import Transition from "../../components/Transition";
import CarouselCard from "../../components/Home/CarouselCard/CarouselCard.component";
import WishlistDrawer from "../../components/Home/WishlistDrawer/WishlistDrawer.component";

//styles
import { PageContainer } from "../page.styles";
import {
  SwiperContainer,
  SongData,
  SongDataContainer,
  WhishListButton,
} from "./home.styles";

//data
import { songs } from "../../helpers/data";

//interfaces
import { Song } from "../../interfaces/song.interface";
import { Typography } from "@mui/material";

interface Props {}

SwiperCore.use([Navigation, EffectCoverflow, Mousewheel]);

const Home: FunctionComponent<Props> = () => {
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const [showWishlist, setShowWishlist] = useState<boolean>(false);

  const toggleWishlistDrawer: MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    setShowWishlist(!showWishlist);
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
            slidesPerView={4}
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
                      // setSong={setActiveSong}
                    />
                  );
                }}
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
        <SongDataContainer>
          <SongData>
            <Typography>
              {activeSong ? <h1>{activeSong.name}</h1> : null}
            </Typography>
            <Typography>
              {activeSong ? <p>{activeSong.shortLyrics}</p> : null}
            </Typography>
          </SongData>
        </SongDataContainer>
        <WhishListButton onClick={toggleWishlistDrawer}>yo</WhishListButton>
        <WishlistDrawer
          state={showWishlist}
          toggleDrawer={toggleWishlistDrawer}
        />
      </PageContainer>
    </Transition>
  );
};

export default Home;
