import React, { FunctionComponent, useEffect, useState } from "react";

//assets
import NameBlack from "../../assets/images/shrutanjali-name-black.png";
import NameOrange from "../../assets/images/shrutanjali-name-orange.png";
// import MaImage from "../../assets/images/MA-image1.png";
import MaImage from "../../assets/images/MA_IMAGE.png";


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
import useAuth from "../../hooks/useAuth";
import useWishlist from "../../hooks/useWishlist";
import useMedia from "../../hooks/useMedia";

interface Props { }

const LandingPage: FunctionComponent<Props> = () => {
  const [nameHover, setNameHover] = useState<boolean>(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const {getWishlist,setWishList} = useWishlist();
  const {checkSongsAvailable} = useMedia();
  const handleClick = () => {
    navigate("/home");
  };

  const checkWishlist = async()=>{
    const list = getWishlist();
    const updatedList = await checkSongsAvailable(list);
    setWishList(updatedList)
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/admin/login")
    }
    checkWishlist()
  }, [isLoggedIn])


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
