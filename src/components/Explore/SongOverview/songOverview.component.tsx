import React, { FunctionComponent } from "react";
import {
  SongOverviewContainer,
  SongOverviewImage,
} from "./songOverview.styles";
import { Song } from "../../../interfaces/song.interface";
import { trimText } from "../../../utils/helper";
import { IMedia } from "../../../interfaces/media.interface";
import { Icon } from "@iconify/react";

interface Props {
  song: IMedia;
  handleClick: Function;
  idx: number;
}

const SongOverview: FunctionComponent<Props> = ({ song, handleClick, idx }) => {
  return (
    <SongOverviewContainer
      onClick={() => {
        handleClick(idx);
      }}
    >
      <SongOverviewImage url={song?.thumbnailUrl}>
        <Icon
          color="white"
          className="playicon"
          icon={
            !true
              ? "material-symbols:pause-circle-rounded"
              : "material-symbols:play-circle-rounded"
          }
          width="80px"
          height="80px"
        />
      </SongOverviewImage>
      <p>{trimText(song?.title, 20)}</p>
    </SongOverviewContainer>
  );
};

export default SongOverview;
