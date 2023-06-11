import { styled, Box } from "@mui/material";

export const SongOverviewContainer = styled(Box)(({ theme }) => ({
  width: "20%",
  height: "250px",
  backgroundColor: theme.palette.background.default,
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  borderRadius: "20px",
  padding: "5px",
  margin: "1rem",
}));

type SongOverviewImageProps = {
  url: string;
  disabled?: boolean;
};

export const SongOverviewImage = styled("div")<SongOverviewImageProps>(
  ({ url, theme, disabled }) => ({
    width: "100%",
    height: "85%",
    borderRadius: "20px",
    //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    backgroundColor: theme.palette.grey[400],
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    transition: "all 0.3s ease-in",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    marginBottom: "5px",

    "& .playicon": {
      display: "none",
    },

    "&:hover": {
      // filter: "brightness(50%)",
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),url('${url}')`,

      "& .playicon": {
        display: "block",
      },
    },

    [theme.breakpoints.down("md")]: {
      width: "80vw",
    },
  })
);

// export const SongOverviewImage = styled('img')(() => ({
//   width: '100%',
//   height: '85%',
//   borderRadius: '20px',
//   objectFit: 'cover',
// }));
