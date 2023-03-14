import React, { FunctionComponent, useState } from "react";

//assets
import Transition from "../../components/Transition";

import { useNavigate } from "react-router-dom";

interface Props {}

const LandingPage: FunctionComponent<Props> = () => {
  return (
    <Transition>
      <div>landing page</div>
    </Transition>
  );
};

export default LandingPage;
