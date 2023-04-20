import { Box } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import shadows from '../../theme/shadows';

import { Icon } from '@iconify/react';

interface Prop {
  title: string;
}
const DadajiSingleSong: FunctionComponent<Prop> = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '98%',
        margin: '1rem 2rem 0rem 0rem',
        boxShadow: shadows[3],
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-between',
          alignItems: 'center',
          flexBasis: '50%',
        }}
      >
        <Box sx={{ cursor: 'pointer', marginRight: '2rem' }}>
          <Icon icon="tabler:menu" width="30" height="30" />
        </Box>
        <Box>{title} </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexBasis: '50%',
        }}
      >
        <Box>2:80</Box>
        <Box sx={{ cursor: 'pointer' }}>
          <Icon
            color="#DC009F"
            icon="mdi:cards-heart-outline"
            width="30"
            height="30"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default DadajiSingleSong;
