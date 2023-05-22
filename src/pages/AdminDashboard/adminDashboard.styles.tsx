import { Box, Button, styled } from '@mui/material';

export const AdminDashboardPage = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
}));

export const AdminDashboardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  flex: 1,
  // backgroundColor: "green",
  display: 'flex',
  gap: '20px',
}));

export const AdminDahboardLeft = styled(Box)(({ theme }) => ({
  flex: 3,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  // backgroundColor: "red",
}));

export const AdminDahboardRight = styled(Box)(({ theme }) => ({
  flex: 1,
  height: '100%',
  display: 'flex',
  justifyContent: 'end',
  // backgroundColor: "blue",
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '40px',
  marginBottom: '30px',
}));

export const Stat = styled(Box)(({ theme }) => ({
  width: '300px',
  height: '20vh',
  backgroundColor: theme.palette.background.default,
  boxShadow: 'rgba(139, 139, 156, 0.2) 0px 7px 29px 0px',
  borderRadius: '30px',

  padding: theme.spacing(3),
  '& .stat-header': {
    fontSize: '3em',
    fontWeight: 600,
  },
  '& .stat-sub': {
    fontWeight: 500,
  },
}));

export const ActionPanelContainer = styled(Box)(({ theme }) => ({
  width: '80%',
  height: 'fit-content',
  backgroundColor: theme.palette.background.default,
  boxShadow: 'rgba(139, 139, 156, 0.2) 0px 7px 29px 0px',
  borderRadius: '30px',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  '& .panel-header': {
    fontWeight: 500,
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: 'fit-content',
  padding: '10px 0px',
  border: `3px solid ${theme.palette.primary.main}`,
}));
