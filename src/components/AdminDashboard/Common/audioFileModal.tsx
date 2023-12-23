import { Box, Button, LinearProgress, Modal, Slide } from "@mui/material";
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

import * as UpChunk from "@mux/upchunk";
interface Props {
  state: boolean;
  toggleModal: Function;
  handleUpload: Function;
  _progress: number;
  fromDadaji?: boolean;
  setAudio: Function;
}
const AudioFileModal: FunctionComponent<Props> = ({
  state,
  toggleModal,
  handleUpload,
  _progress,
  fromDadaji,
  setAudio,
}) => {
  const [audioFile, setAudioFile] = useState<File | null>();
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const [audioLanaguage, setAudioLanguage] = useState<String>("");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      audio: [".mp3", ".mpeg", ".aac"],
    },
    onDrop: useCallback(
      (acceptedFiles: File[]) => {
        setAudioFile(acceptedFiles[0]);
        setFiles([...files, acceptedFiles[0]]);
      },
      [audioFile],
    ),
    multiple: false,
  });
  const [isUploading, setIsUploading] = useState(false);
  const { getAudioId } = useMedia();
  const removeFile = (name: string) => {
    console.log(name);
    // const data = audioFile.filter(())
    // setAudioFile();
  };

  const handleAddClick = async () => {
    try {
      if (audioFile !== null) {
        setIsUploading(true);
        const response = await fetch(
          "https://shrutanjali-api-ce3d.onrender.com/api/mux",
          // 'http://localhost:5000/api/mux',
          {
            method: "POST",
          },
        );
        const url = await response.json();
        const audioId = await getAudioId(url.uploadID);

        const upload = UpChunk.createUpload({
          endpoint: url.url, // Authenticated url
          file: audioFile!, // File object with your video file’s properties
          chunkSize: 5120, // Uploads the file in ~5mb chunks
        });
        // Subscribe to events
        upload.on("error", (error: any) => {
          console.log(error);
        });

        upload.on("progress", (progress: any) => {
          setProgress(progress.detail);
          console.log(progress.detail);
        });

        upload.on("success", (data: any) => {
          // const language = audioLanaguage;
          setAudio({ audioId, language: audioLanaguage });
          setIsUploading(false);
          toggleModal();
          // setShowAudioModal(!showAudioModal);
          setProgress(0);
          setAudioFile(null);
          setFiles([]);
          // console.log('UPLOAD COMPLETE', language);
        });
      } else {
        console.log("PLEASE SELECT AUDIO FILE");
      }
    } catch (error) {
      setIsUploading(false);
      console.log(error);
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
        <ModalContainer
          width="30vw"
          left="35vw"
          // height="fit-content"
          top="20vh"
        >
          <div className="modal-title">ADD AUDIO FILE</div>
          <ModalFormContainer>
            {!fromDadaji && (
              <StyledTextField
                onChange={(e: any) => {
                  if (setAudioLanguage) setAudioLanguage(e.target.value);
                }}
                label="Language"
                variant="standard"
              />
            )}
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
            <LinearProgress variant="determinate" value={progress || 0} />
            <CustomButton disabled={isUploading} onClick={handleAddClick}>
              ADD
            </CustomButton>
          </ModalFormContainer>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AudioFileModal;
