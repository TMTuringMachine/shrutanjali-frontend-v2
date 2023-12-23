import React, { FunctionComponent, useEffect, useState } from 'react';

//lib
import {
  Box,
  Button,
  Modal,
  Slide,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@iconify/react';

//styles
import {
  CustomButton,
  ModalContainer,
  StyledTextField,
} from '../../../global/global.styles';
import {
  CustomForm,
  SongImage,
  ButtonContainer,
  RootContainer,
  MainForm,
  FilePreview,
} from './editSongModal.styles';
import AudioFileModal from '../../AdminDashboard/Common/audioFileModal';
import LyricFileModal from '../../AdminDashboard/Common/lyricFileModal';
import useMedia from '../../../hooks/useMedia';
import * as UpChunk from '@mux/upchunk';
import { IbasicMedia } from '../../../interfaces/basic.media.interface';

interface Props {
  state: boolean;
  toggleModal: Function;
  song: IbasicMedia | null;
}

const EditSongModal: FunctionComponent<Props> = ({
  toggleModal,
  state,
  song,
}) => {
  const [showAudioModal, setShowAudioModal] = useState<boolean>(false);
  const [showLyricModal, setShowLyricModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Default Title');
  const { editBasicMedia, uploadFile, getAudioId } = useMedia();
  const [progress, setProgress] = useState(0);
  const [audio, setAudio] = useState<string>('');
  const [lyrics, setLyrics] = useState<string>('');
  const [preview, setPreview] = useState<string>();
  const [basicMediaId, setBasicMediaId] = useState<string>('');

  const toggleAudioModal = () => {
    setShowAudioModal(!showAudioModal);
  };

  const toggleLyricModal = () => {
    setShowLyricModal(!showLyricModal);
  };

  useEffect(() => {
    if (song) {
      console.log('INSIDE USE', song);
      setTitle(song?.title);
      setAudio(song?.audio);
      if (song.lyrics) setLyrics(song?.lyrics);
      setBasicMediaId(song?._id);
    }
  }, [song]);

  const handleSubmit = async () => {
    const data = {
      title,
      audio,
      lyrics,
      basicMediaId,
    };
    console.log(data);
    editBasicMedia(data);
    toggleModal(!state);
  };

  const handleUploadAudio = async (audioFile: File) => {
    try {
      if (audioFile !== null) {
        const response = await fetch(
          "https://shrutanjali-api-ce3d.onrender.com/api/mux",
          // 'http://localhost:5000/api/mux',
          {
            method: 'POST',
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
        upload.on('error', (error: any) => {
          // setStatusMessage(error.detail);
          console.log(error);
        });

        upload.on('progress', (progress: any) => {
          setProgress(progress.detail);
          console.log(progress.detail);
        });

        upload.on('success', (data: any) => {
          setAudio(audioId);
          console.log('UPLOAD COMPLETE');
          console.log(audio, 'audioo');
          setShowAudioModal(!showAudioModal);
        });
      } else {
        console.log('PLEASE SELECT AUDIO FILE');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadFile = async (lyricFile: File) => {
    if (lyricFile !== null) {
      const { data } = await uploadFile(lyricFile);
      const url: string = data.url;
      setLyrics(url);
      setShowLyricModal(!showLyricModal);
      console.log(lyrics);
    } else {
      console.log('FILE NOT SELECTED');
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
            <MainForm>
              <StyledTextField
                label="Song Name"
                required
                variant="standard"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {/* <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <Typography>AUDIOS:</Typography>
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <Typography>LYRICS:</Typography>
              </Box> */}

              <ButtonContainer>
                <CustomButton onClick={toggleAudioModal}>
                  REPLACE AUDIO FILE
                </CustomButton>
                <CustomButton onClick={toggleLyricModal}>
                  REPLACE LYRIC FILE
                </CustomButton>
              </ButtonContainer>
              <AudioFileModal
                state={showAudioModal}
                toggleModal={toggleAudioModal}
                handleUpload={handleUploadAudio}
                _progress={progress}
                fromDadaji={true}
              />
              <LyricFileModal
                state={showLyricModal}
                toggleModal={toggleLyricModal}
                handleUpload={handleUploadFile}
                fromDadaji={true}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <CustomButton onClick={() => handleSubmit()}>
                  EDIT SONG
                </CustomButton>
              </Box>
            </MainForm>
          </CustomForm>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default EditSongModal;
