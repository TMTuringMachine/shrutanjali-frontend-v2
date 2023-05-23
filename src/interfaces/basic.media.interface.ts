export interface IAddBasicMedia {
  title: string;
  audio?: string;
  lyrics?: string;
  isFeatured: boolean;
}
export interface IbasicMedia {
  title: string;
  audio: any;
  lyrics?: string;
  streams?: Number;
  isLive: boolean;
  createdAt?: string;
  updatedAt?: string;
  _id: string;
}

export interface IUpdateBasicMedia {
  title: string;
  audio: string;
  lyrics?: string;
  basicMediaId: any;
}
