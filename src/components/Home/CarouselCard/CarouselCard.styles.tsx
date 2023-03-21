import { styled, Box } from "@mui/material";

type CardContainerProps = {
  url: string;
};

export const CarouselCardContainer = styled(Box)<CardContainerProps>(
  ({ url }) => ({
    width: "22vw",
    height: "40vh",
    borderRadius: "20px",
    //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    backgroundColor: "#a4a4a4",
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  })
);
