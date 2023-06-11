import { Box } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import {
  DadajiSingleSongStyled,
  DadajiSingleSongTitle,
  DadajiSingleSongFav,
} from './dadajiSong.styles';
import { Icon } from '@iconify/react';
import { IBasicMedia } from '../../interfaces/media.interface';

interface Prop {
  song: IBasicMedia;
  idx: number;
  play: Function;
  isPlaying: boolean;
}
const DadajiSingleSong: FunctionComponent<Prop> = ({
  song,
  isPlaying,
  idx,
  play,
}) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <DadajiSingleSongStyled
      active={isPlaying}
      onClick={() => {
        play(idx);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <DadajiSingleSongTitle>
        {isHover ? (
          <Icon icon="ion:play" width="30" height="30" />
        ) : (
          <Icon icon="tabler:menu" width="30" height="30" />
        )}
        <Box sx={{ marginLeft: '15px' }}>{song?.title} </Box>
      </DadajiSingleSongTitle>
      <DadajiSingleSongFav>
        <Box>2:80</Box>
        {/* <Box sx={{ cursor: "pointer" }}>
          <Icon
            color={isPlaying ? "white" : "#DC009F"}
            icon="mdi:cards-heart-outline"
            width="30"
            height="30"
          />
        </Box> */}
      </DadajiSingleSongFav>
    </DadajiSingleSongStyled>
  );
};
export default DadajiSingleSong;
