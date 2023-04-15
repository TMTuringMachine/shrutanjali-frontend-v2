import React, { FunctionComponent, useState } from "react";

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
} from "./addSongModal.styles";
import AudioFileModal from "./audioFileModal";
import LyricFileModal from "./lyricFileModal";

interface Props {
  state: boolean;
  toggleModal: Function;
}

interface SongForm {
  name: string;
  thumbnail: File;
}

const AddSongModal: FunctionComponent<Props> = ({ toggleModal, state }) => {
  const [showAudioModal, setShowAudioModal] = useState<boolean>(false);
  const [showLyricModal, setShowLyricModal] = useState<boolean>(false);

  const toggleAudioModal = () => {
    setShowAudioModal(!showAudioModal);
  };

  const toggleLyricModal = () => {
    setShowLyricModal(!showLyricModal);
  };

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      accept: {
        image: [".jpeg", ".png", ".jpg"],
      },
    });

  return (
    <Modal
      open={state}
      onClose={() => {
        toggleModal();
      }}
    >
      <Slide in={state} direction="up">
        <ModalContainer width="70vw" left="15vw" height="fit-content">
          <p className="modal-title">ADD NEW SONG</p>
          <CustomForm>
            <SongImage url={null} />

            <MainForm>
              <StyledTextField
                label="Song Name"
                required
                variant="standard"
                fullWidth
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography>UPLOAD SONG IMAGE:</Typography>

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
              />
              <LyricFileModal
                state={showLyricModal}
                toggleModal={toggleLyricModal}
              />
              <Box className="switch-container">
                <Typography>SHOW ON CAROUSEL:</Typography>
                <Switch />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <CustomButton>ADD SONG</CustomButton>
              </Box>
            </MainForm>
          </CustomForm>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AddSongModal;
