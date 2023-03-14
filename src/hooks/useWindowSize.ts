import { useState, useEffect } from "react";

interface windowState {
  width: number | undefined;
  height: number | undefined;
}

export const useWindowSize = (): windowState => {
  const [windowSize, setWindowSize] = useState<windowState>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
