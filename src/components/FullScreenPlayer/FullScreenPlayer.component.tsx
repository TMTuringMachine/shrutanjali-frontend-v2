import React, {
  FunctionComponent,
  useState,
  MouseEventHandler,
  useEffect,
  useRef,
} from 'react';

//libs
import { FullScreenHandle } from 'react-full-screen';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Popover,
  Select,
  Slider,
  Typography,
  useTheme,
} from '@mui/material';

//interfaces
import { Song } from '../../interfaces/song.interface';

//styles
import {
  PlayerContainer,
  Overlay,
  SongInfoContainer,
  ProgressBar,
  PlayerOptions,
  LyricsContainer,
  LyricsText,
} from './FullScreenPlayer.styles';
import { IAudio, IMedia } from '../../interfaces/media.interface';
import useMedia from '../../hooks/useMedia';
import { OptionButton } from '../../pages/Home/home.styles';

interface Props {
  fullScreenHandler: FullScreenHandle;
  song: IMedia | null;
  nextSong: Function;
  previousSong: Function;
  togglePlay: Function;
  progress: number;
  isPlaying: boolean;
  seek: Function;
  currentAudioIndex: any;
  setCurrentAudioIndex: Function;
}

const FullScreenPlayer: FunctionComponent<Props> = ({
  song,
  nextSong,
  previousSong,
  togglePlay: toggle,
  progress,
  fullScreenHandler,
  isPlaying,
  seek,
  currentAudioIndex,
  setCurrentAudioIndex
}) => {
  const [readMode, setReadMode] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(true);
  const [language, setLanguage] = React.useState<number>(0);
  const ref = useRef<HTMLDivElement>();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [audioAnchorEl, setAudioAnchorEl] = useState(null);
  const audioOpen = Boolean(audioAnchorEl);
  const audioPopoverId = audioOpen ? 'audio-popover' : undefined;
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAudioClick = (event: any) => {
    setAudioAnchorEl(event.currentTarget)
  }

  const handleAudioClose = () => {
    setAudioAnchorEl(null)
  }

  const { getSongLyrics, lyricState } = useMedia();

  const theme = useTheme();

  useEffect(() => {
    if (song) {
      if (song.lyrics === undefined) {
        return;
      }
      if (song.lyrics.length > 0) {
        getSongLyrics(song.lyrics[language]?.url);
      }

    }
  }, [song, language]);

  const handleMouseMove = (e: MouseEvent) => {
    const timer = ref?.current?.getAttribute('timer');

    if (timer) {
      clearTimeout(timer);
      ref?.current?.setAttribute('timer', '');
    }

    const t = setTimeout(() => {
      ref?.current?.setAttribute('timer', '');
      setShowPlayer(false);
    }, 5000);

    ref?.current?.setAttribute('timer', t);
    setShowPlayer(true);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleReadMode = () => {
    setReadMode(!readMode);
  };

  const handleChange = (event: any) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
      <PlayerContainer url={song?.thumbnailUrl} ref={ref} read={readMode}>
        <Overlay visible={showPlayer}>
          <SongInfoContainer>
            <img src={song!.thumbnailUrl} alt="" />
            <h1 className="song-name">{song!.title}</h1>
          </SongInfoContainer>
          <Slider
            sx={{ width: '100%' }}
            color="secondary"
            value={progress}
            onChange={(e: any) => seek(e.target.value)}
          />

          <PlayerOptions>
            <Box className="opt-container">
              <Icon
                color={readMode ? theme.palette.primary.main : '#fff'}
                icon="basil:book-open-solid"
                width="35px"
                height="35px"
                onClick={() => toggleReadMode()}
              />

              <Icon
                color="white"
                icon="fe:heart"
                width="35px"
                height="35px"
                onClick={() => { }}
              />
            </Box>
            <Box className="player-options">
              <Icon
                color="white"
                icon="material-symbols:skip-previous-rounded"
                width="40px"
                height="40px"
                onClick={() => {
                  previousSong();
                }}
              />
              <Icon
                color="white"
                icon={
                  isPlaying
                    ? 'material-symbols:pause-circle-rounded'
                    : 'material-symbols:play-circle-rounded'
                }
                width="80px"
                height="80px"
                onClick={() => {
                  toggle();
                }}
              />
              <Icon
                color="white"
                icon="material-symbols:skip-next-rounded"
                width="40px"
                height="40px"
                onClick={() => {
                  nextSong();
                }}
              />
            </Box>
            <Box className="opt-container">
              <Icon
                color="white"
                icon="material-symbols:headphones"
                width="35px"
                height="35px"
                onClick={handleAudioClick}
              />
              <Icon
                color="white"
                icon="tabler:arrows-diagonal-minimize-2"
                width="35px"
                height="35px"
                onClick={fullScreenHandler.exit}
              />
            </Box>
          </PlayerOptions>
          <Popover
            id={audioPopoverId}
            open={audioOpen}
            anchorEl={audioAnchorEl}
            onClose={handleAudioClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            container={ref.current}
          >
            <Box sx={{ width: 'fit-content', padding: '5px' }}>
              {song?.audios?.map((item: IAudio, idx: number) => (
                <OptionButton
                  active={idx == currentAudioIndex}
                  onClick={() => {
                    setCurrentAudioIndex(idx);
                    toggle();
                    // setIsPlaying(false);
                  }}
                >
                  {item.language}
                </OptionButton>
              ))}
            </Box>
          </Popover>


        </Overlay>
      </PlayerContainer >
      <LyricsContainer read={readMode}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography sx={{ fontSize: '0.8em' }}>Lyrics</Typography>
          {song?.lyrics?.length! > 1 ? (
            <>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {song?.lyrics![language].language}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                container={ref.current}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {song?.lyrics?.map((i, idx) => (
                  <MenuItem
                    value={idx}
                    onClick={() => {
                      setLanguage(idx);
                    }}
                  >
                    {i.language}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : null}
        </Box>
        {lyricState.loading ? (
          <CircularProgress />
        ) : (
          <LyricsText>
            {lyricState?.lyrics?.split('\n').map((item) => (
              <p>{item}</p>
            ))}
          </LyricsText>
        )}
      </LyricsContainer>
    </Box >
  );
};

export default FullScreenPlayer;
