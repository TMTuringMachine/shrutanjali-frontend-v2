import React, { FunctionComponent, useEffect, useState } from "react";

//lib
import {
  Box,
  Button,
  Modal,
  Slide,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";

//styles
import {
  CustomButton,
  ModalContainer,
  StyledTextField,
} from "../../../global/global.styles";
import {
  CustomForm,
  SongImage,
  ButtonContainer,
  RootContainer,
  MainForm,
  FilePreview,
} from "./editSongModal.styles";
import AudioFileModal from "../Common/audioFileModal";
import LyricFileModal from "../Common/lyricFileModal";
import useMedia from "../../../hooks/useMedia";
import * as UpChunk from "@mux/upchunk";
import { IMedia } from "../../../interfaces/media.interface";

interface Props {
  state: boolean;
  toggleModal: Function;
  song: IMedia;
}

interface SongForm {
  name: string;
  thumbnail: File;
}

interface ILyrics {
  url?: any;
  language?: any;
}

interface IAudio {
  audioId?: any;
  language?: any;
}

const EditSongModal: FunctionComponent<Props> = ({
  toggleModal,
  state,
  song,
}) => {
  const [showAudioModal, setShowAudioModal] = useState<boolean>(false);
  const [showLyricModal, setShowLyricModal] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<any>();
  const [title, setTitle] = useState<String>("Default Title");
  const [isFeatured, setFeatured] = useState<boolean>(false);
  const { addMedia, uploadFile, getAudioId } = useMedia();
  const [progress, setProgress] = useState(0);
  const [audioLanaguage, setAudioLanguage] = useState<String>("");
  const [lyricsLanguage, setLyricsLanguage] = useState<String>("");
  const [audios, setAudio] = useState<IAudio[]>([]);
  const [lyrics, setLyrics] = useState<ILyrics[] | undefined>([]);
  const [preview, setPreview] = useState<string>();

  const toggleAudioModal = () => {
    setShowAudioModal(!showAudioModal);
  };

  const toggleLyricModal = () => {
    setShowLyricModal(!showLyricModal);
  };

  useEffect(() => {
    setTitle(song?.title);
    setFeatured(song?.isFeatured);
    setAudio(song?.audios);
    setPreview(song?.thumbnailUrl);
    setLyrics(song?.lyrics);
  }, [song]);

  const handleSubmit = async () => {
    const data = {
      title,
      audios,
      lyrics,
      isFeatured,
      image: thumbnail,
    };
    console.log(data);
    addMedia(data);
  };

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      accept: {
        image: [".jpeg", ".png", ".jpg"],
      },
      onDrop: (acceptedFiles) => {
        setThumbnail(acceptedFiles[0]);
        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreview(objectUrl);
      },
    });

  const handleUploadAudio = async (audioFile: File) => {
    try {
      if (audioFile !== null) {
        const response = await fetch(
          "https://shrutanjali-api.onrender.com/api/mux",
          {
            method: "POST",
          }
        );
        const url = await response.json();

        const audioId = await getAudioId(url.uploadID);

        const upload = UpChunk.createUpload({
          endpoint: url.url, // Authenticated url
          file: audioFile, // File object with your video file’s properties
          chunkSize: 5120, // Uploads the file in ~5mb chunks
        });
        // Subscribe to events
        upload.on("error", (error: any) => {
          // setStatusMessage(error.detail);
          console.log(error);
        });

        upload.on("progress", (progress: any) => {
          setProgress(progress.detail);
          console.log(progress.detail);
        });

        upload.on("success", (data: any) => {
          const language = audioLanaguage;
          setAudio([...audios, { audioId, language }]);
          console.log("UPLOAD COMPLETE", language);
          console.log(audios);
        });
      } else {
        console.log("PLEASE SELECT AUDIO FILE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = async (lyricFile: File) => {
    if (lyricFile !== null) {
      const { data } = await uploadFile(lyricFile);
      const url: String = data.url;
      const language: String = lyricsLanguage;
      setLyrics([...lyrics, { url, language }]);
      console.log(lyrics);
    } else {
      console.log("FILE NOT SELECTED");
    }
  };

  return (
    <Modal
      open={state}
      onClose={() => {
        toggleModal();
      }}
    >
      <Slide in={state} direction="up">
        <ModalContainer width="70vw" left="15vw" height="fit-content">
          <p className="modal-title">{song?.title}</p>
          <CustomForm>
            <Box
              sx={{
                width: "30%",
                borderRight: "1px solid #a4a4a4",
                paddingRight: "20px",
              }}
            >
              <SongImage url={preview} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <Typography>CHANGE SONG IMAGE:</Typography>

                <RootContainer
                  {...getRootProps({ className: "dropzone" })}
                  isActive={isDragActive}
                >
                  <input {...getInputProps()} />
                  <Icon
                    icon="material-symbols:cloud-upload"
                    width="50px"
                    height="50px"
                  />
                  <p className="root-title">Drag and drop image file </p>
                  <p>OR</p>
                  <Button>BROWSE FILES</Button>
                </RootContainer>
              </Box>
            </Box>
            <MainForm>
              <StyledTextField
                label="Song Name"
                required
                variant="standard"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography>AUDIOS:</Typography>
                {audios?.map((a) => (
                  <FilePreview>
                    {a?.language}{" "}
                    <Icon
                      icon="material-symbols:delete-rounded"
                      width="20px"
                      height="20px"
                      style={{ cursor: "pointer", color: "red" }}
                    />{" "}
                  </FilePreview>
                ))}
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography>LYRICS:</Typography>
                {lyrics?.map((a) => (
                  <FilePreview>
                    {a?.language}{" "}
                    <Icon
                      icon="material-symbols:delete-rounded"
                      width="20px"
                      height="20px"
                      style={{ cursor: "pointer", color: "red" }}
                    />{" "}
                  </FilePreview>
                ))}
              </Box>

              <ButtonContainer>
                <CustomButton onClick={toggleAudioModal}>
                  ADD AUDIO FILE
                </CustomButton>
                <CustomButton onClick={toggleLyricModal}>
                  ADD LYRIC FILE
                </CustomButton>
              </ButtonContainer>
              <AudioFileModal
                state={showAudioModal}
                toggleModal={toggleAudioModal}
                handleUpload={handleUploadAudio}
                _progress={progress}
                setAudioLanguage={setAudioLanguage}
              />
              <LyricFileModal
                state={showLyricModal}
                toggleModal={toggleLyricModal}
                handleUpload={handleUploadFile}
                setLyricsLanguage={setLyricsLanguage}
              />
              <Box className="switch-container">
                <Typography>SHOW ON CAROUSEL:</Typography>
                <Switch
                  onChange={() => setFeatured(!isFeatured)}
                  checked={isFeatured}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <CustomButton>EDIT SONG</CustomButton>
              </Box>
            </MainForm>
          </CustomForm>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default EditSongModal;