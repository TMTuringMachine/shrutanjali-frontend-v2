import React, { FunctionComponent, MouseEventHandler, useEffect } from "react";

//interfaces
import { Song } from "../../../interfaces/song.interface";

//styles
import { CarouselCardContainer } from "./CarouselCard.styles";
import { IMedia } from "../../../interfaces/media.interface";
import { optimizeImage } from "../../../utils/helper";

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
      src={optimizeImage(song.thumbnailUrl)}
      loading="lazy"
      layoutId={song._id}
      // url={optimizeImage(song.thumbnailUrl)}
      disabled={disabled}
      onClick={onClick}
      active={active}
    ></CarouselCardContainer>
  );
};

export default CarouselCard;
