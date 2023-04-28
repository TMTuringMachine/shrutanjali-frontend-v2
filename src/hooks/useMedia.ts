import { useCallback } from "react";
import { IAddMedia, IEditMedia } from "../interfaces/media.interface";
import axiosInstance from "../utils/axiosInstance";

//libs
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//redux
import { setFeaturedSongs } from "../redux/slices/songs.slice";
import { AppDispatch, RootState } from "../redux/store";

const useMedia = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { featuredSongs } = useSelector((state: RootState) => state.songs);

  const getAudioId = useCallback(async (uploadId: String) => {
    const audio = await axiosInstance.get(`/audio/${uploadId}`);
    return audio.data;
  }, []);

  const getAllMedia = useCallback(async () => {
    const data = await axiosInstance.get("/media/all");
    return data;
  }, []);

  const toggleMedia = useCallback(async (mediaId: String) => {
    const { data } = await axiosInstance.post(`/media/toggle/${mediaId}`);
    return data;
  }, []);

  const featureMedia = useCallback(async (mediaId: String) => {
    const { data } = await axiosInstance.post(`/media/feature/${mediaId}`);
    return data;
  }, []);

  const deleteMedia = useCallback(async (mediaId: String) => {
    await axiosInstance.delete(`/media/${mediaId}`);
  }, []);

  const addMedia = useCallback(async (data: IAddMedia) => {
    const form = new FormData();
    form.append("title", data.title.toString());
    form.append("audios", JSON.stringify(data.audios));
    form.append("lyrics", JSON.stringify(data.lyrics) || "");
    form.append("isFeatured", data.isFeatured.toString());
    form.append("image", data.image);

    const res: any = await axiosInstance.post("/media", form);
    console.log(res);
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res: any = await axiosInstance.post("/file", form);
    return res;
  }, []);

  const getFeaturedMedia = useCallback(async () => {
    const res = await axiosInstance.get("/media/featured");
    dispatch(setFeaturedSongs(res.data));
  }, []);

  const editMedia = useCallback(async (data: IEditMedia) => {
    const form = new FormData();
    form.append("title", data.title.toString());
    form.append("audios", JSON.stringify(data.audios));
    form.append("lyrics", JSON.stringify(data.lyrics) || "");
    form.append("isFeatured", data.isFeatured.toString());
    form.append("image", data.image);
    form.append("mediaId",data.mediaId)

    const res: any = await axiosInstance.patch("/media", form);
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
    editMedia
  };
};

export default useMedia;
