import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

//interfaces
import { Song } from "../../../interfaces/song.interface";
import { trimText } from "../../../utils/helper";

//styles
import { SongPreviewContainer, SongInfoContainer } from "./SongPreview.styles";
interface Props {
  song: string;
}

const SongPreview: FunctionComponent<Props> = ({ song }) => {
  return (
    <SongPreviewContainer>
      {/* <img src={song?.image} alt="" /> */}
      <SongInfoContainer>
        <Typography className="song-name">{song}</Typography>
        <Typography className="song-lyrics">
          {/* {trimText(song?.shortLyrics, 40)} */}
        </Typography>
      </SongInfoContainer>
    </SongPreviewContainer>
  );
};

export default SongPreview;
