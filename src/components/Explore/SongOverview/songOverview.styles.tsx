import { styled, Box } from "@mui/material";

export const SongOverviewContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "350px",
  position: "relative",
  backgroundColor: theme.palette.background.default,
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  borderRadius: "15px",
  padding: "10px",
  margin: "1rem",
  display: "flex",
  gap: "10px",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    // width: "100%",
    // margin: "1rem 0px",
    // flexDirection: "row",
    height: "400px",

  },
  cursor: "pointer",
  transition: "all 0.4s ease-in",
  "&:hover": {
    transform: "translateY(-10px)",
  },
}));

type SongOverviewImageProps = {
  url: string;
  disabled?: boolean;
};

type SongImageProps = {
  hidden?: boolean;
};

export const SongImage = styled("img")<SongImageProps>(({ hidden, theme }) => ({
  width: "100%",
  flex: 1,
  display: hidden ? "none" : "block",
  // height:240,
  objectFit: "cover",
  borderRadius: "10px",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "30%",
  },
}));

export const SongDetails = styled("div")(() => ({
  width: "100%",
  fontSize: "1.2em",
  "& .song-data": {
    fontSize: "0.8em",
    display: "flex",
    justifyContent: "space-between",
    color: "gray",
  },
  "& .song-title": {
    fontWeight: 500,
    marginBottom: "2px",
  },
}));

export const SongOverviewImage = styled("div")<SongOverviewImageProps>(
  ({ url, theme, disabled }) => ({
    width: "100%",
    height: "85%",
    borderRadius: "10px",
    //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    backgroundColor: theme.palette.grey[400],
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
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
      width: "100%",
    },
  })
);

// export const SongOverviewImage = styled('img')(() => ({
//   width: '100%',
//   height: '85%',
//   borderRadius: '20px',
//   objectFit: 'cover',
// }));
