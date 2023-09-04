import { styled, Box } from '@mui/material';
// import { } from 'react-router-dom';
// import {L} from 'react-router-dom'; 
export const BlogText = styled(Box)(() => ({
  fontSize: "1.1em"
}))


type ImageProps = {
  url?: null | string;
};

export const BlogBannerImage = styled(Box)<ImageProps>(({ theme, url }) => ({
  width: "100%",
  height: "400px",
  marginTop: "20px",
  borderRadius: "20px",
  overflow: "hidden",
  backgroundColor: "red",
  marginBottom: "20px",
  backgroundImage: url
    ? `url('${url}')`
    : `url('https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: 'flex',
  flexDirection: "column",
  justifyContent: "end",
  padding: "20px",
  fontSize: "2em",
  color: "#fff",
  
}));
