import React, { FunctionComponent } from "react";
import {
  SongOverviewContainer,
  SongOverviewImage,
} from "./songOverview.styles";
import { Song } from "../../../interfaces/song.interface";
import { trimText } from "../../../utils/helper";

interface Props {
  song: Song;
}

const SongOverview: FunctionComponent<Props> = ({ song }) => {
  return (
    <SongOverviewContainer>
      <SongOverviewImage src={song.image} />
      <p>{trimText(song.name,20)}</p>
    </SongOverviewContainer>
  );
};

export default SongOverview;
