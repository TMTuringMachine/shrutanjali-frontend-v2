import React, {
  FunctionComponent,
  useState,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";

//libs
import { FullScreenHandle } from "react-full-screen";
import { Icon } from "@iconify/react";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from "@mui/material";

//interfaces
import { Song } from "../../interfaces/song.interface";

//styles
import {
  PlayerContainer,
  Overlay,
  SongInfoContainer,
  ProgressBar,
  PlayerOptions,
  LyricsContainer,
  LyricsText,
} from "./FullScreenPlayer.styles";
import { IMedia } from "../../interfaces/media.interface";
import useMedia from "../../hooks/useMedia";

interface Props {
  fullScreenHandler: FullScreenHandle;
  song: IMedia | null;
  nextSong: Function;
  previousSong: Function;
  togglePlay: Function;
  progress: number;
  isPlaying: boolean;
  seek: Function;
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
}) => {
  const [readMode, setReadMode] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useState<boolean>(true);
  const [language, setlanguage] = React.useState<number>(0);
  const ref = useRef<HTMLDivElement>();

  const { getSongLyrics, lyricState } = useMedia();

  useEffect(() => {
    if (song) {
      if (song?.lyrics?.length === 0) {
        return;
      }
      getSongLyrics(song.lyrics[language].url);
    }
  }, [song, language]);

  const handleMouseMove = (e: MouseEvent) => {
    const timer = ref?.current?.getAttribute("timer");

    if (timer) {
      clearTimeout(timer);
      ref?.current?.setAttribute("timer", "");
    }

    const t = setTimeout(() => {
      ref?.current?.setAttribute("timer", "");
      setShowPlayer(false);
    }, 5000);

    ref?.current?.setAttribute("timer", t);
    setShowPlayer(true);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleReadMode = () => {
    setReadMode(!readMode);
  };

  const handleChange = (event: any) => {
    setlanguage(event.target.value);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <PlayerContainer url={song?.thumbnailUrl} ref={ref} read={readMode}>
        <Overlay visible={showPlayer}>
          <SongInfoContainer>
            <img src={song!.thumbnailUrl} alt="" />
            <h1 className="song-name">{song!.title}</h1>
          </SongInfoContainer>
          <Slider
            sx={{ width: "100%" }}
            color="secondary"
            value={progress}
            onChange={(e: any) => seek(e.target.value)}
          />

          <PlayerOptions>
            <Icon
              color="white"
              icon="basil:book-open-solid"
              width="35px"
              height="35px"
              onClick={() => toggleReadMode()}
            />
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
                    ? "material-symbols:pause-circle-rounded"
                    : "material-symbols:play-circle-rounded"
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
            <Icon
              color="white"
              icon="tabler:arrows-diagonal-minimize-2"
              width="35px"
              height="35px"
              onClick={fullScreenHandler.exit}
            />
          </PlayerOptions>
        </Overlay>
      </PlayerContainer>
      <LyricsContainer read={readMode}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography>Lyrics</Typography>
          {song?.lyrics?.length > 1 ? (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select">Language</InputLabel>
                <Select
                  labelId="demo-simple-select"
                  id="demo-simple"
                  value={language}
                  label="Language"
                  onChange={handleChange}
                  
                >
                  {song?.lyrics.map((ly, idx) => (
                    <MenuItem value={idx}> {ly.language}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : null}
        </Box>
        {lyricState.loading ? (
          <CircularProgress />
        ) : (
          <LyricsText>
            {lyricState?.lyrics?.split("\n").map((item) => (
              <p>{item}</p>
            ))}
          </LyricsText>
        )}
      </LyricsContainer>
    </Box>
  );
};

export default FullScreenPlayer;
