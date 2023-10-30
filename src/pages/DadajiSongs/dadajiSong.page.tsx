import Transition from "../../components/Transition";
import { PageContainer } from "../page.styles";
import { Box, Slider } from "@mui/material";

import dadaji from "../../assets/images/dadaji.png";
import {
  DadajiSongsContainer,
  ImageContainer,
  SongsContainer,
  DadajiName,
  DadajiSingleSongsContainer,
  DadajiSingleSongStyled,
  DadajiPlayerContainer,
} from "./dadajiSong.styles";
import DadajiSingleSong from "./DadajiSingleSong";
import useMedia from "../../hooks/useMedia";
import { useEffect, useState } from "react";
import { convertApiBasicMedia } from "../Home/home.utils";
import { IBasicMedia } from "../../interfaces/media.interface";
import { Icon } from "@iconify/react";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import MuxAudio from "@mux/mux-audio-react";

const DadajiSongs = () => {
  const { getDadajiSongs, dadajiSongs } = useMedia();
  const [songs, setSongs] = useState<IBasicMedia[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
    songList: songs,
  });

  useEffect(() => {
    getDadajiSongs();
  }, []);

  useEffect(() => {
    if (dadajiSongs.length > 0) {
      console.log(dadajiSongs, "here are dadaji songs");
      setSongs(convertApiBasicMedia(dadajiSongs));
    }
  }, [dadajiSongs]);

  const togglePlay: Function = (): void => {
    if (isPlaying == false) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
  };

  const playSong: Function = (idx: number) => {
    playIdxSong(idx, isPlaying);
  };

  const playNextSong = () => {
    nextSong({ playing: isPlaying });
  };

  const playPreviousSong = () => {
    previousSong({ playing: isPlaying });
  };

  useEffect(() => {
    setIsPlaying(playing);
  }, [playing]);

  return (
    <Transition>
      <PageContainer>
        <MuxAudio
          src={currentSong && currentSong?.audio?.playbackUrl}
          type="hls"
          controls
          ref={audioRef}
          style={{ display: "none" }}
        />
        <DadajiSongsContainer>
          <ImageContainer imgWidth="580px">
            <img src={dadaji} alt="" />
            <DadajiName>Shri Dilip Kumar Roy - Dadaji</DadajiName>
          </ImageContainer>
          <SongsContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <h1>Dadaji’s songs</h1>
              <DadajiSingleSongsContainer>
                {songs && songs.length > 0
                  ? songs.map((s, idx) => (
                      <DadajiSingleSong
                        song={s}
                        isPlaying={currentSongIndex === idx}
                        idx={idx}
                        play={playSong}
                      />
                    ))
                  : null}
              </DadajiSingleSongsContainer>
              <DadajiPlayerContainer>
                <Slider
                  sx={{ width: "95%" }}
                  value={progress}
                  onChange={(e: any) => {
                    seek(e.target.value);
                  }}
                />
                <Box className="player">
                  {/* <Icon
                    icon="basil:book-open-solid"
                    width="35px"
                    height="35px"
                  /> */}
                  <Box className="player-options">
                    <Icon
                      icon="material-symbols:skip-previous-rounded"
                      width="30px"
                      height="30px"
                      onClick={() => {
                        playPreviousSong();
                      }}
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
                      onClick={() => {
                        playNextSong();
                      }}
                    />
                  </Box>
                  {/* <Icon
                    icon="material-symbols:fullscreen-rounded"
                    width="35px"
                    height="35px"
                    // onClick={fullScreenHandler.enter}
                  /> */}
                </Box>
              </DadajiPlayerContainer>
            </Box>
          </SongsContainer>
        </DadajiSongsContainer>
      </PageContainer>
    </Transition>
  );
};
export default DadajiSongs;
