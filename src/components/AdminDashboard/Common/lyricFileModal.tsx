import { Button, Modal, Slide } from "@mui/material";
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
import useMedia from "../../../hooks/useMedia";
interface Props {
  state: boolean;
  toggleModal: Function;
  handleUpload: Function;
  setLyricsLanguage: Function;
}
const LyricFileModal: FunctionComponent<Props> = ({
  state,
  toggleModal,
  handleUpload,
  setLyricsLanguage,
}) => {
  const [lyricFile, setLyricFile] = useState<File | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      pdf: [".pdf"],
    },
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        setLyricFile(acceptedFiles[0]);
      },
      [lyricFile]
    ),
  });

  const removeFile = () => {
    setLyricFile(null);
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
          height="fit-content"
          top="20vh"
        >
          <div className="modal-title">ADD LYRIC FILE</div>
          <ModalFormContainer>
            <StyledTextField
              onChange={(e) => setLyricsLanguage(e.target.value)}
              label="Language"
              variant="standard"
            />
            <RootContainer {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <Icon
                icon="material-symbols:cloud-upload"
                width="50px"
                height="50px"
              />
              <p className="root-title">Drag and drop pdf file </p>
              <p>OR</p>
              <Button>BROWSE FILES</Button>
            </RootContainer>
            {lyricFile && (
              <FileOverview>
                <p className="filename">{trimText(lyricFile.name, 25)}</p>
                <Icon
                  icon="material-symbols:delete-rounded"
                  width="20px"
                  height="20px"
                  style={{ cursor: "pointer" }}
                  onClick={removeFile}
                />
              </FileOverview>
            )}
            <CustomButton onClick={() => handleUpload(lyricFile)}>
              ADD
            </CustomButton>
          </ModalFormContainer>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default LyricFileModal;
