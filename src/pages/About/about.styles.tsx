import { Box, Button, styled } from '@mui/material';
import { motion } from 'framer-motion';

export const AboutContainer = styled(Box)(({}) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'flex-end',
  // width: '100%',
  height: 'calc(100vh - 50px)',
  overflowX: 'hidden',
  flexWrap: 'wrap',
}));

interface ImageContainerProp {
  imgWidth: string;
  hover: boolean;
}
export const ImageContainer = styled(Box)<ImageContainerProp>(
  ({ imgWidth, hover }) => ({
    flex: 1,
    flexBasis: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '& img': {
      height: 'calc(100vh - 80px)',
      filter: hover ? 'grayscale(0%)' : 'grayscale(100%)',
      transition: '0.5s',
    },
  })
);

interface ReadMoreButtonProps {
  readmore: boolean;
}

export const ReadMoreButton = styled(Box)<ReadMoreButtonProps>(
  ({ readmore }) => ({
    padding: '1rem 2rem',
    position: 'absolute',
    bottom: '10%',
    cursor: 'pointer',
    transition: '0.5s ease-in',
    backgroundColor: !readmore ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    borderRadius: '2rem',
    color: !readmore ? 'black' : 'white',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
    },
  })
);

export const ReadMoreContainer = styled(motion.div)(({}) => ({
  flexBasis: '50%',
  marginBottom: '2rem',
  //   transition: '1s',
}));

export const ScrollContent = styled(Box)(({}) => ({
  height: 'calc(100vh - 120px)',
  maxHeight: 'calc(100vh - 120px)',
  overflowY: 'scroll',
  fontSize: '1.3rem',
}));
