import React from 'react';
import Transition from '../../components/Transition';
import { PageContainer } from '../page.styles';
import { StyledTextField } from '../../global/global.styles';
import { ContinueListeningSection } from './explore.styles';

//data
import { songs } from '../../helpers/data';
import { Grid, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import SongOverview from '../../components/Explore/SongOverview/songOverview.component';
import CategoriesOverview from '../../components/Explore/CategoriesOverview/CategoriesOverview.component';

import audio from '../../assets/images/audio.png';
import books from '../../assets/images/books.png';
import BottomPlayer from '../../components/BottomPlayer/BottomPlayer.component';

const Explore = () => {
  return (
    <Transition>
      <PageContainer>
        <StyledTextField
          label={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '10rem',
              }}
            >
              <Icon width="30" height="30" icon="ic:baseline-search" />
              <Box>Search Songs</Box>
            </Box>
          }
          variant="outlined"
          style={{
            margin: '1rem 0px',
            width: '40%',
            borderRadius: '2rem',
          }}
        />
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Continue listening to
        </Typography>
        <ContinueListeningSection>
          {songs.slice(10).map((song) => (
            <SongOverview song={song} />
          ))}
        </ContinueListeningSection>
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Browse by interest
        </Typography>
        <ContinueListeningSection>
          <CategoriesOverview title="Audio" imgSrc={audio} />
          <CategoriesOverview title="Video" imgSrc={audio} />
          <CategoriesOverview title="Books" imgSrc={audio} />
        </ContinueListeningSection>

        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Top bhajans
        </Typography>
        <ContinueListeningSection>
          {songs.slice(2).map((song) => (
            <SongOverview song={song} />
          ))}
        </ContinueListeningSection>
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            margin: '0',
            left: '0',
            boxShadow: '2px 2px 10px #D3D3D3',
            backgroundColor: 'white',
          }}
        >
          <BottomPlayer title="Test title" />
        </Box>
      </PageContainer>
    </Transition>
  );
};

export default Explore;
