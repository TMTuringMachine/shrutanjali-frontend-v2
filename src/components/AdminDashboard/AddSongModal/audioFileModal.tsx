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
} from "./addSongModal.styles";
import { Icon } from "@iconify/react";
import { useDropzone } from "react-dropzone";
import { trimText } from "../../../utils/helper";
import * as UpChunk from "@mux/upchunk";

interface Props {
  state: boolean;
  toggleModal: Function;
}
const AudioFileModal: FunctionComponent<Props> = ({ state, toggleModal }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      audio: [".mp3"],
    },
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        setAudioFile(acceptedFiles[0]);
      },
      [audioFile]
    ),
  });

  const handleUpload = async () => {
    try {
      if (audioFile !== null) {
        const response = await fetch(
          "http://localhost:5000/api/mux",
          {
            method: "POST",
          }
        );
        const url = await response.json();

        console.log(url.uploadID)

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
          console.log("UPLOAD COMPLETE")
        });
      } else {
        console.log("PLEASE SELECT AUDIO FILE");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFile = () => {
    setAudioFile(null);
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
            <StyledTextField label="Language" variant="standard" />
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
            {audioFile && (
              <FileOverview>
                <p className="filename">{trimText(audioFile.name, 25)}</p>
                <Icon
                  icon="material-symbols:delete-rounded"
                  width="20px"
                  height="20px"
                  style={{ cursor: "pointer" }}
                  onClick={removeFile}
                />
              </FileOverview>
            )}

      <progress value={progress} max="100" /> {progress} / {"100%"}
            <CustomButton onClick={() => handleUpload()}>ADD</CustomButton>
          </ModalFormContainer>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AudioFileModal;
