import { useState } from "react";
import Router from "./routes";
import ScrollToTop from "./components/ScrollToTop";

import { AnimatePresence } from "framer-motion";

//styles
import { AppContainer } from "./global/global.styles";

function App() {
  return (
    <AppContainer>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Router />
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
