import { styled, Box } from "@mui/material";
import { motion } from "framer-motion";

type CardContainerProps = {
  url: string;
  disabled?: boolean;
  active?: boolean
};

export const CarouselCardContainer = styled(motion.div)<CardContainerProps>(
  ({ url, theme, active, disabled }) => ({
    width: "30vw",
    height: "36vh",
    borderRadius: "20px",
    //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    backgroundColor: theme.palette.grey[400],
    backgroundImage: `url('${url}')`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    transition: "filter 0.3s ease-in",
    filter: disabled && !active ? "grayscale(100%)" : "",
    [theme.breakpoints.down('md')]: {
      width: '80vw'
    }
  })
);
