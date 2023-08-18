import { Box, styled } from "@mui/material";

export const BlogOveriewContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  overflow: "hidden",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  transition:"all 0.5s ease-in",
  "&:hover": {
    transform: "translateY(-10px)",
  },
}));

type ImageProps = {
  url?: null | string;
};

export const BlogOverviewImage = styled(Box)<ImageProps>(({ theme, url }) => ({
  width: "100%",
  height: "75%",
  backgroundColor: "red",
  backgroundImage: url
    ? `url('${url}')`
    : `url('https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
}));

export const BlogDataContainer = styled(Box)(() => ({
  padding: "10px",
  flex: 1,
  "& .blog-name": {
    fontSize: "1.3em",
    fontWeight: 700,
    
  },
  "& .blog-date": {
    fontSize: "0.8em",
    color: "#4a4a4af2",
  },
}));




