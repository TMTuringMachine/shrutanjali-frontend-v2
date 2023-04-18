export interface IAddMedia{
    title:String;
  audios:Array<IAudio>
  lyrics?:Array<ILyrics>
  isFeatured:Boolean;
  image:any
}

interface IAudio{
  audioId:String;
  language:String;
}

interface ILyrics{
  url:String;
  language:String;
}