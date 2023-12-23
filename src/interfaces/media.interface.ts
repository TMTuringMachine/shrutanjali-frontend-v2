export interface IAddMedia {
  title: String;
  audios?: Array<IAudio>;
  lyrics?: Array<ILyrics>;
  isFeatured: Boolean;
  image: any;
}

export interface IEditMedia {
  title: String;
  audios?: Array<IAudio>;
  lyrics?: Array<ILyrics>;
  isFeatured: Boolean;
  image: any;
  mediaId: string;
}

export interface IAudio {
  audioId?: String;
  language?: String;
  id?: string;
}

interface ILyrics {
  url?: String;
  language?: String;
}

export interface IMedia {
  _id: string;
  title: string;
  audios: [
    {
      audioId: any;
      language: string;
      duration?:any
    }
  ];
  lyrics?: [
    {
      url: string;
      language: string;
    }
  ];
  video?: string;
  thumbnailUrl: string;
  streams: number;
  isFeatured: boolean;
  isLive: boolean;
  wishlists: number;
}

export interface IBasicMedia {
  _id: string;
  title: string;
  audio: IAudio;
  streams: Number;
  isFeatured: boolean;
  isLive: boolean;
}
