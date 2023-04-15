import { styled, Box, TextField } from "@mui/material";

export const CustomForm = styled("form")(() => ({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
}));

type SongImageProps = {
  url?: null | string;
};

export const SongImage = styled(Box)<SongImageProps>(({ theme, url }) => ({
  width: "150px",
  height: "150px",
  borderRadius: "100%",
  // backgroundColor: "#bebebe",
  marginTop: theme.spacing(2),
  backgroundImage: url
    ? `url('${url}')`
    : `url('https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png')`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  border: `3px solid ${theme.palette.primary.main}`,
}));

export const ButtonContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  gap: "20px",
  // justifyContent: "space-between",
}));

type RootContainerProps = {
  isActive?: boolean;
};

export const RootContainer = styled(Box)<RootContainerProps>(
  ({ isActive, theme }) => ({
    width: "100%",
    // backgroundColor: "red",
    border: !isActive ? "2px dashed #8B8B8B4D" : "2px dashed red",
    padding: theme.spacing(2),
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  })
);
