import React, { FunctionComponent } from "react";
import Transition from "../../components/Transition";

interface Props {}

const Home: FunctionComponent<Props> = () => {
  return (
    <Transition>
      <div className="w-full h-ful">
        <h1>home</h1>
      </div>
    </Transition>
  );
};

export default Home;
