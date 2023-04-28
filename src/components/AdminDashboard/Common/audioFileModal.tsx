import { Box, Button, Modal, Slide } from "@mui/material";
import React, { FunctionComponent, useCallback, useState } from "react";
import {
  CustomButton,
  ModalContainer,
  StyledTextField,
} from "../../../global/global.styles";
import {
  FileOverview,
  ModalFormContainer,
  RootContainer,
} from "../AddSongModal/addSongModal.styles";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { trimText } from "../../../utils/helper";

interface Props {
  state: boolean;
  toggleModal: Function;
  handleUpload: Function;
  _progress: number;
  setAudioLanguage: Function;
}
const AudioFileModal: FunctionComponent<Props> = ({
  state,
  toggleModal,
  handleUpload,
  _progress,
  setAudioLanguage,
}) => {
  const [audioFile, setAudioFile] = useState<File>();
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      audio: [".mp3"],
    },
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        setAudioFile(acceptedFiles[0]);
        setFiles([...files, acceptedFiles[0]]);
      },
      [audioFile]
    ),
  });

  const removeFile = (name: string) => {
    console.log(name);
    // const data = audioFile.filter(())
    // setAudioFile();
  };

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
          // height="fit-content"
          top="20vh"
        >
          <div className="modal-title">ADD AUDIO FILE</div>
          <ModalFormContainer>
            <StyledTextField
              onChange={(e) => setAudioLanguage(e.target.value)}
              label="Language"
              variant="standard"
            />
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
              <p className="root-title">Drag and drop mp3 file </p>
              <p>OR</p>
              <Button>BROWSE FILES</Button>
            </RootContainer>
            {files?.map((file) => {
              return (
                <>
                  <FileOverview>
                    <p className="filename">{trimText(file.name, 25)}</p>
                    <Icon
                      icon="material-symbols:delete-rounded"
                      width="20px"
                      height="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeFile(file.name)}
                    />
                  </FileOverview>
                </>
              );
            })}
            <progress value={_progress || 0} max="100" /> {_progress.toString()}{" "}
            / {"100%"}
            <CustomButton onClick={() => handleUpload(audioFile)}>
              ADD
            </CustomButton>
          </ModalFormContainer>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AudioFileModal;
