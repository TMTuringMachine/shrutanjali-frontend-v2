// import { useCallback } from 'react';
import {
  IAddBasicMedia,
  IUpdateBasicMedia,
} from "../interfaces/basic.media.interface";
// import { IAddMedia, IEditMedia } from '../interfaces/media.interface';
import axiosInstance from "../utils/axiosInstance";
import { useCallback, useState } from "react";
// import { IAddBasicMedia } from "../interfaces/basic.media.interface";
import { IAddMedia, IEditMedia } from "../interfaces/media.interface";
// import axiosInstance from "../utils/axiosInstance";

//libs
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//redux
import {
  setFeaturedSongs,
  setAllSongs,
  setDadajiSongs,
} from "../redux/slices/songs.slice";
import { AppDispatch, RootState, store } from "../redux/store";

interface lyricStateProps {
  loading: boolean;
  lyrics: string | null;
}

const useMedia = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [lyricState, setLyricState] = useState<lyricStateProps>({
    loading: false,
    lyrics: null,
  });

  const { featuredSongs, allSongs, dadajiSongs } = useSelector(
    (state: RootState) => state.songs,
  );

  const getAudioId = useCallback(async (uploadId: String) => {
    const audio = await axiosInstance.get(`/audio/${uploadId}`);
    return audio.data;
  }, []);

  const getAllMedia = useCallback(async () => {
    const data = await axiosInstance.get("/media/all");
    return data;
  }, []);

  const getMediaPaginated = useCallback(async (page: number, limit: number) => {
    const data = await axiosInstance.get(
      `/media/page/?page=${page}&limit=${limit}`,
    );
    return data;
  }, []);

  const getLiveMediaPaginated = useCallback(
    async (page: number, limit: number) => {
      const res = await axiosInstance.get(
        `/media/paginatedLive/?page=${page}&limit=${limit}`,
      );
      dispatch(setAllSongs(res.data))
      return res;
    },
    [],
  );

  const getAllBasicMedia = useCallback(async () => {
    const data = await axiosInstance.get("/basicMedia/all");
    return data;
  }, []);

  const getLiveMedia = useCallback(async () => {
    const res = await axiosInstance.get("/media/live");
    dispatch(setAllSongs(res.data));
  }, []);

  const getDadajiSongs = useCallback(async () => {
    const res = await axiosInstance.get("/basicMedia/all");
    dispatch(setDadajiSongs(res.data));
  }, []);

  const toggleMedia = useCallback(async (mediaId: String) => {
    const { data } = await axiosInstance.post(`/media/toggle/${mediaId}`);
    store.dispatch({
      type: "control/showSnackbar",
      payload: {
        text: "Live Song Toggled Successfully!",
        type: "success",
      },
    });
    return data;
  }, []);

  const toggleBasicMedia = useCallback(async (basicMediaId: String) => {
    const { data } = await axiosInstance.post(
      `/basicMedia/toggle/${basicMediaId}`,
    );
    // console.log(data, 'dattaa');
    store.dispatch({
      type: "control/showSnackbar",
      payload: {
        text: "Live Song Toggled Successfully!",
        type: "success",
      },
    });
    return data;
  }, []);

  const featureMedia = useCallback(async (mediaId: String) => {
    const { data } = await axiosInstance.post(`/media/feature/${mediaId}`);
    store.dispatch({
      type: "control/showSnackbar",
      payload: {
        text: "Song Featured Toggled Successfully!",
        type: "success",
      },
    });
    return data;
  }, []);

  const deleteMedia = useCallback(async (mediaId: String) => {
    await axiosInstance.post(`/media/delete/${mediaId}`);
    store.dispatch({
      type: "control/showSnackbar",
      payload: {
        text: "Song Deleted Successfully!",
        type: "success",
      },
    });
  }, []);

  const deleteBasicMedia = useCallback(async (basicMediaId: String) => {
    await axiosInstance.delete(`/basicMedia/${basicMediaId}`);
    store.dispatch({
      type: "control/showSnackbar",
      payload: {
        text: "Song Deleted Successfully!",
        type: "success",
      },
    });
  }, []);

  const addMedia = useCallback(async (data: IAddMedia) => {
    const form = new FormData();
    form.append("title", data.title.toString());
    form.append("audios", JSON.stringify(data.audios));
    form.append("lyrics", JSON.stringify(data.lyrics) || "");
    form.append("isFeatured", data.isFeatured.toString());
    form.append("image", data.image);

    const res: any = await axiosInstance.post("/media", form);
    if (res) {
      store.dispatch({
        type: "control/showSnackbar",
        payload: {
          text: "Song Added Successfully!",
          type: "success",
        },
      });
    }
    // console.log(res);
  }, []);

  const addBasicMedia = useCallback(async (data: IAddBasicMedia) => {
    const form: IAddBasicMedia = {
      title: "",
      isFeatured: false,
    };
    form["title"] = data.title.toString();
    form["audio"] = data.audio?.toString() || "";
    form["lyrics"] = data.lyrics?.toString() || "";
    form["isFeatured"] = data.isFeatured;

    const res: any = await axiosInstance.post("/basicMedia", form);
    if (res) {
      store.dispatch({
        type: "control/showSnackbar",
        payload: {
          text: "Song Added Successfully!",
          type: "success",
        },
      });
    }
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res: any = await axiosInstance.post("/file", form);
    if (res) {
      store.dispatch({
        type: "control/showSnackbar",
        payload: {
          text: "File Uploaded Successfully!",
          type: "success",
        },
      });
    }
    return res;
  }, []);

  const getFeaturedMedia = useCallback(async () => {
    const res = await axiosInstance.get("/media/featured");
    console.log(res.data, "this is the featured media");
    dispatch(setFeaturedSongs(res.data));
  }, []);

  const editMedia = useCallback(async (data: IEditMedia) => {
    const form = new FormData();
    form.append("title", data.title.toString());
    form.append("audios", JSON.stringify(data.audios));
    form.append("lyrics", JSON.stringify(data.lyrics) || "");
    form.append("isFeatured", data.isFeatured.toString());
    form.append("image", data.image);
    form.append("mediaId", data.mediaId);

    const res: any = await axiosInstance.patch('/media', form);
    // console.log(res);
    if (res) {
      store.dispatch({
        type: "control/showSnackbar",
        payload: {
          text: "Song Edited Successfully!",
          type: "success",
        },
      });
    }
  }, []);

  const editBasicMedia = useCallback(async (data: IUpdateBasicMedia) => {
    // console.log(data, 'dattaa heree');
    const form: IUpdateBasicMedia = {
      title: "",
      audio: "",
      lyrics: "",
      basicMediaId: "",
    };
    form['title'] = data.title.toString();
    form['audio'] = data.audio?.toString() || '';
    form['lyrics'] = data.lyrics?.toString() || '';
    form['basicMediaId'] = data.basicMediaId?.toString() || '';
    // console.log(form, 'formmdata');
    const res: any = await axiosInstance.post('/basicMedia/update', form);
    // console.log(res);
    if (res) {
      store.dispatch({
        type: "control/showSnackbar",
        payload: {
          text: "Song Edited Successfully!",
          type: "success",
        },
      });
    }
  }, []);

  const getSongLyrics = useCallback(async (url: string) => {
    // console.log(url, ' this is the song lyrics url');

    setLyricState({
      loading: true,
      lyrics: null,
    });
    const res = await axiosInstance.post("/media/getTextFromPdf", { url });
    setLyricState({
      loading: false,
      lyrics: res?.data,
    });
  }, []);

  const populateMedia = useCallback(async (list: string[]) => {
    const res = await axiosInstance.post('/media/populate', { list });
    return res.data;
  }, []);

  return {
    addMedia,
    uploadFile,
    getAudioId,
    getFeaturedMedia,
    featuredSongs,
    getAllMedia,
    toggleMedia,
    featureMedia,
    deleteMedia,
    editMedia,
    addBasicMedia,
    getAllBasicMedia,
    editBasicMedia,
    toggleBasicMedia,
    deleteBasicMedia,
    allSongs,
    getLiveMedia,
    getDadajiSongs,
    dadajiSongs,
    getSongLyrics,
    lyricState,
    populateMedia,
    getMediaPaginated,
    getLiveMediaPaginated
  };
};

export default useMedia;
