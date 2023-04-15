import { Button, Modal, Slide } from "@mui/material";
import React, { FunctionComponent } from "react";
import { CustomButton, ModalContainer, StyledTextField } from "../../../global/global.styles";
import { CustomForm, RootContainer } from "./addSongModal.styles";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";

interface Props {
  state: boolean;
  toggleModal: Function;
}
const AudioFileModal: FunctionComponent<Props> = ({ state, toggleModal }) => {
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone();

  return (
    <Modal
      open={state}
      onClose={() => {
        toggleModal();
      }}
    >
      <Slide in={state} direction="up">
        <ModalContainer
          width="30vw"
          left="35vw"
          height="fit-content"
          top="20vh"
        >
          <div className="modal-title">ADD AUDIO FILE</div>
          <CustomForm>
            <StyledTextField label="Language" variant="standard" />
            <RootContainer {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <Icon
                icon="material-symbols:cloud-upload"
                width="50px"
                height="50px"
              />
              <p className="root-title">Drag and drop file </p>
              <p>OR</p>
              <Button>BROWSE FILES</Button>
            </RootContainer>
            <CustomButton>ADD</CustomButton>
          </CustomForm>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AudioFileModal;
