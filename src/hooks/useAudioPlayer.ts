import React, { FunctionComponent, useCallback, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface Props {
  songList?: any;
}

const useAudioPlayer = ({ songList }: Props) => {
  const [songs, setSongs] = useState<any>(songList);

  const playCurrentSong = useCallback(() => {
    //someting will go here
  }, []);

  const getPlaybackUrl = useCallback(async (playbackId: string) => {
    //getplayback url from apu using playbackid
    const res: any = await axiosInstance.get(`/mux/${playbackId}`);
    console.log(res.url);
    return res.url;
  }, []);

  return {
    playCurrentSong,
    getPlaybackUrl,
  };
};

export default useAudioPlayer;
