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
import { CircularProgress, LinearProgress, Skeleton } from "@mui/material";
import { Box } from "@mui/system";

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
  const [hovered, setHovered] = useState(false);
  return (
    <SongOverviewContainer
      onClick={() => {
        handleClick(idx);
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <img
        src={optimizeImage(song?.thumbnailUrl)}
        loading="lazy"
        onLoad={() => setImageLoading(false)}
        color="#FF9764"
        // hidden={imageLoading}
        style={{
          // display: imageLoading ? "none" : "block",
          width: "100%",
          flex: 1,
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        {hovered ? (
          <Icon
            icon="material-symbols:play-circle-rounded"
            width="60px"
            height="60px"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-100%)",
            }}
          />
        ) : null}
      </Box>
      <div
        style={{
          display: imageLoading ? "block" : "none",
          // placeItems: "center",
          position: "absolute",
          width: "fit-content",
          height: "fit-content",

          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          // flex: 1,
        }}
      >
        <CircularProgress />
      </div>
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
