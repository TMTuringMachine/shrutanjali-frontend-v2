import { Box, Button, styled } from '@mui/material';
import { motion } from 'framer-motion';
import shadows from '../../theme/shadows';

interface ImageContainerProp {
  imgWidth: string;
}

export const DadajiSongsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  // width: '100%',
  height: 'calc(100vh - 50px)',
  overflow: 'hidden',
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    overflowY: 'scroll',
  },
}));

export const ImageContainer = styled(Box)<ImageContainerProp>(
  ({ imgWidth, theme }) => ({
    flex: 1,
    flexBasis: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '& img': {
      height: 'calc(100vh - 80px)',
      transition: '0.5s',
    },
    [theme.breakpoints.down('md')]: {
      margin: '1rem 0rem',
    },
  })
);

export const SongsContainer = styled(Box)(() => ({
  flex: 1,
  flexBasis: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
}));

export const DadajiName = styled(Box)(() => ({
  padding: '1rem 2rem',
  position: 'absolute',
  bottom: '20%',
  cursor: 'pointer',
  transition: '0.5s ease-in',
  backgroundColor: 'rgba(255,255,255,0.8)',
  borderRadius: '2rem',
  color: 'black',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: 'white',
  },
}));

export const DadajiSingleSongsContainer = styled(Box)(() => ({
  height: '80vh',
  maxHeight: '80vh',
  overflowY: 'scroll',
  overflowX: 'hidden',
  marginTop: '1rem',
  width: '100%',
}));

export const DadajiSingleSongStyled = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '98%',
  margin: '1rem 2rem 0rem 0rem',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  padding: '1rem',
}));

export const DadajiSingleSongTitle = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-between',
  alignItems: 'center',
  flexBasis: '50%',
}));
export const DadajiSingleSongFav = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  flexBasis: '50%',
}));
