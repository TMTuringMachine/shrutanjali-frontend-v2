import React, { FunctionComponent, useState } from "react";

//lib
import { Box, Modal, Slide, Switch, TextField } from "@mui/material";

//styles
import {
  CustomButton,
  ModalContainer,
  StyledTextField,
} from "../../../global/global.styles";
import { CustomForm, SongImage, ButtonContainer } from "./addSongModal.styles";
import AudioFileModal from "./audioFileModal";

interface Props {
  state: boolean;
  toggleModal: Function;
}

interface SongForm {
  name: string;
  thumbnail: File;
}

const AddSongModal: FunctionComponent<Props> = ({ toggleModal, state }) => {
  const [showAudioModal, setShowAudioModal] = useState<boolean>(true);

  const toggleAudioModal = () => {
    setShowAudioModal(!showAudioModal);
  };

  return (
    <Modal
      open={state}
      onClose={() => {
        toggleModal();
      }}
    >
      <Slide in={state} direction="up">
        <ModalContainer width="40vw" left="30vw">
          <p className="modal-title">ADD NEW SONG</p>
          <SongImage url={null} />
          <CustomForm>
            <StyledTextField
              label="Song Name"
              required
              variant="standard"
              fullWidth
            />
            <ButtonContainer>
              <CustomButton>ADD SONG IMAGE</CustomButton>
              <CustomButton onClick={toggleAudioModal}>
                ADD AUDIO FILE
              </CustomButton>
              <CustomButton>ADD LYRIC FILE</CustomButton>
            </ButtonContainer>
            <AudioFileModal
              state={showAudioModal}
              toggleModal={toggleAudioModal}
            />
            <Switch />
            <CustomButton>ADD</CustomButton>
          </CustomForm>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AddSongModal;
