import React, { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

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

const Transition: FunctionComponent<Props> = ({ children }) => {
  return (
    <motion.div
      variants={animationConfig}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default Transition;
