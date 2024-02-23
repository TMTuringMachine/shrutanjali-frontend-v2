import { Switch } from "@mui/material";
import React, { FunctionComponent, useState } from "react";

interface Props {
  checked: boolean;
  handleChange: Function;
}

const CustomSwitch: FunctionComponent<Props> = ({ checked, handleChange }) => {
  const [active, setActive] = useState(checked);
  const handleSwitchChange = () => {
    setActive(!active);
    handleChange();
  };
  return (
    <>
      <Switch checked={active} onChange={()=>handleSwitchChange} />
    </>
  );
};

export default CustomSwitch;
