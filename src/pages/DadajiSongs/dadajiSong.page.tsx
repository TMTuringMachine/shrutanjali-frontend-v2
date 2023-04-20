import Transition from '../../components/Transition';
import { PageContainer } from '../page.styles';
import { Box } from '@mui/material';

import dadaji from '../../assets/images/dadaji.png';
import {
  DadajiSongsContainer,
  ImageContainer,
  SongsContainer,
  DadajiName,
} from './dadajiSong.styles';
import DadajiSingleSong from './DadajiSingleSong';

const DadajiSongs = () => {
  return (
    <Transition>
      <PageContainer>
        <DadajiSongsContainer>
          <ImageContainer imgWidth="580px">
            <img src={dadaji} alt="" />
            <DadajiName>Shri Dilip Kumar Roy - Dadaji</DadajiName>
          </ImageContainer>
          <SongsContainer>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <h1>Dadaji’s songs</h1>
              <Box
                sx={{
                  height: '80vh',
                  maxHeight: '80vh',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  marginTop: '1rem',
                  width: '100%',
                }}
              >
                <DadajiSingleSong title="helooo" />
                <DadajiSingleSong title="ed dfv dfv dfv dfv dfv  vfdv f v drfv d df vgdfv fv dfv dfv dfv f v" />
              </Box>
            </Box>
          </SongsContainer>
        </DadajiSongsContainer>
      </PageContainer>
    </Transition>
  );
};
export default DadajiSongs;
