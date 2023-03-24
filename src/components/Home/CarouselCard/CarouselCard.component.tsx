import React, { FunctionComponent, useEffect } from "react";

//interfaces
import { Song } from "../../../interfaces/song.interface";

//styles
import { CarouselCardContainer } from "./CarouselCard.styles";

interface Props {
  song: Song;
  active: boolean;
  disabled: boolean;
}

const CarouselCard: FunctionComponent<Props> = ({ song, active, disabled }) => {
  return (
    <CarouselCardContainer
      layoutId={song.name}
      url={song.image}
      disabled={disabled}
    ></CarouselCardContainer>
  );
};

export default CarouselCard;
