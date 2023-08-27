import { styled, Box, Grid } from '@mui/material';

export const ContinueListeningSection = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  //   backgroundColor: "red",
  [theme.breakpoints.down('md')]: {
    flexDirection: "column"
  }
}));
