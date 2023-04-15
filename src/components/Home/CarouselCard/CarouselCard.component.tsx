import React, { FunctionComponent, MouseEventHandler, useEffect } from "react";

//interfaces
import { Song } from "../../../interfaces/song.interface";

//styles
import { CarouselCardContainer } from "./CarouselCard.styles";

interface Props {
  song: Song;
  active: boolean;
  disabled: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const CarouselCard: FunctionComponent<Props> = ({
  song,
  active,
  disabled,
  onClick,
}) => {
  return (
    <CarouselCardContainer
      layoutId={song.name}
      url={song.image}
      disabled={disabled}
      onClick={onClick}
    ></CarouselCardContainer>
  );
};

export default CarouselCard;
