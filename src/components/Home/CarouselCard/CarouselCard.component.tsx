import React, { FunctionComponent, useEffect } from "react";

//interfaces
import { Song } from "../../../interfaces/song.interface";

//styles
import { CarouselCardContainer } from "./CarouselCard.styles";

interface Props {
  song: Song;
  active: boolean;
}

const CarouselCard: FunctionComponent<Props> = ({ song, active }) => {

  return (
    <CarouselCardContainer url={song.image}>
    </CarouselCardContainer>
  );
};

export default CarouselCard;
