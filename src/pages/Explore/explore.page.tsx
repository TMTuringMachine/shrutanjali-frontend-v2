import React, { useEffect, useState } from "react";
import Transition from "../../components/Transition";
import { PageContainer } from "../page.styles";
import { StyledTextField } from "../../global/global.styles";
import { ContinueListeningSection, EmptyWishList } from "./explore.styles";
import { useLocation } from "react-router-dom";
//data
import { songs } from "../../helpers/data";
import {
  Grid,
  Typography,
  Box,
  useTheme,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { Icon } from "@iconify/react";
import SongOverview from "../../components/Explore/SongOverview/songOverview.component";
import CategoriesOverview from "../../components/Explore/CategoriesOverview/CategoriesOverview.component";

import audio from "../../assets/images/audio.png";
import books from "../../assets/images/books.png";
import BottomPlayer from "../../components/BottomPlayer/BottomPlayer.component";
import useMedia from "../../hooks/useMedia";
import { IMedia } from "../../interfaces/media.interface";
import { convertApiMedia } from "../Home/home.utils";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { useFullScreenHandle } from "react-full-screen";
import MuxAudio from "@mux/mux-audio-react";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";
import AllBooks from "../../utils/AllBooksData";
import BookOverview from "../../components/SingleBook/BookOverview.component";
const Explore = () => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(5);
  const { getLiveMedia, allSongs, populateMedia, getLiveMediaPaginated } =
    useMedia();
  const [topSongs, setTopSongs] = useState<IMedia[]>([]);
  const fullScreenHandler = useFullScreenHandle();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { getWishlist } = useWishlist();
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
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
    playSong: playIdxSong,
    isPlaying: playing,
  } = useAudioPlayer({
    songList: topSongs,
  });

  useEffect(() => {
    populateWishList();
  }, []);

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
  };

  const getLiveSongs = async () => {
    const data: any = await getLiveMediaPaginated(page, 10);
    setCount(Math.ceil(parseInt(data.count) / 10));
  };
  useEffect(() => {
    getLiveSongs();
  }, [page]);

  useEffect(() => {
    console.log(allSongs, "all songs");
    if (allSongs && allSongs?.length > 0) {
      setTopSongs(convertApiMedia(allSongs));
      console.log(allSongs);
    }
  }, [allSongs]);

  const { blogs } = useAuth();
  const { breakpoints } = useTheme();
  const playSong: Function = (idx: number) => {
    playIdxSong(idx, isPlaying);
  };

  const populateWishList = async () => {
    const list = getWishlist();
    if (!list || list.lenght === 0) return;
    setWishlist(await populateMedia(list));
  };

  const togglePlay: Function = (): void => {
    if (isPlaying == false) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);

  const playNextSong = () => {
    nextSong({ playing: isPlaying });
  };

  const playPreviousSong = () => {
    previousSong({ playing: isPlaying });
  };

  return (
    <Transition>
      <PageContainer style={{ paddingBottom: "200px" }}>
        <MuxAudio
          src={currentSong && currentSong?.audios[0].audioId?.playbackUrl}
          type="hls"
          controls
          ref={audioRef}
          style={{ display: "none" }}
        />
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <StyledTextField
            // label="Search Songs"
            placeholder="Search Songs"
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              margin: "1rem auto",
              width: "30%",
              backgroundColor: "#fff",
              padding: "10px",
              // border: "none",
              border:'1px solid gray',
              textAlign: "center",
              borderRadius: "10px",
              // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              "& input": {
                textAlign: "center",
              },
              [breakpoints.down("md")]: {
                width: "100%",
              },
            }}
          />
        </Box>
        <ContinueListeningSection>
          {/* {songs.slice(10).map((song) => (
            <SongOverview song={song} />
          ))} */}
        </ContinueListeningSection>
        {/**
           
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Browse by interest
        </Typography>
        <ContinueListeningSection onClick={() => blogs()}>
          <CategoriesOverview title="Audio" imgSrc={audio} />
          <CategoriesOverview title="Books" imgSrc={audio} />
        </ContinueListeningSecion>
            **/}
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Top bhajans
        </Typography>
        <ContinueListeningSection style={{ marginBottom: "120px" }}>
          {topSongs.length === 0 && (
            <Box>
              <CircularProgress />
            </Box>
          )}
          <Grid container spacing={3} columns={10}>
            {topSongs && topSongs?.length > 0
              ? topSongs.map((song, idx) => (
                  <Grid item xs={10} sm={5} md={3} lg={2}>
                    <SongOverview
                      song={song}
                      handleClick={playSong}
                      idx={idx}
                      key={song?.title}
                    />
                  </Grid>
                ))
              : null}
          </Grid>
          <Pagination
            shape="rounded"
            page={page}
            onChange={handlePageChange}
            count={count}
            sx={{ margin: "30px auto" }}
          />
        </ContinueListeningSection>
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Your Wishlist
        </Typography>
        <ContinueListeningSection>
          {wishlist && wishlist.length === 0 && (
            <EmptyWishList>
              <Icon icon="ri:heart-add-fill" width="50px" height="50px" />
              <Typography sx={{ fontSize: "1.5em" }}>
                Your wishlist is empty!
              </Typography>
              <Typography sx={{ color: "gray" }}>
                Add songs to your wishlist to enjoy the songs special to you !
              </Typography>
            </EmptyWishList>
          )}
          <Grid container columns={10} spacing={3}>
            {wishlist && wishlist?.length > 0
              ? wishlist.map((song, idx) => (
                  <Grid item sm={2}>
                    <SongOverview
                      song={song}
                      handleClick={playSong}
                      idx={idx}
                      key={idx}
                    />
                  </Grid>
                ))
              : null}
          </Grid>
        </ContinueListeningSection>
        {/* Books section */}

        {/**
           
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Books
        </Typography>
        <ContinueListeningSection style={{ marginBottom: "120px" }}>
          {AllBooks.map((book) => {
            return <BookOverview book={book} />;
          })}
        </ContinueListeningSection>
           * */}
        <BottomPlayer
          fullScreenHandler={fullScreenHandler}
          nextSong={playNextSong}
          previousSong={playPreviousSong}
          togglePlay={togglePlay}
          progress={progress}
          isPlaying={isPlaying}
          song={location.state ? location.state : currentSong}
          seek={seek}
        />
      </PageContainer>
    </Transition>
  );
};

export default Explore;
