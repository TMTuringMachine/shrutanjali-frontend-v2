import React, { FunctionComponent, useState } from "react";
import {
  SongOverviewContainer,
  SongOverviewImage,
  SongImage,
  SongDetails,
} from "./songOverview.styles";
import { Song } from "../../../interfaces/song.interface";
import { optimizeImage, trimText } from "../../../utils/helper";
import { IMedia } from "../../../interfaces/media.interface";
import { Icon } from "@iconify/react";
import { CircularProgress, Skeleton } from "@mui/material";

interface Props {
  song: IMedia;
  handleClick: Function;
  idx: number;
}

const CustomSongImage = ({ url }: { url: string }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <>
      <div
        style={{
          display: loaded ? "none" : "block",
          flex: 1,
          width: "100%",
        }}
      >
        <Skeleton height={240} />
      </div>

      <div style={{ display: loaded ? "block" : "none" }}>
        <SongImage
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          src={optimizeImage(url)}
          loading="lazy"
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </div>
      {isHover ? "hehe" : ""}
    </>
  );
};
const SongOverview: FunctionComponent<Props> = ({ song, handleClick, idx }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  return (
    <SongOverviewContainer
      onClick={() => {
        handleClick(idx);
      }}
    >
      <div
        style={{
          display: imageLoading ? "grid" : "none",
          placeItems: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <CircularProgress />
      </div>
      <img
        src={optimizeImage(song?.thumbnailUrl)}
        loading="lazy"
        onLoad={() => setImageLoading(false)}
        // hidden={imageLoading}
        style={{
          display: imageLoading ? "none" : "block",
          width: "100%",
          flex: 1,
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <SongDetails>
        <div className="song-title">{trimText(song?.title, 15)}</div>
        <div className="song-data">
          <div>2:23</div>
          <Icon icon="fe:heart" />
        </div>
      </SongDetails>
    </SongOverviewContainer>
  );
};

export default SongOverview;
