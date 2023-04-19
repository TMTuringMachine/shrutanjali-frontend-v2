import { useCallback } from "react";
import { IAddMedia } from "../interfaces/media.interface";
import axiosInstance from "../utils/axiosInstance";
const useMedia = () => {
    // const dispatch: AppDispatch = useDispatch();
    // const navigate = useNavigate();
  
    // const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  
    const addMedia = useCallback(async (data: IAddMedia) => {
      const form = new FormData();
      form.append('title',data.title.toString());
      form.append('audios',JSON.stringify(data.audios));
      form.append('lyrics',JSON.stringify(data.lyrics)|| "");
      form.append('isFeatured',data.isFeatured.toString());
      form.append('image',data.image);

      const res: any = await axiosInstance.post("/media", form);
        console.log(res)
    }, []);
  
    const uploadFile = useCallback(async (file:File) => {
        const form = new FormData();
        form.append("file",file);
        const res: any = await axiosInstance.post("/file", form);
        return res;
    }, []);

    const getAudioId = useCallback(async(uploadId:String)=>{
      const audio = await axiosInstance.get(`/audio/${uploadId}`);
      return audio.data
    },[])
  
    return {
      addMedia,
      uploadFile,
      getAudioId
    };
  };
  
  export default useMedia;