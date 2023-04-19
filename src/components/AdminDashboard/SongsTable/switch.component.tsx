import React, { FunctionComponent, useState } from 'react'
import { Switch } from "@mui/material";
import useMedia from '../../../hooks/useMedia';
interface IProps {
  featured: boolean;
  songId:string;
  type:string
}

const SwitchComponent:FunctionComponent<IProps> = ({featured,songId,type}) => {
  const {featureMedia,toggleMedia} = useMedia()
  const [check,setChecked] = useState<boolean>(featured);
  const handleChange = async()=>{
    console.log(type==="Feature")
    let bool:boolean;
    if(type==="Feature"){
      
      bool = await featureMedia(songId)
    }
    else{
      bool = await toggleMedia(songId);
    }
    setChecked(bool);
  }
  return (
      <>
    <Switch checked={check} onChange={()=>handleChange()}   />
    </>
  )
}

export default SwitchComponent