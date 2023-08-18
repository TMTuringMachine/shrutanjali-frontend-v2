import React, { useEffect, useState } from 'react';
import Transition from '../../components/Transition';
import { PageContainer } from '../page.styles';
import { StyledTextField } from '../../global/global.styles';
import { ContinueListeningSection } from './explore.styles';

//data
import { songs } from '../../helpers/data';
import { Grid, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import SongOverview from '../../components/Explore/SongOverview/songOverview.component';
import CategoriesOverview from '../../components/Explore/CategoriesOverview/CategoriesOverview.component';

import audio from '../../assets/images/audio.png';
import books from '../../assets/images/books.png';
import BottomPlayer from '../../components/BottomPlayer/BottomPlayer.component';
import useMedia from '../../hooks/useMedia';
import { IMedia } from '../../interfaces/media.interface';
import { convertApiMedia } from '../Home/home.utils';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import { useFullScreenHandle } from 'react-full-screen';
import MuxAudio from '@mux/mux-audio-react';
import useWishlist from '../../hooks/useWishlist';
import useAuth from '../../hooks/useAuth';
import AllBooks from '../../utils/AllBooksData';
import BookOverview from '../../components/SingleBook/BookOverview.component';
const Explore = () => {
  const { getLiveMedia, allSongs, populateMedia } = useMedia();
  const [topSongs, setTopSongs] = useState<IMedia[]>([]);
  const fullScreenHandler = useFullScreenHandle();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { getWishlist } = useWishlist();
  const [wishlist, setWishlist] = useState([]);
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
    getLiveMedia();
    populateWishList();
  }, []);

  useEffect(() => {
    console.log(allSongs, 'all songs');
    if (allSongs && allSongs?.length > 0) {
      setTopSongs(convertApiMedia(allSongs));
      console.log(allSongs);
    }
  }, [allSongs]);

  const { blogs } = useAuth();

  const playSong: Function = (idx: number) => {
    playIdxSong(idx, isPlaying);
  };

  const populateWishList = async () => {
    const list = getWishlist();
<<<<<<< HEAD
    if(!list) return;
=======
    if(list == undefined) return;
>>>>>>> c67c37e (add song validations added)
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
      <PageContainer>
        <MuxAudio
          src={currentSong && currentSong?.audios[0].audioId?.playbackUrl}
          type="hls"
          controls
          ref={audioRef}
          style={{ display: 'none' }}
        />
        <StyledTextField
          label={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '10rem',
              }}
            >
              <Icon width="30" height="30" icon="ic:baseline-search" />
              <Box>Search Songs</Box>
            </Box>
          }
          variant="outlined"
          style={{
            margin: '1rem 0px',
            width: '40%',
            borderRadius: '2rem',
          }}
        />
        <ContinueListeningSection>
          {/* {songs.slice(10).map((song) => (
            <SongOverview song={song} />
          ))} */}
        </ContinueListeningSection>
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Browse by interest
        </Typography>
        <ContinueListeningSection onClick={() => blogs()}>
          {/* <CategoriesOverview title="Blogs" imgSrc={audio} /> */}
          <CategoriesOverview title="Audio" imgSrc={audio} />
          <CategoriesOverview title="Books" imgSrc={audio} />
        </ContinueListeningSection>
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Top bhajans
        </Typography>
        <ContinueListeningSection style={{ marginBottom: '120px' }}>
          {topSongs && topSongs?.length > 0
            ? topSongs.map((song, idx) => (
                <SongOverview song={song} handleClick={playSong} idx={idx} />
              ))
            : null}
        </ContinueListeningSection>
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Your Wishlist
        </Typography>
        <ContinueListeningSection>
          {wishlist && wishlist?.length > 0
            ? wishlist.map((song, idx) => (
                <SongOverview song={song} handleClick={playSong} idx={idx} />
              ))
            : null}
        </ContinueListeningSection>
        {/* Books section */}
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Books
        </Typography>
        <ContinueListeningSection style={{ marginBottom: '120px' }}>
          {AllBooks.map((book) => {
            return <BookOverview book={book} />;
          })}
        </ContinueListeningSection>

        <BottomPlayer
          fullScreenHandler={fullScreenHandler}
          nextSong={playNextSong}
          previousSong={playPreviousSong}
          togglePlay={togglePlay}
          progress={progress}
          isPlaying={isPlaying}
          song={currentSong}
          seek={seek}
        />
      </PageContainer>
    </Transition>
  );
};

export default Explore;
