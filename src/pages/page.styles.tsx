import { Box, styled } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: '0px 40px',
  [theme.breakpoints.down('md')]: {
    padding: '0px 20px',
  },
}));
