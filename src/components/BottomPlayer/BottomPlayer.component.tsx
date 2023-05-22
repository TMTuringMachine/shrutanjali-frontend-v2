import { FunctionComponent, MouseEventHandler, useState } from 'react';
import { Icon } from '@iconify/react';

import { Box } from '@mui/material';

interface Prop {
  title: string;
}
const BottomPlayer: FunctionComponent<Prop> = ({ title }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlay: MouseEventHandler<SVGElement> = (): void => {
    setIsPlaying(!isPlaying);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '0.5rem',
      }}
    >
      <Box sx={{ fontSize: '1.2rem', margin: '0.4rem' }}>{title}</Box>
      <input style={{ width: '90%' }} type="range" />
      <Box className="player-options">
        <Icon
          color="black"
          icon="material-symbols:skip-previous-rounded"
          width="40px"
          height="40px"
        />
        <Icon
          color="black"
          icon={
            isPlaying
              ? 'material-symbols:pause-circle-rounded'
              : 'material-symbols:play-circle-rounded'
          }
          width="40px"
          height="40px"
          onClick={togglePlay}
        />
        <Icon
          color="black"
          icon="material-symbols:skip-next-rounded"
          width="40px"
          height="40px"
        />
      </Box>
    </Box>
  );
};
export default BottomPlayer;
