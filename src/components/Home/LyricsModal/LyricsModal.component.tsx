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
import Draggable from "react-draggable";
import PDFViewer from "pdf-viewer-reactjs";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();
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

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleChange = (event: any) => {
    setlanguage(event.target.value);
  };

  useEffect(() => {
    if (song) {
      if (song?.lyrics?.length === 0) {
        return;
      }
      console.log(song.lyrics[language].url);
      getSongLyrics(song.lyrics[language].url);
    }
  }, [song, language]);

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
                  <InputLabel id="demo-simple-select-label">
                    Language
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    onChange={handleChange}
                  >
                    {song.lyrics.map((ly, idx) => (
                      <MenuItem value={idx}> {ly.language}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box>Lyrics for this song are not available</Box>
            )}
          </ModalHeader>
          {lyricState.loading ? (
            <CircularProgress />
          ) : (
            <LyricsConatainer>
              {/*

               {lyricState?.lyrics?.split("\n").map((item) => <p>{item}</p>)}
                   */}
              <div style={{ overflowX: "hidden" }}>
                <Document
                  file={song?.lyrics[language]?.url}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      customTextRenderer={false}
                      key={`page_${index + 1}`}
                      className="pdf-page"
                      pageNumber={index + 1}
                      scale={1.7}
                    />
                  ))}
                </Document>
                
              </div>
            </LyricsConatainer>
          )}
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default LyricsModal;
