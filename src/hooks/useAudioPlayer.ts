import React, {
  FunctionComponent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import axiosInstance from "../utils/axiosInstance";

interface Props {
  songList: any;
}

const useAudioPlayer = ({ songList }: Props) => {
  const [songs, setSongs] = useState<any>(songList);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    const audio = audioRef.current;

    function handlePlay() {
      setIsPlaying(true);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleEnded() {
      setIsPlaying(false);
      setProgress(0);
      if (currentSongIndex === songs.length - 1) {
        setCurrentSongIndex(0);
      } else {
        setCurrentSongIndex(currentSongIndex + 1);
      }
    }

    function handleTimeUpdate() {
      if (audio) {
        setProgress(Math.round((audio?.currentTime / audio?.duration) * 100));
      }
    }

    if (audio) {
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [currentSongIndex, songs]);

  const play = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const nextSong = useCallback(() => {
    console.log(currentSongIndex, "i am called");
    if (currentSongIndex === songs?.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  }, []);

  const previousSong = useCallback(() => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songs?.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  }, []);

  // const getPlaybackUrl = useCallback(async (playbackId: string) => {
  //   //getplayback url from apu using playbackid
  //   const res: any = await axiosInstance.get(`/mux/${playbackId}`);
  //   console.log(res.url);
  //   return res.url;
  // }, []);

  return {
    play,
    pause,
    audioRef,
    progress,
    nextSong,
    previousSong,
    currentSongIndex,
    currentSong: songList ? songList[currentSongIndex] : null,
    setCurrentSongIndex,
  };
};

export default useAudioPlayer;
