import React, { useEffect, useState } from "react";
import Transition from "../../components/Transition";
import { PageContainer } from "../page.styles";
import { StyledTextField } from "../../global/global.styles";
import { ContinueListeningSection, EmptyWishList } from "./explore.styles";
import { useLocation } from "react-router-dom";
import {Grid,Typography,Box,useTheme,Pagination,CircularProgress} from "@mui/material";
import { Icon } from "@iconify/react";
import SongOverview from "../../components/Explore/SongOverview/songOverview.component";
import BottomPlayer from "../../components/BottomPlayer/BottomPlayer.component";
import useMedia from "../../hooks/useMedia";
import { IMedia } from "../../interfaces/media.interface";
import { convertApiMedia } from "../Home/home.utils";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import { useFullScreenHandle } from "react-full-screen";
import MuxAudio from "@mux/mux-audio-react";
import useWishlist from "../../hooks/useWishlist";


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
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
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
    setCurrentSongIndex(0);
  }, []);

  const handlePageChange = (_: any, value: number) => {
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
    if (allSongs && allSongs?.length > 0) {
      setTopSongs(convertApiMedia(allSongs));
    }
  }, [allSongs]);

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
  useEffect(() => {
    console.log(currentSong, "this is current song");
  }, [currentSong]);

  return (
    <Transition>
      <PageContainer style={{ paddingBottom: "200px" }}>
        <MuxAudio
          src={
            currentSong &&
            currentSong?.audios[currentAudioIndex].audioId?.playbackUrl
          }
          type="hls"
          controls
          ref={audioRef}
          style={{ display: "none" }}
        />
        {/* <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
          <StyledTextField
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
              border: "1px solid gray",
              textAlign: "center",
              borderRadius: "10px",
              "& input": {
                textAlign: "center",
              },
              [breakpoints.down("md")]: {
                width: "100%",
              },
            }}
          />
        </Box> */}
        <ContinueListeningSection>
        </ContinueListeningSection>
        <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          All Songs
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
                  <Grid item xs={10} sm={5} md={3} lg={2} key={song?.title}>
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
                  <Grid item sm={2} key={idx}>
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
        <BottomPlayer
          fullScreenHandler={fullScreenHandler}
          nextSong={playNextSong}
          previousSong={playPreviousSong}
          togglePlay={togglePlay}
          progress={progress}
          isPlaying={isPlaying}
          song={location.state ? location.state : currentSong}
          currentAudioIndex={currentAudioIndex}
          setCurrentAudioIndex={setCurrentAudioIndex}
          seek={seek}
        />
      </PageContainer>
    </Transition>
  );
};

export default Explore;
