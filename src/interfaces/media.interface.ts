export interface IAddMedia{
  title:String;
  audios?:Array<IAudio>
  lyrics?:Array<ILyrics>
  isFeatured:Boolean;
  image:any
}

interface IAudio {
  audioId?: String;
  language?: String;
  id?: string;
}

interface ILyrics{
  url?:String;
  language?:String;
}

export interface IMedia {
  _id: string;
  title: string;
  audio: [
    {
      audioId: string;
      language: string;
    }
  ];
  lyrics?:[{
    url:string;
    language:string;
  }];
  video: string;
  thumbnailUrl: string;
  streams: Number;
  isFeatured:boolean;
  isLive:boolean;
}
