import React, { FunctionComponent, useState } from 'react';
import { Switch } from '@mui/material';
import useMedia from '../../../hooks/useMedia';
interface IProps {
  featured: boolean;
  songId: string;
  type: string;
}

const SwitchComponent: FunctionComponent<IProps> = ({
  featured,
  songId,
  type,
}) => {
  const { toggleBasicMedia } = useMedia();
  const [check, setChecked] = useState<boolean>(featured);
  const handleChange = async () => {
    let bool: boolean = false;
    if (type !== 'Feature') {
      bool = await toggleBasicMedia(songId);
    }
    setChecked(bool);
  };
  return (
    <>
      <Switch checked={check} onChange={() => handleChange()} />
    </>
  );
};

export default SwitchComponent;
