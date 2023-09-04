import React, { FunctionComponent, MouseEventHandler, useEffect } from "react";

//interfaces
import { Song } from "../../../interfaces/song.interface";

//styles
import { CarouselCardContainer } from "./CarouselCard.styles";
import { IMedia } from "../../../interfaces/media.interface";

interface Props {
  song: IMedia;
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
      layoutId={song._id}
      url={song.thumbnailUrl}
      disabled={disabled}
      onClick={onClick}
      active={active}
    ></CarouselCardContainer>
  );
};

export default CarouselCard;
