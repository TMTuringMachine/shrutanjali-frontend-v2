import React, { FunctionComponent, useState } from "react";

//assets
import NameBlack from "../../assets/images/shrutanjali-name-black.png";
import NameOrange from "../../assets/images/shrutanjali-name-orange.png";
import MaImage from "../../assets/images/MA-image1.png";

import Transition from "../../components/Transition";

//libs
import { useNavigate } from "react-router-dom";

//hooks
import { useWindowSize } from "../../hooks/useWindowSize";

//styles
import {
  LandingPageContainer,
  NameContainer,
  ImageContainer,
} from "./landing.styles";

interface Props {}

const LandingPage: FunctionComponent<Props> = () => {
  const [nameHover, setNameHover] = useState<boolean>(false);

  const navigate = useNavigate();
  const { width } = useWindowSize();

  const handleClick = () => {
    navigate("/home");
  };

  return (
    <Transition>
      <LandingPageContainer onClick={handleClick}>
        <NameContainer>
          {nameHover || width! < 900 ? (
            <img
              src={NameOrange}
              alt=""
              className="cursor-pointer transition-all ease-out duration-100"
              onMouseLeave={() => {
                setNameHover(false);
              }}
            />
          ) : (
            <img
              src={NameBlack}
              alt=""
              onMouseEnter={() => {
                setNameHover(true);
              }}
              onMouseLeave={() => {
                setNameHover(false);
              }}
            />
          )}
        </NameContainer>
        <ImageContainer active={nameHover}>
          <img
            src={MaImage}
            alt=""
            onMouseEnter={() => {
              setNameHover(true);
            }}
            onMouseLeave={() => {
              setNameHover(false);
            }}
          />
        </ImageContainer>
      </LandingPageContainer>
    </Transition>
  );
};

export default LandingPage;
