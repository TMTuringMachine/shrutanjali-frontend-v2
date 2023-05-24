import React, {
  FunctionComponent,
  useCallback,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
} from "react";
import axiosInstance from "../utils/axiosInstance";

interface Props {
  songList: any;
}

interface songChangeProps {
  playing?: boolean;
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

    const handleKeyPress = (e: any) => {
      console.log(e, "i am called");
      if (e.code == "Space") {
        e.preventDefault();
        togglePlay();
      }
    };

    if (audio) {
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      if (audio) {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        window.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [currentSongIndex, songs]);

  const play = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
    console.log("i am called too");
    if (isPlaying == false) {
      play();
      setIsPlaying(true);
    } else {
      pause();
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback((val: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (val / 100) * audioRef?.current?.duration;
    }
    // setProgress(Math.round((audioRef.current?.currentTime / audioRef.current?.duration) * 100));
  }, []);

  const nextSong = useCallback(({ playing }: songChangeProps) => {
    console.log(currentSongIndex, "here i am");

    if (currentSongIndex === songs?.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
    setProgress(0);
    console.log(playing, "here it is");
    setTimeout(() => {
      if (playing) {
        play();
      }
    }, 500);
  }, []);

  const previousSong = useCallback(({ playing }: songChangeProps) => {
    console.log(currentSongIndex, "here i am");
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songs?.length - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
    setProgress(0);
    setTimeout(() => {
      if (playing) {
        play();
      }
    }, 500);
  }, []);

  const playSong = useCallback((idx: number, playing: boolean) => {
    setCurrentSongIndex(idx);
    setProgress(0);
    setTimeout(() => {
      play();
      setIsPlaying(true);
    }, 500);
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
    isPlaying,
    seek,
    togglePlay,
    playSong,
  };
};

export default useAudioPlayer;
