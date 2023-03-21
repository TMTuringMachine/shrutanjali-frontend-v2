import React, { FunctionComponent, ReactNode } from "react";

//libs
import { motion } from "framer-motion";
import { styled } from "@mui/material";

const TransitionContainer = styled(motion.div)(() => ({
  width: "100%",
  height: "100%",
}));

const animationConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, x: "-100vh" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 1,
};

interface Props {
  children: ReactNode;
}

const Transition: FunctionComponent<Props> = ({ children }) => {
  return (
    <TransitionContainer
      variants={animationConfig}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </TransitionContainer>
  );
};

export default Transition;
