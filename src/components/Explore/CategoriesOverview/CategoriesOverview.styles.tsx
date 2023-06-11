import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const OverlayedText = styled(Box)(() => ({
  position: 'absolute',
  overflow: 'hidden',
  backgroundColor: 'rgb(0,0,0,0.5)',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  fontSize: '3.5rem',
  color: 'white',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.2s ease-in-out',
  '&:hover': {
    transform: 'scale3d(1.2,1.2,1.2)',
  },
}));
export const CategoryCard = styled(Box)(() => ({
  width: '25%',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  borderRadius: '10px',
  margin: '1rem',
  position: 'relative',
  overflow: 'hidden',
}));
