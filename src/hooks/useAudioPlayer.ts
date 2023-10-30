import React, {
  FunctionComponent,
  useCallback,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
} from 'react';
import axiosInstance from '../utils/axiosInstance';

interface Props {
  songList: any;
  ref?: any;
}

interface songChangeProps {
  playing?: boolean;
}

const useAudioPlayer = ({ songList, ref }: Props) => {
  const [songs, setSongs] = useState<any>(songList);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currSongStreams, setCurrSongStreams] = useState<number>(0);
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
      setIsPlaying(false);;
      setProgress(0);

      ref.current.next();
      if (currentSongIndex === songList.length - 1) {
        setCurrentSongIndex(0);
      } else {

        setCurrentSongIndex(currentSongIndex + 1);
      }
      setTimeout(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      }, 1000)
      // setIsPlaying(false);
      // setProgress(0);
      // // console.log(currentSongIndex, "index right now")
      // if (currentSongIndex === songList?.length - 1) {
      //   setCurrentSongIndex(0);
      // } else {
      //   setCurrentSongIndex(currentSongIndex + 1);
      // }
      //
      // // console.log("IT ENDED BROOOO")
      // setTimeout(() => {
      //
      //   audioRef.current?.play();
      //   setProgress(0)
      //   // ref.current.next()
      //
      //   setIsPlaying(true)
      // }, 500)
      // // nextSong({ playing: true })
    }

    function handleTimeUpdate() {
      if (audio) {
        setProgress(Math.round((audio?.currentTime / audio?.duration) * 100));
      }
    }

    if (audio) {
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [currentSongIndex, songs]);

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.code == 'Space') {
        // // console.log('i am herer you mf');
        e.preventDefault();
        if (isPlaying) {
          pause();
          setIsPlaying(false);
        } else {
          play();
          setIsPlaying(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPlaying]);

  useEffect(() => {
    async function asyncUse() {
      const currentSong = songList[currentSongIndex];
      if (currSongStreams === 0 && isPlaying && currentSong) {
        setCurrSongStreams(1);
        const res = await axiosInstance.post(
          `/media/updateMediaStats/${currentSong._id}`,
          {
            streamCount: 1,
          }
        );
      }
    }
    asyncUse();
  }, [currentSongIndex, isPlaying]);

  const play = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const togglePlay = useCallback(() => {
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
    // // console.log(currentSongIndex, 'here i am next current song index');

    if (currentSongIndex === songs?.length - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex((prev) => prev + 1);
    }
    setProgress(0);
    setCurrSongStreams(0);
    // // console.log(playing, 'here it is');
    setTimeout(() => {
      if (playing) {
        play();
      }
    }, 500);
  }, []);

  const previousSong = useCallback(({ playing }: songChangeProps) => {
    // // console.log(currentSongIndex, 'here i am');
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songs?.length - 1);
    } else {
      setCurrentSongIndex((prev) => prev - 1);
    }
    setProgress(0);
    setCurrSongStreams(0);
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
  //   // console.log(res.url);
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
