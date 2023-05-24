import {
  Box,
  CircularProgress,
  MenuItem,
  Modal,
  Select,
  Slide,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { ModalContainer } from "../../../global/global.styles";
import useMedia from "../../../hooks/useMedia";
import { IMedia } from "../../../interfaces/media.interface";
import { LyricsConatainer, ModalHeader } from "./LyricsModal.styles";

interface Props {
  state: boolean;
  toggleModal: Function;
  song: IMedia;
}

const LyricsModal: FunctionComponent<Props> = ({
  state,
  toggleModal,
  song,
}) => {
  const { getSongLyrics, lyricState } = useMedia();
  const [language, setlanguage] = React.useState<number>(0);

  const handleChange = (event:Input) => {
    setlanguage(event.target.value);
  };

  useEffect(() => {
    if (song) {
      if (song?.lyrics?.length === 0) {
        return;
      }
      getSongLyrics(song.lyrics[language].url);
    }
  }, [song,language]);

  return (
    <Modal
      open={state}
      onClose={() => {
        toggleModal();
      }}
    >
      <Slide direction="up" in={state}>
        <ModalContainer width="40vw" height="fit-content" left="30vw">
          <ModalHeader>
            <div className="song-name">{song?.title}</div>
            {song?.lyrics.length > 1 ? (
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Language</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    onChange={handleChange}
                  >
                    {song.lyrics.map((ly,idx) => (
                      <MenuItem value={idx}> {ly.language}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : null}
          </ModalHeader>
          {lyricState.loading ? (
            <CircularProgress />
          ) : (
            <LyricsConatainer>
              {lyricState?.lyrics?.split("\n").map((item) => (
                <p>{item}</p>
              ))}
            </LyricsConatainer>
          )}
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default LyricsModal;
