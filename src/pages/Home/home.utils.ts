import { IBasicMedia, IMedia } from "../../interfaces/media.interface";

export const convertApiMedia = (songs: any): IMedia[] => {
  let res: IMedia[] = [];

  songs.forEach((s: any) => {
    res.push({
      title: s.title,
      _id: s._id,
      isFeatured: s?.isFeatured,
      audios: s.audios,
      lyrics: s?.lyrics,
      isLive: s?.isLive,
      thumbnailUrl: s?.thumbnailUrl,
      streams: s.streams,
    });
  });

  return res;
};

export const convertApiBasicMedia = (songs: any): IBasicMedia[] => {
  let res: IBasicMedia[] = [];

  songs.forEach((s: any) => {
    res.push({
      title: s.title,
      _id: s._id,
      isFeatured: s?.isFeatured,
      audio: s?.audio,
      isLive: s?.isLive,
      streams: s.streams,
    });
  });

  return res;
};

