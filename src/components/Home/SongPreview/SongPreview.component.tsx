import { Typography } from "@mui/material";
import React, { FunctionComponent, useEffect } from "react";

//interfaces
import { Song } from "../../../interfaces/song.interface";
import { trimText } from "../../../utils/helper";

//styles
import { SongPreviewContainer, SongInfoContainer } from "./SongPreview.styles";
interface Props {
  song: any;
}

const SongPreview: FunctionComponent<Props> = ({ song }) => {
  useEffect(() => {
    console.log(song, "this is the song")
  }, [song])
  return (
    <SongPreviewContainer>
      {/* <img src={song?.image} alt="" /> */}
      <img src={song?.thumbnailUrl} />
      <SongInfoContainer>
        <Typography className="song-name">{song.title}</Typography>
        <Typography className="song-lyrics">
          {/* {trimText(song?.shortLyrics, 40)} */}
        </Typography>
      </SongInfoContainer>

    </SongPreviewContainer>
  );
};

export default SongPreview;
