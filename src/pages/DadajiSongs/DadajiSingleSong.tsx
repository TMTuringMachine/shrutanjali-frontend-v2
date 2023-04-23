import { Box } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import {
  DadajiSingleSongStyled,
  DadajiSingleSongTitle,
  DadajiSingleSongFav,
} from './dadajiSong.styles';
import { Icon } from '@iconify/react';

interface Prop {
  title: string;
}
const DadajiSingleSong: FunctionComponent<Prop> = ({ title }) => {
  return (
    <DadajiSingleSongStyled>
      <DadajiSingleSongTitle>
        <Box sx={{ cursor: 'pointer', marginRight: '2rem' }}>
          <Icon icon="tabler:menu" width="30" height="30" />
        </Box>
        <Box>{title} </Box>
      </DadajiSingleSongTitle>
      <DadajiSingleSongFav>
        <Box>2:80</Box>
        <Box sx={{ cursor: 'pointer' }}>
          <Icon
            color="#DC009F"
            icon="mdi:cards-heart-outline"
            width="30"
            height="30"
          />
        </Box>
      </DadajiSingleSongFav>
    </DadajiSingleSongStyled>
  );
};
export default DadajiSingleSong;
