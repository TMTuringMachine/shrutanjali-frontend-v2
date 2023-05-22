import { useCallback } from 'react';
import {
  IAddBasicMedia,
  IUpdateBasicMedia,
} from '../interfaces/basic.media.interface';
import { IAddMedia, IEditMedia } from '../interfaces/media.interface';
import axiosInstance from '../utils/axiosInstance';

//libs
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//redux
import { setFeaturedSongs, setAllSongs } from "../redux/slices/songs.slice";
import { AppDispatch, RootState } from "../redux/store";

const useMedia = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { featuredSongs, allSongs } = useSelector(
    (state: RootState) => state.songs
  );

  const getAudioId = useCallback(async (uploadId: String) => {
    const audio = await axiosInstance.get(`/audio/${uploadId}`);
    return audio.data;
  }, []);

  const getAllMedia = useCallback(async () => {
    const data = await axiosInstance.get('/media/all');
    return data;
  }, []);

  const getAllBasicMedia = useCallback(async () => {
    const data = await axiosInstance.get('/basicMedia/all');
    return data;
  }, []);

  const getLiveMedia = useCallback(async () => {
    const res = await axiosInstance.get("/media/live");
    dispatch(setAllSongs(res.data));
  }, []);

  const toggleMedia = useCallback(async (mediaId: String) => {
    const { data } = await axiosInstance.post(`/media/toggle/${mediaId}`);
    return data;
  }, []);

  const toggleBasicMedia = useCallback(async (basicMediaId: String) => {
    const { data } = await axiosInstance.post(
      `/basicMedia/toggle/${basicMediaId}`
    );
    return data;
  }, []);

  const featureMedia = useCallback(async (mediaId: String) => {
    const { data } = await axiosInstance.post(`/media/feature/${mediaId}`);
    return data;
  }, []);

  const deleteMedia = useCallback(async (mediaId: String) => {
    await axiosInstance.delete(`/media/${mediaId}`);
  }, []);

  const deleteBasicMedia = useCallback(async (basicMediaId: String) => {
    await axiosInstance.delete(`/basicMedia/${basicMediaId}`);
  }, []);

  const addMedia = useCallback(async (data: IAddMedia) => {
    const form = new FormData();
    form.append('title', data.title.toString());
    form.append('audios', JSON.stringify(data.audios));
    form.append('lyrics', JSON.stringify(data.lyrics) || '');
    form.append('isFeatured', data.isFeatured.toString());
    form.append('image', data.image);

    const res: any = await axiosInstance.post('/media', form);
    console.log(res);
  }, []);

  const addBasicMedia = useCallback(async (data: IAddBasicMedia) => {
    const form: IAddBasicMedia = {
      title: '',
      isFeatured: false,
    };
    form['title'] = data.title.toString();
    form['audio'] = data.audio?.toString() || '';
    form['lyrics'] = data.lyrics?.toString() || '';

    const res: any = await axiosInstance.post('/basicMedia', form);
    console.log(res);
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const res: any = await axiosInstance.post('/file', form);
    return res;
  }, []);

  const getFeaturedMedia = useCallback(async () => {
    const res = await axiosInstance.get('/media/featured');
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
    console.log(res);
  }, []);

  const editBasicMedia = useCallback(async (data: IUpdateBasicMedia) => {
    console.log(data, 'dattaa heree');
    const form: IUpdateBasicMedia = {
      title: '',
      audio: '',
      lyrics: '',
      basicMediaId: '',
    };
    form['title'] = data.title.toString();
    form['audio'] = data.audio?.toString() || '';
    form['lyrics'] = data.lyrics?.toString() || '';
    form['basicMediaId'] = data.basicMediaId?.toString() || '';
    console.log(form, 'formmdata');
    const res: any = await axiosInstance.post('/basicMedia/update', form);
    console.log(res);
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
    getLiveMedia
  };
};

export default useMedia;
