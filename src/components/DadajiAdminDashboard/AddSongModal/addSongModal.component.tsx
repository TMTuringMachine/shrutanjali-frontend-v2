import React, { FunctionComponent, useState } from 'react';

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
} from './addSongModal.styles';
import AudioFileModal from '../../AdminDashboard/Common/audioFileModal';
import LyricFileModal from '../../AdminDashboard/Common/lyricFileModal';
import useMedia from '../../../hooks/useMedia';
import * as UpChunk from '@mux/upchunk';

interface Props {
  state: boolean;
  toggleModal: Function;
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

const AddSongModal: FunctionComponent<Props> = ({ toggleModal, state }) => {
  const [showAudioModal, setShowAudioModal] = useState<boolean>(false);
  const [showLyricModal, setShowLyricModal] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<any>();
  const [title, setTitle] = useState<String>('Default Title');
  const [isFeatured, setFeatured] = useState<Boolean>(false);
  const { addBasicMedia, uploadFile, getAudioId } = useMedia();
  const [progress, setProgress] = useState(0);
  const [audioLanaguage, setAudioLanguage] = useState<String>('');
  const [lyricsLanguage, setLyricsLanguage] = useState<String>('');
  const [audio, setAudio] = useState<String>('');
  const [lyrics, setLyrics] = useState<String>('');
  const [preview, setPreview] = useState<string>();

  const toggleAudioModal = () => {
    setShowAudioModal(!showAudioModal);
  };

  const toggleLyricModal = () => {
    setShowLyricModal(!showLyricModal);
  };

  const handleSubmit = async () => {
    const data = {
      title,
      audio,
      lyrics,
      isFeatured,
    };
    console.log(data);
    addBasicMedia(data);
  };

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      accept: {
        image: ['.jpeg', '.png', '.jpg'],
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
          // "https://shrutanjali-api.onrender.com/api/mux",
          'http://localhost:5000/api/mux',
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
          const language = audioLanaguage;
          setAudio(audioId);
          console.log('UPLOAD COMPLETE', language);
          console.log(audio, 'audioo');
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
      const url: String = data.url;
      const language: String = lyricsLanguage;
      setLyrics(url);
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
          <p className="modal-title">ADD NEW SONG</p>
          <CustomForm>
            <SongImage url={preview} />
            <MainForm>
              <StyledTextField
                label="Song Name"
                required
                variant="standard"
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
              />

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
                fromDadaji={true}
              />
              <LyricFileModal
                state={showLyricModal}
                toggleModal={toggleLyricModal}
                handleUpload={handleUploadFile}
                setLyricsLanguage={setLyricsLanguage}
                fromDadaji={true}
              />
              <Box className="switch-container">
                <Typography>SHOW ON CAROUSEL:</Typography>
                <Switch onChange={() => setFeatured(!isFeatured)} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <CustomButton onClick={() => handleSubmit()}>
                  ADD SONG
                </CustomButton>
              </Box>
            </MainForm>
          </CustomForm>
        </ModalContainer>
      </Slide>
    </Modal>
  );
};

export default AddSongModal;
